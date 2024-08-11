import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // base path for auth module
    loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule),
  },
  {
    path: 'auth', // base path for auth module
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: 'dashboard', // base path for auth module
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },

  { path: 'login', redirectTo: '/auth/login', pathMatch: 'full' }, // redirect to login as default
  { path: 'signup', redirectTo: '/auth/signup', pathMatch: 'full' }, // redirect to login as default
  // { path: '**', redirectTo: '/auth/login' }, // wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
