const IP = "192.167.0.106";
export const API_ROUTES = {
  AUTH: {
    LOGIN: `http://${IP}:8080/api/auth/login`,
  },
  POKEMON: {
    BASE: `http://${IP}:8080/api/pokemon`,
    FAVORITO: `http://${IP}:8080/api/favorito`,
    TODOS: `http://${IP}:8080/api/pokemon/todos`,
    DESCRIPCION: 'https://pokeapi.co/api/v2/pokemon-species',
  },
  USUARIO: {
    BASE: `http://${IP}:8080/api/usuario`,
  },
  CATALOGO: {
    ROL: `http://${IP}:8080/api/catalogo/rol`,
    TIPOS: `http://${IP}:8080/api/catalogo/tipos`,
  },
  PASSWORD: {
    BASE: `http://${IP}:8080/api/auth/password`,
  }
};
