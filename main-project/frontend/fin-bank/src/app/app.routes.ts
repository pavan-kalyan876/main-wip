import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "register", loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent) },
  { path: "login", loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
];
