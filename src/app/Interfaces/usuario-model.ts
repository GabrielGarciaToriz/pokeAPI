import { RolModel } from "./rol-model";

export interface UsuarioModel {
    idUsuarioPokemon: number;
    nombre: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    fechaNacimiento: Date,
    userName: string,
    password: string,
    sexo: string,
    correo: string,
    rol?: {
        idRol: number,
        Rol: string
    };
    activo: boolean;
}