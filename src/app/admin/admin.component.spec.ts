import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from '../admin/admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from '../shared/services/account/account.service';
import { OrderService } from '../shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';

class MockAccountService {
  isUserLogin$ = new BehaviorSubject<number>(0);
  constructor() {
    this.isUserLogin$.next(0);
  }
}

class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  loadBasket(): void {}
  updateBasket(): void {}
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],

      providers: [
        { provide: Storage, useValue: {} },
        { provide: AccountService, useClass: MockAccountService },
        { provide: OrderService, useClass: MockOrderService },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});

