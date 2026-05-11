import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PokemonService } from '../../Service/pokemon/pokemon.service';
import { PokemonStateService } from '../../Service/pokemon/pokemon.state.service';

@Component({
  selector: 'app-pokemon-main-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './pokemon-main-component.html',
  styleUrl: './pokemon-main-component.css',
})
export class PokemonMainComponent implements OnInit {
  public limit = 40;
  public page = 0;
  public searchTerm = '';
  public pokemonsFiltrados: PokemonModel[] = [];
  public pokemones: PokemonModel[] = [];
  public pokemonesPaginados: PokemonModel[] = [];

  constructor(
    private pokemonService: PokemonService,
    private pokemonStateService: PokemonStateService,
  ) { }

  ngOnInit(): void {
    this.pokemonStateService.obtenerTodos().subscribe({
      next: (result) => {
        this.pokemones = result;
        this.aplicarPagina();
      },
      error: (err) => {
        Swal.fire({ title: 'Error de conexión', icon: 'error' });
      }
    });
  }

  filtrar(): void {
    const term = this.searchTerm.toLowerCase();
    this.pokemonsFiltrados = this.pokemones.filter(
      p => p.name.toLowerCase().includes(term) ||
        p.idPokemon.toString().includes(term)
    );
  }

  aplicarPagina(): void {
    const inicio = this.page;
    this.pokemonesPaginados = this.pokemones.slice(inicio, inicio + this.limit);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina < 0) return;
    this.page = nuevaPagina;
    this.aplicarPagina();

  }


}
