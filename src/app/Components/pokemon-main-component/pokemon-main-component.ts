import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonModel } from '../../Interfaces/pokemon.model';
import { Service } from '../../Service/service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemon-main-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './pokemon-main-component.html',
  styleUrl: './pokemon-main-component.css',
})
export class PokemonMainComponent implements OnInit {

  public limit: number = 20;
  public page: number = 0;
  public total: number = 0;
  public searchTerm: string = '';
  public pokemonsFiltrados: PokemonModel[] = [];
  public pokemones: PokemonModel[] = [];
  public pokemonesPaginados: PokemonModel[] = [];

  constructor(private service: Service) {}

  ngOnInit(): void {
    this.paginacion();
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe({
      next: (res) => {
        if (res.correct) {
          this.pokemones = res.objects ?? [];
          this.total = this.pokemones.length;
          this.filtrar();
        } else {
          Swal.fire({ title: 'Error al cargar pokémones', text: res.errorMessage, icon: 'error' });
        }
      },
      error: () => {
        Swal.fire({ title: 'Error de conexión', text: 'No se pudo conectar con el servidor', icon: 'error' });
      }
    });
  }

  filtrar(): void {
    const term = this.searchTerm.toLowerCase();
    this.pokemonsFiltrados = this.pokemones.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.idPokemon.toString().includes(term)
    );
  }

  paginacion(): void {
    this.service.paginacion(this.page, this.limit).subscribe({
      next: (res) => {
        if (res.correct) {
          this.pokemonesPaginados = res.objects ?? [];
          this.total = this.pokemonesPaginados.length;
        } else {
          Swal.fire({ title: 'Error al paginar', text: res.errorMessage, icon: 'error' });
        }
      },
      error: () => {
        Swal.fire({ title: 'Error de conexión', text: 'No se pudo conectar con el servidor', icon: 'error' });
      }
    });
  }

  actualizarPagina(): void {
    const inicio = (this.page - 1) * this.limit;
    const fin = inicio + this.limit;
    this.pokemonesPaginados = this.pokemones.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina < 0) return;
    this.page = nuevaPagina;
    this.paginacion();
  }


  private urlEsFavorito: string = "http://";
  cambiarChecbox(): void {

    Swal.fire({
      title: '¡Se ha agregado a sus favoritos!',
      icon: 'success',
      draggable: true,
    });
  }
}