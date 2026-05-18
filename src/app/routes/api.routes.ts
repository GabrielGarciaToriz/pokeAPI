const IP = "192.167.0.156";
const PORT = "8080";

const BASE_URL = `http://${IP}:${PORT}/api`;

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
  },
  POKEMON: {
    BASE: `${BASE_URL}/pokemon`,
    FAVORITO: `${BASE_URL}/favorito`,
    TODOS: `${BASE_URL}/pokemon/todos`,
    DESCRIPCION: 'https://pokeapi.co/api/v2/pokemon-species', 
  },
  USUARIO: {
    BASE: `${BASE_URL}/usuario`,
  },
  CATALOGO: {
    ROL: `${BASE_URL}/catalogo/rol`,
    TIPOS: `${BASE_URL}/catalogo/tipos`,
  },
  PASSWORD: {
    BASE: `${BASE_URL}/auth/password`,
  }
};