import { useContext, useEffect } from 'react';
import { ItemsContext } from '../context/ItemsContext'; 

const useCategorias = () => {
  const { itemState, getAllCategorias } = useContext(ItemsContext);

  useEffect(() => {
    getAllCategorias();
  }, [getAllCategorias]);

  return itemState.categorias;
};

export default useCategorias;