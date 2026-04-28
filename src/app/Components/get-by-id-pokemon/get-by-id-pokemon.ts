import { Component, inject } from '@angular/core';
import { Service } from '../../Service/service';
import { PokemonModel } from '../../Interfaces/pokemon-model';

@Component({
  selector: 'app-get-by-id-pokemon',
  imports: [],
  templateUrl: './get-by-id-pokemon.html',
  styleUrl: './get-by-id-pokemon.css',
})
export class GetByIdPokemon {



private service = inject(Service);

  public pokemones: PokemonModel[] = [];

  

getById(nombre: string) {
    this.service.getById(nombre).subscribe(data => {
      this.pokemones = data.results;
    });
  }
}
