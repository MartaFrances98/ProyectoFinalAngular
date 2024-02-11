import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private userId: string = '';
  
  setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
    console.log('SET: '+this.userId);
  }
  
  getUserId(): string {
    this.userId = localStorage.getItem('userId') || '';
    console.log('GET: '+this.userId);
    return this.userId;
  }

}
