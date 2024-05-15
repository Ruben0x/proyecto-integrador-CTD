import React, { useEffect, useReducer } from 'react';
import { ItemsContext } from './ItemsContext';
import { itemReducer } from './itemsReducer';
import axios from 'axios';
import { types } from './types';

const initialState = {
  items: [],
};

export const ItemsProvider = ({ children }) => {
  const [itemState, dispatch] = useReducer(itemReducer, initialState);

  useEffect(() => {
    axios('http://localhost:3000/productos/random').then((res) =>
      dispatch({ type: types.getItems, payload: res.data })
    );
  }, []);

  //ESTE NO ESTA TERMINADO ****************
  const postCreateItem = (item) => {
    const formData = new FormData();

    formData.append('nombre', item.nombre);
    formData.append('descripcion', item.descripcion);
    formData.append('marcaId', item.marcaId);
    formData.append('categoriaId', item.categoriaId);
    formData.append('precio', item.precio);

    imagenes.forEach((imagen, index) => {
      fetch(imagen)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File(
            [blob],
            `imagen${index}.${getExtension(imagen)}`
          );
          formData.append('imagenes', file);
        })
        .catch((error) => console.error('Error al obtener la imagen:', error));
    });

    // Función para obtener la extensión del archivo
    function getExtension(filename) {
      return filename.split('.').pop();
    }

    useEffect(() => {
      axios
        .post('http://localhost:3000/productos', {
          body: formData,
        })
        .then((res) => console.log(res));

      return () => {
        second;
      };
    }, [third]);
  };

  //ESTE NO ESTA TERMINADO ****************

  return (
    <ItemsContext.Provider value={{ itemState, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
