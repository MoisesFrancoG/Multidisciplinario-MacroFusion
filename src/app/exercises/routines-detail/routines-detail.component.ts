import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutineService } from '../../services/rutine.service';// Importar el servicio
import { Ejercicio } from '../../models/Ejercicio';

@Component({
  selector: 'app-routines-detail',
  templateUrl: './routines-detail.component.html',
})
export class RoutinesDetailComponent implements OnInit {
  routineId: number = 0;
  ejercicios: Ejercicio[] = [];
  showDropdown = false;
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rutineService: RutineService 
  ) {}

  ngOnInit(): void {
    this.routineId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTitle(this.routineId)
    this.rutineService.getExercicesbyRutine(this.routineId).subscribe({
      next: (ejercicios) => {
        this.ejercicios = ejercicios;
      },
      error: (err) => {
        console.error('Error al cargar los ejercicios', err);
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    event?.stopPropagation();
    this.showDropdown = false;
  }

  logout() {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }

  loadTitle(id: number): void {
    switch(id){
      case 1:
        this.title = "EJERCICIOS EN CASA"
        break

      case 2: 
        this.title = "CALISTENIA"
        break

      case 3:
        this.title = "GYM"
        break

      case 4:
        this.title = "FUERZA"
        break
    }
  }
}
