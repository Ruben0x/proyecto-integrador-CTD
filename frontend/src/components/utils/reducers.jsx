// Reducer para manejar el estado relacionado con los instrumentos
export const instrumentosReducer = (state, action) => {
    switch (action.type) {
      
        // Acción GET_INSTRUMENTS-> actualiza la lista de instrumentos
      case "GET_INSTRUMENTS":
        return { instrumentsList: action.payload, instrument: state.instrument };
      
        // Acción GET_INSTRUMENT-> actualiza el instrumento seleccionado
      case "GET_INSTRUMENT":
        return { instrumentsList: state.instrumentsList, instrument: action.payload };
      
        // encualquier otro caso, lanza un error
      default:
        throw new Error();
    }
  };
  
 