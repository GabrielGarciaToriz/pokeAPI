import { HttpClient } from "@angular/common/http";
import { ResultModel } from "../../Interfaces/result.model";
import { Observable } from "rxjs";
import { PokemonModel } from "../../Interfaces/pokemon.model";
import {UsuarioModel} from "../../Interfaces/usuario.model";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private urlUsuarios: string = "http://192.167.0.98:8080/api/usuario";

    constructor(private http: HttpClient) { }

    getUsuarios(): Observable<ResultModel<UsuarioModel>> {
        return this.http.get<ResultModel<UsuarioModel>>(this.urlUsuarios);
    }

    deleteUsuarios(idusuario: number): Observable<ResultModel<UsuarioModel>> {
        return this.http.delete<ResultModel<UsuarioModel>>(this.urlUsuarios + "/" + idusuario);
    }


    addUsuario(usuario: UsuarioModel): Observable<ResultModel<UsuarioModel>> {
        return this.http.post<ResultModel<UsuarioModel>>(this.urlUsuarios + "/agregar", usuario);
    }
}