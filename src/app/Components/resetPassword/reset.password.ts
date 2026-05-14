import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordResetService } from '../../Service/password/password.reset.service';

// Validador personalizado: ambas contraseñas deben coincidir
function passwordsIguales(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password')?.value;
    const confirmar = control.get('confirmar')?.value;
    return pass === confirmar ? null : { noCoinciden: true };
}

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './reset.password.html',
})
export class ResetPassword implements OnInit {

     private fb = inject(FormBuilder);


    constructor(
        private route: ActivatedRoute,
        private passwordResetService: PasswordResetService
    ) { }

    private token = '';
    public tokenInvalido = false;
    public cambiado = false;
    public cargando = false;

    public formulario = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmar: ['', Validators.required]
    }, { validators: passwordsIguales });

    ngOnInit(): void {
        // Leer token del query param: /reset-password?token=uuid
        this.token = this.route.snapshot.queryParamMap.get('token') ?? '';

        if (!this.token) {
            this.tokenInvalido = true;
            return;
        }

        // Validar el token contra el backend antes de mostrar el form
        this.passwordResetService.validarToken(this.token).subscribe({
            next: (res) => {
                if (!res.correct) this.tokenInvalido = true;
            },
            error: () => { this.tokenInvalido = true; }
        });
    }

    cambiarPassword(): void {
        if (this.formulario.invalid) {
            this.formulario.markAllAsTouched();
            return;
        }

        this.cargando = true;
        const nuevaPassword = this.formulario.value.password!;

        this.passwordResetService.cambiarPassword(this.token, nuevaPassword).subscribe({
            next: (res) => {
                if (res.correct) {
                    this.cambiado = true;
                } else {
                    this.tokenInvalido = true; // token expiró justo al enviar
                }
                this.cargando = false;
            },
            error: () => {
                this.tokenInvalido = true;
                this.cargando = false;
            }
        });
    }
}