import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { CategoryMenuRoutingModule } from '../category-menu/category-menu-routing';
import { ProductInfoComponent } from './product-info/product-info.component';




@NgModule({
  declarations: [
    CategoryMenuComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    CategoryMenuRoutingModule,
    SharedModule
  ]
})
export class CategoryMenuModule { }
