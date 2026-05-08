import { Component } from '@angular/core';
import { UsuarioModel } from '../../Interfaces/usuario-model';
import { Service } from '../../Service/service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios-pokemones',
  imports: [RouterLink],
  templateUrl: './usuarios-pokemones.html',
  styleUrl: './usuarios-pokemones.css',
})
export class UsuariosPokemones {

  public usuarios: UsuarioModel[] = [];

  constructor(private service: Service) { }


  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.service.getUsuarios().subscribe(
      {
        next: (res) => {
          if (res.correct) {
            this.usuarios = res.objects ?? [];
          } else {
            Swal.fire({
              title: 'Error al cargar usuarios',
              text: res.errorMessage,
              icon: 'error'
            });
          }
        },
        error: () => {
          Swal.fire({
            title: 'Error al cargar usuarios',
            text: "No se pudo conectar al servidor",
            icon: 'error'
          });
        }
      }
    );
  }

deleteUsuarios(idUsuario: number): void {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUsuarios(idUsuario).subscribe({
          next: (res) => {
            if (res.correct) {
              Swal.fire({
                title: 'Usuario eliminado',
                icon: 'success',
                draggable: true
              });
              this.getUsuarios(); // ✅ refresca la lista
            } else {
              Swal.fire({
                title: 'No se pudo eliminar',
                text: res.errorMessage,
                icon: 'error'
              });
            }
          },
          error: () => {
            Swal.fire({
              title: 'Error de conexión',
              text: 'No se pudo conectar con el servidor',
              icon: 'error'
            });
          }
        });
      }
    });
  }
}
