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
export class PokemonMainComponent implements OnInit{
        public pokemones : PokemonModel [] = []; 

        constructor (private service : Service){}

        ngOnInit(): void {
          this.getAll();
        }

        getAll(){
          this.service.getAll().subscribe(
            data => {
              this.pokemones  = data.objects;
              console.log(data);
              }, error => {
                console.error('Error:', error);
              }
          );
        }
      }

