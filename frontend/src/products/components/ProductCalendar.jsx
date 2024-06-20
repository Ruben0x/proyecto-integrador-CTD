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
  const [checkboxChecked, setCheckboxChecked] = useState(true); // Estado para el checkbox
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

    const [start, end] = values;
    if (start && end && isLogged) {
      console.log(`${start.format()} hasta ${end.format()}`);
    } else {
      toast.warning("Debes estar logueado para realizar la reserva.");
    }
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
                const [start, end] = range;
                const isRangeValid = reserved.every(
                  ([reservedStart, reservedEnd]) =>
                    !(
                      (start &&
                        end &&
                        (start.format() === reservedStart ||
                          end.format() === reservedEnd)) ||
                      (start.format() < reservedStart &&
                        end.format() > reservedEnd) ||
                      (start.format() > reservedStart &&
                        start.format() < reservedEnd) ||
                      (end.format() > reservedStart &&
                        end.format() < reservedEnd)
                    )
                );

                if (isRangeValid) {
                  setValues(range);
                } else {
                  toast.warning("Este rango de fechas no está disponible.");
                }
              }}
              mapDays={({ date }) => {
                const strDate = date.format();
                const isDisabled = reserved.some(
                  ([start, end]) => strDate >= start && strDate <= end
                );

                if (isDisabled) return { disabled: true };
              }}
            ></Calendar>
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
                const [start, end] = range;
                const isRangeValid = reserved.every(
                  ([reservedStart, reservedEnd]) =>
                    !(
                      (start &&
                        end &&
                        (start.format() === reservedStart ||
                          end.format() === reservedEnd)) ||
                      (start.format() < reservedStart &&
                        end.format() > reservedEnd) ||
                      (start.format() > reservedStart &&
                        start.format() < reservedEnd) ||
                      (end.format() > reservedStart &&
                        end.format() < reservedEnd)
                    )
                );

                if (isRangeValid) {
                  setValues(range);
                } else {
                  toast.warning("Este rango de fechas no está disponible.");
                }
              }}
              mapDays={({ date }) => {
                const strDate = date.format();
                const isDisabled = reserved.some(
                  ([start, end]) => strDate >= start && strDate <= end
                );

                if (isDisabled) return { disabled: true };
              }}
            ></Calendar>
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
          disabled={!checkboxChecked} // Deshabilita el botón si el checkbox no está marcado
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "#ffffff",
            maxWidth: "250px",
          }}
        >
          INICIAR RESERVA
        </Button>
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
