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
import { IGoodsResponse } from '../../interfaces/goods.inteface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoriteCollection!: CollectionReference<DocumentData>;


  constructor(public afs: Firestore) {
    this.favoriteCollection = collection(this.afs, 'favorites');
  }

  getAllFirebase() {
    return collectionData(this.favoriteCollection, { idField: 'id' });
  }

  createFirebase(favorite: IGoodsResponse) {
    return addDoc(this.favoriteCollection, favorite);
  }

  updateFirebase(favorite: IGoodsResponse, id: string) {
    const favoriteDocumentReference = doc(this.afs, `favorites/${id}`);
    return updateDoc(favoriteDocumentReference, { ...favorite });
  }

    
  deleteFirebase(id: string) {
    const favoriteDocumentReference = doc(this.afs, `favorites/${id}`);
    return deleteDoc(favoriteDocumentReference);
  }
  
  



  
}
