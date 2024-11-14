import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketDashboardComponent } from './basket-dashboard/basket-dashboard.component';
import { AddFoodComponent } from './add-food/add-food.component';


@NgModule({
  declarations: [
    BasketDashboardComponent,
    AddFoodComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule
  ]
})
export class BasketModule { }
