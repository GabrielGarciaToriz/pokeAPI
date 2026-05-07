import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonModel } from '../../Interfaces/pokemon-model';
import { Service } from '../../Service/service';
import { FormsModule } from '@angular/forms'; // 1. Importar
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
  public total: number = 12000;
  public searchTerm: string = '';
  public pokemonsFiltrados: PokemonModel[] = [];
  public pokemones: PokemonModel[] = [];
  public pokemonesPaginados: PokemonModel[] = [];

  constructor(private service: Service) {}

  ngOnInit(): void {
    this.paginacion();

    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((data) => {
      this.pokemones = data.objects;
      console.log(data);

      this.total = data.objects.length;
    });
    this.filtrar();
  }

  // PaginaSiguiente() {
  //   this.offset += this.limit;
  //   this.filtrar();
  // }

  // PaginaAnterior() {
  //   if (this.offset > 0) {
  //     this.offset -= this.limit;
  //     this.filtrar();
  //   }
  // }

  filtrar() {
    this.pokemonsFiltrados = this.pokemones.filter(
      (p) =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.idPokemon.toString().includes(this.searchTerm.toLowerCase()),
    );
  }

  paginacion() {
    this.service.paginacion(this.page, this.limit).subscribe((data) => {
      this.pokemonesPaginados = data.objects;
      this.total = data.objects.length;
      console.log(this.total);
    });
  }

  actualizarPagina() {
    const inicio = (this.page - 1) * this.limit;
    const fin = inicio + this.limit;

    this.pokemonesPaginados = this.pokemones.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.page = nuevaPagina;
    this.paginacion();
  }

  cambiarChecbox() {
    Swal.fire({
      title: '¡Se ha agregado a sus favoritos!',
      icon: 'success',
      draggable: true,
    });
  }
}
