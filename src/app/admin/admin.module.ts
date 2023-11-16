import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { AdminComponent } from '../admin/admin.component';
import { AdminCategoryComponent } from '../admin/admin-category/admin-category.component';
import { AdminGoodsComponent } from '../admin/admin-goods/admin-goods.component';
import { AdminOrderComponent } from '../admin/admin-order/admin-order.component';
import { SharedModule } from '../shared/shared.module';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { AdminVacanciesComponent } from './admin-vacancies/admin-vacancies.component';




@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminGoodsComponent,
    AdminOrderComponent,
    AdminReviewsComponent,
    AdminVacanciesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
