import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CabinetUserComponent } from '../../pages/cabinet/cabinet-user/cabinet-user.component';
import { OrdersHistoryComponent } from '../../pages/cabinet/orders-history/orders-history.component';
import { ChangePasswordComponent } from '../../pages/cabinet/change-password/change-password.component';
import { CabinetComponent } from 'src/app/pages/cabinet/cabinet.component';



const routes: Routes = [
  { path: '', component: HeaderComponent},
  {
    path: '',
    component: CabinetComponent,
    children: [
      { path: 'user', component: CabinetUserComponent },
      { path: 'order-history', component: OrdersHistoryComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];




@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class HeaderRoutingModule {}