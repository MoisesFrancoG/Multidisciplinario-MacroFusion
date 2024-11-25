import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Food } from '../../models/food';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-food-modal',
  templateUrl: './food-modal.component.html',
  styleUrl: './food-modal.component.css'
})
export class FoodModalComponent implements OnInit{

  @Output() foodSelected = new EventEmitter<Food | null>(); // Emitir el alimento seleccionado.
  foods: Food[] = [];
  userId: number = 0; // ID del usuario logueado

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.getUserIdFromLocalStorage();
    this.loadFoods();
  }

  // Obtener el ID del usuario desde localStorage
  getUserIdFromLocalStorage(): void {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10); // Convertir a número
    } else {
      console.error('No se encontró el ID del usuario en localStorage.');
    }
  }

  // Cargar los alimentos basados en el ID del usuario
  loadFoods(): void {
    if (this.userId > 0) {
      this.foodService.getFoodsId(this.userId).subscribe({
        next: (data) => {
          this.foods = data;
          console.log('Alimentos cargados:', data);
        },
        error: (error) => {
          console.error('Error al cargar los alimentos:', error);
        },
      });
    } else {
      console.error('No se puede cargar alimentos sin un ID de usuario válido.');
    }
  }

  // Seleccionar un alimento
  selectFood(food: Food): void {
    this.foodSelected.emit(food); // Emitir el alimento seleccionado al componente padre.
    // this.closeModal();
  }

  // Cerrar la modal
  closeModal(): void {
    this.foodSelected.emit(null); // Emitir un valor nulo para cerrar el modal.
  }

}
