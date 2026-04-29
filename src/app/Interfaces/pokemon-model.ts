import { SpritesModels } from "./sprites-models";

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
  stats:{
   specialattack: number,
    defense: number,
    attack: number,
    hp: number,
    special_defense: number,
    speed: number
   },
   moves: string[]

  }




