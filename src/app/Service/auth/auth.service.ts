import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_ROUTES } from '../routes/api.routes';
import { ResultModel } from '../../Interfaces/result.model';
import { UsuarioModel } from '../../Interfaces/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(usuario: UsuarioModel): Observable<ResultModel<UsuarioModel>> {
    return this.http.post<ResultModel<UsuarioModel>>(API_ROUTES.AUTH.LOGIN, usuario).pipe(
      tap((res: any) => {
        if (res.object?.token) {
          this.guardarToken(res.object.token);
        }
      }),
    );
  }

  guardarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
