import { Component, inject, InjectionToken } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolModel } from '../../Interfaces/rol.model';

import { CatalogoService } from '../../Service/catalog/catalogo.service';
import { UsuarioService } from "../../Service/user/usuario.service";

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm {
  public usuario: UsuarioModel | undefined;
  public roles: RolModel[] = [];

<<<<<<< HEAD
  constructor(private CatalogoService: CatalogoService, private router: Router, private usuarioService: UsuarioService) { }
=======
  private service = inject(Service)

  constructor(private CatalogoService: CatalogoService, private router: Router) { }
>>>>>>> fix/dilan-sweetAlertFavoritos_y_descripciónPokemones

  private formularioReactiv = inject(FormBuilder);

  public formulario = this.formularioReactiv.group({
    nombre: [''],
    apellidoMaterno: [''],
    apellidoPaterno: [''],
    userName: [''],
    password: [''],
    sexo: [''],
    correo: [''],
    fechaNacimiento: this.formularioReactiv.control<Date | null>(null),
    idRol: [0],
  });

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.CatalogoService.getRoles().subscribe({
      next: (res) => {
        if (res.correct) {
          this.roles = res.objects ?? [];
        } else {
          Swal.fire({
            title: 'Error al cargar roles',
            text: res.errorMessage,
            icon: 'error',
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudieron cargar los roles',
          icon: 'error',
        });
      },
    });
  }

  enviarDatos() {
    const formValue = this.formulario.value;

    this.usuario = {
      ...formValue,
      rol: {
        idRol: Number(formValue.idRol),
      },
    } as UsuarioModel;

    this.usuarioService.addUsuario(this.usuario).subscribe(
      {
        next: (res) => {
          if (res.correct) {
            Swal.fire({
              title: 'El usuario se ha creado con éxito',
              icon: 'success',
              draggable: true
            });
            this.router.navigate(['/usuarios']);
          } else {
            Swal.fire({
              title: 'Error al crear usuario',
              text: res.errorMessage,
              icon: 'error'
            });
          }
        },
        error: (res) => {
          Swal.fire({
            title: 'Error al crear usuario',
            text: res.errorMessage,
            icon: 'error'
          });
        }
      },
    );
  
  }
}


