import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../routes/api.routes';

@Injectable({ providedIn: 'root' })
export class PasswordResetService {

  private base = `${API_ROUTES.PASSWORD.BASE}`;

  constructor(private http: HttpClient) { }

  solicitarRecuperacion(email: string): Observable<any> {
    const body = { correo: email };
    return this.http.post(`${this.base}/forgot`, body);
  }

  validarToken(token: string): Observable<any> {
    return this.http.get(`${this.base}/validate`, {
      params: new HttpParams().set('token', token)
    });
  }

  cambiarPassword(token: string, nuevaPassword: string): Observable<any> {
    const body = { token: token, newPassword: nuevaPassword };

    return this.http.post(`${this.base}/reset`, body);
  }
}