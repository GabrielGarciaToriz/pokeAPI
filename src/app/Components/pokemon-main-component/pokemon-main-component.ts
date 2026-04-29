import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonModel } from '../../Interfaces/pokemon-model';
import { Service } from '../../Service/service';
import { FormsModule } from '@angular/forms'; // 1. Importar

@Component({
  selector: 'app-pokemon-main-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './pokemon-main-component.html',
  styleUrl: './pokemon-main-component.css',
})
export class PokemonMainComponent implements OnInit {
  public limit: number = 20;
  public offset: number = 0;
  public total: number = 0;
  public searchTerm: string = '';
  public pokemonsFiltrados: PokemonModel[] = [];
  public pokemones: PokemonModel[] = [];

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(data => {
      this.pokemones = data.objects;
      console.log(data);

      this.total = data.objects.length;});
      this.filtrar();
  }

  PaginaSiguiente() {
    this.offset += this.limit;
    this.filtrar();
  }

  PaginaAnterior() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.filtrar();
    }
  }

 

filtrar() {
  this.pokemonsFiltrados = this.pokemones.filter(p =>
    p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

  
}
