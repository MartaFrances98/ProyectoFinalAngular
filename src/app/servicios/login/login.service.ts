import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl = 'http://localhost:5000/login';

  constructor(private http: HttpClient) { }

  login(username: string, pass: string): Observable<any> {
    console.log ( username + ' '+pass)
    return this.http.post(this.loginUrl, {
      username,
      pass,
      
    });
  }
}
