import {
    ComponentFixture,
    TestBed,
  } from '@angular/core/testing';
  
  import { LoginComponent } from '../login/login.component';
  import { HttpClientTestingModule } from '@angular/common/http/testing';
  import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
  } from '@angular/material/dialog';
  import { ReactiveFormsModule } from '@angular/forms';
  import { Auth } from '@angular/fire/auth';
  import { Firestore } from '@angular/fire/firestore';
  import { NO_ERRORS_SCHEMA } from '@angular/core';
  import { AccountService } from '../../services/account/account.service';
  import { ToastrService } from 'ngx-toastr';
  


  describe('LoginComponentComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
   
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [HttpClientTestingModule, MatDialogModule, ReactiveFormsModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: Auth, useValue: {} },
          { provide: Firestore, useValue: {} },
          { provide: AccountService, useValue: {} },
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
  
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
   
  });
  