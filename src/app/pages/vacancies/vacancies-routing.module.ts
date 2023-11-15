import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from '../vacancies/vacancies.component';
// import { CabinetUserComponent } from '../cabinet/cabinet-user/cabinet-user.component';
// import { OrdersHistoryComponent } from '../cabinet/orders-history/orders-history.component';
// import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
    {
      path: '',
      component: VacanciesComponent, children: [
        // { path: 'user', component: CabinetUserComponent },
        // { path: 'order-history', component: OrdersHistoryComponent },
        // { path: 'change-password', component: ChangePasswordComponent },
    ],

  
  }];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class VacanciesRoutingModule {}