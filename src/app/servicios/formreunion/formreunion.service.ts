import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormreunionService {

  private apiUrl = 'http://localhost:5000'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  getReuniones(): Observable<any> {
    const token = sessionStorage.getItem('token'); // o localStorage según dónde guardes el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/reuniones`, { headers });
  }

  createReunion(reunionData: any): Observable<any> {
    const token = sessionStorage.getItem('token'); // o localStorage según dónde guardes el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/reuniones`, reunionData, { headers });
  }

  getReunion(id: any):Observable<any>{
    const token = sessionStorage.getItem('token'); // o localStorage según dónde guardes el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/reunion/${id}`, { headers });
  }

}