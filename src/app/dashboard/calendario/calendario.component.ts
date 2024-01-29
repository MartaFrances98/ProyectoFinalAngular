import { Component, importProvidersFrom } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { ForminsertComponent } from '../forminsert/forminsert.component';
import interactionPlugin from '@fullcalendar/interaction';

import $ from 'jquery';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, ForminsertComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'

})

// interface ExtendedCalendarOptions extends CalendarOptions {
//   dateClick?: (arg: any) => void;
// }

export class CalendarioComponent {
  modalAbierto: boolean = false;

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  calendarOptions: CalendarOptions = {
   initialView: 'dayGridMonth',
   plugins: [dayGridPlugin, bootstrapPlugin, interactionPlugin],
   dateClick: (arg: any) => {
     alert('Funciono'+ arg);
     this.modalAbierto=true;
   } , // Asegúrate de enlazar correctamente el contexto
 };

  

 // handleDateClick(arg: any) {
    //const modal = document.getElementById('citaModal');
    // Aquí usas métodos nativos para mostrar el modal
    // Por ejemplo, puedes agregar una clase de Bootstrap para mostrarlo
   // modal.classList.add('show');
    // Aquí puedes establecer la fecha seleccionada en el formulario
  //}
}