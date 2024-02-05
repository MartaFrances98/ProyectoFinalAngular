import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elimiusuario',
  standalone: true,
  imports: [],
  templateUrl: './elimiusuario.component.html',
  styleUrl: './elimiusuario.component.css'
})
export class ElimiusuarioComponent {
  users: any[] = []; // Ahora 'users' es un array de cualquier tipo
  selectedUser: any = null; 
  DniUsuario:any =null;

  constructor(private ruta: Router) {
    // Cargar los usuarios al inicializar
    this.loadUsers();
  }

  loadUsers() {
    // Llama al servicio para cargar los usuarios de la base de datos
  }

  selectUserForDeletion(user: any) {
    this.selectedUser = user;
  }

  deleteUser() {
    // Llama al servicio para eliminar al usuario seleccionado
    // Después de eliminar, recarga la lista de usuarios y cierra el modal
  }

  
  volverAlDashboard() {
    this.ruta.navigate(['/dashboard']);
  }
}
