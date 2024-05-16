export const getInstrumentoById = (id, instrumentos = []) => {
  return instrumentos.find((intrumento) => intrumento.id === id);
};
