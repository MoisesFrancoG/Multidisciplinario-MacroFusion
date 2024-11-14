import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesSectionComponent } from './exercises-section/exercises-section.component';

const routes: Routes = [
  { path: '', component: ExercisesSectionComponent },
  { path: 'ejercicios', component: ExercisesSectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
