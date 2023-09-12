import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    // private orderService: OrderService,
    private goodsService: GoodsService,
    // private spinnerService: NgxSpinnerService
  ) {}

  public product: IGoodsResponse = {
    id: '',
    name: '',
    ingredients: '',
    category: {
      id: '',
      name: '',
      path: '',
      image: '',
    },
    price: 0,
    proteins: 0,
    fats:0,
    carbohydrates:0,
    image: '',
    count: 1,
  };

    // breadcrumb
    public category!: string;
    breadcrumbItems = [
      { label: 'Головна', path: '/' },
      { label: this.getCategoryLabel(), path: '/category-menu/' + this.category },
      // { label: 'Рол Тижня', path: '/акції/рол-тижня' },
    ];

    ngOnInit(): void {
      // this.spinnerService.show(); // show spinner
      this.loadGoods();
    }

    loadGoods(): void {
      this.activatedRoute.params.subscribe((params) => {
        const id = params['id'];
        this.category = params['category'];
        this.breadcrumbItems = [
          { label: 'Головна', path: '/' },
          { label: this.getCategoryLabel(), path: '/category-menu/' + this.category },
          { label: 'Рол Тижня', path: '/акції/рол-тижня' },
        ];
  
        this.goodsService.getOneFirebase(id).subscribe((data) => {
          this.product = { ...data, id: data['id'].toString() } as IGoodsResponse;
          // this.spinnerService.hide(); // show spinner
        });
      });
    }

    getCategoryLabel(): string {
      if (this.category === 'healthy') {
        return 'healthy';
      } else if (this.category === 'drinks') {
        return 'Напої';
      } else if (this.category === 'socues') {
        return 'healhy';
      } else if (this.category === 'seti') {
        return 'Сети';
      } else {
        return '';
      }
    }

}
