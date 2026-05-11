import { Component, inject, OnInit } from '@angular/core';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Injectable } from '@angular/core';
import { PokemonService } from '../../Service/pokemon/pokemon.service';
import { PokemonStateService } from "../../Service/pokemon/pokemon.state.service";

@Component({
  selector: 'app-get-by-id-pokemon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './get-by-id-pokemon.html',
  styleUrl: './get-by-id-pokemon.css',
})
@Injectable({ providedIn: 'root' })
export class GetByIdPokemon implements OnInit {
  constructor(
    private pokemonStateService: PokemonStateService,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
  ) { }

  public pokemon: PokemonModel | undefined;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idUsuario = Number(params['idUsuario']);
      this.cargarPokemon(idUsuario);
    });
  }
  private cargarPokemon(id: number): void {
    const enMemoria = this.pokemonStateService.obtenerPorId(id);

    if (enMemoria) {
      this.pokemon = enMemoria;
      if (this.pokemon?.cries?.latest) {
        this.reproducirCry(this.pokemon.cries.latest);
      }
      return;
    }

    this.pokemonService.getPokemonById(id).subscribe(data => {
      this.pokemon = data.object;
      if (this.pokemon?.cries?.latest) {
        this.reproducirCry(this.pokemon.cries.latest);
      }
      return;
    }
  }


  private reproducirCry(url: string): void {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch((err) => {
      console.warn('No se pudo reproducir el grito automáticamente:', err);
    });
  }
}
