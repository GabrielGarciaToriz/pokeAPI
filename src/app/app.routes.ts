import { Routes } from '@angular/router';
import { PokemonMainComponent } from './Components/pokemon-main-component/pokemon-main-component';
import { GetByIdPokemon } from './Components/get-by-id-pokemon/get-by-id-pokemon';
import { UsuariosPokemones } from './Components/usuarios-pokemones/usuarios-pokemones';
import { UsuarioForm } from './Components/usuario-form/usuario-form';

export const routes: Routes = [
        {path:"", component: PokemonMainComponent},
        {path:"pokemon/:idUsuario", component: GetByIdPokemon},
        {path:"usuarios", component: UsuariosPokemones},
        {path: "formulario", component: UsuarioForm}

];
