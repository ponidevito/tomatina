import { Injectable } from '@angular/core';
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
import { IReviewResponse } from '../../interfaces/reviews.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private ordersCollection!: CollectionReference<DocumentData>;

  constructor(public afs: Firestore) {
    this.ordersCollection = collection(this.afs, 'reviews');
  }

  getAllFirebase() {
    return collectionData(this.ordersCollection, { idField: 'id' });
  }

  createFirebase(order: IReviewResponse) {
    return addDoc(this.ordersCollection, order);
  }

  updateFirebase(order: IReviewResponse, id: string) {
    const ordersDocumentReference = doc(this.afs, `orders/${id}`);
    return updateDoc(ordersDocumentReference, { ...order });
  }
}
