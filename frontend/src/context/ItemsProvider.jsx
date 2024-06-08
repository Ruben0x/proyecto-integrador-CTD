import React, { useCallback, useEffect, useReducer } from 'react';
import { ItemsContext } from './ItemsContext';
import { itemReducer } from './itemsReducer';
import axios from 'axios';
import { types } from './types';
import { toast } from 'sonner';

const initialState = {
  items: [],
  usuarios: [],
  caracteristicas: [],
  categorias: [],
};

const apiUrl = import.meta.env.VITE_API_URL;

export const ItemsProvider = ({ children }) => {
  const [itemState, dispatch] = useReducer(itemReducer, initialState);

  const getAllItems = useCallback(() => {
    axios
      .get(`${apiUrl}/productos`)
      .then((res) => dispatch({ type: types.getItems, payload: res.data }));
  }, []);

  const getCaracteristicas = () => {
    axios
      .get(`${apiUrl}/caracteristicas`)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: types.getCaracteristicas, payload: res.data });
      })
      .catch((err) => console.log('Error:', err));
  };

  const getAllCategorias = useCallback(() => {
    axios.get(`${apiUrl}/categorias`).then((res) => {
      // console.log(res.data);
      dispatch({ type: types.getCategorias, payload: res.data });
    });
  }, []);

  const deleteProductbyId = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/productos/${id}`, {
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

  const getUserById = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/usuarios/${id}`, {
        method: 'GET',
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch({ type: types.getUser, payload: userData });
        return userData;
      } else {
        console.error(response.statusText);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const postCreateItem = async (values) => {
    // Construir el tipoCaracteristicaId dinámicamente
    const tipoCaracteristicaId = Object.keys(values)
      .filter((key) => key.startsWith('c-') && values[key] !== '')
      .map((key) => values[key])
      .join(',');

    const formData = new FormData();

    formData.append('nombre', values.nombre);
    formData.append('descripcion', values.descripcion);
    formData.append('categoriaId', values.categoriaId);
    formData.append('marcaId', values.marcaId);
    formData.append('tipoCaracteristicaId', tipoCaracteristicaId);
    formData.append('precio', values.precio);

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (key === 'imagenes') {
          for (let i = 0; i < values.imagenes.length; i++) {
            formData.append(`imagenes`, values.imagenes[i]);
          }
        }
      }
    }
    // console.log(formData);

    try {
      const response = await fetch(`${apiUrl}/productos`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Producto creado exitosamente');
        setTimeout(() => {
          location.reload();
        }, 300);
      } else {
        const errorData = await response.json();
        toast.error(
          `Error: ${errorData.message || 'Ya existe un producto con ese nombre'}`
        );
      }
    } catch (error) {
      toast.error('Error al crear producto. Por favor, intente nuevamente.');
    }
  };

  const postEditItem = async (values, id) => {
    // console.log(values);
    // Construir el tipoCaracteristicaId dinámicamente
    const tipoCaracteristicaId = Object.keys(values)
      .filter((key) => key.startsWith('c-') && values[key] !== '')
      .map((key) => values[key])
      .join(',');
    const formData = new FormData();

    formData.append('nombre', values.nombre);
    formData.append('descripcion', values.descripcion);
    formData.append('categoriaId', values.categoriaId);
    formData.append('marcaId', values.marcaId);
    formData.append('tipoCaracteristicaId', tipoCaracteristicaId);
    formData.append('precio', values.precio);

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (key === 'imagenes') {
          for (let i = 0; i < values.imagenes.length; i++) {
            formData.append(`imagenes`, values.imagenes[i]);
          }
        }
      }
    }

    try {
      const response = await fetch(`${apiUrl}/productos/` + id, {
        method: 'PATCH',
        body: formData,
      });
      if (response.ok) {
        console.log('Producto editado exitosamente');
        toast.success('Producto editado exitosamente');
        setTimeout(() => {
          location.reload();
        }, 300);
      } else {
        toast.error('Ya existe un producto con ese nombre');
      }
    } catch (error) {
      console.error('Error al crear producto', error.message);
    }
  };

  const getItemsByCategories = async (categoryIds) => {
    try {
      const response = await fetch(
        `${apiUrl}/categorias/${categoryIds[0]}/productos?filter=${categoryIds.slice(1).join('%2C')}`
      );
      const data = await response.json();
      dispatch({ type: types.getItemsByCategories, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  useEffect(() => {
    getCaracteristicas();
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        itemState,
        dispatch,
        postCreateItem,
        deleteProductbyId,
        getUserById,
        getAllItems,
        getCaracteristicas,
        postEditItem,
        getAllCategorias,
        getItemsByCategories,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
