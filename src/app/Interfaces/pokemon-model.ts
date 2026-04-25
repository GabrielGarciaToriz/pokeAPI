export interface PokemonModel {
    id: number,
    name: string,
    url: string
}

export interface PokemonResponse {
  results: PokemonModel[];
}