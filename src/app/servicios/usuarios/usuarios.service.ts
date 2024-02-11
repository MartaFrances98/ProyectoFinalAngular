import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:5000'; // URL base de tu API

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    // Obtener el token del almacenamiento
    const token = sessionStorage.getItem('token'); // O usa localStorage si es más apropiado para tu caso

    // Crear las cabeceras HTTP necesarias para incluir el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud GET a la API y devolver el Observable resultante
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }

  // Método para modificar un usuario existente
  updateUser(user: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // Asume que tu objeto usuario incluye el id o los datos necesarios para la actualización
    return this.http.put(`${this.apiUrl}/user`, user, { headers });
  }

  // Método para eliminar un usuario
  deleteUser(id: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Este método asume que no es necesario pasar un ID específico, ya que la URL no lo incluye
    return this.http.delete(`${this.apiUrl}/user/${id}`, { headers });
  }

  // Método para eliminar un usuario
  getUser(id: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Este método asume que no es necesario pasar un ID específico, ya que la URL no lo incluye
    return this.http.get(`${this.apiUrl}/user/${id}`, { headers });
  }
}

