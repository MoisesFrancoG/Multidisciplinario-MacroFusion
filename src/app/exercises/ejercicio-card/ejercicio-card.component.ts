import { Component, Input } from '@angular/core';
import { Ejercicio } from '../../models/Ejercicio'; // Asegúrate de importar el modelo correctamente

@Component({
  selector: 'app-ejercicio-card',
  templateUrl: './ejercicio-card.component.html',
  styleUrls: ['./ejercicio-card.component.css']
})
export class EjercicioCardComponent {
  @Input() ejercicio: Ejercicio = {
    idrutina: 0,
    idejercicios: 0,
    dificultad: '',
    musculotrabajado: '',
    nombre: '',
    descripcion: '',
    imagen: ''
  };
  
}
