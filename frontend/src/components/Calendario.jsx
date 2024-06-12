// //https://www.npmjs.com/package/react-multi-date-picker

import "../styles/calendar.css";
import React, { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const dias = [
  ["Domingo", "Do"],
  ["Lunes", "Lu"],
  ["Martes", "Ma"],
  ["Miércoles", "Mi"],
  ["Jueves", "Ju"],
  ["Viernes", "Vi"],
  ["Sábado", "Sá"],
];
const meses = [
  ["Enero", "Ene"],
  ["Febrero", "Feb"],
  ["Marzo", "Mar"],
  ["Abril", "Abr"],
  ["Mayo", "May"],
  ["Junio", "Jun"],
  ["Julio", "Jul"],
  ["Agosto", "Ago"],
  ["Septiembre", "Sep"],
  ["Octubre", "Oct"],
  ["Noviembre", "Nov"],
  ["Diciembre", "Dic"],
];

export const Calendario = ({ setSelectedDates }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setSelectedDates(
      values.map((date) => (date instanceof DateObject ? date.toDate() : date))
    );
  }, [values]);

  return (
    <DatePicker
      className="bg-dark orange"
      value={values}
      onChange={setValues}
      range
      numberOfMonths={2}
      weekStartDayIndex={1}
      weekDays={dias}
      months={meses}
      format="DD/MMM/YYYY"
      minDate={new DateObject()}
      placeholder="  FECHAS DISPONIBLES"
      style={{
        width: "100%",
        backgroundColor: "neutralColor",
        height: "52px",
        fontSize: "16px",
        padding: 0,
      }}
      containerStyle={{
        width: "100%",
      }}
    />
  );
};
