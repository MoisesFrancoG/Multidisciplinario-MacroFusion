import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-routines-section',
  templateUrl: './routines-section.component.html',
  // styleUrl: './routines-section.component.css'
})
export class RoutinesSectionComponent {

  isLoading: boolean = false; // Controla la visibilidad del loader
  showDropdown = false;

  constructor(private router: Router) {}

  navigateToRoutineDetail(id: number): void{
    this.router.navigate(['/routine-detail', id])
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

  navigateToRoutineWithLoader(id: number): void {
    this.isLoading = true; // Muestra la pantalla de carga
    setTimeout(() => {
      this.isLoading = false; // Oculta la pantalla de carga después de 1.5 segundos
      this.router.navigate(['/routine-detail', id]);
    }, 900);
  }

}
