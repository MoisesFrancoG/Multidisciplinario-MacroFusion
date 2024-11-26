import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ejercicio } from '../../models/Ejercicio';
import { EjerciciosService } from '../../services/ejecicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  // styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {

  showDropdown = false;
  zone: string = '';
  dificultad: string = 'Principiante';
  niveles: string[] = ['Principiante', 'Intermedio', 'Avanzado'];
  ejercicios: Ejercicio[] = [];
  allEjercicios: Ejercicio[] = [];

  constructor(
    private route: ActivatedRoute,
    private ejerciciosService: EjerciciosService,
    private router: Router
  ) {}

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

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    event?.stopPropagation();
    this.showDropdown = false;
  }


  logout() {
    localStorage.clear(); // Limpiar todos los datos de sesión

    // Mostrar SweetAlert para notificar el cierre de sesión exitoso
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Hasta pronto',
      text: 'Te esperamos de vuelta',
      showConfirmButton: false,
      timer: 1000,
    });

    // Redirigir a la vista principal después de un breve retraso
    setTimeout(() => {
      this.router.navigate(['/']); // Navegar a la vista principal
    }, 1000);
  }

}
