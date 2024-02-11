import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FormreunionService } from '../../../servicios/formreunion/formreunion.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { CitasService } from '../../../servicios/citas/citas.service';



@Component({
  selector: 'app-forminsert',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './forminsert.component.html',
  styleUrl: './forminsert.component.css',
  providers: [FormreunionService, UsuariosService, CitasService],
})
export class ForminsertComponent {
  opcionesSelectMultiple: string[] = [];
  opcionesParaMostrar: Array<{ id: string; nombre: string; }> = [];
  private _fechaSeleccionada: string = '';

  @Input()
  set fechaSeleccionada(value: string) {
    this._fechaSeleccionada = value;
    if (this.citaForm) {
      this.citaForm.patchValue({ Fecha: this._fechaSeleccionada });
    }
  }

  get fechaSeleccionada(): string {
    return this._fechaSeleccionada;
  }

  citaForm = new FormGroup({
    Nombre: new FormControl(''),
    Estado: new FormControl(''),
    Descripccion: new FormControl(''),
    Fecha: new FormControl(''),
    Hora: new FormControl(''),
    Duracion: new FormControl(''),
    Reunion: new FormControl(true),
    Miembros: new FormControl([] as any[]),
  });

  constructor(private router: Router, private authService: FormreunionService, private usuariosService: UsuariosService, private citasService: CitasService) { }

  onSubmit() {
    console.log(this.fechaSeleccionada);
    if (this.citaForm.valid) {
      if (this.citaForm.get('Reunion')!.value === true) {
        // El valor de Reunion es true
        console.log('Reunión está marcada como true');
        console.log(this.citaForm.value);
        this.authService.createReunion(this.citaForm.value).subscribe({
          next: (response) => {
            console.log('Reunión creada', response);
            alert('¡Registro exitoso!');
            this.citaForm.reset();
          },
          error: (error) => {
            console.error('Error al crear la reunión', error);
            alert('Hubo un error al crear la reunión. Por favor, inténtalo de nuevo.');
          }
        });

      } else {
        console.log('Reunión está marcada como false');

        const datosSeleccionados = {
          Nombre: this.citaForm.get('Nombre')!.value,
          Estado: this.citaForm.get('Estado')!.value,
          Descripccion: this.citaForm.get('Descripccion')!.value,
          Fecha: this.citaForm.get('Fecha')!.value,
          Hora: this.citaForm.get('Hora')!.value,
          Duracion: this.citaForm.get('Duracion')!.value,
        };

        console.log(datosSeleccionados);
        this.citasService.addCita(datosSeleccionados).subscribe({
          next: (response) => {
            console.log('Cita creada', response);
            alert('¡Cita insertada correctamente!');
            this.citaForm.reset();
          },
          error: (error) => {
            console.error('Error al crear la cita', error);
            alert('Hubo un error al crear la cita. Por favor, inténtalo de nuevo.');
          }
        });
      }
    } else {
      // Manejar el caso de formulario no válido
      alert('Por favor, completa el formulario correctamente.');
    }
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.users)) {
          this.opcionesParaMostrar = response.users.map((usuario: any) => ({
            id: usuario.DniUsuario,
            nombre: `${usuario.Nombre} ${usuario.Apellido}`
          }));
          // Si necesitas inicializar las opciones seleccionadas, puedes hacerlo aquí
          // Por ejemplo, si quieres pre-seleccionar todos:
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

}