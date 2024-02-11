import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { RutasService } from '../servicios/rutas/rutas.service';

@Component({
  selector: 'app-administracionusuarios',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './administracionusuarios.component.html',
  styleUrl: './administracionusuarios.component.css',
  providers: [UsuariosService,RutasService],
})
export class AdministracionusuariosComponent {
  users: any[] = [];
  selectedUserid: String = '';
  selectedUser: any;
  opcionesParaMostrar: Array<{ id: string; nombre: string; mail: string; }> = [];
  constructor(private ruta: Router, private usuariosService: UsuariosService, private RutasService:RutasService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.users)) {
          this.opcionesParaMostrar = response.users.map((usuario: any) => ({
            id: usuario.DniUsuario,
            nombre: usuario.Nombre,
            mail: usuario.Mail
          }));
          this.opcionesParaMostrar.map((opcion: any) => opcion.id);
        } else {
          console.error("Se esperaba un array de usuarios, pero se recibió:", response);
        }
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    });
  }

  modificarUsuario(userId: string) {
    this.RutasService.setUserId(userId);
    this.ruta.navigate(['/modifusuario']);
  }

  

  selectUserForDeletion(id: any) {
    this.selectedUserid = id;
    this.selectedUser = this.opcionesParaMostrar.find((user) => user.id === id);
  }


  deleteUser() {
    if (!this.selectedUser) {
      console.error('No hay un usuario seleccionado para eliminar');
      return;
    } else {
      this.usuariosService.deleteUser(this.selectedUserid).subscribe({
        next: (response) => {
          console.log('Usuario eliminado con éxito', response);
          this.ngOnInit(); // Recarga los usuarios
        },
        error: (error) => {
          console.error('Error al eliminar el usuario', error);
        },
      });
    }
  }

  crearUsuario(){
    this.ruta.navigate(['/insertusuario'])
  }


  volverAlDashboard() {
    this.ruta.navigate(['/dashboard']);
  }
}
