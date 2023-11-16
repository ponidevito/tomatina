import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AdminCategoryComponent } from '../admin/admin-category/admin-category.component';
import { AdminGoodsComponent } from '../admin/admin-goods/admin-goods.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminReviewsComponent } from '../admin/admin-reviews/admin-reviews.component';
import { AdminVacanciesComponent } from '../admin/admin-vacancies/admin-vacancies.component';


const routes: Routes = [
  { path: '', component: AdminComponent, children: [
        { path: 'category', component: AdminCategoryComponent },
        { path: 'goods', component: AdminGoodsComponent },
        { path: 'order', component: AdminOrderComponent },
        { path: 'reviews', component: AdminReviewsComponent },
        { path: 'vacancies', component: AdminVacanciesComponent },
        { path: '', pathMatch: 'full', redirectTo: 'category' }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
