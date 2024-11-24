import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ejercicio } from '../../models/Ejercicio';
import { EjerciciosService } from '../../services/ejecicios.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  zone: string = ''; 
  dificultad: string = 'Principiante'; 
  niveles: string[] = ['Principiante', 'Intermedio', 'Avanzado'];
  ejercicios: Ejercicio[] = []; 
  allEjercicios: Ejercicio[] = []; 

  constructor(private route: ActivatedRoute, private ejerciciosService: EjerciciosService) {}

  ngOnInit(): void {
    const zone = this.route.snapshot.paramMap.get('zone');
    if (zone) {
      this.zone = zone;
      this.loadEjercicios();
    } else {
      console.error('El parámetro zona es necesario');
    }
  }

  onLevelChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.dificultad = selectElement.value;
    this.filterEjercicios();
  }

  loadEjercicios(): void {
    this.ejerciciosService.getEjercicios().subscribe({
      next: (data) => {
        console.log(data)
        this.allEjercicios = data;
        this.filterEjercicios();
      },
      error: (err) => console.error('Error al cargar ejercicios', err)
    });
  }

  filterEjercicios(): void {
    this.ejercicios = this.allEjercicios.filter(
      (ejercicio) =>
        ejercicio.musculotrabajado === this.zone && ejercicio.dificultad === this.dificultad
    );
  }
}
