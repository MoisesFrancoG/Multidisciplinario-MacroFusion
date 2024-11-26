import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  usuario: Usuario | null = null;
  idusuario: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.idusuario = parseInt(localStorage.getItem('user_id') || '0', 10);
    this.editForm = this.fb.group({
      estatura: [''],
      peso: [''],
      edad: [''],
      sexo: [''],
      indiceactividad: [''],
    });
  }

  ngOnInit(): void {
    this.userService.getUserId(this.idusuario).subscribe((response) => {
      this.usuario = response;
      this.editForm.patchValue({
        estatura: response.estatura,
        peso: response.peso,
        edad: response.edad,
        sexo: response.sexo,
        indiceactividad: response.indiceactividad,
      });
    });
  }

  onSubmit(): void {
    if (this.usuario) {
      const updatedUser: Usuario = {
        ...this.usuario,
        ...this.editForm.value, 
      };

      this.userService.updateUser(this.idusuario, updatedUser).subscribe(() => {
        alert('Perfil actualizado exitosamente');
        this.router.navigate(['/personal-info']); 
      });
    }
  }
}
