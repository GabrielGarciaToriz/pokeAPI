import { HttpClient } from '@angular/common/http';
import { ResultModel } from '../../Interfaces/result.model';
import { Observable } from 'rxjs';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '../../routes/api.routes';
import { PokemonDTO } from '../../Interfaces/pokemon.dto';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private urlUsuarios: string = 'http://192.167.0.135:8080/api/usuario';
  private utlPokemonFavorito: String = 'http://192.167.0.135:8080/api/favorito';
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<ResultModel<UsuarioModel>> {
    return this.http.get<ResultModel<UsuarioModel>>(API_ROUTES.USUARIO.BASE);
  }

  deleteUsuarios(idusuario: number): Observable<ResultModel<UsuarioModel>> {
    return this.http.delete<ResultModel<UsuarioModel>>(API_ROUTES.USUARIO.BASE + '/' + idusuario);
  }

  addUsuario(usuario: UsuarioModel): Observable<ResultModel<UsuarioModel>> {
    return this.http.post<ResultModel<UsuarioModel>>(API_ROUTES.USUARIO.BASE + '/agregar', usuario);
  }
  getPokemonFavoritoUsuario(idUsuario : number): Observable<ResultModel<PokemonDTO>>{
    return this.http.get<ResultModel<PokemonDTO>>(API_ROUTES.POKEMON.FAVORITO + '/' + idUsuario);
  }

  detailsUsuario(idUsuario: number): Observable<ResultModel<UsuarioModel>>{
    return this.http.get<ResultModel<UsuarioModel>>(API_ROUTES.USUARIO.BASE + '/' + idUsuario);
  }
}
