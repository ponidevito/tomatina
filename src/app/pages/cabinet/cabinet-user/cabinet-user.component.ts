import { Component, OnInit } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
} from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ILogin } from 'src/app/shared/interfaces/account.interface';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cabinet-user',
  templateUrl: './cabinet-user.component.html',
  styleUrls: ['./cabinet-user.component.scss'],
})
export class CabinetUserComponent implements OnInit {

// currentUser$ property
  public currentUser$!: Observable<ILogin>; 

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    public auth: Auth,
    private toastService: ToastrService,
    private dialog: MatDialog,
    public router: Router,

  ) {}

  // userForm
  public userForm!: FormGroup;

  public loginSubscription!: Subscription;
  ngOnInit(): void {
    this.initActionForm();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userForm.patchValue({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phone: currentUser.phone,
      email: currentUser.email,
    });
  }

  // This method creates a form using the Angular FormBuilder (variable fb) and sets initial values and validators for each field in the form.
  initActionForm(): void {
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  //   This code updates a user's profile in Firebase, including changing their email.
  updateUser(): void {
    if (this.userForm.valid) {
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      const userDocRef = doc(this.afs, 'users', currentUser.uid);
      const userData = this.userForm.value;
      updateDoc(userDocRef, userData)
        .then(() => {
          // update local storage with new user data
          const updatedUser = { ...currentUser, ...userData };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          // update Firebase Auth user email
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            updateEmail(user, updatedUser.email)
              .then(() => {
                this.toastService.success('User email successfully updated');
              })
              .catch((error) => {
                this.toastService.error('Error updating user email: ', error);
              });
          }
          this.toastService.success('User data successfully updated');
              // navigate to /home
    this.router.navigate(['/home']);
        })
        .catch((error) => {
          this.toastService.error('Error updating user document: ', error);
        });
    }
  }

  // open modal change adress
  openModalAdress() {
  }
}
