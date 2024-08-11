import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule),
  },
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  { path: 'login', redirectTo: '/auth/login', pathMatch: 'full' }, 
  { path: 'signup', redirectTo: '/auth/signup', pathMatch: 'full' },
  { path: '**', redirectTo: '' }, // wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
