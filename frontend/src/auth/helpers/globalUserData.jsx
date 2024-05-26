import React from 'react';
import { createContext, useState } from 'react';

const GlobalUserDataContext = createContext({
  isLogged: false,
  globalUserData: {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    rol: ''
  },
  setIsLogged: () => {},
  setGlobalUserData: () => {},
});

const GlobalUserDataProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => {
    const isLoggedLocal = localStorage.getItem('isLogged');
    const isLoggedSession = sessionStorage.getItem('isLogged');
    return isLoggedLocal? JSON.parse(isLoggedLocal) : isLoggedSession? JSON.parse(isLoggedSession) : false;
  });


  const [globalUserData, setGlobalUserData] = useState(() => {
    const globalUserDataLocal = localStorage.getItem('globalUserData');
    const globalUserDataSession = sessionStorage.getItem('globalUserData');
    return globalUserDataLocal? JSON.parse(globalUserDataLocal) : globalUserDataSession? JSON.parse(globalUserDataSession) :
    {id: 0,
    nombre: '',
    apellido: '',
    email: '',
    rol: ''}
  });

  const handleSetIsLogged = (value) => {
    setIsLogged(value);
    ;
  };

  const handleSetGlobalUserData = (value) => {
    setGlobalUserData(value);
    ;
  };


  return (
    <GlobalUserDataContext.Provider value={
      { isLogged, globalUserData, setIsLogged: handleSetIsLogged, setGlobalUserData: handleSetGlobalUserData }}>
      {children}
    </GlobalUserDataContext.Provider>
  );
};

export { GlobalUserDataProvider, GlobalUserDataContext };