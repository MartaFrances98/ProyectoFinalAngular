import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
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



 }
