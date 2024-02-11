import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {
  private apiUrl = 'http://localhost:5000/reuniones'; // URL base de tu API para reuniones

  constructor(private http: HttpClient) { }

  // Método para añadir una nueva reunión
  addReunion(reunion: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, reunion, { headers });
  }

  // Método para modificar una reunión existente
  updateReunion(reunion: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    //Reunión incluye el id necesario para la actualización
    return this.http.put(`${this.apiUrl}/${reunion.id}`, reunion, { headers });
  }

  // Método para eliminar una reunión por su id
  deleteReunion(id: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para obtener una reunión por su id
  getReunionById(id: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
}
