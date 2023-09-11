import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/shared/modals/login/login.module').then(
        (m) => m.LoginModule
      ),
  },


  {
    path: 'category-menu/:category',
    loadChildren: () =>
      import('../app/pages/category-menu/category-menu.module').then((m) => m.CategoryMenuModule),
  },
  // {
  //   path: 'product/:category',
  //   loadChildren: () =>
  //     import('../app/pages/category-menu/category-menu.module').then((m) => m.CategoryMenuModule),
  // },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/pages/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
    { path: '', pathMatch: 'full', redirectTo: 'home' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
