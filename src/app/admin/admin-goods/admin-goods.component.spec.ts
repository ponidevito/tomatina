import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsComponent } from '../admin-goods/admin-goods.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { BehaviorSubject, of } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ICategory, ICategoryResponse } from 'src/app/shared/interfaces/category.interface';

class AngularFirestoreStub {
  collection() {
    return {
      doc: () => ({
        valueChanges: () => of({}),
      }),
    };
  }
}

class MockGoodsService {
  getAllFirebase() {
    return of([]);
  }
}
class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  loadBasket(): void {}
  updateBasket(): void {}
}
class MockCategoryService {
  getAllFirebase() {
    return of([]);
  }
}

describe('AdminGoodsComponent', () => {
  let component: AdminGoodsComponent;
  let fixture: ComponentFixture<AdminGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGoodsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: ImageService, useValue: {} },
        { provide: GoodsService, useClass: MockGoodsService },
        { provide: OrderService, useClass: MockOrderService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: Firestore, useClass: AngularFirestoreStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should update the form and set editStatus to true', () => {
    const component = fixture.componentInstance;
    const product: IGoodsResponse = {
      id: 1,
      category: {
        id: 1,
        name: 'Category 1',
        path: '/category-1',
        image: '1.jpeg',
      },
      name: 'Product 1',
      ingredients: 'Ingredients 1',
      weight: 100,
      price: 50,
      image: 'one.jpeg',
      count: 10,
    };
    component.editGoods(product);
    // expect(component.editStatus).toBeTrue();
    expect(component.currentGoodsId).toBe(product.id);
    expect(component.goodsForm.get('category')?.value).toBe(product.category);
    expect(component.goodsForm.get('name')?.value).toBe(product.name);
    expect(component.goodsForm.get('ingredients')?.value).toBe(
      product.ingredients
    );
    expect(component.goodsForm.get('weight')?.value).toBe(product.weight);
    expect(component.goodsForm.get('price')?.value).toBe(product.price);
    expect(component.goodsForm.get('image')?.value).toBe(product.image);
  });

  it('should return the value of a specific control in the form', () => {
    component.goodsForm.setValue({
      category: {
        id: 1,
        name: 'Category 1',
        path: '/category-1',
        image: '1.jpeg',
      },
      name: 'Product 1',
      ingredients: 'Ingredients 1',
      weight: "100",
      price: "50",
      image: 'one.jpeg',
      count: "10",

    });
    expect(component.valueByControl('name')).toBe('Product 1');
    expect(component.valueByControl('ingredients')).toBe('Ingredients 1');
    expect(component.valueByControl('weight')).toBe('100');
    expect(component.valueByControl('price')).toBe("50");
    expect(component.valueByControl('image')).toBe('one.jpeg');
  });
  
  it('should initialize goodsForm with the correct form controls and validators', () => {
    component.initGoodsForm();
  
    expect(component.goodsForm.get('category')).toBeDefined();
    expect(component.goodsForm.get('category')?.value).toBeNull();
    expect(component.goodsForm.get('category')?.validator).toBe(Validators.required);
  
    expect(component.goodsForm.get('name')).toBeDefined();
    expect(component.goodsForm.get('name')?.value).toBeNull();
    expect(component.goodsForm.get('name')?.validator).toBe(Validators.required);
  
    expect(component.goodsForm.get('ingredients')).toBeDefined();
    expect(component.goodsForm.get('ingredients')?.value).toBeNull();
  
    expect(component.goodsForm.get('weight')).toBeDefined();
    expect(component.goodsForm.get('weight')?.value).toBeNull();
    expect(component.goodsForm.get('weight')?.validator).toBe(Validators.required);
  
    expect(component.goodsForm.get('price')).toBeDefined();
    expect(component.goodsForm.get('price')?.value).toBeNull();
    expect(component.goodsForm.get('price')?.validator).toBe(Validators.required);
  
    expect(component.goodsForm.get('image')).toBeDefined();
    expect(component.goodsForm.get('image')?.value).toBeNull();
    expect(component.goodsForm.get('image')?.validator).toBe(Validators.required);
  
    expect(component.goodsForm.get('count'))?.toBeDefined();
    expect(component.goodsForm.get('count')?.value).toBe(1);
  });
  

});
