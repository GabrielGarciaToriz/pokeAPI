import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetService } from '../../Service/password/password.reset.service';
import { CommonModule } from '@angular/common';

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

  public formulario = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  enviarSolicitud(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const correo = this.formulario.value.correo!;

    this.passwordResetService.solicitarRecuperacion(correo).subscribe({
      next: () => {
        this.enviado = true;
        this.cargando = false;
      },
      error: () => {
        // Igual: mensaje genérico para no exponer información
        this.enviado = true;
        this.cargando = false;
      }
    });
  }
}