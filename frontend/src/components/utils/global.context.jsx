import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import { instrumentsReducer } from './reducers';

// Crear el contexto global
export const ContextGlobal = createContext(undefined);

// Inicializar el estado de los instrumentos
const initInstrumentsState = { instrumentsList: [], instruments: {} };

// Componente de proveedor de contexto
export const ContextProvider = ({ children }) => {
  // Reductor de instrumentos
  const [instrumentsState, instrumentsDispatch] = useReducer(
    instrumentsReducer,
    initInstrumentsState
  );

  // Obtener datos de los instrumentos
  const fetchInstrumentsData = () => {
    axios('origen/instruments').then((res) =>
      instrumentsDispatch({ type: 'GET_INSTRUMENTS', payload: res.data })
    );
    // .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchInstrumentsData();
  }, []);

  // Proporcionar estados y funciones de despacho al contexto
  return (
    <ContextGlobal.Provider
      value={{
        instrumentsState,
        instrumentsDispatch,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};
