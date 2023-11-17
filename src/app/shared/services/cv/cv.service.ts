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
import { ICvResponse } from '../../interfaces/cv.interface';



@Injectable({
  providedIn: 'root',
})
export class CvService {
  private cvCollection!: CollectionReference<DocumentData>;

  constructor(public afs: Firestore) {
    this.cvCollection = collection(this.afs, 'cv');
  }

  getAllFirebase() {
    return collectionData(this.cvCollection, { idField: 'id' });
  }

  createFirebase(review: ICvResponse) {
    return addDoc(this.cvCollection, review);
  }

  updateFirebase(cv: ICvResponse, id: string) {
    const cvDocumentReference = doc(this.afs, `cv/${id}`);
    return updateDoc(cvDocumentReference, { ...cv });
  }

  deleteFirebase(id: string) {
    const cvDocumentReference = doc(this.afs, `cv/${id}`);
    return deleteDoc(cvDocumentReference);
  }
}
