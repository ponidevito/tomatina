import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../../interfaces/account.interface';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ROLE } from '../../constants/role.constant';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();
  public currentRoleSubject = new BehaviorSubject<ROLE>({} as ROLE);

  private url = environment.BACKEND_URL;
  private api = { auth: `${this.url}/auth` };

  constructor(private http: HttpClient, private afs: Firestore) {}

  // This method makes a GET request to the API at ${this.api.auth}
  login(credential: ILogin): Observable<any> {
    return this.http.get(
      `${this.api.auth}?email=${credential.email}&password=${credential.password}`
    );
  }

  // This method updates the current user data in the subject
  updateUserFirebase(userInfo: ILogin, id: string) {
    return updateDoc(doc(this.afs, `users/${id}`), { ...userInfo });
  }
}
