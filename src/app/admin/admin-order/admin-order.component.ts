import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Firestore, doc, updateDoc, collection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { IOrdersResponse } from 'src/app/shared/interfaces/orders.interface';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss'],
})
export class AdminOrderComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private afs: Firestore,
    private toastService: ToastrService
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // orders array
  public ordersArray: Array<IOrdersResponse> = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  // This method loads all orders from Firebase using the getAllFirebase() method from the orderService. After loading the data, it sorts the ordersArray array in descending order of the count value in the orders. data is an array of orders of type IOrdersResponse[], which is passed as an argument to the subscription processing function.
  loadOrders() {
    this.orderService.getAllFirebase().subscribe((data) => {
      this.ordersArray = data as IOrdersResponse[];
      this.ordersArray.sort((a, b) => b.count - a.count);
    });
  }

  // The onOrderComplete method updates the order status to "completed" in the database
  onOrderComplete(orderId: string): void {
    const orderRef = doc(collection(this.afs, 'orders'), orderId);
    updateDoc(orderRef, { status: 'виконано' }).then(() => {
      this.toastService.success('Замовлення виконано!');

      const index = this.ordersArray.findIndex((order) => order.id === orderId);
      if (index >= 0) {
        this.ordersArray[index].status = 'в процесі';
      }
    });
  }

  // The onOrderComplete method updates the order status to "canceled" in the database
  onOrderCanceled(orderId: string): void {
    const orderRef = doc(collection(this.afs, 'orders'), orderId);
    updateDoc(orderRef, { status: 'скасовано' }).then(() => {
      this.toastService.success('Замовлення скасовано!');
      const index = this.ordersArray.findIndex((order) => order.id === orderId);
      if (index >= 0) {
        this.ordersArray[index].status = 'в процесі';
      }
    });
  }
}
