import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
// import {
//   Food,
//   Holders,
//   IPickups,
//   ITimes,
// } from '../../shared/interfaces/food.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrdersResponse } from 'src/app/shared/interfaces/orders.interface';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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

  public selectedValue!: string;
  public selectedHolders!: string;
  public selectedInterval!: string;
  public selectedPickup!: string;

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
    this.loadOrders();
    const productString = this.route.snapshot.queryParamMap.get('product');
    if (productString) {
      this.product = JSON.parse(productString);
    }
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
  public totalSum!: number;
  // This method calculates the price and quantity of the product and displays the total amount
  getTotalSum(): number {
    if (!this.orderService.basket) {
      return 0;
    }

    return this.orderService.basket.reduce(
      (total, product) => total + product.price * product.count,
      0
    );
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
      // selectedValue: [this.foods[0].value],
      // selectedHolders: [this.holders[0].value],
      // selectedInterval: [this.times[0].value],
      // selectedPickup: [this.pickups[0].value],
      date: new Date(),
      cash: ['cash'],
      delivery: ['delivery'],
      inAdvance: [null],
      firstName: [currentUser.firstName, [Validators.required]],
      lastName: [currentUser.lastName],
      phone: [currentUser.phone, [Validators.required]],
      adress: [
        currentUser.adress,
        [Validators.required, Validators.minLength(2)],
      ],
      number: [
        currentUser.number,
        [Validators.required, Validators.pattern(/^[0-9]*$/)],
      ],
      entrance: [null],
      apartment: [null],
      callBack: [null],
      addComment: [null],
      addCommentKitchen: [null],
    });
  }

  // This is an array of Food
  // foods: Food[] = [
  //   { value: '1', viewValue: '1' },
  //   { value: '2', viewValue: '2' },
  //   { value: '3', viewValue: '3' },
  //   { value: '4', viewValue: '4' },
  //   { value: '5', viewValue: '5' },
  //   { value: '6 + 15 грн', viewValue: '6 + 15 грн' },
  // ];

  // This is an array of Holders
  // holders: Holders[] = [
  //   {
  //     value: 'Навчальні тримачі',
  //     viewValue: 'Навчальні тримачі',
  //     disabled: true,
  //   },
  //   { value: '0', viewValue: '0' },
  //   { value: '1', viewValue: '1' },
  // ];
  // This is an array of Times
  // times: ITimes[] = [
  //   {
  //     value: 'Виберіть часовий інтервал',
  //     viewValue: 'Виберіть часовий інтервал',
  //   },
  //   { value: '11:00-11:15', viewValue: '11:00-11:15' },
  //   { value: '11:15-11:30', viewValue: '11:15-11:30' },
  // ];

  // This is an array of Pickups
  // pickups: IPickups[] = [
  //   {
  //     value: 'Оберіть адресу самовивозу',
  //     viewValue: 'Оберіть адресу самовивозу',
  //     disabled: true,
  //   },
  //   { value: 'Чорновола 95', viewValue: 'Чорновола 95' },
  //   { value: 'Володимира Великого 10Б', viewValue: 'Володимира Великого 10Б' },
  // ];

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

  // This method adds a new order to the Firebase database.
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

    if (this.foodForm) {
      const formValues = this.foodForm.value;
      const newOrder: IOrdersResponse = {
        id: this.count + 1,
        selectedValue: formValues.selectedValue,
        selectedHolders: formValues.selectedHolders,
        selectedInterval: formValues.selectedInterval,
        selectedPickup: formValues.selectedPickup,
        date: date,
        cash: formValues.cash,
        delivery: formValues.delivery,
        inAdvance: formValues.inAdvance,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        productName: productName,
        phone: formValues.phone,
        adress: formValues.adress,
        number: formValues.number,
        entrance: formValues.entrance,
        apartment: formValues.apartment,
        callBack: formValues.callBack,
        addComment: formValues.addComment,
        addCommentKitchen: formValues.addCommentKitchen,
        count: this.count + 1,
        totalSum: this.getTotalSum(),
        status: 'в процесі',
        productCountNumber: totalCount,
        userUID: userUID,
      };
      // Add the new order to the Firestore database
      this.orderService.createFirebase(newOrder as any);
      this.clearBasket();
      this.toastService.success('Ваше замовлення оформлене');
    }
  }

  // This method count order
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

  ngOnDestroy(): void {
    this.spinnerService.hide(); // show spinner
  }
}
