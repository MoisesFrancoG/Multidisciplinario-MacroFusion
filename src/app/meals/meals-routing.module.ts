import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsDashboardComponent } from './meals-dashboard/meals-dashboard.component';

const routes: Routes = [
  { path: '', component: MealsDashboardComponent },
  { path: 'comidas  ', component: MealsDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
