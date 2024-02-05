import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { InicioComponent } from './inicio/inicio.component';
// import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsertusuarioComponent } from './administracion/insertusuario/insertusuario.component';
import { ModifusuarioComponent } from './administracion/modifusuario/modifusuario.component';
import { ElimiusuarioComponent } from './administracion/elimiusuario/elimiusuario.component';



export const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'signup',
  //   component: SignupComponent
  // },
   {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'insertusuario',
    component: InsertusuarioComponent
  },
  {
    path: 'modifusuario',
    component: ModifusuarioComponent
  },
  {
    path: 'elimiusuario',
    component: ElimiusuarioComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  },

];
