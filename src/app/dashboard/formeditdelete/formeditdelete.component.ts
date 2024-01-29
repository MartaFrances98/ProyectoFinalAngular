import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formeditdelete',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './formeditdelete.component.html',
  styleUrl: './formeditdelete.component.css'
})
export class FormeditdeleteComponent {
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
