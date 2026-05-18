import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ResultModel } from '../../Interfaces/result.model';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { API_ROUTES } from '../../routes/api.routes';
import { LoginResponseModel } from '../../Interfaces/login.response.model';
interface JwtPayload {
  sub: string;      
  rol: string;
  idUsuario: number; 
  iat: number;
  exp: number;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private readonly URL = `${API_ROUTES.AUTH.LOGIN}`;

  constructor(private http: HttpClient) {}

  login(usuario: UsuarioModel): Observable<ResultModel<LoginResponseModel>> {
    return this.http
      .post<ResultModel<LoginResponseModel>>(this.URL, usuario)
      .pipe(
        tap(result => {
          if (result.correct && result.object?.token) {
            localStorage.setItem(this.TOKEN_KEY, result.object.token);
          }
        })
      );
  }

  guardarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private decodePayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Payload = token.split('.')[1];
      const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );
      return JSON.parse(jsonPayload) as JwtPayload;
    } catch {
      return null;
    }
  }

  getUsuarioId(): number | null {
    return this.decodePayload()?.idUsuario ?? null;
  }

  getCorreo(): string | null {
    return this.decodePayload()?.sub ?? null;
  }

  getRol(): string | null {
    return this.decodePayload()?.rol ?? null;
  }

  isLoggedIn(): boolean {
    const payload = this.decodePayload();
    if (!payload) return false;
    return payload.exp * 1000 > Date.now();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}