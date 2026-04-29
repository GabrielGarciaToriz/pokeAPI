import { Routes } from '@angular/router';
import { PokemonMainComponent } from './Components/pokemon-main-component/pokemon-main-component';
import { GetByIdPokemon } from './Components/get-by-id-pokemon/get-by-id-pokemon';

export const routes: Routes = [
        {path:"", component: PokemonMainComponent},
        {path:"pokemon/:idUsuario", component: GetByIdPokemon}

];
