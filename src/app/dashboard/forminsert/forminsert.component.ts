import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FormreunionService } from '../../servicios/formreunion/formreunion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forminsert',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './forminsert.component.html',
  styleUrl: './forminsert.component.css',
  providers: [FormreunionService],
})
export class ForminsertComponent {
  citaForm = new FormGroup({
    Nombre: new FormControl(''),
    IdUsuario: new FormControl(''),
    Estado: new FormControl(''),
    Descripccion: new FormControl(''),
    Fecha: new FormControl(''),
    Hora: new FormControl(''),
    Duracion: new FormControl(''),
    Reunion: new FormControl('true'),
    OpcionesSelect: new FormControl('')
    

  });
  Reunion= new FormControl('');

  constructor(private router: Router, private authService: FormreunionService) { }

  onSubmit() {
    if (this.citaForm.valid) {
      console.log(this.citaForm.value);
      this.authService.createReunion(this.citaForm.value).subscribe({
        next: (response) => {
          console.log('Reunión creada', response);
          alert('¡Registro exitoso!');
          this.citaForm.reset(); // Resetear el formulario tras el éxito
        },
        error: (error) => {
          console.error('Error al crear la reunión', error);
          alert('Hubo un error al crear la reunión. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      // Manejar el caso de formulario no válido
      alert('Por favor, completa el formulario correctamente.');
    }
  }
}
