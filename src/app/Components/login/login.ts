import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UsuarioModel } from '../../Interfaces/usuario-model';
import { Service } from '../../Service/service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

public errorMessage = "";

public usuario : UsuarioModel | undefined;

constructor (private service: Service, private router: Router){}

private formularioReactivo = inject(FormBuilder);

public formulario = this.formularioReactivo.group({
  correo : [''],
  password: ['']

}
);

enviarDatos(){
  this.usuario = this.formulario.value as UsuarioModel;
  this.service.login(this.usuario).subscribe( data =>{
    console.log(this.usuario);
            this.router.navigate(['/pokemones']);
  },error =>{
    this.errorMessage = "No se ha encontrado el usuario"
    console.log(this.errorMessage)
  }

  )
}



}
