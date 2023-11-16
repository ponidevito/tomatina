import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from '../vacancies/vacancies.component';
import { AdministratorComponent } from '../vacancies/administrator/administrator.component';

const routes: Routes = [
  {
    path: '',
    component: VacanciesComponent,
  },

  {
    path: ':id',
    component: AdministratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacanciesRoutingModule {}
