import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../Service/pokemon/pokemon.service';
import { AuthService } from '../../Service/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-pokemon-favoritos',
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon.favorito.html',
  styleUrl: './pokemon.favorito.css',
})
export class PokemonFavoritosComponent implements OnInit {

  favoritos: any[] = [];
  cargando = true;
  eliminando: Record<number, boolean> = {};

  constructor(
    private pokemonService: PokemonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    const idUsuario = this.authService.getUsuarioId();
    if (!idUsuario) return;

    this.cargando = true;
    this.pokemonService.getFavoritos(idUsuario).subscribe({
      next: (result) => {
        // El backend devuelve Result con objects: lista de UsuarioPokemonFavorito
        // Cada favorito tiene { pokemon: { idPokemon, name, spriteFront, tipoUno, tipoDos, ... } }
        this.favoritos = result.correct ? (result.objects ?? []) : [];
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        Swal.fire({ title: 'Error al cargar favoritos', icon: 'error' });
      }
    });
  }

  eliminar(idPokemon: number, nombre: string): void {
    const idUsuario = this.authService.getUsuarioId();
    if (!idUsuario || this.eliminando[idPokemon]) return;

    Swal.fire({
      title: `¿Eliminar a ${nombre.toUpperCase()}?`,
      text: 'Se quitará de tu lista de favoritos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9e1b22',
      cancelButtonColor: '#444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.eliminando[idPokemon] = true;

      this.pokemonService.eliminarFavorito(idUsuario, idPokemon).subscribe({
        next: (res) => {
          this.eliminando[idPokemon] = false;
          if (!res.correct) {
            Swal.fire({ title: 'Error', text: res.errorMessage, icon: 'error' });
            return;
          }
          this.favoritos = this.favoritos.filter(f => f.pokemon.idPokemon !== idPokemon);
          Swal.fire({ title: 'Eliminado', icon: 'success', timer: 1200, showConfirmButton: false });
        },
        error: () => {
          this.eliminando[idPokemon] = false;
          Swal.fire({ title: 'Error al eliminar', icon: 'error' });
        }
      });
    });
  }
}