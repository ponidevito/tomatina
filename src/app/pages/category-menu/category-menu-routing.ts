import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
    { path: '', component: CategoryMenuComponent },
    {
      path: ':id',
      component: ProductInfoComponent,
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryMenuRoutingModule {}
