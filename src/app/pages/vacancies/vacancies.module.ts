import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from '../vacancies/vacancies.component';
import { VacanciesRoutingModule } from '../vacancies/vacancies-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { CashierComponent } from '../vacancies/cashier/cashier.component';
import { SaladComponent } from './salad/salad.component';
import { KuharLiniyiVydachiComponent } from './kuhar-liniyi-vydachi/kuhar-liniyi-vydachi.component';
import { KuharVokComponent } from './kuhar-vok/kuhar-vok.component';

@NgModule({
  declarations: [VacanciesComponent, AdministratorComponent, CashierComponent, SaladComponent, KuharLiniyiVydachiComponent, KuharVokComponent],
  imports: [CommonModule, VacanciesRoutingModule, SharedModule],
})
export class VacanciesModule {}
