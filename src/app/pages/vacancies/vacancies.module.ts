import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from '../vacancies/vacancies.component';
import { VacanciesRoutingModule } from '../vacancies/vacancies-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [VacanciesComponent],
  imports: [CommonModule, VacanciesRoutingModule, SharedModule],
})
export class VacanciesModule {}
