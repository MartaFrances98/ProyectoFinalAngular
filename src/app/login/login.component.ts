import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule,LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService],
})

export class LoginComponent {
  loading = false;
  email = '';
  pass = '';
  resultado = '';

  constructor(private router: Router, private authService: LoginService) { }

  submit() {
    // Actualiza esta línea para llamar al método login en lugar de navegar directamente
    this.login();
  }

  login() {
    this.loading = true;
    console.log('Email: '+this.email+'  Pass:'+this.pass);
    // Usa las propiedades email y password del componente
    this.authService.login(this.email, this.pass).subscribe(
      data => {
        this.loading = false;
        // Guarda el token y navega al dashboard
        this.saveToken(data.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.loading = false;
        console.error('Error durante el login', error);
        this.resultado = "Error en el login";
      }
    );
  }

  saveToken(token: string) {
    // Guardar el token en una cookie
    document.cookie = `session_token=${token};path=/`;
  }
}
