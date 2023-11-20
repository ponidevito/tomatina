import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from '../../shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private orderService: OrderService,
    private toastService: ToastrService
  ) {}

  // remove item from localStorage
  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('basket');
    localStorage.removeItem('count');
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('userRole');
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.orderService.basket = [];
    this.orderService.changeBasket.next(true);
    this.accountService.isUserLogin$.next(true);
    this.toastService.success('Ви успішно вийшли з системи');
  }
}
