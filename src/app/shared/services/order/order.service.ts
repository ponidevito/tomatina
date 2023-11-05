import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IGoodsRequest, IGoodsResponse } from '../../interfaces/goods.inteface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  docData,
  DocumentData,
  collection,
} from '@angular/fire/firestore';
import 'firebase/firestore';
import { IOrdersResponse } from '../../interfaces/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public basket: Array<IGoodsResponse> = [];
  public total: number = 0;
  public count: number = 0;
  public changeBasket: Subject<boolean> = new Subject<boolean>();
  public changeTotalSum$: Subject<number> = new Subject<number>();
  ordersArray: IOrdersResponse[] = [];

  public isCartOpen: boolean = false;
  public isCartIconVisible: boolean = false;

  constructor(public afs: Firestore) {
    this.ordersCollection = collection(this.afs, 'orders');
    this.basket = [];
  }
  private ordersCollection!: CollectionReference<DocumentData>;

  addToBasket(product: IGoodsResponse): void {
    let basket: Array<IGoodsResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
        this.count++;
      }
    } else {
      basket.push(product);
      this.count++;
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    localStorage.setItem('count', String(this.count));
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.count = localStorage.getItem('count')
      ? Number(localStorage.getItem('count'))
      : 0;

    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IGoodsResponse) => total + prod.count * prod.price,
      0
    );
  }

  updateBasket(): void {
    this.loadBasket();
    this.changeBasket.next(true);
  }

  showCartIcon() {
    this.isCartIconVisible = true;
  }

  hideCartIcon() {
    this.isCartIconVisible = false;
  }

  getCartItems(): IGoodsResponse[] {
    return this.basket;
  }

  setCartItems(items: IGoodsResponse[]): void {
    this.basket = items;
  }

    // ========== firebase ======// 


  getAllFirebase() {
    return collectionData(this.ordersCollection, { idField: 'id' });
  }

  createFirebase(order: IGoodsResponse) {
    return addDoc(this.ordersCollection, order);
  }

  updateFirebase(order: IGoodsRequest, id: string) {
    const ordersDocumentReference = doc(this.afs, `orders/${id}`);
    return updateDoc(ordersDocumentReference, { ...order });
  }

  getOneFirebase(id: string): Observable<any> {
    const ordersDocumentReference = doc(this.afs, `orders/${id}`);
    return docData(ordersDocumentReference, { idField: 'id' });
  }
  deleteFirebase(id: string) {
    const goodsDocumentReference = doc(this.afs, `orders/${id}`);
    return deleteDoc(goodsDocumentReference);
  }


}
