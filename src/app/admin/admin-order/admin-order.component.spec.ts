import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderComponent } from '../admin-order/admin-order.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Firestore } from '@angular/fire/firestore';

class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  getAllFirebase() {
    return of([]);
  }
}

describe('AdminOrderComponent', () => {
  let component: AdminOrderComponent;
  let fixture: ComponentFixture<AdminOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminOrderComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: {} },
        { provide: OrderService, useClass: MockOrderService },
        { provide: Firestore, useClass: MockOrderService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
