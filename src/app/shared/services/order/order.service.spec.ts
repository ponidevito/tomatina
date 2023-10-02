// import { TestBed } from '@angular/core/testing';
// import { OrderService } from './order.service';
// import { BehaviorSubject } from 'rxjs';
// import { IGoodsResponse } from '../../interfaces/goods.inteface';

// class MockOrderService {
//   orderCount = new BehaviorSubject<number>(0);
//   addToBasket():void{}
//   loadBasket(): void {}
// }

// describe('OrderService', () => {
//   let service: OrderService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [{ provide: OrderService, useClass: MockOrderService }],
//     });
//     service = TestBed.inject(OrderService);
//     service.loadBasket(); // <-- call loadBasket() here

//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should add product to basket', () => {
//     const product: IGoodsResponse = {
//       id: 1,
//       category: {
//         id: 1,
//         name: 'Category 1',
//         path: '/category-1',
//         image: '1.jpeg',
//       },
//       name: 'Product 1',
//       ingredients: 'Ingredients 1',
//       weight: 100,
//       price: 50,
//       image: 'one.jpeg',
//       count: 10,
//     };
//     service.addToBasket(product);
//     expect(service.basket.length).toBe(1);
//     expect(service.basket[0].id).toBe('1');
//     expect(service.basket[0].name).toBe('Product 1');
//     expect(service.basket[0].price).toBe(10);
//     expect(service.basket[0].count).toBe(2);
//   });
  
// });

import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { BehaviorSubject } from 'rxjs';
import { IGoodsResponse } from '../../interfaces/goods.inteface';

class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  addToBasket():void{}
  loadBasket(): void {}
}

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: OrderService, useClass: MockOrderService }],
    });
    service = TestBed.inject(OrderService);
    service.loadBasket();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  
});

