// import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Food } from '../../models/food';
import { FoodConsumption } from '../../models/food-consumption';

@Component({
  selector: 'app-fooddetail-modal',
  templateUrl: './fooddetail-modal.component.html',
  styleUrl: './fooddetail-modal.component.css'
})
export class FooddetailModalComponent {
  @Input() food!: FoodConsumption; // Recibimos el alimento seleccionado
  @Input() isEditMode: boolean = false; // Por defecto, es falso.
  @Output() foodAdded = new EventEmitter<FoodConsumption | null>();

  portion: number = 0; // Nueva porción especificada por el usuario
  category: string = 'Desayuno'; // Categoría por defecto





  calculateMacros(): FoodConsumption {
    const factor = this.portion / this.food.porcion; // Calculamos el factor de ajuste

    return {
      idlistaalimentos: 0, // Declarado
      idcomida: parseInt(localStorage.getItem('idconsumo') || '0', 10), // Obtenemos de LocalStorage
      idalimento: this.food.idalimento || 0,
      nombre: this.food.nombre,
      marca: this.food.marca || '',
      calorias: Math.round(this.food.calorias * factor),
      proteina: Math.round(this.food.proteina * factor),
      carbohidratos: Math.round(this.food.carbohidratos * factor),
      grasa: Math.round(this.food.grasa * factor),
      porcion: this.portion,
      tipomedida: this.food.tipomedida,
      categoriacomida: this.category,
    };
  }

  addFood(): void {
    if (this.portion > 0) {
      const updatedFood = this.calculateMacros();
      this.foodAdded.emit(updatedFood); // Emitimos el alimento con los nuevos valores
    }
  }

  closeModal(): void {
    this.foodAdded.emit(null); // Cerrar la modal
  }
}
