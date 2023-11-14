import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonatymoRazomComponent } from '../donatymo-razom/donatymo-razom.component';

const routes: Routes = [
    { path: '', component: DonatymoRazomComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatymoRazomRoutingModule {}
