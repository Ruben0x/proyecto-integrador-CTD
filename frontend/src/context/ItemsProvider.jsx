import React, { useCallback, useEffect, useReducer } from 'react';
import { ItemsContext } from './ItemsContext';
import { itemReducer } from './itemsReducer';
import axios from 'axios';
import { types } from './types';
import { toast } from 'sonner';

const initialState = {
  items: [],
};

export const ItemsProvider = ({ children }) => {
  const [itemState, dispatch] = useReducer(itemReducer, initialState);

  const getAllItems = useCallback(() => {
    axios
      .get('http://localhost:3000/productos')
      .then((res) => dispatch({ type: types.getItems, payload: res.data }));
  }, []);

  const getItemsRandoms = () => {
    useEffect(() => {
      axios
        .get('http://localhost:3000/productos/random')
        .then((res) => dispatch({ type: types.getRandoms, payload: res.data }));
    }, []);
  };

  const deleteProductbyId = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({ type: types.deleteItem, payload: id });
        return true;
      } else {
        console.error(response.statusText);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const postCreateItem = async (values) => {
    const formData = new FormData();

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (key === 'imagenes') {
          for (let i = 0; i < values.imagenes.length; i++) {
            formData.append(`imagenes`, values.imagenes[i]);
          }
        } else {
          formData.append(key, values[key]);
        }
      }
    }

    try {
      const response = await fetch('http://localhost:3000/productos', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Producto creado exitosamente');
        toast.success('Producto creado exitosamente');
        setTimeout(() => {
          location.reload();
        }, 300);
      } else {
        toast.error('Ya existe un producto con ese nombre');
      }
    } catch (error) {
      console.error('Error al crear producto', error);
    }
  };

  getItemsRandoms();
  return (
    <ItemsContext.Provider
      value={{
        itemState,
        dispatch,
        postCreateItem,
        deleteProductbyId,
        getAllItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
