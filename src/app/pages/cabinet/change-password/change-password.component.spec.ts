import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the changePassForm with null values', () => {
    expect(component.changePassForm.value).toEqual({
      password: null,
      newPassword: null,
      repitePassword: null,
    });
  });
 it('should mark changePassForm as invalid when any field is empty', () => {
    component.changePassForm.setValue({
      password: '',
      newPassword: '',
      repitePassword: '',
    });
    expect(component.changePassForm.invalid).toBeTruthy();
  });

  it('should update user when form is valid', () => {
    spyOn(component, 'updateUser');
    component.changePassForm.setValue({
      password: 'current_password',
      newPassword: 'new_password',
      repitePassword: 'new_password',
    });
    component.updateUser();
    expect(component.updateUser).toHaveBeenCalled();
  });
  it('should set "matchError" error if password confirmation does not match', () => {
    component.changePassForm.setValue({
      password:'12345',
      newPassword: 'newPassword123',
      repitePassword: 'newPassword124'
    });
    const passwordControl = component.changePassForm.controls['newPassword'];
    const confirmedControl = component.changePassForm.controls['repitePassword'];
    passwordControl.setValue('newPassword123');
    confirmedControl.setValue('newPassword124');
    component.checkConfirmedPassword();
    expect(component.checkPassword).toBe(false);
    expect(component.changePassForm.controls['repitePassword'].hasError('matchError')).toBe(true);
  });
  
  
 
});
