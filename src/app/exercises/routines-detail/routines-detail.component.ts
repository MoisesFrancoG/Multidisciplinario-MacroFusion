import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routines-detail',
  templateUrl: './routines-detail.component.html',
  // styleUrl: './routines-detail.component.css'
})
export class RoutinesDetailComponent implements OnInit {
  routine: string = '';
  showDropdown = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

    ngOnInit(): void {
    // Lee el parámetro 'routine' de la URL
    this.routine = this.route.snapshot.paramMap.get('routine') || 'Rutina no especificada';
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
