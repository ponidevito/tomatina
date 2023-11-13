import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRoutingModule } from '../../pages/delivery/delivery-routing.module';
import { DeliveryComponent } from '../../pages/delivery/delivery.component';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    DeliveryComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule
  ]
})
export class DeliveryModule { }
