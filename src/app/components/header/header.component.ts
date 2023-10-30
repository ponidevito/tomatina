import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/shared/modals/login/login.component';
import { DeliveryModalComponent } from '../../shared/modals/delivery-modal/delivery-modal.component';
import { DataService } from '../../shared/services/dataService/data.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../shared/services/category/category.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit,OnDestroy {

  subscription: Subscription;

  constructor(
    private elRef: ElementRef,
    private dialog: MatDialog,
    private dataService: DataService,
    private accountService: AccountService,
    private goodsService: GoodsService,
    public orderService: OrderService,
    public router: Router,
    public categoryService: CategoryService,

  ) {
    this.subscription = new Subscription(); // Це можна винести в окремий рядок

  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const menuBlock = this.elRef.nativeElement.querySelector('.menu-block');
    const burger = this.elRef.nativeElement.querySelector('#burger');

    const menuButton = this.elRef.nativeElement.querySelector('.menu__link');

    const submenu = this.elRef.nativeElement.querySelector('.menu__submenu');

    if (!menuBlock.contains(event.target) && !burger.contains(event.target)) {
      this.closeBlock();
    }
    if (!menuButton.contains(event.target) &&  !submenu.contains(event.target)
    ) {
      this.closeSubMenu();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const nav = this.elRef.nativeElement.querySelector('.header__body');
    if (window.pageYOffset > 0) {
      nav.classList.add('shadow');
    } else {
      nav.classList.remove('shadow');
    }
  }
  public isLogin = false;
  public loginUrl = '';
  public userRole!: string;
  public show = false;
  public layer = false;
  public layerCart = false;
  public message = 'натисніть для заміни';

  public goodsArray: Array<IGoodsResponse> = [];
  public totalSum!: number;
  

  selectedCategory: string = 'special-edition';

  // burger menu
  burger() {
    this.show = !this.show;
    this.layer = true;
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('lockBurger');
  }

  ngOnInit(): void {
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.dataService.changeMessage(this.message);
    this.dataService.currentMessage.subscribe((message) => {
      this.message = message;
    });
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
    this.totalSum = this.getTotalSum();

    this.subscription = this.categoryService.selectedCategory$.subscribe((category: string) => {
      this.selectedCategory = category;
      // Отримано нову категорію - виконати додаткові дії тут
    });
  }

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

  public userName = '';
    // This method checks whether the browser's local storage contains a record of the logged-in user.
    checkUserLogin(): void {
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') as string
      );
      const role = JSON.parse(localStorage.getItem('userRole') || '{}');
      this.userRole = role;
      if (currentUser && currentUser.role === ROLE.ADMIN) {
        this.isLogin = true;
        this.loginUrl = 'admin/category';
        this.userName=currentUser['firstName']
      } else if (currentUser && currentUser.role === ROLE.USER) {
        this.isLogin = true;
        this.loginUrl = 'my-cabinet/user';
        this.userName=currentUser['firstName']
      } else {
        this.isLogin = false;
        this.loginUrl = '';
      }
    }
  
    // This method checks the user's status. If the status has changed, the user's record is checked for in the browser's local storage and the isLogin, loginUrl, and loginPage variables are set to the appropriate values.
    checkUpdatesUserLogin(): void {
      this.accountService.isUserLogin$.subscribe(() => {
        this.checkUserLogin();
      });
    }

  //  close
  closeBlock() {
    this.show = false;
    this.layer = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockBurger');
  }

  //  open modal login
  openModalLogin() {
    this.dialog.open(LoginComponent);
  }

  //  open modal delivery
  openModalDelivery() {
    this.dialog.open(DeliveryModalComponent);
  }

  isSubMenu=false;

  autoCloseTimer: any;

  // openSubMenu() {
  //   this.isSubMenu=!this.isSubMenu;
    
  //   if (this.autoCloseTimer) {
  //     clearTimeout(this.autoCloseTimer);
  //   }
  //   this.autoCloseTimer = setTimeout(() => {
  //     this.isSubMenu = false;
  //   }, 20000);
  // }

  openSubMenu(event: Event) {
    event.preventDefault();
    this.isSubMenu=!this.isSubMenu;
    
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
    this.autoCloseTimer = setTimeout(() => {
      this.isSubMenu = false;
    }, 20000);
  }

  closeSubMenu() {
    this.isSubMenu = false;
  }

  onMenuItemSelect() {
    this.closeSubMenu();
  }

  // basket

    //  modal
    public showModalCart = false;
    //  open cart modal
    openModalCart() {
     this.showModalCart = !this.showModalCart;
     this.layerCart = !this.layerCart;
      // this.basketHeight = !this.basketHeight;
      // this.layerBig = !this.layerBig;
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('lockModal');
    }

   closeModalCart() {
      this.showModalCart = false;
      this.layerCart = false;
 
       // this.basketHeight = !this.basketHeight;
       // this.layerBig = !this.layerBig;
       const body = document.getElementsByTagName('body')[0];
       body.classList.remove('lockModal');
     }

    
  // This method is responsible for closing the cart modal window when the user clicks outside of it.
  onModalWrapperClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const modal = target.closest('.modal');
    const body = document.getElementsByTagName('body')[0];
    if (!modal) {
      // event.stopPropagation();

      this.layerCart = false;
      this.showModalCart = false;
      // this.layerBig = false;
      // this.basketHeight = false;
      body.classList.remove('lockModal');
    }
  }

   // close busket
   closeBusket(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockModal');
    this.showModalCart = false;
    this.layerCart = false;
    // this.basketHeight = false;
  }

  clearBasket() {
    this.orderService.basket = []; // Очистити кошик, просто призначити пустий масив
    this.orderService.count = 0; // Скинути кількість товарів
    localStorage.removeItem('basket'); // Видалити збережений кошик
    localStorage.removeItem('count'); 
    this.orderService.hideCartIcon();

  }

  navigateToCatalog() {
    this.showModalCart = false;
    this.layerCart = false;
    // this.basketHeight = false;
    // this.layerBig = false;
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
      // event.stopPropagation();
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


  onMenuSelect(category: string) {
    this.categoryService.setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category); // Зберегти значення в localStorage

    
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();

  }
}
