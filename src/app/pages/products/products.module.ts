import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../../pages/products/products.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from '../../pages/products/products-routing.module';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
