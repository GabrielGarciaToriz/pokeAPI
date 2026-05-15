import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RolModel } from '../../Interfaces/rol.model';
import { CatalogoService } from '../../Service/catalogo/catalogo.service';
import { UsuarioService } from '../../Service/user/usuario.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-usuario-form',
  imports: [
    ReactiveFormsModule,
    // Angular Material
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm implements OnInit {
  public usuario: UsuarioModel | undefined;
  public roles: RolModel[] = [];
  public hidePassword = true;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private location: Location
  ) { }

  private formularioReactiv = inject(FormBuilder);

  public formulario = this.formularioReactiv.group({
    nombre: [''],
    apellidoMaterno: [''],
    apellidoPaterno: [''],
    userName: [''],
    password: [''],
    sexo: ['M'],
    correo: [''],
    fechaNacimiento: this.formularioReactiv.control<Date | null>(null),
    idRol: [0],
  });

  ngOnInit(): void {
  }

  enviarDatos() {
    const formValue = this.formulario.value;

    this.usuario = {
      ...formValue,
      rol: { idRol: Number(formValue.idRol) },
    } as UsuarioModel;

    this.usuarioService.addUsuario(this.usuario).subscribe({
      next: (res) => {
        if (res.correct) {
          Swal.fire({ title: 'El usuario se ha creado con éxito', icon: 'success', draggable: true });
          this.router.navigate(['/pokemones']);
        } else {
          Swal.fire({ title: 'Error al crear usuario', text: res.errorMessage, icon: 'error' });
        }
      },
      error: (res) => {
        Swal.fire({ title: 'Error al crear usuario', text: res.errorMessage, icon: 'error' });
      },
    });
  }

  regresar(): void {
    this.location.back();
  }
}