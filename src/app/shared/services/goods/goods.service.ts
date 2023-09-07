import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGoodsResponse, IGoodsRequest } from '../../interfaces/goods.inteface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  docData,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  private url = environment.BACKEND_URL;
  public api = { goods: `${this.url}/goods` };
  public goodsCollection!: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private afs: Firestore) {
    this.goodsCollection = collection(this.afs, 'goods');
  }

  public productCount(product: IGoodsResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  // =====================firebase================== //

  getAllFirebase() {
    return collectionData(this.goodsCollection, { idField: 'id' });
  }

  async getAllByCategoryFirebase(name: string) {
    const arr: DocumentData[] = [];
    const category = query(
      collection(this.afs, 'goods'),
      where('category.path', '==', `${name}`)
    );
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }

  getOneFirebase(id: string) {
    const goodsDocumentReference = doc(this.afs, `goods/${id}`);
    return docData(goodsDocumentReference, { idField: 'id' });
  }

  createFirebase(product: IGoodsResponse) {
    return addDoc(this.goodsCollection, product);
  }
  updateFirebase(product: IGoodsRequest, id: string) {
    const goodsDocumentReference = doc(this.afs, `goods/${id}`);
    return updateDoc(goodsDocumentReference, { ...product });
  }

  deleteFirebase(id: string) {
    const goodsDocumentReference = doc(this.afs, `goods/${id}`);
    return deleteDoc(goodsDocumentReference);
  }
}
