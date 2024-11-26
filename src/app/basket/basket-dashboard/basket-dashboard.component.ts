import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../models/food';
import { FoodService } from '../../services/food.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basket-dashboard',
  templateUrl: './basket-dashboard.component.html',
  styleUrl: './basket-dashboard.component.css',
})
export class BasketDashboardComponent implements OnInit {

  isLoading = false; // Controla si se muestra el spinner
  showDropdown = false;
  foods: Food[] = [];
  idsuario = parseInt(localStorage.getItem('user_id') || '0', 10);
  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit() {
    this.loadFoods();
  }

  loadFoods() {
    this.foodService.getFoodsId(this.idsuario).subscribe((response) => {
      (this.foods = response), console.log(response);
    });
  }

  deleteFood(id: number): void {
    // SweetAlert para confirmar eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este alimento será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true; // Activa el loader

        this.foodService.deleteAlimento(id).subscribe({
          next: () => {
            this.isLoading = false; // Oculta el loader

            // SweetAlert de éxito
            Swal.fire({
              icon: 'success',
              title: 'Alimento eliminado con éxito',
              showConfirmButton: false,
              timer: 650,
            });

            this.loadFoods(); // Recarga la lista de alimentos
          },
          error: (error) => {
            this.isLoading = false; // Oculta el loader

            // SweetAlert de error
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el alimento',
              text: 'Por favor, intenta nuevamente.',
            });

            console.error('Delete error', error);
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // SweetAlert de acción cancelada
        Swal.fire({
          icon: 'info',
          title: 'Acción cancelada',
          text: 'El alimento no fue eliminado.',
          showConfirmButton: false,
          timer: 600,
        });
      }
    });
  }



  navigateToAddFood() {
    this.isLoading = true; // Activa el spinner

    setTimeout(() => {
      this.isLoading = false; // Oculta el spinner después del temporizador
      this.router.navigate(['/add-food']); // Navega a la vista de agregar alimento
    }, 800); // 800ms = tiempo de carga
  }


  navigateToEditFood(id?: number) {
    if (id) {
      this.router.navigate(['/add-food', id]);
    } else {
      console.error('Attempted to edit food without an ID');
    }
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

  navigateToEditFoodWithLoader(id?: number) {
    if (id) {
      this.isLoading = true; // Activa el spinner
      setTimeout(() => {
        this.isLoading = false; // Oculta el spinner después del temporizador
        this.router.navigate(['/add-food', id]); // Navega a la ruta de edición
      }, 800); // 800ms = tiempo de carga
    } else {
      console.error('Attempted to edit food without an ID');
    }
  }



}
