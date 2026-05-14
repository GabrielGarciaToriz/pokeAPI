import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { PokemonDTO } from '../../Interfaces/pokemon.dto';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../Service/user/usuario.service';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-usuarios-pokemones',
  standalone: true,
  imports: [
    RouterLink,
    // Angular Material
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './usuarios-pokemones.html',
  styleUrl: './usuarios-pokemones.css',
})
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