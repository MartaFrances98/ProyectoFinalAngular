import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-forminsert',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './forminsert.component.html',
  styleUrl: './forminsert.component.css'
})
export class ForminsertComponent {
  citaForm = new FormGroup({
    Nombre: new FormControl(''),
    IdUsuario: new FormControl(''),
    Estado: new FormControl(''),
    Descripccion: new FormControl(''),
    Fecha: new FormControl(''),
    Hora: new FormControl(''),

  });

  constructor() { }

  onSubmit() {
    // Aquí procesarías los datos del formulario, por ejemplo, enviándolos a un servidor
    console.log(this.citaForm.value);
    alert('¡Registro exitoso!');

  }
}
