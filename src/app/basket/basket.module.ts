import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketDashboardComponent } from './basket-dashboard/basket-dashboard.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BasketDashboardComponent,
    AddFoodComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    FormsModule,
  ]
})
export class BasketModule { }
