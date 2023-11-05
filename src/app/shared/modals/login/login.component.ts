import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
// import { OrderService } from 'src/app/shared/services/order/order.service';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, getDoc } from '@angular/fire/firestore';
import { RegistrationComponent } from '../registration/registration.component';

import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  Subscription,
  first,
  from,
  lastValueFrom,
} from 'rxjs';
import { ILogin } from '../../interfaces/account.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public currentUserSubject = new BehaviorSubject<ILogin>({} as ILogin);

  userRole!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private dialog: MatDialog,
    public auth: Auth,
    private afs: Firestore,
    public toastr: ToastrService,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private loginDialogRef: MatDialogRef<LoginComponent>
  ) {
    if (this.currentUserSubject) {
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      this.currentUserSubject.next(currentUser);
    }

    if (this.accountService.currentRoleSubject) {
      const role = JSON.parse(localStorage.getItem('userRole') || '{}');
      this.accountService.currentRoleSubject.next(role);
    }
  }

  // auth form
  public authForm!: FormGroup;

  public loginSubscription!: Subscription;
  public previousModalRef!: MatDialogRef<any>;

  ngOnInit(): void {
    this.initAuthForm();
    localStorage.getItem('currentUser') || '{}';
    // console.log(    localStorage.getItem('userRole') || '{}')
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Open the registration modal dialog
  openModalRegistration() {
    this.dialog.open(RegistrationComponent);
  }

  //  close dialog
  closeDialog() {
    // this.dialogRef.close();
    this.loginDialogRef.close();
  }

  // This loginUser() method uses the values entered by the user in the authorization form and calls the login() method.
  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        this.toastr.success('Вітаємо, ви успішно увійшли до системи');
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  // This login() method takes email and password as arguments and then makes an asynchronous request to the Firebase authentication service.
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.loginSubscription = docData(
      doc(this.afs, 'users', credential.user.uid)
    ).subscribe({
      next: (user) => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const userCurrent = JSON.parse(
          localStorage.getItem('currentUser') as string
        );
        //  save the user role in localStorage
        localStorage.setItem('userRole', JSON.stringify(userCurrent.role));
        if (user && user['role'] === ROLE.USER) {
          console.log(userCurrent.role);
          // this.router.navigate(['admin/category']);
          this.dialog.closeAll();
        } else if (user && user['role'] === ROLE.ADMIN) {
          console.log(userCurrent.role);
          this.router.navigate(['admin/category']);
          this.dialog.closeAll();
        }
        this.accountService.isUserLogin$.next(true);
      },
      error: (e) => {
        console.log('error', e);
      },
    });
  }


  
  
  

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
