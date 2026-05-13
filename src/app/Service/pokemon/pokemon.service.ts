import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ROUTES } from '../../routes/api.routes';
import { ResultModel } from '../../Interfaces/result.model';
import { PokemonModel } from '../../Interfaces/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<ResultModel<PokemonModel>> {
    return this.http.get<ResultModel<PokemonModel>>(API_ROUTES.POKEMON.BASE);
  }
  getTodos(): Observable<ResultModel<PokemonModel>> {
    return this.http.get<ResultModel<PokemonModel>>(API_ROUTES.POKEMON.TODOS);
  }

  getPokemonById(id: number): Observable<ResultModel<PokemonModel>> {
    return this.http.get<ResultModel<PokemonModel>>(`${API_ROUTES.POKEMON.BASE}/${id}`);
  }

  paginacion(page: number, limit: number): Observable<ResultModel<PokemonModel>> {
    const params = new HttpParams().set('offset', page).set('limit', limit);
    return this.http.get<ResultModel<PokemonModel>>(API_ROUTES.POKEMON.BASE, { params });
  }

  addFavorito(pokemonId: number): Observable<ResultModel<PokemonModel>> {
    return this.http.post<ResultModel<PokemonModel>>(
      `${API_ROUTES.POKEMON.FAVORITO}/${pokemonId}`,
      {}
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