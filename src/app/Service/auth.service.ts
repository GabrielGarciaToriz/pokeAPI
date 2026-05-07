import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'token';
    guardarToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    obtenerToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    cerrarSesion(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    estaAutenticado(): boolean {
        return !!this.obtenerToken();
    }
}