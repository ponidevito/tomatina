import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AccountService } from 'src/app/shared/services/account/account.service';

export interface IRegister {
  firstName: string;
  lastName: string;
  phone: string | number;
  email: string;
  password: string;
  repitePassword?: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public regForm!: FormGroup;
  private registerData!: IRegister;
  public checkPassword = false;

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public auth: Auth,
    public afs: Firestore,
    public router: Router,
    public dialog: MatDialog,
    public accountService: AccountService,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private loginDialogRef: MatDialogRef<LoginComponent>
  ) {}
  ngOnInit(): void {
    this.initRegForm();
  }
  public isEditable: boolean = false;

  // init registration form
  initRegForm(): void {
    this.regForm = this.fb.group({
      firstName: [null, [Validators.required, this.capitalizeFirstLetter]],
      lastName: [null, [Validators.required, this.capitalizeFirstLetter]],
      phone: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      repitePassword: [null, [Validators.required]],
    });
  }

  // The registerUser() method uses the values entered by the user in the registration form, and calls the emailSignUp() method to create a new user account with the entered data.
  registerUser(): void {
    const { email, password } = this.regForm.value;
    this.registerData = this.regForm.value;
    this.emailSignUp(email, password)
      .then(() => {
        this.toastr.success('User successfully created');
        // this.router.navigate(['/my-cabinet/user']);
        // this.accountService.isUserLogin$.next(true);

        this.dialog.closeAll();
        this.regForm.reset();
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  // The async emailSignUp() method performs asynchronous authentication of a new Firebase user.
  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phone: this.registerData.phone,
      address: '',
      role: 'USER',
    };
    
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    // this.navigateToUserProfile();
  }
  // navigateToUserProfile() {
  //   // this.router.navigate(['/my-cabinet/user']);
  // }

  // open modal
  openLoginModal(): void {
    this.dialog.open(LoginComponent);
  }

  // close modal
  closeDialog(): void {
    this.dialogRef.close();
    this.loginDialogRef.close();
  }

  // This code performs a check for matching passwords in a registration form.
  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.regForm.controls['repitePassword'].setErrors({
        matchError: 'Password confirmation doesnt match',
      });
    }
  }

  get password(): AbstractControl {
    return this.regForm.controls['password'];
  }
  get confirmed(): AbstractControl {
    return this.regForm.controls['repitePassword'];
  }
  checkVisibilityError(control: string, name: string): boolean | null {
    return this.regForm.controls[control].errors?.[name];
  }

  //  FirstLetter toUpperCase
  capitalizeFirstLetter(control: FormControl) {
    const value = control.value;
    if (
      value &&
      typeof value === 'string' &&
      value.charAt(0) !== value.charAt(0).toUpperCase()
    ) {
      const capitalizedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      control.setValue(capitalizedValue);
    }
  }
}
