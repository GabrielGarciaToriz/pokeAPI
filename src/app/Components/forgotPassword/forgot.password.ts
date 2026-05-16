import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetService } from '../../Service/password/password.reset.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ResultModel } from '../../Interfaces/result.model';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot.password.html',
  styleUrl: './forgot.password.css',
})
export class ForgotPassword {

  private fb = inject(FormBuilder);
  private passwordResetService = inject(PasswordResetService);

  public enviado = false;
  public cargando = false;
  public mensajeError: string | null = null;

  public formulario = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void { }

  constructor() {
    console.log('ForgotPassword instanciado'); 
  }

  enviarSolicitud(): void {
    if (this.formulario.invalid || this.cargando) {
      this.formulario.markAllAsTouched();
      return;
    }

    const correo = this.formulario.value.correo!;
    this.cargando = true;
    this.mensajeError = null;

    this.passwordResetService.solicitarRecuperacion(correo)
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: (result: ResultModel<void>) => {
          if (result.correct) {
            this.enviado = true;
          } else {
            this.mensajeError = result.errorMessage ?? 'Ocurrió un error al enviar la solicitud.';
          }
        },
        error: () => {
          this.mensajeError = 'Ocurrió un error al enviar la solicitud. Por favor, intenta nuevamente.';
        }
      });
  }
}