import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { Observable, tap } from 'rxjs';

import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { PokemonModel } from '../Interfaces/pokemon-model';
import { ResultModel } from '../Interfaces/result-model';
import { UsuarioModel } from '../Interfaces/usuario-model';

@Injectable({
  providedIn: 'root',
})
export class Service {

  private url: string = "http://192.168.137.1:8080/api/pokemon";
  private urlUsuarios: string = "http://192.168.137.1:8080/api/usuario";
  private urlLogin: string = "http://192.168.137.1:8080/api/auth/login"

  constructor (private http: HttpClient){}



 getById(id: number){
   return this.http.get<ResultModel<PokemonModel>>(this.url + "/" + id);
}

 getAll(): Observable<ResultModel<PokemonModel>> {
   return this.http.get<ResultModel<PokemonModel>>(this.url);
 }

// getAll(limit: number, offset: number) {
//   return this.http
//     .get<any>(`${this.url}?limit=${limit}&offset=${offset}`)
//     .pipe(
//       map(response => {
//         return {
//           count: response.count,
//           next: response.next,
//           previous: response.previous,
//           results: response.results.map((p: any) => {
//             const id = Number(p.url.split('/').filter(Boolean).pop());

//             return {
//               name: p.name,
//               url: p.url,
//               idPokemon: id,
//               image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
//               cries: `https://play.pokemonshowdown.com/audio/cries/${p.name}.mp3` //sonido de los pokemones
//             };
//           })
//         };
//       })
//     );
// }

getUsuarios(): Observable<ResultModel<UsuarioModel>> {
   const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  return this.http.get<ResultModel<UsuarioModel>>(this.urlUsuarios, {headers});
}

deleteUsuarios(idusuario: number): Observable<ResultModel<UsuarioModel>> {
  return this.http.delete<ResultModel<UsuarioModel>>(this.urlUsuarios + "/" + idusuario);
}


addUsuario(usuario: UsuarioModel): Observable<ResultModel<UsuarioModel>> {
 return this.http.post<ResultModel<UsuarioModel>>(this.urlUsuarios + "/agregar", usuario);
}

paginacion(page: number, limit: number): Observable<ResultModel<PokemonModel>>{
  const params = new HttpParams().set('offset', page).set('limit', limit);

  return this.http.get<ResultModel<PokemonModel>>(this.url, {params})

}

login(usuario: UsuarioModel): Observable<ResultModel<UsuarioModel>>{
  return this.http.post<ResultModel<UsuarioModel>>(this.urlLogin, usuario).pipe(
    tap((res:any) =>{
      localStorage.setItem('token',res.token)
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
}


