import { Component, inject } from '@angular/core';
import { Service } from '../../Service/service';
import { PokemonModel } from '../../Interfaces/pokemon-model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-by-id-pokemon',
  imports: [RouterLink],
  templateUrl: './get-by-id-pokemon.html',
  styleUrl: './get-by-id-pokemon.css',
})
export class GetByIdPokemon {


  constructor(private route: ActivatedRoute) {} // Inyección
private service = inject(Service);

  public pokemon: PokemonModel | undefined;


 ngOnInit(): void {
  this.route.params.subscribe(params => {
    const idUsuario = params['idUsuario'];
    this.getById(idUsuario);
  });
}

 getById(id: number) {
     this.service.getById(id).subscribe(data => {
       this.pokemon = data.object;
       console.log(data)
       
       
     });
   }
 }
  
