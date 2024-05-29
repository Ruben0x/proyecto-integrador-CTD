import React, { useCallback, useEffect, useReducer } from 'react';
import { ItemsContext } from './ItemsContext';
import { itemReducer } from './itemsReducer';
import axios from 'axios';
import { types } from './types';
import { toast } from 'sonner';
import { clearWarningsCache } from '@mui/x-data-grid/internals';

const initialState = {
  items: [],
  usuarios: [],
  caracteristicas: [],
};

export const ItemsProvider = ({ children }) => {
  const [itemState, dispatch] = useReducer(itemReducer, initialState);

  const getAllItems = useCallback(() => {
    axios
      .get('http://localhost:3000/productos')
      .then((res) => dispatch({ type: types.getItems, payload: res.data }));
  }, []);
  const getAllUsuarios = useCallback(() => {
    axios.get('http://localhost:3000/usuarios').then((res) =>
      // console.log(res.data)
      dispatch({ type: types.getUsuarios, payload: res.data })
    );
  }, []);
  const getCaracteristicas = () => {
    axios
      .get('http://localhost:3000/caracteristicas')
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: types.getCaracteristicas, payload: res.data });
      })
      .catch((err) => console.log('Error:', err));
  };

  const getAllCategorias = useCallback(() => {
    axios.get('http://localhost:3000/categorias').then((res) =>
      // console.log(res.data)
      dispatch({ type: types.getCategorias, payload: res.data })
    );
  }, []);

  const getItemsRandoms = () => {
    axios
      .get('http://localhost:3000/productos/random')
      .then((res) => dispatch({ type: types.getRandoms, payload: res.data }))
      .catch((err) => toast(err));
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
      const response = await fetch('http://localhost:3000/productos', {
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
      const response = await fetch('http://localhost:3000/productos/' + id, {
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

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  useEffect(() => {
    getAllUsuarios();
  }, [getAllUsuarios]);
  useEffect(() => {
    getCaracteristicas();
  }, []);
  useEffect(() => {
    getItemsRandoms();
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        itemState,
        dispatch,
        postCreateItem,
        deleteProductbyId,
        getAllItems,
        getAllUsuarios,
        getCaracteristicas,
        postEditItem,
        getAllCategorias,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
