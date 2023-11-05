import { Component, OnInit } from '@angular/core';
import { IOrdersResponse } from 'src/app/shared/interfaces/orders.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import 'firebase/compat/firestore';
import { DatePipe } from '@angular/common';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { catchError, first, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
})
export class OrdersHistoryComponent implements OnInit {
  constructor(public orderService: OrderService) {}

  public ordersArray: Array<IOrdersResponse> = [];
  public goods!: IGoodsResponse;

  ngOnInit(): void {
    this.loadOrders();
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.getTotalSum();
  }

  public user!: string;
  public isDuplicateOrderInProgress = false;

  async loadOrders() {
    try {
      this.orderService.getAllFirebase().subscribe((data) => {
        const user = JSON.parse(localStorage.getItem('currentUser') as string);
        if (user && user.uid) {
          // check if user and userUID are not null
          this.user = user.uid;
          this.ordersArray = data as IOrdersResponse[];
          this.ordersArray.sort((a, b) => b.count - a.count);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  // get total sum

  getTotalSum(): number {
    if (!this.orderService.basket) {
      return 0;
    }

    return this.orderService.basket.reduce(
      (total, product) => total + product.price * product.count,
      0
    );
  }

  // This method creates a duplicate order with the specified orderId.
  duplicateOrder(orderId: string | number) {
    console.log(`duplicateOrder called for order ID ${orderId}`);
    if (!this.isDuplicateOrderInProgress) {
      console.log(`Creating duplicate order for order ID ${orderId}`);
      this.isDuplicateOrderInProgress = true;
      // Get the maximum count value from the orders array
      const maxCount = this.ordersArray.reduce((acc, order) => {
        return order.count > acc ? order.count : acc;
      }, 0);
      // date
      const myDate = new Date();
      const day = myDate.getDate().toString().padStart(2, '0');
      const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
      const hours = myDate.getHours().toString().padStart(2, '0');
      const minutes = myDate.getMinutes().toString().padStart(2, '0');
      const date = `${day}.${month}.${hours}.${minutes}`;
      this.orderService
        .getOneFirebase(orderId as string)
        .pipe(
          first(),
          switchMap((order) => {
            // Create a new object with the existing order data, except the ID
            const newOrder = { ...order };
            // delete newOrder.id;
            newOrder.id = newOrder.count + 1;
            newOrder.status = 'в процесі';
            // Set the count of the new order to the max count value + 1
            newOrder.count = maxCount + 1;
            newOrder.date = date;
            // Create a new order based on the updated order data
            return this.orderService.createFirebase(newOrder);
          }),
          catchError((error) => {
            console.log(
              `Error creating duplicate order for order ID ${orderId}: ${error}`
            );
            return of(null);
          })
        )
        .subscribe(() => {
          console.log(`Duplicate order created for order ID ${orderId}`);
          this.isDuplicateOrderInProgress = false;
        });
    }
  }
}
