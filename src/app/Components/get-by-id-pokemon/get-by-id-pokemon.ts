import { Component, inject, OnInit } from '@angular/core';
import { Service } from '../../Service/service';
import { PokemonModel } from '../../Interfaces/pokemon-model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-by-id-pokemon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './get-by-id-pokemon.html',
  styleUrl: './get-by-id-pokemon.css',
})
export class GetByIdPokemon implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(Service);

    public descripcion: string = '';

  public pokemon: PokemonModel | undefined;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idUsuario = params['idUsuario'];
      this.getById(idUsuario);

      this.service.getPokemonDescription(idUsuario)
      .subscribe(data => {

        // Buscar descripción en español
        const entrada = data.flavor_text_entries.find(
          (x: any) => x.language.name === 'es'
        );

        this.descripcion = entrada?.flavor_text;
      });
    });
    
  }
  

  getById(id: number) {
    this.service.getById(id).subscribe((data) => {
      this.pokemon = data.object;
      console.log('Pokémon cargado:', this.pokemon);
      if (this.pokemon?.cries?.latest) {
        this.reproducirCry(this.pokemon.cries.latest);
      }
    });
  }
  private reproducirCry(url: string): void {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch((err) => {
      console.warn('No se pudo reproducir el grito automáticamente:', err);
    });
  }

  getdesc(id: number){
    this.service.getDatosAdicionales(id).subscribe((data)=>{
      this.pokemon = data.object;
      console.log(data)
    })
  }

  
}