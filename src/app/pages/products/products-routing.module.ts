import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
// import { RollsComponent } from './rolls.component';
// import { RollsInfoComponent } from './rolls-info/rolls-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
    {
      path: ':id',
    //   component: RollsInfoComponent,
    },
  ];