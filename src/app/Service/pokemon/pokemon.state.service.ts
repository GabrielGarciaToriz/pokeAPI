// pokemon-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { PokemonService as Service } from "./pokemon.service";

@Injectable({ providedIn: 'root' })
export class PokemonStateService {

  private pokemones$ = new BehaviorSubject<PokemonModel[] | null>(null);
  private cargando = false;

  constructor(private service: Service) {}

  obtenerTodos(): Observable<PokemonModel[]> {
    if (!this.pokemones$.value && !this.cargando) {
      this.cargando = true;

      this.service.getTodos().pipe(take(1)).subscribe({
        next: (result) => {
          if (result.correct) {
            this.pokemones$.next(result.objects ?? []);
          }
          this.cargando = false;
        },
        error: () => { 
          this.cargando = false; 
        }
      });
    }

    return this.pokemones$.pipe(
      filter((p): p is PokemonModel[] => p !== null)
    );
  }

  obtenerPorId(id: number): PokemonModel | undefined {
    return this.pokemones$.value?.find(p => p.idPokemon === id);
  }

  invalidarCache(): void {
    this.pokemones$.next(null);
    this.cargando = false;
  }

  get yaFueCargado(): boolean {
    return this.pokemones$.value !== null;
  }
}