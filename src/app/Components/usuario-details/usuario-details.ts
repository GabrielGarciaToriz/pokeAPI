import { Component, inject, OnInit} from '@angular/core';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../Service/user/usuario.service';
import { Service } from '../../Service/service';
import { PokemonDTO } from '../../Interfaces/pokemon.dto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usuario-details.html',
  styleUrl: './usuario-details.css',
})


export class UsuarioDetails implements OnInit{

  private route = inject(ActivatedRoute);
    private service = inject(UsuarioService);


  public usuario : UsuarioModel | undefined;
    public pokemonsFavoritos: PokemonDTO [] = [];
    public pokemonesHtml: string = "";

  ngOnInit(): void{
    this.route.params.subscribe((param) =>{
      const idUsuario = param['idUsuario'];
      this.details(idUsuario)
      console.log(idUsuario)
  })
}

  details(idUsuario: number): void{
    this.service.detailsUsuario(idUsuario).subscribe((data) =>{      
      console.log(data.objects)
     this.usuario = data.objects[0] as UsuarioModel;


      this.service.getPokemonFavoritoUsuario(this.usuario.idUsuarioPokemon).subscribe({
           next: (result) => {
             if (result.correct) {
               this.pokemonsFavoritos = result.objects ?? [];
               let pokemonesHtml = '';
     
               if (this.pokemonsFavoritos.length > 0) {
                 this.pokemonesHtml = `
                   <div class="d-flex flex-wrap gap-2 justify-content-center mt-3">
                     ${this.pokemonsFavoritos.map((p: any) => `
                       <div class="text-center shadow-sm" style="background: #f8f9fa; border: 2px solid #e2e8f0; border-radius: 12px; padding: 10px; width: 120px;">
                         <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon.idPokemon}.png" width="60" alt="poke"/>
                         <small class="d-block fw-bold text-dark text-truncate" style="font-size: 11px;">${p.pokemon.name ? p.pokemon.name.toUpperCase() : 'POKÉMON'}</small>
                       </div>
                     `).join('')}
                   </div>
                 `;
               } else {
                 this.pokemonesHtml = `
                     <p class="m-0 mt-1 text-danger">Este entrenador aún no tiene Pokémones favoritos.</p>
                   `;
               }
              
     
             } else {
               Swal.fire({ title: 'Error', text: result.errorMessage, icon: 'error' });
             }
           },
           error: () => {
             Swal.fire({ title: 'Error', text: 'No se pudo conectar al servidor', icon: 'error' });
           },
         });
       }
      )



  }
  }

  




