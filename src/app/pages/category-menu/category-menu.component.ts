import { Component, HostListener, OnDestroy,OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { CookieService } from 'ngx-cookie-service';
import { IMenu } from 'src/app/shared/interfaces/menu-select.interface';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CategoryService } from '../../shared/services/category/category.service';


@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent implements OnInit,OnDestroy {
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cookieService: CookieService,
    public categoryService: CategoryService,

    
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
      // this.selectFilter('Соуси');
    });

    this.categoryService.getSelectedCategory().subscribe((selectedCategory: string) => {
      // Отримано оновлену категорію
      this.selectedCategory = selectedCategory;
      this.selectedCategoryControl.setValue(selectedCategory);
      // Викликати інші методи або логіку, яку вам потрібно виконати після отримання нової категорії
    });
  }



  private eventSubscription!: Subscription;

  // array products
  public goodsArray: Array<IGoodsResponse> = [];

  // category name
  public categoryName!: string;

  ngOnInit(): void {
    this.loadGoods();
    const selectedCategoryValue = this.selectedCategoryControl.value;

    if (selectedCategoryValue !== null) {
      this.changeSelectedCategory(selectedCategoryValue); // Викличте зміну значення
  
      // Решта вашого коду
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
        // this.selectFilter('Соуси');
        // this.spinnerService.hide();
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
  public productCount(product: IGoodsResponse, value: boolean): void {
    const index = this.goodsArray.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      if (value) {
        ++this.goodsArray[index].count;
      } else if (!value && this.goodsArray[index].count > 1) {
        --this.goodsArray[index].count;
      }
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
    // {
    //   value: 'special-edition',
    //   viewValue: 'Special Edition',
    // },
    { value: 'special-edition', viewValue: 'Special Edition' },
    { value: 'healthy', viewValue: 'Healthy & tasty menu' },
    { value: '13:01 - 13:11', viewValue: '13:01 - 13:11' },
    { value: '13:11 - 13:21', viewValue: '13:11 - 13:21' },
    { value: '13:21 - 13:31', viewValue: '13:21 - 13:31' },
    { value: '13:31 - 13:41', viewValue: '13:31 - 13:41' },
    { value: '14:01 - 14:11', viewValue: '14:01 - 14:11' },
  ];


  onCategorySelect(event: MatSelectChange) {
    const route = event.value;
    console.log('Обрана категорія:', route);
    console.log('Обрана категорія FormControl:', this.selectedCategoryControl.value);
    this.selectedCategoryControl.setValue(route); // Оновіть значення у FormControl
    this.router.navigate(['/category-menu', route]);
  }

  selectedCategory: string = 'special-edition';
  changeSelectedCategory(category: string) {
    this.selectedCategoryControl.setValue(category);
  }




  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
