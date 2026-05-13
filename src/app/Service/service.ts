import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable, tap } from 'rxjs';

import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { PokemonModel } from '../Interfaces/pokemon.model';
import { ResultModel } from '../Interfaces/result.model';
import { UsuarioModel } from '../Interfaces/usuario.model';
import { RolModel } from '../Interfaces/rol.model';

@Injectable({
  providedIn: 'root',
})
export class Service {

  private url: string = "http://192.167.0.194:8080/api/pokemon";
  private urlUsuarios: string = "http://192.167.0.194:8080/api/usuario";
  private urlLogin: string = "http://192.167.0.194:8080/api/auth/login"
    private urlAdicional: string = "https://pokeapi.co/api/v2/pokemon-species";
  constructor(private http: HttpClient) { }



  getById(id: number) {
    return this.http.get<ResultModel<PokemonModel>>(this.url + "/" + id);
  }


  getAll(): Observable<ResultModel<PokemonModel>> {
    return this.http.get<ResultModel<PokemonModel>>(this.url);
  }

  getUsuarios(): Observable<ResultModel<UsuarioModel>> {
    return this.http.get<ResultModel<UsuarioModel>>(this.urlUsuarios);
  }

  deleteUsuarios(idusuario: number): Observable<ResultModel<UsuarioModel>> {
    return this.http.delete<ResultModel<UsuarioModel>>(this.urlUsuarios + "/" + idusuario);
  }


  addUsuario(usuario: UsuarioModel): Observable<ResultModel<UsuarioModel>> {
    return this.http.post<ResultModel<UsuarioModel>>(this.urlUsuarios + "/agregar", usuario);
  }

  paginacion(page: number, limit: number): Observable<ResultModel<PokemonModel>> {
    const params = new HttpParams().set('offset', page).set('limit', limit);

    return this.http.get<ResultModel<PokemonModel>>(this.url, { params })

  }

  login(usuario: UsuarioModel): Observable<ResultModel<UsuarioModel>> {
    return this.http.post<ResultModel<UsuarioModel>>(this.urlLogin, usuario).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.object?.token)
      }

      )
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private urlRoles: string = "http://192.167.0.135:8080/api/catalogo/rol";

  getRoles(): Observable<ResultModel<RolModel>> {
    return this.http.get<ResultModel<RolModel>>(this.urlRoles);
  }

    getDatosAdicionales(idPokemon: number): Observable<ResultModel<PokemonModel>>{
    return this.http.get<ResultModel<PokemonModel>>(this.urlAdicional + "/" + idPokemon

    )
  }

    getPokemonDescription(nombre: string): Observable<any> {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species/${nombre}`
    );
  }


}