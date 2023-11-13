import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from '../../pages/cabinet/cabinet.component';
import { CabinetUserComponent } from '../../pages/cabinet/cabinet-user/cabinet-user.component';
import { OrdersHistoryComponent } from '../../pages/cabinet/orders-history/orders-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
    {
      path: '',
      component: CabinetComponent, children: [
        { path: 'user', component: CabinetUserComponent },
        { path: 'order-history', component: OrdersHistoryComponent },
        { path: 'change-password', component: ChangePasswordComponent },
    ],

  
  }];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CabinetRoutingModule {}