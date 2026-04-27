import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {  count, map, Observable } from 'rxjs';

import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { PokemonModel, PokemonResponse } from '../Interfaces/pokemon-model';
import { ResultModel } from '../Interfaces/result-model';

@Injectable({
  providedIn: 'root',
})
export class Service {

  private url: string = "https://pokeapi.co/api/v2/pokemon";
  private urlId: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor (private http: HttpClient){}



getByiD(nombre: string){
  return this.http.get<PokemonResponse>(this.urlId + nombre);
} 
   


getAll(limit: number, offset: number) {
  return this.http
    .get<any>(`${this.url}?limit=${limit}&offset=${offset}`)
    .pipe(
      map(response => {
        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map((p: any) => {
            const id = Number(p.url.split('/').filter(Boolean).pop());

            return {
              name: p.name,
              url: p.url,
              idPokemon: id,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            };
          })
        };
      })
    );
}


}