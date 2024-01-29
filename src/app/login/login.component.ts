import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombre = '';
  email = '';
  password = '';
  resultado = '';

  constructor(private router: Router) {}

  submit() {
    this.resultado = "Formulario enviado";
    this.router.navigate(['/dashboard']);
  }
  
}
