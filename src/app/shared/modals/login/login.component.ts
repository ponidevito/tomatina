import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/account.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private router: Router) {}

  public isFieldFocused=true;
  public primary='1px solid red';

  // auth form
  public authForm!: FormGroup;

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    // this.loginSubscription?.unsubscribe();
  }
}
