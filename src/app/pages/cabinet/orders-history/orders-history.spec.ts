import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrdersHistoryComponent } from '../orders-history/orders-history.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';


class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  loadBasket():void{}
  updateBasket():void{}
    getOneFirebase ():void{}
 

 
}

describe('OrdersHistoryComponent', () => {
  let mockOrderService: MockOrderService;

  beforeEach(async () => {
    mockOrderService = new MockOrderService();

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [],
      providers: [{ provide: OrderService, useClass: MockOrderService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(OrdersHistoryComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should call loadOrders method', () => {
    const fixture = TestBed.createComponent(OrdersHistoryComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'loadOrders');
    spyOn(component.orderService, 'loadBasket'); // Spy on the loadBasket method
    
    component.ngOnInit();
  
    expect(component.loadOrders).toHaveBeenCalled();
    expect(component.orderService.loadBasket).toHaveBeenCalled(); // Expect the loadBasket method to have been called
  });
  

  
  



  
});
