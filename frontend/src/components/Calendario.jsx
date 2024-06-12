//https://www.npmjs.com/package/react-multi-date-picker

import { useMediaQuery, useTheme } from "@mui/material";
import "../styles/calendar.css";
import React, { useState } from "react";
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


export const Calendario = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  


  const [values, setValues] = useState([,]);
  return (
    <DatePicker
      className="bg-dark orange"
      value={values}
      onChange={setValues}
      range
      numberOfMonths={!isSmallScreen ? 2:1}
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
        // borderRadius: "4px",
        fontSize: "16px",
        padding: 0,
        // border: 0,
        // margin: 0,
        // minHeight: "40px",
      }}
      containerStyle={{
        width: "100%",
      }}
    />
  );
};
