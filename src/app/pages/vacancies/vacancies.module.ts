import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from '../vacancies/vacancies.component';
import { VacanciesRoutingModule } from '../vacancies/vacancies-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdministratorComponent } from './administrator/administrator.component';

@NgModule({
  declarations: [VacanciesComponent, AdministratorComponent],
  imports: [CommonModule, VacanciesRoutingModule, SharedModule],
})
export class VacanciesModule {}
