import { types } from './types';

export const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case types.getItems:
      return {
        ...state,
        items: action.payload,
      };
    case types.getUsuarios:
      return {
        ...state,
        usuarios: action.payload,
      };
    case types.getCaracteristicas:
      return {
        ...state,
        caracteristicas: action.payload,
      };
    case types.getRandoms:
      return {
        ...state,
        itemsRandoms: action.payload,
      };
    case types.postItem:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case types.deleteItem:
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: filteredItems,
      };
    case types.deleteUser:
      const filteredUsers = state.usuarios.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        usuarios: filteredUsers,
      };
    case types.getCategorias:
      return {
        ...state,
        categorias: action.payload,
      };
    default:
      return state;
  }
};
