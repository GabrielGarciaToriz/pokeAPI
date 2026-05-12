import { Component, inject, OnInit} from '@angular/core';
import { UsuarioModel } from '../../Interfaces/usuario.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioService } from '../../Service/user/usuario.service';
import { Service } from '../../Service/service';

@Component({
  selector: 'app-usuario-details',
  standalone: true,
  imports: [],
  templateUrl: './usuario-details.html',
  styleUrl: './usuario-details.css',
})
export class UsuarioDetails implements OnInit{

  private route = inject(ActivatedRoute);
    private service = inject(UsuarioService);


  public usuario : UsuarioModel | undefined;

  ngOnInit(): void{
    this.route.params.subscribe((param) =>{
      const idUsuario = param['idUsuario'];
      this.details(idUsuario)
      console.log(idUsuario)
  })
}

  details(idUsuario: number){
    this.service.detailsUsuario(idUsuario).subscribe((data) =>{
      this.usuario = data.object;
      console.log(this.usuario)
    })

  }
  }

  




