import { Component } from '@angular/core';
import { UsuarioModel } from '../../Interfaces/usuario-model';
import { Service } from '../../Service/service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-pokemones',
  imports: [RouterLink],
  templateUrl: './usuarios-pokemones.html',
  styleUrl: './usuarios-pokemones.css',
})
export class UsuariosPokemones {

public usuarios: UsuarioModel[] = [];

constructor (private service: Service) {}


ngOnInit(): void {
this.getUsuarios();
}

getUsuarios(){
  this.service.getUsuarios().subscribe(data => {
    this.usuarios = data.objects;
    console.log(data);
  });
}

deleteUsuarios(idusuario: number) {
  this.service.deleteUsuarios(idusuario).subscribe({next: (data) => {
    console.log(data);
    this.getUsuarios(); 
  
  }});

}
}
