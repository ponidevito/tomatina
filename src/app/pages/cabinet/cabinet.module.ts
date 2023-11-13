import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from '../../pages/cabinet/cabinet.component';
import { CabinetUserComponent } from '../../pages/cabinet/cabinet-user/cabinet-user.component';
import { OrdersHistoryComponent } from '../../pages/cabinet/orders-history/orders-history.component';
import { CabinetRoutingModule } from '../../pages/cabinet/cabinet-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    CabinetComponent,
    CabinetUserComponent,
    OrdersHistoryComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
