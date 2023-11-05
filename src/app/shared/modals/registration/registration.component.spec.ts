import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from '../registration/registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],

      providers: [
        {
          provide: ToastrService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
          },
        },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    component.initRegForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should capitalize the first letter of a word', () => {
    const control = new FormControl('john');
    const spy = spyOn(control, 'setValue').and.callThrough();

    component.capitalizeFirstLetter(control);

    expect(spy).toHaveBeenCalledWith('John');
  });
  it('should not modify a word that is already capitalized', () => {
    const control = new FormControl('John');
    const spy = spyOn(control, 'setValue').and.callThrough();

    component.capitalizeFirstLetter(control);

    expect(spy).not.toHaveBeenCalled();
  });
  it('should not modify a non-string value', () => {
    const control = new FormControl(123);
    const spy = spyOn(control, 'setValue').and.callThrough();

    component.capitalizeFirstLetter(control);

    expect(spy).not.toHaveBeenCalled();
  });
  it('should not modify an empty string', () => {
    const control = new FormControl('');
    const spy = spyOn(control, 'setValue').and.callThrough();

    component.capitalizeFirstLetter(control);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should return true if control has specified error', () => {
    component.regForm.controls['email'].setErrors({ required: true });
    expect(component.checkVisibilityError('email', 'required')).toBe(true);
  });
  it('should return false if control does not have specified error', () => {
    component.regForm.controls['email'].setErrors({ required: false });
    expect(component.checkVisibilityError('email', 'required')).toBe(false);
  });

});
