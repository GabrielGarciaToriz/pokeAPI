import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { TipoPokemonModel } from '../../Interfaces/tipo.pokemon.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PokemonService } from '../../Service/pokemon/pokemon.service';
import { PokemonStateService } from '../../Service/pokemon/pokemon.state.service';
import { CatalogoService } from '../../Service/catalogo/catalogo.service';

@Component({
  selector: 'app-pokemon-main-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './pokemon-main-component.html',
  styleUrl: './pokemon-main-component.css',
})
export class PokemonMainComponent implements OnInit {
  public limit = 20;
  public page = 0;

  public searchId: string = '';
  public searchNombre: string = '';
  public searchTipo1: string = '';
  public searchTipo2: string = '';

  public tipos: TipoPokemonModel[] = [];

  public pokemonsFiltrados: PokemonModel[] = [];
  public pokemones: PokemonModel[] = [];
  public pokemonesPaginados: PokemonModel[] = [];
  public buscando = false;
  public yaBusco = false;

  constructor(
    private pokemonService: PokemonService,
    private pokemonStateService: PokemonStateService,
    private catalogoService: CatalogoService,
  ) { }

  ngOnInit(): void {
    this.pokemonStateService.obtenerTodos().subscribe({
      next: (result) => {
        this.pokemones = result;
        this.aplicarPagina();
      },
      error: () => Swal.fire({ title: 'Error de conexión', icon: 'error' })
    });

    this.catalogoService.getTipos().subscribe({
      next: (result) => {
        this.tipos = result.objects ?? [];
      },
      error: () => Swal.fire({ title: 'Error al cargar tipos', icon: 'error' })
    });
  }

  get tiposParaTipo2(): TipoPokemonModel[] {
    return this.tipos.filter(t => t.nombre !== this.searchTipo1);
  }

  onTipo1Change(): void {
    if (this.searchTipo2 && this.searchTipo2 === this.searchTipo1) {
      this.searchTipo2 = '';
    }
  }

  get hayFiltros(): boolean {
    const idVal = this.searchId != null ? String(this.searchId).trim() : '';
    const nombreVal = this.searchNombre != null ? this.searchNombre.trim() : '';

    return idVal !== '' || nombreVal !== '' || this.searchTipo1 !== '';
  }

  buscar(): void {
    if (!this.hayFiltros) return;

    const idStr = this.searchId != null ? String(this.searchId).trim() : '';
    const id = idStr !== '' ? parseInt(idStr, 10) : undefined;
    
    const nombreStr = this.searchNombre != null ? this.searchNombre.trim() : '';
    const nombre = nombreStr !== '' ? nombreStr : undefined;
    
    const tipo = this.searchTipo1 !== '' ? this.searchTipo1 : undefined;

    this.buscando = true;
    this.yaBusco  = false;

    this.pokemonService.buscarPokemon(id, nombre, tipo).subscribe({
      next: (response) => {
        let resultados: PokemonModel[] = response.correct ? (response.objects ?? []) : [];

        if (this.searchTipo2 !== '' && resultados.length > 0) {
          resultados = resultados.filter(p =>
            p.types?.some(t => t.toLowerCase() === this.searchTipo2.toLowerCase())
          );
        }

        this.pokemonsFiltrados = resultados;
        this.buscando = false;
        this.yaBusco = true;
      },
      error: () => {
        this.pokemonsFiltrados = [];
        this.buscando = false;
        this.yaBusco = true;
      }
    });
  }

  limpiarBusqueda(): void {
    this.searchId = '';
    this.searchNombre = '';
    this.searchTipo1 = '';
    this.searchTipo2 = '';
    this.pokemonsFiltrados = [];
    this.yaBusco = false;
  }

  aplicarPagina(): void {
    this.pokemonesPaginados = this.pokemones.slice(this.page, this.page + this.limit);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina < 0) return;
    this.page = nuevaPagina;
    this.aplicarPagina();
  }
}