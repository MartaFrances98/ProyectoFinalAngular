import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarComponent } from '../navbar/sidebar/sidebar.component'; 
import { SidebarserviceService } from '../navbar/sidebar/sidebarservice.service';
import { CalendarioComponent } from './calendario/calendario.component';
import { ForminsertComponent } from './forminsert/forminsert.component';
import { FormeditdeleteComponent } from './formeditdelete/formeditdelete.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ForminsertComponent, FormeditdeleteComponent, CalendarioComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class DashboardComponent {
  
  private isVisible = new BehaviorSubject<boolean>(false);

  // Observable para el estado de visibilidad
  public isVisible$ = this.isVisible.asObservable();

  toggleVisibility(): void {
    this.isVisible.next(!this.isVisible.value);
  }


}