import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { AuthService } from '../../Service/auth/auth.service';
import { ResultModel } from '../../Interfaces/result.model';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LoginResponseModel } from '../../Interfaces/login.response.model';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  public isLoanding = false;
  public errorMessage = "";
  public hidePassword = true;

  public usuario: UsuarioModel | undefined;

  constructor(private router: Router, private authService: AuthService) { }

  private formularioReactivo = inject(FormBuilder);

  public formulario = this.formularioReactivo.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  enviarDatos() {
    if (this.formulario.invalid) return;

    this.isLoanding = true;
    const usuario = this.formulario.value as UsuarioModel;

    this.authService.login(usuario).subscribe({
      next: (data: ResultModel<LoginResponseModel>) => {
        if (!data.correct) {
          this.isLoanding = false;
          Swal.fire({
            title: 'No se pudo iniciar sesión',
            text: data.errorMessage ?? 'Verifica tus credenciales.',
            icon: 'warning',
            confirmButtonColor: '#E3350D',
          });
          return;
        }

        if (data.object?.token) {
          this.authService.guardarToken(data.object.token);
        }

        this.router.navigate(['/pokemones']);
      },
      error: () => {
        this.isLoanding = false;
        Swal.fire({
          title: '¡El usuario no existe!',
          text: 'Por favor, verifica tus credenciales e intenta nuevamente.',
          icon: 'error',
          confirmButtonColor: '#E3350D',
        });
      }
    });
  }
}