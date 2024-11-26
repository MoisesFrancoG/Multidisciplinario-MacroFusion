import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises-section',
  templateUrl: './exercises-section.component.html',
  // styleUrl: './exercises-section.component.css'
})
export class ExercisesSectionComponent {

  isLoading: boolean = false; // Controla la visibilidad del loader
  showDropdown = false;

  constructor(private router: Router) {}

  navigateToDetail(zone: string){
    this.router.navigate(['/exercise-detail', {zone: zone}])
  }

  navigateToDetailWithLoader(zone: string): void {
    this.isLoading = true; // Muestra la pantalla de carga
    setTimeout(() => {
      this.isLoading = false; // Oculta la pantalla de carga después de 1.5 segundos
      this.router.navigate(['/exercise-detail', { zone }]);
    }, 1000);
  }

  navigateToRoutinesWithLoader(): void {
    this.isLoading = true; // Muestra la pantalla de carga
    setTimeout(() => {
      this.isLoading = false; // Oculta la pantalla de carga después de 1.5 segundos
      this.router.navigate(['/routines']);
    }, 1000);
  }

  navigateToRoutines(){
    this.router.navigate(['/routines'])
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
    this.router.navigate(['/']); // Redireccionar a la vista principal
  }


}
