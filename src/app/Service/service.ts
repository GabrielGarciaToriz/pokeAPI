import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { PokemonModel } from '../Interfaces/pokemon-model';
import { ResultModel } from '../Interfaces/result-model';

@Injectable({
  providedIn: 'root',
})
export class Service {

  private url: string = "http://192.167.0.144:8080/api/pokemon";

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

getUsuarios(): Observable<any> {
  return this.http.get<any>(`${this.url}/usuarios`);
}
}