// Función para formatear una fecha del formato ISO a YYYY/MM/DD
function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

// Función para formatear las fechas de un array de objetos
export function formatDatesArray(datesArray) {
  return datesArray.map((dateObj) => [
    formatDate(dateObj.fechaInicio),
    formatDate(dateObj.fechaFin),
  ]);
}
