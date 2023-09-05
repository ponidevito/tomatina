import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  ICategoryRequest,
  ICategoryResponse,
} from '../../interfaces/category.interface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.BACKEND_URL;
  private api = { category: `${this.url}/category` };



  constructor(private http: HttpClient,private afs: Firestore) {
    this.categoriesCollection = collection(this.afs, 'categories');
  }


  // ========== firebase ======// 

  private categoriesCollection!: CollectionReference<DocumentData>;

  getAllFirebase() {
    return collectionData(this.categoriesCollection, { idField: 'id' });
  }

  createFirebase(category: ICategoryRequest) {
    return addDoc(this.categoriesCollection, category);
  }
  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

}
