import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink, ReactiveFormsModule] ,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  estaAutenticado = false; // Actualiza esto según el estado de autenticación de tu usuario

  mostrarSidebar = false; // Controla la visibilidad del sidebar


  constructor( private router: Router) { 
    // Escucha los cambios de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es la del dashboard
        this.estaAutenticado = event.urlAfterRedirects === '/dashboard';
      }
    });
    
  }
  toggleSidebar(): void {
    this.mostrarSidebar = !this.mostrarSidebar;
    
  }
//   logOut() {
//     // Borrar el token de autenticación
//     sessionStorage.removeItem('token');
//     // Redirigir al usuario al inicio
//     this.router.navigate(['/inicio']);
// }
}
