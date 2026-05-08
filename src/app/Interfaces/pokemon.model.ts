import { SpritesModels } from "./sprites.model";

export interface PokemonModel {
  idPokemon: number,
  name: string,
  weight: number,
  height: number,
  types: string[],
  sprites: {
    back_default: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string
  },
  stats: {
    "special-attack": number,
    defense: number,
    attack: number,
    hp: number,
    "special-defense": number,
    speed: number
  },
  moves: string[],
  cries?: {
    latest: string;
    legacy: string | null;
  };

}




