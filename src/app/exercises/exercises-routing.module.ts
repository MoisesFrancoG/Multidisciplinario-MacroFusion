import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesSectionComponent } from './exercises-section/exercises-section.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';

const routes: Routes = [
  { path: '', component: ExercisesSectionComponent },
  { path: 'ejercicios', component: ExercisesSectionComponent },
  { path: 'exercise-detail', component: ExerciseDetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
