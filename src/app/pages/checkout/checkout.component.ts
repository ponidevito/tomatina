import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IOrdersResponse } from 'src/app/shared/interfaces/orders.interface';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ITimes,
  Pickup,
} from 'src/app/shared/interfaces/adressDelivery.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  styles: [
    `
      google-map {
        height: 400px;
        width: 100%;
      }
    `,
  ],
})
export class CheckoutComponent implements OnInit {
  public maxDate: Date = new Date();
  constructor(
    public orderService: OrderService,
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  public count = 0;
  public productCountNumber = 0;
  public basketArray: Array<IGoodsResponse> = [];
  public user: any;
  public product!: IGoodsResponse;
  public ordersArray: Array<IOrdersResponse> = [];
  // form
  public foodForm!: FormGroup;
  public orderForm!: FormGroup;

  // public selectedValue!: string;
  public selectedHolders!: string;
  public selectedInterval!: string;
  public selectedPickup!: string;
  public freePackage!: string;
  public cash: string = 'gotivka';
  public withoutRestFrom!: string;
  public noCall!: string;
  // public includeShopper = false;
  public inAdvance = false;
  public pickup = false;
  public adress = true;
  public addComment = false;
  public addCommentKitchen = false;
  public isCheckboxSelected = false;

  ngOnInit(): void {
    this.spinnerService.show(); // show spinner
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.initFoodForm();
    this.initOrderForm();
    this.loadOrders();
    const productString = this.route.snapshot.queryParamMap.get('product');
    if (productString) {
      this.product = JSON.parse(productString);
    }

    this.orderForm
      .get('freePackage')
      ?.valueChanges.subscribe((selectedPackage: string) => {
        if (selectedPackage === 'shopper') {
          // Add 10 UAH to the total sum when 'брендований шопер' is selected
          this.totalSum += 10;
        } else {
          // Deduct 10 UAH from the total sum when another package is selected
          this.totalSum -= 10;
        }
      });
  }

  // method count products
  public productCount(product: IGoodsResponse, value: boolean): void {
    const index = this.orderService.basket.findIndex(
      (p) => p.id === product.id
    );
    if (index !== -1) {
      if (value) {
        ++this.orderService.basket[index].count;
      } else if (!value && this.orderService.basket[index].count > 1) {
        --this.orderService.basket[index].count;
      }
    }
  }

  navigateToCatalog() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockModal');
    // navigate to /home
    this.router.navigate(['/home']);
  }

  // remove product
  removeProduct(product: IGoodsResponse, event: any) {
    const index = this.orderService.basket.indexOf(product);
    if (index > -1) {
      this.orderService.basket.splice(index, 1);
      --this.orderService.count;
      localStorage.setItem('basket', JSON.stringify(this.orderService.basket));
      localStorage.setItem('count', JSON.stringify(this.orderService.count));
    }
    // this line to stop the event from propagating
    event.stopPropagation();
  }
  // public totalSum!: number;
  public totalSum: number = 0; // Initialize totalSum to zero


  remainingSum!: number;

  getTotalSum(): number {
    if (!this.orderService.basket) {
      return 0;
    }

    // Calculate the sum of product prices
    const productsTotal = this.orderService.basket.reduce(
      (total, product) => total + product.price * product.count,
      0
    );

    return productsTotal + this.totalSum; // Include additional cost
  }

  calculateRemaining(event: Event): void {
    const enteredValue = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(enteredValue) || 0;
    const remaining = this.getTotalSum() - parsedValue;
    this.remainingSum = remaining;
  }

  // This method retrieves all orders from Firebase and sorts them in count order. It also retrieves and stores the user's "uid" property from local storage and checks that the user and userUID are not null or undefined
  async loadOrders() {
    try {
      this.orderService.getAllFirebase().subscribe((data) => {
        const user = JSON.parse(localStorage.getItem('currentUser') as string);
        if (user && user.uid) {
          // check if user and userUID are not null
          this.user = user.uid;
          this.ordersArray = data as IOrdersResponse[];
          this.spinnerService.hide(); // show spinner
          this.ordersArray.sort((a, b) => a.count - b.count);
          this.countOrder();
        }
        this.spinnerService.hide(); // show spinner
      });
    } catch (error) {
      console.error(error);
    }
  }

