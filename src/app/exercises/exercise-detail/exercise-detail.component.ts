import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.css'
})
export class ExerciseDetailComponent {

  zone: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const zone = this.route.snapshot.paramMap.get('zone');
    if (zone) {
      this.zone = zone;
    } else {
      // Manejar el caso de 'null' aquí. Ejemplo:
      this.zone = 'Valor por defecto';
      console.error('El parámetro zona es necesario');
    }
  }


}
