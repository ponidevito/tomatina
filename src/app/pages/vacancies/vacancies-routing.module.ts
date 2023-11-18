import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from '../vacancies/vacancies.component';
import { AdministratorComponent } from '../vacancies/administrator/administrator.component';
import { CashierComponent } from '../vacancies/cashier/cashier.component';
import { SaladComponent } from '../vacancies/salad/salad.component';
import { KuharLiniyiVydachiComponent } from '../vacancies/kuhar-liniyi-vydachi/kuhar-liniyi-vydachi.component';
import { KuharVokComponent } from '../vacancies/kuhar-vok/kuhar-vok.component';




const routes: Routes = [
  {
    path: '',
    component: VacanciesComponent,
  },

  {
    path: 'administrator',
    component: AdministratorComponent,
  },

  {
    path: 'cashier',
    component: CashierComponent,
  },

  {
    path: 'salad',
    component: SaladComponent,
  },

  {
    path: 'kuhar-liniyi-vydachi',
    component: KuharLiniyiVydachiComponent,
  },

  {
    path: 'kuhar-vok',
    component: KuharVokComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacanciesRoutingModule {}
