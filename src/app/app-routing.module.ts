import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
    path: 'home',
    loadChildren: () =>
      import('../app/pages/home/home.module').then(
        (m) => m.HomeModule
      ),
  },

  {
    path: 'category-menu/:category',
    loadChildren: () =>
      import('../app/pages/category-menu/category-menu.module').then((m) => m.CategoryMenuModule),
  },

  {
    path: 'checkout',
    loadChildren: () =>
      import('../app/pages/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: 'delivery',
    loadChildren: () =>
      import('../app/pages/delivery/delivery.module').then(
        (m) => m.DeliveryModule
      ),
  },
  {
    path: 'donatymo-razom',
    loadChildren: () =>
      import('../app/pages/donatymo-razom/donatymo-razom.module').then(
        (m) => m.DonatymoRazomModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../app/pages/contact/contact.module').then(
        (m) => m.ContactModule
      ),
  },
  {
    path: 'oferta',
    loadChildren: () =>
      import('../app/pages/oferta/oferta.module').then(
        (m) => m.OfertaModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../app/pages/about/about.module').then(
        (m) => m.AboutModule
      ),
  },
  {
    path: 'vacancies',
    loadChildren: () =>
      import('../app/pages/vacancies/vacancies.module').then(
        (m) => m.VacanciesModule
      ),
  },
  {
    path: 'my-cabinet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/components/header/header.module').then(
        (m) => m.HeaderModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('../app/shared/modals/registration/registration.module').then(
        (m) => m.RegistrationModule
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
