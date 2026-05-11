import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, filter, tap } from 'rxjs';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { PokemonService } from './pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonStateService {
  private pokemons$ = new BehaviorSubject<PokemonModel[] | null>(null);
  private cargando = false;

  constructor(private pokemonService: PokemonService) {}

  obtenerTodos(): Observable<PokemonModel[]> {
    if (this.pokemons$.value === null && !this.cargando) {
      this.cargando = true;

      this.pokemonService
        .getTodos()
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            if (result.correct) {
              this.pokemons$.next(result.objects ?? []);
            }
            this.cargando = false;
          },
          error: () => {
            this.cargando = false;
          },
        });
    }
    return this.pokemons$.pipe(filter((pokemon): pokemon is PokemonModel[] => pokemon !== null));
  }

  obtenerPorId(id: number): PokemonModel | undefined {
    return this.pokemons$.value?.find((p) => p.idPokemon === id);
  }

  get cargados(): boolean {
    return this.pokemons$.value !== null;
  }
}
