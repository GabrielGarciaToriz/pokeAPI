import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../routes/api.routes';
import { ResultModel } from '../../Interfaces/result.model';
import { PokemonModel } from '../../Interfaces/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ResultModel<PokemonModel>> {
    return this.http.get<ResultModel<PokemonModel>>(API_ROUTES.POKEMON.TODOS);
  }

  getPokemonById(id: number): Observable<ResultModel<PokemonModel>> {
    return this.http.get<ResultModel<PokemonModel>>(`${API_ROUTES.POKEMON.BASE}/${id}`);
  }

  buscarPokemon(id?: number, nombre?: string, tipo?: string): Observable<ResultModel<PokemonModel>> {
    let params = new HttpParams();
    if (id     !== undefined) params = params.set('id',     id);
    if (nombre !== undefined) params = params.set('nombre', nombre);
    if (tipo   !== undefined) params = params.set('tipo',   tipo);
    return this.http.get<ResultModel<PokemonModel>>(
      `${API_ROUTES.POKEMON.BASE}/buscar`, { params }
    );
  }

  addFavorito(idUsuario: number, idPokemon: number): Observable<ResultModel<PokemonModel>> {
    return this.http.post<ResultModel<PokemonModel>>(
      `${API_ROUTES.POKEMON.FAVORITO}/${idUsuario}/pokemon/${idPokemon}`, {}
    );
  }

    getDatosAdicionales(idPokemon: number): Observable<ResultModel<PokemonModel>>{
    return this.http.get<ResultModel<PokemonModel>>(API_ROUTES.POKEMON.DESCRIPCION + "/" + idPokemon);
  }

    getPokemonDescription(nombre: number): Observable<any> {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species/${nombre}`
    );
  }
}