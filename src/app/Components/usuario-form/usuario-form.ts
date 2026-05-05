import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioModel } from '../../Interfaces/usuario-model';
import { Service } from '../../Service/service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm {

public usuario : UsuarioModel | undefined;

constructor (private service: Service, private router: Router){}

private formularioReactiv = inject(FormBuilder);


public formulario = this.formularioReactiv.group({
  nombre: [''],
  apellidoMaterno: [''],
  apellidoPaterno: [''],
  userName: [''],
  password: [''],
  sexo: [''],
  email:[''],
  fechaNacimiento:this.formularioReactiv.control<Date | null>(null)

  
})



enviarDatos(){
  this.usuario = this.formulario.value as UsuarioModel;
  console.log(this.usuario);
  this.service.addUsuario(this.usuario).subscribe(data => {
    console.log(data);
    Swal.fire({
  title: "El usuario se ha creado con éxito",
  icon: "success",
  draggable: true
});
this.router.navigate(['/usuarios']);
  });

  
}
}