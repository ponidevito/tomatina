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

  private reviewsCollection!: CollectionReference<DocumentData>;

  constructor(public afs: Firestore) {
    this.reviewsCollection = collection(this.afs, 'reviews');
  }

  getAllFirebase() {
    return collectionData(this.reviewsCollection, { idField: 'id' });
  }

  createFirebase(review: IReviewResponse) {
    return addDoc(this.reviewsCollection, review);
  }

  updateFirebase(review: IReviewResponse, id: string) {
    const reviewsDocumentReference = doc(this.afs, `reviews/${id}`);
    return updateDoc(reviewsDocumentReference, { ...review });
  }

  
  deleteFirebase(id: string) {
    const reviewDocumentReference = doc(this.afs, `reviews/${id}`);
    return deleteDoc(reviewDocumentReference);
  }
}
