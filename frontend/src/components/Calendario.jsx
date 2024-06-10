//https://www.npmjs.com/package/react-multi-date-picker

import '../styles/Calendar.css';
import React, { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

const dias = [
  ['Domingo', 'Do'],
  ['Lunes', 'Lu'],
  ['Martes', 'Ma'],
  ['Miércoles', 'Mi'],
  ['Jueves', 'Ju'],
  ['Viernes', 'Vi'],
  ['Sábado', 'Sá'],
];
const meses = [
  ['Enero', 'Ene'],
  ['Febrero', 'Feb'],
  ['Marzo', 'Mar'],
  ['Abril', 'Abr'],
  ['Mayo', 'May'],
  ['Junio', 'Jun'],
  ['Julio', 'Jul'],
  ['Agosto', 'Ago'],
  ['Septiembre', 'Sep'],
  ['Octubre', 'Oct'],
  ['Noviembre', 'Nov'],
  ['Diciembre', 'Dic'],
];

export const Calendario = () => {
  const [values, setValues] = useState([,]);
  return (
    <DatePicker
      className='bg-dark orange'
      value={values}
      onChange={setValues}
      range
      numberOfMonths={2}
      weekStartDayIndex={1}
      weekDays={dias}
      months={meses}
      format='DD/MMM/YYYY'
      minDate={new DateObject()}
      placeholder='Disponibilidad de fechas'
      style={{
        width: '100%',
        backgroundColor: 'neutralColor',
        height: '24px',
        borderRadius: '4px',
        fontSize: '14px',
        padding: '4px 10px',
        border: 0,
        margin: 0,
        minHeight: '40px',
      }}
      containerStyle={{
        width: '100%',
      }}
    />
  );
};
