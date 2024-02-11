import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsertusuarioComponent } from './administracionusuarios/insertusuario/insertusuario.component';
import { ModifusuarioComponent } from './administracionusuarios/modifusuario/modifusuario.component';
import { AdministracionusuariosComponent } from './administracionusuarios/administracionusuarios.component';
import { MapaComponent } from './inicio/mapa/mapa.component';
import { SobrenosotrosComponent } from './inicio/sobrenosotros/sobrenosotros.component';


export const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },  {
    path: 'inicio',
    component: InicioComponent,
    children: [
      {
        path: 'mapa',
        component: MapaComponent
      },
      {
        path: 'sobre-nosotros',
        component: SobrenosotrosComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
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
    path: 'administracionusuarios',
    component: AdministracionusuariosComponent
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
