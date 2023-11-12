import { Component, HostListener, OnDestroy,OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { CookieService } from 'ngx-cookie-service';
import { IMenu } from 'src/app/shared/interfaces/menu-select.interface';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CategoryService } from '../../shared/services/category/category.service';
import { FavoriteService } from '../../shared/services/favorite/favorite.service';



@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent implements OnInit,OnDestroy {

  favorites$: Observable<any[]> = new Observable<any[]>; // Значення за замовчуванням
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cookieService: CookieService,
    public categoryService: CategoryService,
    public FavoriteService: FavoriteService,


    
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
    this.favorites$ = this.FavoriteService.getAllFirebase();
    // if (selectedCategoryValue !== null) {
    //   this.changeSelectedCategory(selectedCategoryValue); // Викличте зміну значення

    //   // Решта вашого коду
    // }
    this.clickedProducts = new Set<string | number>();

    this.loadFavoriteGoods()
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      const favoritesArray = JSON.parse(favoritesString);
      this.clickedProducts = new Set(favoritesArray);
    }


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
    { value: 'drinks', viewValue: 'Напої' }
  ];


  onCategorySelect(event: MatSelectChange) {
    const route = event.value;
    console.log('Обрана категорія:', route);
    console.log('Обрана категорія FormControl:', this.selectedCategoryControl.value);
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

  isClicked: boolean = false;
  // у вашому компоненті
  clickedProducts: Set<string | number> = new Set<string | number>();



public favoritesGoods: Array<IGoodsResponse> = [];;


// addToFavorites(product: any) {
//   if (this.clickedProducts.has(product.id)) {
//     this.FavoriteService.deleteFirebase(product.id as string).then(() => {
//       this.clickedProducts.delete(product.id);  // Видаляємо id з колекції при видаленні
//       this.loadFavoriteGoods();
//       // this.toastService.success('Продукт видалений');
//     });
//     console.log('видалено з улюбленого:', product);
//   } else {
//     this.FavoriteService.createFirebase(product);
//     this.clickedProducts.add(product.id);  // Додаємо id до колекції при додаванні
//     console.log('Додано до улюбленого:', product);
//   }
// }



addToFavorites(product: any) {
  this.isClicked = this.clickedProducts.has(product.id);

  if (this.isClicked) {
    // this.FavoriteService.deleteFirebase(product.id as string).then(() => {
    //   this.clickedProducts.delete(product.id);
    //   // this.toastService.success('Продукт видалений');
    // });
    this.delete(product.id)
    console.log('видалено з улюбленого:', product);
  } else {
    this.FavoriteService.createFirebase(product).then(() => {
      this.clickedProducts.add(product.id);
      localStorage.setItem('favorites', JSON.stringify(Array.from(this.clickedProducts)))
      // this.toastService.success('Продукт додано до улюбленого');
    });
    console.log('Додано до улюбленого:', product);
  }

  this.loadFavoriteGoods();  // Включив виклик тут
}



saveDataToLocalStorage(): void {
  localStorage.setItem('favorites', JSON.stringify(Array.from(this.clickedProducts)));
}


async delete(productId: string) {
  try {
    console.log('Спроба видалення продукта з ID:', productId);
    await this.FavoriteService.deleteFirebase(productId);
    this.clickedProducts.delete(productId);
    console.log('видалено з улюбленого за ID:', productId);
    await this.loadFavoriteGoods();

    // Збереження улюблених продуктів та стану кнопок в Local Storage
    this.saveDataToLocalStorage();
  } catch (error) {
    console.error('Помилка при видаленні з улюблених товарів:', error);
  }
}



// Додавання або видалення з Local Storage







loadFavoriteGoods(): void {
  this.FavoriteService.getAllFirebase().subscribe((data) => {
    this.favoritesGoods = data as IGoodsResponse[];
    console.log(data)
  });
}




  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
