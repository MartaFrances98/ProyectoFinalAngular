import { Component,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
  @Output() cambiar = new EventEmitter();
  selectedValue: string = '';


  seleccionar(value:string){
    this.selectedValue=value;
    this.cambiar.emit(value);
    console.log(value);

  }
}
