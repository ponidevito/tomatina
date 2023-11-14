import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  OfertaRoutingModule } from '../oferta/oferta-routing.module';
import { OfertaComponent } from '../oferta/oferta.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    OfertaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OfertaRoutingModule
  ]
})
export class OfertaModule { }
