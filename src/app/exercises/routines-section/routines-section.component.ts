import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routines-section',
  templateUrl: './routines-section.component.html',
  // styleUrl: './routines-section.component.css'
})
export class RoutinesSectionComponent {

  showDropdown = false;

  constructor(private router: Router) {}

  navigateToRoutineDetail(routine: string): void{
    this.router.navigate(['/routine-detail', routine])
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
