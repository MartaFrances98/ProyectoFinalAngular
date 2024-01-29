import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarserviceService } from './navbar/sidebar/sidebarservice.service';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, NavbarComponent, FooterComponent]
})
export class AppComponent {
  title = 'proyecto018';
  isSidebarVisible: boolean = false;
  showSidebarToggle: boolean = false;

  constructor(private sidebarservice: SidebarserviceService, private router: Router) { // Nota el cambio aquí, `sidebarservice` con 's' minúscula
    // Escucha los cambios de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es la del dashboard
        this.showSidebarToggle = event.urlAfterRedirects === '/dashboard';
      }
    });
    
  }
  toggleSidebar(): void {
    this.sidebarservice.toggleVisibility(); 
    this.isSidebarVisible = true;
    // Nota el cambio aquí, `sidebarservice` con 's' minúscula
  }

 }
