import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
//isSidebarExpanded = true;
  isSidebarVisible = true;
  isHomeCollapsed = true;
  isTipoCollapsed = true;
  isCosasCollapsed = true;
  isFiltrosCollapsed =true;
  admin: boolean = false;

  ngOnInit(){
    if(sessionStorage.getItem('Admin')=='Si'){
      this.admin = true;
    }else{
      this.admin = false;
    }
  }

  constructor( private router: Router) { 
  }

  
  // Métodos para cambiar el estado
  toggleCollapse(section: string) {
    if (section === 'home') {
      this.isHomeCollapsed = !this.isHomeCollapsed;
    } else if (section === 'tipo') {
      this.isTipoCollapsed = !this.isTipoCollapsed;
    } else if (section === 'cosas') {
      this.isCosasCollapsed = !this.isCosasCollapsed;
    }else if (section === 'filtros') {
      this.isFiltrosCollapsed = !this.isFiltrosCollapsed;
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    // this.isSidebarExpanded = !this.isSidebarExpanded;
  } // Cambia la visibilidad

  logOut() {
    // Borrar el token de autenticación
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Admin');
    // Redirigir al usuario al inicio
    this.router.navigate(['/inicio']);
}

}

