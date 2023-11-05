import { Component, OnInit } from '@angular/core';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private toastService: ToastrService
  ) {}

  // changepassForm
  public changePassForm!: FormGroup;

  public checkPassword = false;

  ngOnInit(): void {
    this.initPassForm();
  }

  // This method creates a form using the Angular FormBuilder (variable fb) and sets initial values and validators for each field in the form.
  initPassForm(): void {
    this.changePassForm = this.fb.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
      repitePassword: [null, Validators.required],
    });
  }

  // This code updates a user's profile in Firebase, including changing their password.
  updateUser(): void {
    if (this.changePassForm.valid) {
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      const userDocRef = doc(this.afs, 'users', currentUser.uid);
      const userData = this.changePassForm.value;
      const currentPassword = this.changePassForm.get('password')?.value;
      const newPassword = this.changePassForm.get('newPassword')?.value;

      // re-authenticate user with their current password
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        const credential = EmailAuthProvider.credential(
          user.email as string,
          currentPassword as string
        );
        reauthenticateWithCredential(user, credential)
          .then(() => {
            // update user document in Firestore
            updateDoc(userDocRef, userData)
              .then(() => {
                // update local storage with new user data
                const updatedUser = { ...currentUser, ...userData };
                localStorage.setItem(
                  'currentUser',
                  JSON.stringify(updatedUser)
                );

                // update Firebase Auth user password
                updatePassword(user, newPassword)
                  .then(() => {
                    this.toastService.error(
                      'User password successfully updated'
                    );
                  })
                  .catch((error) => {
                    this.toastService.error(
                      'Error updating user password: ',
                      error
                    );
                  });
                this.toastService.error('User data successfully updated');
              })
              .catch((error) => {
                this.toastService.error(
                  'Error updating user document: ',
                  error
                );
              });
          })
          .catch((error) => {
            this.toastService.error('Error re-authenticating user: ', error);
          });
      } else {
        this.toastService.error('User is not logged in');
      }
    }
  }

  /* This code performs a check for matching passwords in a registration form. */
  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.changePassForm.controls['repitePassword'].setErrors({
        matchError: 'Password confirmation doesnt match',
      });
    }
  }
  get password(): AbstractControl {
    return this.changePassForm.controls['newPassword'];
  }
  get confirmed(): AbstractControl {
    return this.changePassForm.controls['repitePassword'];
  }
  checkVisibilityError(control: string, name: string): boolean | null {
    return this.changePassForm.controls[control].errors?.[name];
  }
  /* This code performs a check for matching passwords in a registration form. */
}
