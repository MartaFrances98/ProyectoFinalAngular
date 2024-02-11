import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoComponent } from './contenido/contenido.component';

@Component({
  selector: 'app-sobrenosotros',
  standalone: true,
  imports: [CommonModule, ContenidoComponent],
  templateUrl: './sobrenosotros.component.html',
  styleUrl: './sobrenosotros.component.css'
})
export class SobrenosotrosComponent {
  value: string='';

  actualizar(selectedValue: string) {
    this.value = selectedValue;
    console.log(selectedValue);
  }

}
