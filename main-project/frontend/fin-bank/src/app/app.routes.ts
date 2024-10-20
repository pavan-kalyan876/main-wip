import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register/register.component';


export const routes: Routes = [
 // { path: "register", loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent) },
  { path: "register", component: RegisterComponent }
];
