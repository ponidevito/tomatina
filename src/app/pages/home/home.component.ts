import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public orderService: OrderService,

  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
    });
  }

  private eventSubscription!: Subscription;

  // array products
  public goodsArray: Array<IGoodsResponse> = [];

  // category name
  public categoryName!: string;

  ngOnInit(): void {
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.loadGoods();
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
  // loadGoods(): void {
  //   this.goodsService.getAllFirebase().subscribe((data) => {
  //     this.goodsArray = data as IGoodsResponse[];
  //     this.selectFilter('Соуси');
  //     // this.spinnerService.hide(); // show spinner
  //   });
  // }


  
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
        // this.spinnerService.hide();
      });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


}
