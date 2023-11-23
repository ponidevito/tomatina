import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { IMenu } from 'src/app/shared/interfaces/menu-select.interface';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CategoryService } from '../../shared/services/category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent implements OnInit, OnDestroy {
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    public categoryService: CategoryService,
    private spinnerService: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
    });

    this.categoryService
      .getSelectedCategory()
      .subscribe((selectedCategory: string) => {
        this.selectedCategory = selectedCategory;
        this.selectedCategoryControl.setValue(selectedCategory);
      });
  }

  private eventSubscription!: Subscription;

  // array products
  public goodsArray: Array<IGoodsResponse> = [];

  // category name
  public categoryName!: string;

  ngOnInit(): void {
    this.loadGoods();
    this.spinnerService.show(); // show spinner

    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      this.selectedCategory = savedCategory;
      this.changeSelectedCategory(this.selectedCategory);
    }

    // Перевірити наявність збереженого стану корзини в localStorage
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      const basketItems = JSON.parse(savedBasket);
      this.orderService.setCartItems(basketItems);
      this.orderService.showCartIcon();
    } else {
      if (this.orderService.count > 0) {
        this.orderService.showCartIcon();
      } else {
        this.orderService.hideCartIcon();
      }
    }
  }

  // This method downloads products from the server that match a specific category.
  loadGoods(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.categoryName = params['category'];
          return this.goodsService.getAllByCategoryFirebase(this.categoryName);
        })
      )
      .subscribe((data) => {
        this.goodsArray = data as IGoodsResponse[];
        this.spinnerService.hide();
      });
  }

  proteins: number = 45;
  fats: number = 48;
  carbohydrates: number = 33;

  // calulator calories
  calculateCalories(
    proteins: number,
    fats: number,
    carbohydrates: number
  ): number {
    const proteinCalories = proteins * 4;
    const fatCalories = fats * 9;
    const carbohydrateCalories = carbohydrates * 4;
    const totalCalories = proteinCalories + fatCalories + carbohydrateCalories;
    return totalCalories;
  }

  // method count products
  // public productCount(product: IGoodsResponse, value: boolean): void {
  //   const index = this.goodsArray.findIndex((p) => p.id === product.id);
  //   if (index !== -1) {
  //     if (value) {
  //       ++this.goodsArray[index].count;
  //     } else if (!value && this.goodsArray[index].count > 1) {
  //       --this.goodsArray[index].count;
  //     }
  //   }
  // }

  public productCount(product: IGoodsResponse, increment: boolean): void {
    const index = this.goodsArray.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const newCount = increment ? this.goodsArray[index].count + 1 : Math.max(this.goodsArray[index].count - 1, 1);
      this.goodsArray[index].count = newCount;
  
      // Оновлення Angular Change Detection
      this.cdr.detectChanges();
    }
  }

  // add to basket

  addToBasket(product: IGoodsResponse): void {
    this.orderService.addToBasket(product);

    if (this.orderService.count > 0) {
      this.orderService.showCartIcon();
    } else {
      this.orderService.hideCartIcon();
    }

    // Зберегти стан корзини в localStorage
    localStorage.setItem(
      'basket',
      JSON.stringify(this.orderService.getCartItems())
    );
  }

  selectedCategoryControl = new FormControl('special-edition');

  menu: IMenu[] = [
    { value: 'special-edition', viewValue: 'Special Edition' },
    { value: 'healthy', viewValue: 'Healthy & tasty menu' },
    { value: 'combo', viewValue: 'Комбо меню' },
    { value: 'snidanky', viewValue: 'Сніданки' },
    { value: 'salaty-pasty', viewValue: 'Салати пасти' },
    { value: 'salat-boul', viewValue: 'Салат боули' },
    { value: 'salaty', viewValue: 'Салати' },
    { value: 'fresh-rol', viewValue: 'Фреш-роли' },
    { value: 'supy', viewValue: 'Супи' },
    { value: 'zapikanky', viewValue: 'Запіканки' },
    { value: 'deserty', viewValue: 'Десерти' },
    { value: 'smuzi', viewValue: 'Смузі' },
    { value: 'drinks', viewValue: 'Напої' },
  ];

  onCategorySelect(event: MatSelectChange) {
    const route = event.value;
    console.log('Обрана категорія:', route);
    console.log(
      'Обрана категорія FormControl:',
      this.selectedCategoryControl.value
    );
    this.selectedCategoryControl.setValue(route); // Оновіть значення у FormControl
    localStorage.setItem('selectedCategory', route); // Зберегти значення в localStorage

    this.router.navigate(['/category-menu', route]);
  }

  selectedCategory: string = 'special-edition';

  changeSelectedCategory(category: string) {
    this.selectedCategory = category;
    this.selectedCategoryControl.setValue(category);
    localStorage.setItem('selectedCategory', category); // Зберегти значення в localStorage
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
