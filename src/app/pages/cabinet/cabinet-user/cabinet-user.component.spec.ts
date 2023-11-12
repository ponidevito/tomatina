import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetUserComponent } from './cabinet-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

describe('CabinetUserComponent', () => {
  let component: CabinetUserComponent;
  let fixture: ComponentFixture<CabinetUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CabinetUserComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ToastrService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CabinetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize an empty user form', () => {
    component.initActionForm();
    expect(component.userForm.get('firstName')?.value).toBeNull();
    expect(component.userForm.get('lastName')?.value).toBeNull();
    expect(component.userForm.get('phone')?.value).toBeNull();
    expect(component.userForm.get('email')?.value).toBeNull();
    expect(component.userForm.valid).toBeFalsy();
  });
  it('should open address modal', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
    component.openModalAdress();
  });
});
