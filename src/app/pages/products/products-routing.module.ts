import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../../pages/products/products.component';
// import { RollsInfoComponent } from './rolls-info/rolls-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
    

  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

  export class ProductsRoutingModule {}