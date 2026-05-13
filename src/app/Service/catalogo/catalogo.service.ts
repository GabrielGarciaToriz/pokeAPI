import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../routes/api.routes';
import { ResultModel } from '../../Interfaces/result.model';
import { RolModel } from '../../Interfaces/rol.model';
import { TipoPokemonModel } from '../../Interfaces/tipo.pokemon.model';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<ResultModel<RolModel>> {
    return this.http.get<ResultModel<RolModel>>(API_ROUTES.CATALOGO.ROL);
  }

  getTipos(): Observable<ResultModel<TipoPokemonModel>> {
    return this.http.get<ResultModel<TipoPokemonModel>>(API_ROUTES.CATALOGO.TIPOS);
  }
}