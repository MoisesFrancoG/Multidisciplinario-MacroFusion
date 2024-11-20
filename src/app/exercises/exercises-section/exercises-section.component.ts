import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises-section',
  templateUrl: './exercises-section.component.html',
  styleUrl: './exercises-section.component.css'
})
export class ExercisesSectionComponent {

  constructor(private router: Router) {}

  navigateToDetail(zone: string){
    this.router.navigate(['/exercise-detail', {zone: zone}])
  }

}
