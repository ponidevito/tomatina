import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent {
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
   
    // this.selectFilter('Соуси');
  }

  // This method downloads products from the server that match a specific category.
  // loadGoods(): void {
  //   this.goodsService.getAllFirebase().subscribe((data) => {
  //     this.goodsArray = data as IGoodsResponse[];
  //     // this.selectFilter('Соуси');
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
        // this.selectFilter('Соуси');
        // this.spinnerService.hide();
      });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  // filtered array
  // public filteredData: Array<IGoodsResponse> = [];

  // initialize the variable with "All" value
  // selected: string = 'Соуси';


}
