import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent {
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cookieService: CookieService
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
      // this.selectFilter('Соуси');
    });
  }

  private eventSubscription!: Subscription;

  // array products
  public goodsArray: Array<IGoodsResponse> = [];

  // category name
  public categoryName!: string;

  ngOnInit(): void {
    this.loadGoods();

    // // Перевірити наявність збереженого стану корзини в localStorage
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

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
