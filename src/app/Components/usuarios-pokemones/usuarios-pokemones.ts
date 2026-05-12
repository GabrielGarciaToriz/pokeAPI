import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { PokemonDTO } from '../../Interfaces/pokemon.dto';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../Service/user/usuario.service';

@Component({
  selector: 'app-usuarios-pokemones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usuarios-pokemones.html',
  styleUrl: './usuarios-pokemones.css',
})
// ELIMINADO: @Injectable({ providedIn: 'root' }) 
export class UsuariosPokemones implements OnInit {
  public usuarios: UsuarioModel[] = [];
  public pokemonsFavoritos: PokemonDTO[] = [];

  constructor(private userService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.userService.getUsuarios().subscribe({
      next: (res) => {
        if (res.correct) {
          this.usuarios = res.objects ?? [];
        } else {
          Swal.fire({ title: 'Error', text: res.errorMessage, icon: 'error' });
        }
      },
      error: () => {
        Swal.fire({ title: 'Error', text: 'No se pudo conectar al servidor', icon: 'error' });
      },
    });
  }

  verDetalles(usuario: UsuarioModel): void { 

    this.userService.getPokemonFavoritoUsuario(usuario.idUsuarioPokemon).subscribe({
      next: (result) => {
        if (result.correct) {
          this.pokemonsFavoritos = result.objects ?? [];
          let pokemonesHtml = '';

          if (this.pokemonsFavoritos.length > 0) {
            pokemonesHtml = `
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
            pokemonesHtml = `
              <div class="alert alert-light mt-3 text-center border">
                <i class="bi bi-info-circle text-muted fs-4"></i>
                <p class="text-muted m-0 mt-1">Este entrenador aún no tiene Pokémones favoritos.</p>
              </div>`;
          }
          Swal.fire({
            title: `<span style="font-family: 'Bangers', cursive; color: #E3350D; letter-spacing: 2px;">Tarjeta de Entrenador</span>`,
            html: `
              <div class="text-start" style="font-family: 'Nunito', sans-serif;">
                <hr>
                <p class="mb-1"><strong>Nombre completo:</strong> ${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}</p>
                <p class="mb-1"><strong>Username:</strong> ${usuario.userName}</p>
                <p class="mb-1"><strong>Correo:</strong> ${usuario.correo}</p>
                <p class="mb-1"><strong>Fecha de Nacimiento:</strong> ${usuario.fechaNacimiento}</p>
                
                <h5 class="mt-4 text-center fw-bold bg-dark text-warning py-2 rounded-3">
                  <i class="bi bi-star-fill text-warning me-2"></i> Equipo / Favoritos
                </h5>
                ${pokemonesHtml}

                
              </div>
            `,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#2D3748',
            width: '550px',
          });

        } else {
          Swal.fire({ title: 'Error', text: result.errorMessage, icon: 'error' });
        }
      },
      error: () => {
        Swal.fire({ title: 'Error', text: 'No se pudo conectar al servidor', icon: 'error' });
      },
    });
  }

  deleteUsuarios(idUsuario: number): void {
    Swal.fire({
      title: '¿Eliminar Entrenador?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2D3748',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsuarios(idUsuario).subscribe({
          next: (res) => {
            if (res.correct) {
              Swal.fire('Eliminado', 'Entrenador eliminado exitosamente', 'success');
              this.getUsuarios();
            } else {
              Swal.fire('Error', res.errorMessage, 'error');
            }
          },
          error: () => Swal.fire('Error', 'No se pudo conectar', 'error'),
        });
      }
    });
  }
}