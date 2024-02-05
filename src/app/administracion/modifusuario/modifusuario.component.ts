import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesPropias } from '../../validaciones-propias';
import { Router } from '@angular/router';
import { SignupService } from '../../servicios/singup/signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modifusuario',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,HttpClientModule],
  templateUrl: './modifusuario.component.html',
  styleUrl: './modifusuario.component.css',
  providers: [SignupService],

})
export class ModifusuarioComponent {
  constructor(private ruta: Router, private authService: SignupService) { }
  resultado = '';

  formularioContacto = new FormGroup({
    DNI: new FormControl('', [Validators.required, ValidacionesPropias.formatoDNI]),
    nombre: new FormControl('', [Validators.required, Validators.pattern("[A-Z]*"), Validators.maxLength(20)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.maxLength(4)]),
    sexo: new FormControl('s/n'),
    administrador: new FormControl(''),
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

  edadMenorA16(): boolean {
    const edadControl = this.formularioContacto.get('edad');
    if (edadControl && edadControl.value) {
      const edad = +edadControl.value;
      return edad < 16;
    }
    return false;
  }


  submit(event: Event) {
    event.preventDefault();
    if (this.formularioContacto.valid) {
      const userData = this.formularioContacto.value; 
      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Modificacion exitosa', response);
          alert('¡Modificacion exitosa!');
          // this.ruta.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al modificar el usuario', error);
          this.resultado = 'Error al modificar el usuario. Por favor, inténtelo de nuevo.';
        }
      });
    } else {
      console.error('El formulario no es válido');
      this.resultado = 'Por favor, completa el formulario correctamente.';
    }
  }
  volverAlDashboard() {
    this.ruta.navigate(['/dashboard']);
  }
}
