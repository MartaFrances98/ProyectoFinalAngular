import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HttpClientModule,RouterOutlet, RouterLink, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  nombre: string = 'empresa marta francés';
  
  constructor(private router: Router, private route: ActivatedRoute) {}
  navigate(path: string) {
    const currentPath = this.route.snapshot.children[0]?.url[0]?.path;
    if (currentPath === path) {
      // Si el path actual es igual al del botón, navega a '/inicio'
      this.router.navigateByUrl('/inicio');
    } else {
      this.router.navigate([`/inicio/${path}`]);
    }
  }
}
