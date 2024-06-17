import { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';

export const useCategorias = () => {
  const { itemState, getAllCategorias } = useContext(ItemsContext);
  useEffect(() => {
    getAllCategorias();
  }, [getAllCategorias]);
  return itemState.categorias;
};
