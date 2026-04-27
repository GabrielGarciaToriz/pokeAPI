export interface PokemonModel {
    idPokemon: number,
    name: string,
    url: string,
    image: string,
    count: number
}

export interface PokemonResponse {
  results: PokemonModel[];
}