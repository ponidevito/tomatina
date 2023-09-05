import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';
// import { OrderService } from '../shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    public router: Router,
    private accountService: AccountService,
    // private orderService: OrderService,
    private toastService: ToastrService
  ) {}

  // remove item from localStorage
  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    // localStorage.removeItem('basket');
    // localStorage.removeItem('count');
    // this.orderService.loadBasket();
    // this.orderService.updateBasket();
    // this.orderService.basket = [];
    // this.orderService.changeBasket.next(true);
    this.accountService.isUserLogin$.next(true);
    this.toastService.success('Ви успішно вийшли з системи');
  }
}
