import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarserviceService {
  private isVisible = new BehaviorSubject<boolean>(false);
  constructor() { }
  
  isVisible$ = this.isVisible.asObservable();

  toggleVisibility(): void {
    this.isVisible.next(!this.isVisible.value);
  }
}
