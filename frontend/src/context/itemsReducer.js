import { types } from './types';

export const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case types.getItems:
      return {
        ...state,
        items: action.payload,
      };
    case types.postItem:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
};
