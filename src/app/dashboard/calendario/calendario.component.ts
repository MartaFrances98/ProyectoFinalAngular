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
import { CitasService } from '../../servicios/citas/citas.service';




@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, ForminsertComponent, HttpClientModule, FormeditdeleteComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
  providers: [FormreunionService, CitasService],
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
  constructor(private router: Router, private authService: FormreunionService, private citasService: CitasService) { }
  modalAbierto: boolean = false;
  modalAbiertoEditar: boolean = false;
  fechaSeleccionada: string = '';
  eventoID: string = '';
  color: string = '';

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
          this.cargarCitas(eventosDeReuniones);
        } else {
          console.error('La respuesta del servicio no tiene el formato esperado.');
          // Si la respuesta no es la esperada, aún así añade los festivos
          this.cargarCitas([]);
        }
      },
      error: (error) => {
        console.error('Error al cargar los eventos de reuniones', error);
        // En caso de error, aún así intenta añadir los festivos
        this.cargarCitas([]);
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

  cargarCitas(eventosDeReuniones: any[]) {
    this.citasService.getCitas().subscribe({
      next: (respuesta) => {
        console.log(respuesta.reuniones);
        if (respuesta.success && Array.isArray(respuesta.reuniones)) {
          const eventosDeCitas = respuesta.reuniones.map((cita: any) => ({
            id: cita.idCitas,
            title: cita.Nombre,
            start: cita.Fecha.split('T')[0],
            color: 'green' // Asigna un color distinto para las citas
          }));
          // Combina eventos de reuniones, citas y luego añade festivos
          this.agregarFestivos([...eventosDeReuniones, ...eventosDeCitas]);
        } else {
          console.error('La respuesta del servicio de citas no tiene el formato esperado.');
          // Si la respuesta de citas no es la esperada, aún así procede a añadir los festivos
          this.agregarFestivos(eventosDeReuniones);
        }
      },
      error: (error) => {
        console.error('Error al cargar los eventos de citas', error);
        // En caso de error al cargar citas, aún así procede a añadir los festivos
        this.agregarFestivos(eventosDeReuniones);
      }
    });
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
    // console.log(clickInfo)
    if(clickInfo.event.id){
      this.eventoID = clickInfo.event.id;
      this.color = clickInfo.event.backgroundColor;
      // console.log(this.color);
    }else{
      this.eventoID = clickInfo.cita.id;
      this.color = clickInfo.cita.backgroundColor;
      // console.log(this.color);
    }
    
    // alert('Evento: ' + clickInfo.event.id);
    this.modalAbiertoEditar = true;
  }
}