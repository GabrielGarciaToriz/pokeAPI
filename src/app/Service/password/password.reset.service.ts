import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../routes/api.routes';
import { ResultModel } from "../../Interfaces/result.model";
@Injectable({ providedIn: 'root' })
export class PasswordResetService {

  private base = `${API_ROUTES.PASSWORD.BASE}`;

  constructor(private http: HttpClient) { }
  solicitarRecuperacion(email: string): Observable<ResultModel<void>> {
    const body = { correo: email };
    return this.http.post<ResultModel<void>>(`${this.base}/forgot`, body);
  }

  validarToken(token: string): Observable<ResultModel<boolean>> {
    return this.http.get<ResultModel<boolean>>(`${this.base}/validate`, {
      params: new HttpParams().set('token', token)
    });
  }

  cambiarPassword(token: string, nuevaPassword: string): Observable<ResultModel<void>> {
    const body = { token, nuevaPassword };
    return this.http.post<ResultModel<void>>(`${this.base}/reset`, body);
  }
}