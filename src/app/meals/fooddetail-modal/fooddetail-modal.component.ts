// import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Food } from '../../models/food';
import { FoodConsumption } from '../../models/food-consumption';
import { ListaAlimentos } from '../../models/lista-alimentos';

@Component({
  selector: 'app-fooddetail-modal',
  templateUrl: './fooddetail-modal.component.html',
  styleUrl: './fooddetail-modal.component.css'
})
export class FooddetailModalComponent {
  // @Input() food1!: Food;
  @Input() food!: Food;
  @Input() foodSelected!: ListaAlimentos;
  @Input() isEditMode: boolean = false;
  @Output() foodAdded = new EventEmitter<ListaAlimentos | null>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<ListaAlimentos>();



  portion: number = 0;
  category: string = 'Desayuno';


  // ngOnInit(): void {
  //   if (this.isEditMode && this.food) {
  //     this.portion = this.food.porcion;
  //     this.category = this.food.categoria;
  //   }
  // }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.portion = this.food.porcion;
      this.category = this.food.categoria;
    } else {
      this.portion = 0;
      this.category = 'Desayuno';
    }
  }


  calculateMacros(): ListaAlimentos {

    return {
      idlistaalimentos: 0, // Declarado
      idcomida: parseInt(localStorage.getItem('idconsumo') || '0', 10),
      idalimento: this.food.idalimentos || 0,
      porcion: this.portion,
      categoriacomida: this.category,
    };
  }

  addFood(): void {
    if (this.portion > 0) {
      const updatedFood = this.calculateMacros();
      this.foodAdded.emit(updatedFood);
    }
  }

  // closeModal(): void {
  //   this.foodAdded.emit(null); // Cerrar la modal
  // }

  // saveFood(): void {
  //   const updatedFood: ListaAlimentos = {
  //     ...this.foodSelected,
  //     porcion: this.portion,
  //     categoriacomida: this.category,
  //   };
  //   this.foodAdded.emit(updatedFood);
  // }

  saveFood(): void {
    const updatedFood: ListaAlimentos = {
      idlistaalimentos: this.food.idalimentos!,
      idcomida: parseInt(localStorage.getItem('idconsumo') || '0', 10),
      idalimento: this.food.idalimentos!,
      porcion: this.portion,
      categoriacomida: this.category,
    };
    this.save.emit(updatedFood); // Emite el alimento actualizado o nuevo
  }

  close(): void {
    this.closeModal.emit();
  }


}
