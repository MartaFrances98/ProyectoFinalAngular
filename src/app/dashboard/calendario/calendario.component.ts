import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { ForminsertComponent } from './forminsert/forminsert.component';
import interactionPlugin from '@fullcalendar/interaction';
import { FormreunionService } from '../../servicios/formreunion/formreunion.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import festivos from '../../../assets/festivos.json';
import { FormeditdeleteComponent } from './formeditdelete/formeditdelete.component';




@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, ForminsertComponent, HttpClientModule, FormeditdeleteComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
  providers: [FormreunionService],
})


export class CalendarioComponent {
  // calendarOptions!: CalendarOptions;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Asegúrate de que este valor es correcto
    plugins: [dayGridPlugin, bootstrapPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    firstDay: 1, // Configuración para que la semana comience en lunes
    timeZone: 'Europe/Madrid',
  };
  constructor(private router: Router, private authService: FormreunionService) { }
  modalAbierto: boolean = false;
  modalAbiertoEditar: boolean = false;
  fechaSeleccionada: string = '';
  eventoID: string = '';

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  cerrarModalEditar() {
    this.modalAbiertoEditar = false;
  }
  
  ngOnInit() {
    this.cargarEventos();
  }


  cargarEventos() {
    if (sessionStorage.getItem('token')) {
      // El token existe
    } else {
      // El token no existe
    }
    this.authService.getReuniones().subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.success && Array.isArray(respuesta.reuniones)) {
          const eventosDeReuniones = respuesta.reuniones.map((evento: any) => ({
            id: evento.idReunion,
            title: evento.Nombre,
            start: evento.Fecha.split('T')[0], // Usa 'start' en lugar de 'date'
            color: 'red'
          }));
          // Después de cargar eventos de reuniones, añade festivos
          this.agregarFestivos(eventosDeReuniones);
        } else {
          console.error('La respuesta del servicio no tiene el formato esperado.');
          // Si la respuesta no es la esperada, aún así añade los festivos
          this.agregarFestivos([]);
        }
      },
      error: (error) => {
        console.error('Error al cargar los eventos de reuniones', error);
        // En caso de error, aún así intenta añadir los festivos
        this.agregarFestivos([]);
      }
    });
  }

  agregarFestivos(eventosDeReuniones: any[] = []) {
    // Aquí asumimos que 'festivos' es un array importado de tu JSON
    const eventosDeFestivos = festivos.map((festivo: any) => ({
      title: festivo.name,
      date: festivo.date,
      color: 'blue' // Puedes personalizar el color
    }));

    // Combina eventos de reuniones con festivos y actualiza las opciones del calendario
    this.calendarOptions = {
      ...this.calendarOptions, // Mantén las opciones existentes
      events: [...eventosDeReuniones, ...eventosDeFestivos]
    };
  }

  handleDateClick(arg: any) {
    this.fechaSeleccionada = arg.dateStr;
    // alert('Fecha'+ this.fechaSeleccionada);
    // Manejo del clic en una fecha2
    this.modalAbierto = true;
  }
  handleEventClick(clickInfo: any) {
    // Aquí establecerías los valores del formulario con la información del evento si es necesario.
    // clickInfo.event te dará acceso al evento clicado
    this.eventoID = clickInfo.event.id;
    // alert('Evento: ' + clickInfo.event.id);
    this.modalAbiertoEditar = true;

  }
}