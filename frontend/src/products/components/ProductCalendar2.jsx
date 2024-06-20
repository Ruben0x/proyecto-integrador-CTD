import React, { useContext, useState, useEffect } from "react";
import "../../styles/calendar.css";
import {
  Button,
  Checkbox,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { GlobalUserDataContext } from "../../auth/helpers/globalUserData";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useTheme } from "@emotion/react";
import { toast } from "sonner";
import { formatDatesArray } from "../../helpers/formattedDate";

export const ProductCalendar = ({ fechasReservadas }) => {
  const [reserved, setReserved] = useState([]);
  const [values, setValues] = useState([null, null]);
  const [viewError, setViewError] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const { isLogged } = useContext(GlobalUserDataContext);

  useEffect(() => {
    if (fechasReservadas.length > 0) {
      const formattedDates = formatDatesArray(fechasReservadas);
      setReserved(formattedDates);
      setValues([null, null]); // Reset selected values if reserved dates change
    }
  }, [fechasReservadas]);

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleReserva = () => {
    if (!checkboxChecked) {
      toast.warning("Debes estar de acuerdo con las políticas de reserva.");
      return;
    }

    if (!values[0] || !values[1]) {
      toast.warning("Debes seleccionar un rango de fechas.");
      return;
    }

    const [start, end] = values;
    if (isLogged) {
      console.log(`${start.format()} hasta ${end.format()}`);
    } else {
      toast.warning("Debes estar logueado para realizar la reserva.");
    }
  };

  const isDateInReservedRange = (date, reservedRanges) => {
    return reservedRanges.some(([start, end]) => {
      const dateObj = new Date(date);
      const startDate = new Date(start);
      const endDate = new Date(end);
      return dateObj >= startDate && dateObj <= endDate;
    });
  };

  const validateRange = (range) => {
    const [start, end] = range;
    const isRangeValid = !reserved.some(
      ([reservedStart, reservedEnd]) =>
        (start &&
          end &&
          start.format() >= reservedStart &&
          start.format() <= reservedEnd) ||
        (start.format() <= reservedStart && end.format() >= reservedEnd) ||
        (start.format() <= reservedEnd && end.format() >= reservedEnd)
    );

    return isRangeValid;
  };

  return (
    <>
      {viewError ? (
        <Grid container justifyContent={"center"}>
          <Typography variant="h4" textAlign={"center"}>
            Hubo un problema al obtener las fechas, inténtelo de nuevo más tarde
          </Typography>
          <Button variant="contained" onClick={() => setViewError(false)}>
            Reintentar
          </Button>
        </Grid>
      ) : (
        <Grid container justifyContent={"center"}>
          {!isSmallScreen ? (
            <Calendar
              className="bg-dark orange"
              range
              marginRight={2}
              numberOfMonths={2}
              weekStartDayIndex={1}
              weekDays={dias}
              months={meses}
              value={values}
              minDate={new DateObject()}
              onChange={(range) => {
                if (validateRange(range)) {
                  setValues(range);
                } else {
                  toast.warning("Este rango de fechas no está disponible.");
                }
              }}
              mapDays={({ date }) => {
                const strDate = date.format();
                const isDisabled = isDateInReservedRange(strDate, reserved);
                const isPastDate = new Date(strDate) < new Date();

                if (isDisabled)
                  return {
                    disabled: true,
                    style: { backgroundColor: "#FFB3B3" },
                  }; // Estilo para días reservados
                if (isPastDate)
                  return {
                    disabled: true,
                    style: { backgroundColor: "#D3D3D3" },
                  }; // Estilo para días pasados
              }}
            />
          ) : (
            <Calendar
              className="bg-dark orange"
              range
              numberOfMonths={1}
              weekStartDayIndex={1}
              weekDays={dias}
              months={meses}
              minDate={new DateObject()}
              value={values}
              onChange={(range) => {
                if (validateRange(range)) {
                  setValues(range);
                } else {
                  toast.warning("Este rango de fechas no está disponible.");
                }
              }}
              mapDays={({ date }) => {
                const strDate = date.format();
                const isDisabled = isDateInReservedRange(strDate, reserved);
                const isPastDate = new Date(strDate) < new Date();

                if (isDisabled)
                  return {
                    disabled: true,
                    style: { backgroundColor: "#FFB3B3" },
                  }; // Estilo para días reservados
                if (isPastDate)
                  return {
                    disabled: true,
                    style: { backgroundColor: "#D3D3D3" },
                  }; // Estilo para días pasados
              }}
            />
          )}
        </Grid>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleReserva}
          disabled={!checkboxChecked || !values[0] || !values[1]} // Deshabilita el botón si el checkbox no está marcado o no se han seleccionado fechas
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "#ffffff",
            maxWidth: "250px",
          }}
        >
          INICIAR RESERVA
        </Button>
        {!checkboxChecked && (
          <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
            Debes aceptar nuestras políticas de reserva.
          </Typography>
        )}
        <div style={{ marginTop: "1em" }}>
          <Checkbox
            checked={checkboxChecked}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
          />
          He leído y estoy de acuerdo con las políticas de reserva
        </div>
      </div>
    </>
  );
};