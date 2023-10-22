import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from '../../pages/checkout/checkout-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
