import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ValidacionesPropias } from '../../validaciones-propias';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupService } from '../../servicios/singup/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { RutasService } from '../../servicios/rutas/rutas.service';


@Component({
  selector: 'app-modifusuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, HttpClientModule],
  templateUrl: './modifusuario.component.html',
  styleUrl: './modifusuario.component.css',
  providers: [RutasService, UsuariosService],

})
export class ModifusuarioComponent implements OnInit {
  @Input() userId: string = '';
  usuarios: any[] = [];
  constructor(private router: Router, private RutasService: RutasService, private usuariosService: UsuariosService, private route: ActivatedRoute) { }

  resultado = '';
  opcionesParaMostrar: Array<{ id: string; nombre: string; }> = [];
  formularioContacto = new FormGroup({
    // Miembros: new FormControl([]),
    // DNI: new FormControl('', [Validators.required, ValidacionesPropias.formatoDNI]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    // password: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    sexo: new FormControl('s/n'),
    administrador: new FormControl(''),
    horario: new FormControl('Mañana'),
    edad: new FormControl('', [Validators.min(10), Validators.max(85)]),
    DatosPadres: new FormGroup({
      DNIpadre: new FormControl(''),
      nombrePadre: new FormControl(''),
      apellidosPadre: new FormControl('')
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
      const userData = { ...this.formularioContacto.value, DniUsuario: this.userId };
      this.usuariosService.updateUser(userData).subscribe({
        next: (response) => {
          console.log('Modificación exitosa', response);
          alert('¡Modificación exitosa!');
          this.router.navigate(['/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
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
    this.router.navigate(['/administracionusuarios']);
  }


  ngOnInit() {
    // RutasService
    this.userId = this.RutasService.getUserId();
    if (this.userId) {
      this.cargarUsuario(this.userId);
    } else {
      console.error('No se ha proporcionado userId');
    }
  }


  cargarUsuario(userId: string) {
    console.log('UserID: ' + this.userId)
    this.usuariosService.getUser(userId).subscribe({
      next: (usuario) => {
        console.log(usuario.user)
        this.formularioContacto.setValue({
          nombre: usuario.user.Nombre,
          apellido: usuario.user.Apellido,
          mail: usuario.user.Mail,
          sexo: usuario.user.Sexo,
          administrador: usuario.user.Administrador,
          horario: usuario.user.Horario,
          edad: usuario.user.Edad,
          DatosPadres: ({
            DNIpadre: usuario.user.DniTutor,
            nombrePadre: usuario.user.NombreTutor,
            apellidosPadre: usuario.user.ApellidoTutor
          })
        });
        this.formularioContacto.updateValueAndValidity();
        console.log(this.formularioContacto.controls); // Para ver el estado de cada control
        console.log(this.formularioContacto.valid); // Para ver si el formulario completo es válido


      },
      error: (error) => {
        console.error('Error al obtener el usuario', error);
      },
    });
  }

}
