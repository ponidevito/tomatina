import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';

const routes: Routes = [
    { path: '', component: CategoryMenuComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryMenuRoutingModule {}
