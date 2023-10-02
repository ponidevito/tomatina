import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/shared/modals/login/login.component';
import { DeliveryModalComponent } from '../../shared/modals/delivery-modal/delivery-modal.component';
import { DataService } from '../../shared/services/dataService/data.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private elRef: ElementRef,
    private dialog: MatDialog,
    private dataService: DataService,
    private accountService: AccountService,
    private goodsService: GoodsService,
    public orderService: OrderService,




  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const menuBlock = this.elRef.nativeElement.querySelector('.menu-block');
    const burger = this.elRef.nativeElement.querySelector('#burger');

    if (!menuBlock.contains(event.target) && !burger.contains(event.target)) {
      this.closeBlock();
    }
  }
  public isLogin = false;
  public loginUrl = '';
  public userRole!: string;
  public show = false;
  public layer = false;

  public message = 'натисніть для заміни';

  public goodsArray: Array<IGoodsResponse> = [];
  public totalSum!: number;


  // burger menu
  burger() {
    this.show = !this.show;
    this.layer = !this.layer;
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
}
