export interface PokemonDTO {
    idPokemon: number;
    nombre: String;
    peso: string;
    altura: string;
    tipoUno: string;
    tipoDos?: string;
    spriteFrontal: string;
    isDefault: boolean;
}