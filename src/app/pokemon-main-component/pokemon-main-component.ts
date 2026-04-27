import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonModel } from '../Interfaces/pokemon-model';
import { Service } from '../Service/service';

@Component({
  selector: 'app-pokemon-main-component',
  imports: [],
  templateUrl: './pokemon-main-component.html',
  styleUrl: './pokemon-main-component.css',
})
export class PokemonMainComponent implements OnInit {
  public limit: number = 20;
  public offset: number = 0;
  public total: number = 0;

  public pokemones: PokemonModel[] = [];

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll(this.limit, this.offset).subscribe(data => {
      this.pokemones = data.results;
      this.total = data.count;
    });
  }

  PaginaSiguiente() {
    this.offset += this.limit;
    this.getAll();
  }

  PaginaAnterior() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.getAll();
    }
  }

  getById(nombre: string) {
    this.service.getByiD(nombre).subscribe(data => {
      this.pokemones = data.results;
    });
  }
}
