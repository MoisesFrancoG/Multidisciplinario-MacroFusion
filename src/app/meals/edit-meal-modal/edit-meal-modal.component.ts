import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodConsumption } from '../../models/food-consumption';
import { ListaAlimentos } from '../../models/lista-alimentos';

@Component({
  selector: 'app-edit-meal-modal',
  templateUrl: './edit-meal-modal.component.html',
  styleUrls: ['./edit-meal-modal.component.css']
})
export class EditMealModalComponent {
  @Input() meal!: ListaAlimentos; // Recibe el alimento a editar
  @Input() categories: string[] = ['Desayuno', 'Comida', 'Cena']; // Categorías posibles
  @Output() close = new EventEmitter<void>(); // Cierra el modal
  @Output() update = new EventEmitter<ListaAlimentos>(); // Emite el alimento actualizado

  onSave() {
    this.update.emit(this.meal); // Emitir el alimento editado
  }

  onCancel() {
    this.close.emit(); // Cerrar el modal
  }
}
