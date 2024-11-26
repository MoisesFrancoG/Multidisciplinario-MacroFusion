import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})
export class AddFoodComponent {

  isLoading = false; // Controla si se muestra el spinner
  showDropdown = false;
  editMode: boolean = false; // Decide si el formulario es para editar o agregar
  foodId: number = 0;

  food: Food = {
    idalimentos: 0,
    id_usuario: parseInt(localStorage.getItem('user_id') || '0', 10),
    nombre: '',
    marca: '',
    calorias: 0,
    proteina: 0,
    carbohidratos: 0,
    grasa: 0,
    porcion: 100,
    tipomedida: 'gr',
    categoria: ''
  };

  constructor(
    private foodService: FoodService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodId = +this.route.snapshot.params['id'];
    if (this.foodId) {
      this.editMode = true;
      this.foodService.getFoodById(this.foodId).subscribe(food => {
        this.food = food;
      });
    }
  }

  addOrUpdateFood() {
    if (this.editMode) {
      // Modo de edición
      this.isLoading = true; // Activa el spinner

      this.foodService.updateFood(this.foodId, this.food).subscribe({
        next: () => {
          // SweetAlert de éxito
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alimento actualizado con éxito',
            showConfirmButton: false,
            timer: 600,
          });

          // Mantener el spinner durante 1 segundo antes de navegar
          setTimeout(() => {
            this.isLoading = false; // Oculta el spinner
            this.router.navigate(['/canasta']); // Navega al dashboard de canasta
          }, 1200);
        },
        error: (error) => {
          this.isLoading = false; // Oculta el spinner

          // SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el alimento',
            text: 'Por favor, intenta nuevamente.',
          });

          console.error('Error actualizando el alimento:', error);
        }
      });
    } else {
      // Modo de agregar
      this.isLoading = true; // Activa el spinner

      this.foodService.addFood(this.food).subscribe({
        next: () => {
          // SweetAlert de éxito
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alimento agregado con éxito',
            showConfirmButton: false,
            timer: 600,
          });

          // Mantener el spinner durante 1 segundo antes de navegar
          setTimeout(() => {
            this.isLoading = false; // Oculta el spinner
            this.router.navigate(['/canasta']); // Navega al dashboard de canasta
          }, 1200);
        },
        error: (error) => {
          this.isLoading = false; // Oculta el spinner

          // SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar el alimento',
            text: 'Por favor, intenta nuevamente.',
          });

          console.error('Error agregando el alimento:', error);
        }
      });
    }
  }

  cancelAction() {
    Swal.fire({
      title: '¿Estás seguro de cancelar?',
      text: 'Los cambios no se guardarán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Navega al dashboard de canasta
        this.router.navigate(['/canasta']);
      } else {
        // SweetAlert de acción no cancelada
        Swal.fire({
          icon: 'info',
          title: 'Acción no cancelada',
          text: 'Puedes continuar con tu registro.',
        });
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
