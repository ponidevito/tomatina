import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { CategoryService } from '../../shared/services/category/category.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  subscription: Subscription;
  selectedCategory: string = 'special-edition';

  
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public orderService: OrderService,
    public categoryService: CategoryService,
    private titleService: Title

  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
    });
    this.subscription = new Subscription(); // Це можна винести в окремий рядок

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
    this.subscription = this.categoryService.selectedCategory$.subscribe((category: string) => {
      this.selectedCategory = category;
      // Отримано нову категорію - виконати додаткові дії тут
    });
    this.titleService.setTitle('Tomatina');

  }
  
  changeTitle() {
    // Змінюємо тайтл сторінки при виклику цього методу
    this.titleService.setTitle('Tomatina');
  }
  // This method downloads products from the server that match a specific category.
  loadGoods(): void {
    this.goodsService.getAllFirebase().subscribe((data) => {
      this.goodsArray = data as IGoodsResponse[];
      // this.spinnerService.hide(); // show spinner
    });
  }


  
  onMenuSelect(category: string) {
    this.categoryService.setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category); // Зберегти значення в localStorage

    
  }

  public isExpanded = false;

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }


  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


}
