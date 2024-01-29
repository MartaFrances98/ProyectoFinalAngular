import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesPropias } from '../validaciones-propias';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent  {
  constructor(private ruta: Router) { }
  resultado = '';

  formularioContacto = new FormGroup({
    DNI: new FormControl('', [Validators.required, ValidacionesPropias.formatoDNI]),
    nombre: new FormControl('', [Validators.required, Validators.pattern("[A-Z]*"), Validators.maxLength(20)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    sexo: new FormControl('s/n'),
    horario: new FormControl('Mañana'),
    edad: new FormControl('', [Validators.min(10), Validators.max(85)]),
    test: new FormGroup({
      pregunta1: new FormControl(''),
      pregunta2: new FormControl(''),
      pregunta3: new FormControl('')
    })

  });

  verEdad(edad: any) {
    return parseInt(edad.value)
  }
  

  submit(event: Event) {
    event.preventDefault();
    this.ruta.navigate([`/login`])
    alert('¡Registro exitoso!');
  }
 
}