import { Routes } from '@angular/router';
import { PokemonMainComponent } from './Components/pokemon-main-component/pokemon-main-component';
import { GetByIdPokemon } from './Components/get-by-id-pokemon/get-by-id-pokemon';
import { UsuariosPokemones } from './Components/usuarios-pokemones/usuarios-pokemones';
import { UsuarioForm } from './Components/usuario-form/usuario-form';
import { Login } from './Components/login/login';
import { ForgotPassword } from './Components/forgotPassword/forgot.password';
import { ResetPassword } from './Components/resetPassword/reset.password';
import { UsuarioDetails } from './Components/usuario-details/usuario-details';
import { PokemonFavoritosComponent } from './Components/pokemon-favoritos/pokemon.favorito';

export const routes: Routes = [
        { path: "pokemones", component: PokemonMainComponent },
        { path: "pokemon/:idUsuario", component: GetByIdPokemon },
        { path: "usuarios", component: UsuariosPokemones },
        { path: "formulario", component: UsuarioForm },
        { path: "", component: Login },
        { path: "usuario/:idUsuario", component: UsuarioDetails },
        { path: 'forgot-password', component: ForgotPassword },
        { path: 'reset-password', component: ResetPassword },
        { path: 'favoritos', component: PokemonFavoritosComponent }

];