  initFoodForm(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.foodForm = this.fb.group({
      selectedPickup: [this.pickups[0].value],
      selectedInterval: [this.times[0].value],
      date: new Date(),
      firstName: [
        currentUser.firstName,
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-яЁё]*$/),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        currentUser.lastName,
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-яЁё]*$/),
          Validators.minLength(2),
        ],
      ],
      phone: [currentUser.phone, [Validators.required]],
      email: [null],
    });
  }

  initOrderForm(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.orderForm = this.fb.group({
      selectedHolders: new FormControl(0),
      id: this.count + 1,
      count: this.count + 1,
      freePackage: ['freePackage'],
      cash: new FormControl('gotivka'),
      withoutRestFrom: this.withoutRestFrom,
      remainingSum: this.remainingSum,
      noCall: this.noCall,
      addComment: [null],
    });
  }

  isInvalid(field: string) {
    return (
      this.foodForm.get(field)?.invalid &&
      (this.foodForm.get(field)?.dirty || this.foodForm.get(field)?.touched)
    );
  }

  isValid(field: string) {
    return this.foodForm.get(field)?.valid && this.foodForm.get(field)?.dirty;
  }

  // This is an array of Adress
  pickups: Pickup[] = [
    {
      value: 'Ресторан за адресою',
      viewValue: 'Ресторан за адресою',
      disabled: true,
    },
    {
      value: 'ТРЦ Victoria Gardens, Кульпарківська, 226 А',
      viewValue: 'ТРЦ Victoria Gardens, Кульпарківська, 226 А',
    },
    {
      value: 'СТРЦ Spartak, Мазепи, 1Б',
      viewValue: 'СТРЦ Spartak, Мазепи, 1Б',
    },
    {
      value: 'ТРЦ Forum Lviv, Під Дубом, 7Б',
      viewValue: 'ТРЦ Forum Lviv, Під Дубом, 7Б',
    },
    {
      value: 'ТРЦ King Cross, Стрийська, 30',
      viewValue: 'ТРЦ King Cross, Стрийська, 30',
    },
  ];


  // This is an array of Times
  times: ITimes[] = [
    {
      value: 'Виберіть часовий інтервал',
      viewValue: 'Виберіть часовий інтервал',
    },
    { value: '12:41 - 12:51', viewValue: '12:41 - 12:51' },
    { value: '12:51 - 13:01', viewValue: '12:51 - 13:01' },
    { value: '13:01 - 13:11', viewValue: '13:01 - 13:11' },
    { value: '13:11 - 13:21', viewValue: '13:11 - 13:21' },
    { value: '13:21 - 13:31', viewValue: '13:21 - 13:31' },
    { value: '13:31 - 13:41', viewValue: '13:31 - 13:41' },
    { value: '14:01 - 14:11', viewValue: '14:01 - 14:11' },
  ];



  // This method contains a date filter
  myFilter = (d: Date | null): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // отримуємо дату на день назад
    return !d || d >= yesterday;
  };

  openAdress(): void {
    this.adress = true;
    this.pickup = false;
  }

  opendate(): void {
    this.inAdvance = !this.inAdvance;
  }

  openPickup(): void {
    this.pickup = true;
    this.adress = false;
  }

  openAddComment(): void {
    this.addComment = !this.addComment;
  }

  openAddCommentKitchen(): void {
    this.addCommentKitchen = !this.addCommentKitchen;
  }

 
  // This method count order

  addForm(): void {
    const products = this.orderService.basket.map((item) => item.name); // Створення масиву назв продуктів
    const productName = products.join(', ');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userUID = currentUser.uid || ''; // set userUID to an empty string if it's undefined or null

    const myDate = new Date();
    const day = myDate.getDate().toString().padStart(2, '0');
    const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
    const hours = myDate.getHours().toString().padStart(2, '0');
    const minutes = myDate.getMinutes().toString().padStart(2, '0');
    const date = `${day}.${month}.${hours}.${minutes}`;
    const totalCount = this.orderService.basket.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);
    if (this.orderForm && this.foodForm) {
      const formValuesOrder = this.orderForm.value;
      const formValuesFood = this.foodForm.value;

      const products = this.orderService.basket.map((item) => item.name); // Створення масиву назв продуктів
      const productName = products.join(', ');

      const totalCount = this.orderService.basket.reduce((acc, curr) => {
        return acc + curr.count;
      }, 0);

      const newOrder: any = {
        // Додайте дані з першої форми
        selectedHolders: formValuesOrder.selectedHolders,
        count: this.count + 1,
        productName: productName,
        freePackage: formValuesOrder.freePackage,
        cash: formValuesOrder.cash,
        withoutRestFrom: formValuesOrder.withoutRestFrom,
        remainingSum: this.remainingSum || null,
        noCall: formValuesOrder.noCall || null,
        addComment: formValuesOrder.addComment,
        totalSum: this.getTotalSum(),
        userUID: userUID,
        status: 'в процесі',
      };

      // Додайте дані з другої форми
      newOrder.fullName =
        formValuesFood.firstName + ' ' + formValuesFood.lastName;
      newOrder.phone = formValuesFood.phone;
      newOrder.email = formValuesFood.email;
      newOrder.selectedPickup = formValuesFood.selectedPickup;
      newOrder.date = date;
      newOrder.selectedInterval = formValuesFood.selectedInterval;
      // Відправлення комбінованих даних на Firebase
      this.orderService.createFirebase(newOrder);
      console.log(newOrder);
    }

    this.clearBasket();
    this.toastService.success('Ваше замовлення оформлене');
  }

  countOrder(): void {
    this.orderService.getAllFirebase().subscribe((data) => {
      this.count = data.length;
    });
  }

  // clear basket
  clearBasket(): void {
    localStorage.removeItem('basket');
    localStorage.removeItem('count');
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.orderService.basket = [];
    this.orderService.changeBasket.next(true);
    this.orderForm.reset();
    this.foodForm.reset();
    this.router.navigate(['/']);

    // this.foodForm.reset();
    // this.router.navigate(['my-cabinet/order-history']);
  }

  // This method disables form validation if order pickup is selected.
  disableValidation() {
    const formValues = this.foodForm.value;
    this.isCheckboxSelected = true;
    if (this.foodForm && formValues.delivery.value === 'self-delivery') {
      this.foodForm.setValidators(null);
      this.foodForm.updateValueAndValidity();
    }
  }

  // This method allows you to add validation to a form.
  enableValidation() {
    const formValues = this.foodForm.value;
    this.isCheckboxSelected = false;
    if (formValues.delivery === 'delivery') {
      this.foodForm.get('street')?.setValidators(Validators.required);
      this.foodForm.get('entrance')?.setValidators(Validators.required);
      this.foodForm.updateValueAndValidity();
    }
  }

  incrementCount() {
    const selectedHoldersControl = this.orderForm.get('selectedHolders');
    if (selectedHoldersControl) {
      const currentValue = selectedHoldersControl.value as number;
      selectedHoldersControl.setValue(currentValue + 1);
    }
  }

  decrementCount() {
    const selectedHoldersControl = this.orderForm.get('selectedHolders');
    if (selectedHoldersControl) {
      const currentValue = selectedHoldersControl.value as number;
      if (currentValue > 0) {
        selectedHoldersControl.setValue(currentValue - 1);
      }
    }
  }

  showHolders: boolean = true; // Змінна, яка вказує, чи показувати прибори

  // Ваша інша логіка тут

  toggleHoldersVisibility(): void {
    this.showHolders = !this.showHolders;
  }

  public showPay: boolean = true;

  togglePayVisibility(option: string): void {
    this.showPay = option === 'gotivka';
    this.withoutRest = true;
    this.orderForm.get('withoutRestFrom')?.setValue(false);
    this.orderForm.get('remainingSum')?.patchValue(null);
  }

  public withoutRest: boolean = true;

  toggleRestVisibility(): void {
    this.withoutRest = !this.withoutRest;
    // this.remainingSum = 0;
  }

  updateTotalSum(event: Event): void {
    const selectedPackage = (event.target as HTMLInputElement).value;

    if (selectedPackage === 'shopper') {
      this.totalSum += 10; // Add 10 UAH for 'брендований шопер'
    }
    if (selectedPackage === 'freePackage') {
      this.totalSum -= 10; // Відняти 10 грн за 'безкоштовний пакет'
    } else {
      // Subtract 10 UAH for 'безкоштовний пакет'
      this.totalSum -= 10;
    }
  }

  public showTextArea: boolean = false;

  toggleTextAreaVisibility(): void {
    this.showTextArea = !this.showTextArea;
    // this.remainingSum = 0;
  }

  ngOnDestroy(): void {
    this.spinnerService.hide(); // show spinner
  }
}
