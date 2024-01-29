import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { InicioComponent } from './inicio/inicio.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export const routes: Routes = [
{
    path: '',
    component: InicioComponent
},
{
    path: 'inicio',
    component: InicioComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
    path: 'signup',
    component: SignupComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},

{
  path: 'error',
  component: ErrorComponent
},
{
  path: '**',
  redirectTo: 'error'
}
];
