import { Component, Input } from '@angular/core';
import { SidebarserviceService } from './sidebarservice.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    
  isSidebarVisible: boolean = false;

  constructor(private sidebarService : SidebarserviceService) {
    this.sidebarService.isVisible$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

}
