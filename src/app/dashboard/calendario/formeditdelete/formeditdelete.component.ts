import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormreunionService } from '../../../servicios/formreunion/formreunion.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { ReunionesService } from '../../../servicios/reuniones/reuniones.service';
import { CitasService } from '../../../servicios/citas/citas.service';

@Component({
  selector: 'app-formeditdelete',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './formeditdelete.component.html',
  styleUrl: './formeditdelete.component.css',
  providers: [FormreunionService, UsuariosService, ReunionesService, CitasService],
})
export class FormeditdeleteComponent {
  opcionesSelectMultiple: string[] = [];
  opcionesParaMostrar: Array<{ id: string; nombre: string; }> = [];
  @Input() eventoID: string = 'undefined';
  @Input() color: string = '';

  citaForm = new FormGroup({
    Nombre: new FormControl('', [Validators.required]),
    IdUsuario: new FormControl(''),
    Estado: new FormControl('', [Validators.required]),
    Descripccion: new FormControl(''),
    Fecha: new FormControl('', [Validators.required]),
    Hora: new FormControl('', [Validators.required]),
    Duracion: new FormControl('', [Validators.required]),
    Reunion: new FormControl('true'),
    OpcionesSelect: new FormControl([] as any[]),
  });
  Reunion = new FormControl('');

  constructor(private router: Router, private authService: FormreunionService, private usuariosService: UsuariosService, private ReunionesService: ReunionesService, private citasService: CitasService) { }

  onSubmit() {
    if (this.color == 'red') {
      if (this.citaForm.valid) {
        const formData = {
          ...this.citaForm.value,
          id: this.eventoID // Agrega el eventoID al objeto del formulario
        };
        console.log(formData);
        this.ReunionesService.updateReunion(formData).subscribe({
          next: (response) => {
            console.log('Reunión modificada', response);
            alert('¡Reunión Modificada correctamente!');
            this.citaForm.reset(); // Resetear el formulario tras el éxito
          },
          error: (error) => {
            console.error('Error al modificar la reunión', error);
            alert('Hubo un error al modificar la reunión. Por favor, inténtalo de nuevo.');
          }
        });
      } else {
        alert('Por favor, completa el formulario correctamente.');
      }
    } else if (this.color == 'green') {
      if (this.citaForm.valid) {
        const formData = {
          ...this.citaForm.value,
          id: this.eventoID // Agrega el eventoID al objeto del formulario
        };
        console.log(formData);
        this.citasService.updateCita(formData).subscribe({
          next: (response) => {
            console.log('Cita modificada', response);
            alert('¡Cita Modificada correctamente!');
            this.citaForm.reset(); // Resetear el formulario tras el éxito
          },
          error: (error) => {
            console.error('Error al modificar la cita', error);
            alert('Hubo un error al modificar la cita. Por favor, inténtalo de nuevo.');
          }
        });
      } else {
        alert('Por favor, completa el formulario correctamente.');
      }
    }
    
  }

  onSubmitDelete() {
    if (this.color == 'red') {
      if (this.eventoID) {
        this.ReunionesService.deleteReunion(this.eventoID).subscribe({
          next: (response) => {
            // Manejar la respuesta exitosa aquí
            // Por ejemplo, podrías mostrar un mensaje al usuario indicando que la reunión fue eliminada
            // y actualizar la lista de reuniones si es necesario
            console.log('Reunión eliminada con éxito', response);
            this.citaForm.reset();
          },
          error: (error) => {
            // Manejar el error aquí
            // Podrías mostrar un mensaje al usuario indicando que ocurrió un error
            console.error('Error al eliminar la reunión', error);
          }
        });
      } else {
        console.error('No se proporcionó un eventoID válido.');
      }
    } else if (this.color == 'green') {
      if (this.eventoID) {
        this.citasService.deleteCita(this.eventoID).subscribe({
          next: (response) => {
            // Manejar la respuesta exitosa aquí
            // Por ejemplo, podrías mostrar un mensaje al usuario indicando que la reunión fue eliminada
            // y actualizar la lista de reuniones si es necesario
            console.log('Cita eliminada con éxito', response);
            this.citaForm.reset();
          },
          error: (error) => {
            // Manejar el error aquí
            // Podrías mostrar un mensaje al usuario indicando que ocurrió un error
            console.error('Error al eliminar la cita', error);
          }
        });
      } else {
        console.error('No se proporcionó un eventoID válido.');
      }
    }

  }

  ngOnInit() {
    this.cargarUsuarios();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoID'] && changes['eventoID'].currentValue !== 'undefined') {
      this.cargarDatos();
    }
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.users)) {
          this.opcionesParaMostrar = response.users.map((usuario: any) => ({
            id: usuario.DniUsuario,
            nombre: `${usuario.Nombre} ${usuario.Apellido}`
          }));

          this.opcionesSelectMultiple = this.opcionesParaMostrar.map(opcion => opcion.id);
        } else {
          console.error("Se esperaba un array de usuarios, pero se recibió:", response);
        }
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    });
  }

  cargarDatos() {
    console.log(this.eventoID);
    console.log(this.color);

    if (this.color == 'red') {
      this.authService.getReunion(this.eventoID).subscribe({
        next: (response) => {
          console.log('Datos de la reunión:', response.reunion);

          this.citaForm.setValue({
            Nombre: response.reunion.Nombre,
            IdUsuario: response.reunion.IdUsuario,
            Estado: response.reunion.Estado,
            Descripccion: response.reunion.Descripccion,
            Fecha: response.reunion.Fecha,
            Hora: response.reunion.Hora,
            Duracion: response.reunion.Duracion,
            Reunion: 'true',
            OpcionesSelect: response.reunion.IdUsuario,
          });
        },
        error: (error) => {
          console.error('Error al obtener la reunión:', error);
        }
      });
    } else if (this.color == 'green') {
      this.citasService.getCitaById(this.eventoID).subscribe({
        next: (response) => {
          console.log('Datos de la reunión:', response.cita);

          this.citaForm.setValue({
            Nombre: response.cita.Nombre,
            IdUsuario: response.cita.IdUsuario,
            Estado: response.cita.Estado,
            Descripccion: response.cita.Descripccion,
            Fecha: response.cita.Fecha,
            Hora: response.cita.Hora,
            Duracion: response.cita.Duracion,
            Reunion: 'false',
            OpcionesSelect: response.cita.IdUsuario,
          });
        },
        error: (error) => {
          console.error('Error al obtener la reunión:', error);
        }
      });
    }
  }

}