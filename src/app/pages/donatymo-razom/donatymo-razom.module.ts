import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatymoRazomRoutingModule } from '../donatymo-razom/donatymo-razom-routing.module';
import { DonatymoRazomComponent } from '../donatymo-razom/donatymo-razom.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    DonatymoRazomComponent
  ],
  imports: [
    CommonModule,
    DonatymoRazomRoutingModule,
    SharedModule
  ]
})
export class DonatymoRazomModule { }
