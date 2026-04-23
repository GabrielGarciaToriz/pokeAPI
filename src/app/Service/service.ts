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

  private url: string = "https://pokeapi.co/api/v2/pokemon";

  constructor (private http: HttpClient){}


 getAll(): Observable <ResultModel<PokemonModel>> {
  return this.http.get<ResultModel<PokemonModel>>(this.url);
}
}