import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    // private orderService: OrderService,
    private goodsService: GoodsService,
    public orderService: OrderService
  ) {}

  public product: IGoodsResponse = {
    id: '',
    name: '',
    ingredients: '',
    addInfo: '',
    category: {
      id: '',
      name: '',
      path: '',
      image: '',
    },
    price: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    weight: 0,
    image: '',
    count: 1,
  };

  public categoryName!: string;

  // breadcrumb
  public category!: string;
  breadcrumbItems = [
    { label: 'Головна', path: '/' },
    { label: this.getCategoryLabel(), path: '/category-menu/' + this.category },
    // { label: 'Рол Тижня', path: '/акції/рол-тижня' },
  ];

  ngOnInit(): void {
    // this.spinnerService.show(); // show spinner
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.loadGoods();
    this.loadGoodsCategory();
  }

  loadGoods(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.category = params['category'];
      this.breadcrumbItems = [
        { label: 'Головна', path: '/' },
        {
          label: this.getCategoryLabel(),
          path: '/category-menu/' + this.category,
        },
        { label: 'Рол Тижня', path: '/акції/рол-тижня' },
      ];

      this.goodsService.getOneFirebase(id).subscribe((data) => {
        this.product = { ...data, id: data['id'].toString() } as IGoodsResponse;
        // this.spinnerService.hide(); // show spinner
      });
    });
  }

  public goodsArray: Array<IGoodsResponse> = [];

  loadGoodsCategory(): void {
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

  getCategoryLabel(): string {
    if (this.category === 'healthy') {
      return 'healthy';
    } else if (this.category === 'special-edition') {
      return 'SPECIAL-EDITION';
    } else if (this.category === 'seti') {
      return 'Сети';
    } else if (this.category === 'combo') {
      return 'Комбо';
    } else if (this.category === 'snidanky') {
      return 'Сніданки';
    } else if (this.category === 'salaty-pasty') {
      return 'Салати пасти';
    } else if (this.category === 'salat-boul') {
      return 'Салати боули';
    } else if (this.category === 'salaty') {
      return 'Салати';
    } else if (this.category === 'fresh-rol') {
      return 'Фреш-рол';
    } else if (this.category === 'supy') {
      return 'Супи';
    } else if (this.category === 'zapikanky') {
      return 'Запіканки';
    } else if (this.category === 'deserty') {
      return 'Десерти';
    } else if (this.category === 'smuzi') {
      return 'Смузі';
    } else if (this.category === 'drinks') {
      return 'Напої';
    } else {
      return '';
    }
  }

  // method count products
  productCount(product: IGoodsResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  // add to basket
  addToBasket(product: IGoodsResponse): void {
    this.orderService.addToBasket(product);
  }

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
}
