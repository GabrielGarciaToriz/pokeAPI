import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { TipoPokemonModel } from '../../Interfaces/tipo.pokemon.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PokemonService } from '../../Service/pokemon/pokemon.service';
import { PokemonStateService } from '../../Service/pokemon/pokemon.state.service';
import { CatalogoService } from '../../Service/catalogo/catalogo.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Service/auth/auth.service';
// FIX: PokemonDTO eliminado — el backend arma el pokemon desde caché, solo necesita idUsuario + idPokemon

@Component({
  standalone: true,
  selector: 'app-pokemon-main-component',
  imports: [FormsModule, RouterLink, CommonModule],
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

  persistiendo: Record<number, boolean> = {};
  yaGuardado: Record<number, boolean> = {};

  constructor(
    private pokemonService: PokemonService,
    private pokemonStateService: PokemonStateService,
    private catalogoService: CatalogoService,
    private authService: AuthService
  ) {}

  persistirPokemon(pokemon: PokemonModel): void {
    const id = pokemon.idPokemon;

    if (this.persistiendo[id] || this.yaGuardado[id]) return;

    const idUsuario = this.authService.getUsuarioId();
    if (!idUsuario) {
      Swal.fire({
        title: 'Sesión expirada',
        text: 'Por favor vuelve a iniciar sesión',
        icon: 'warning'
      });
      return;
    }

    this.persistiendo[id] = true;

    this.pokemonService.addFavorito(idUsuario, id).subscribe({
      next: () => {
        this.yaGuardado[id] = true;
        this.persistiendo[id] = false;
        Swal.fire({
          title: '¡Guardado!',
          text: `${pokemon.name.toUpperCase()} añadido a favoritos`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.persistiendo[id] = false;
        const mensaje = err?.error?.message ?? 'Error al guardar el favorito';
        Swal.fire({ title: 'Error', text: mensaje, icon: 'error' });
      }
    });
  }

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
    this.yaBusco = false;

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