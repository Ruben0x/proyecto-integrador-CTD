import React, { useContext, useState } from 'react';
import '../../styles/calendar.css';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { GlobalUserDataContext } from '../../auth/helpers/globalUserData';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useTheme } from '@emotion/react';

const reserved = [
  [new DateObject().setDay(1).format(), new DateObject().setDay(5).format()],
  [new DateObject().setDay(7).format(), new DateObject().setDay(8).format()],
];
const reservas = reserved.length;

const initialValue = [...reserved];

function isReserved(strDate) {
  return reserved.some(([start, end]) => strDate >= start && strDate <= end);
}

export const ProductCalendar = () => {
  const [values, setValues] = useState(initialValue);
  const [viewError, setViewError] = useState(false);
  const { isLogged } = useContext(GlobalUserDataContext);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleReserva = (fechas) => {
    const fechasSeleccionadas = fechas.slice(reservas);

    if (isLogged) {
      fechasSeleccionadas.forEach((element) => {
        console.log(`${element[0].format()} hasta ${element[1].format()}`);
      });
    } else {
      alert('Debes estar logueado');
    }
  };
  return (
    <>
      {viewError ? (
        <Grid container justifyContent={'center'} sx={{}}>
          <Typography variant='h4' textAlign={'center'}>
            Hubo un problema al obtener las fechas, intentelo de nuevo mas tarde
          </Typography>
          <Button variant='contained' onClick={() => setViewError(false)}>
            Reintentar
          </Button>
        </Grid>
      ) : (
        <Grid container justifyContent={'center'}>
          {!isSmallScreen ? (
            <Calendar
              className='bg-dark orange'
              multiple
              range
              rangeHover
              numberOfMonths={2}
              value={values}
              onChange={(ranges) => {
                const isClickedOutsideUnAvailbleDates = initialValue.every(
                  ([start, end]) =>
                    ranges.some(
                      (range) =>
                        range[0]?.format?.() === start &&
                        range[1]?.format?.() === end
                    )
                );

                if (!isClickedOutsideUnAvailbleDates) return false;

                setValues(ranges);
              }}
              mapDays={({ date }) => {
                let className;
                const strDate = date.format();

                if (isReserved(strDate)) className = 'reserved';
                if (className) return { className };
              }}
            >
              <Button
                fullWidth
                variant='contained'
                onClick={() => handleReserva(values)}
              >
                RESERVA
              </Button>
            </Calendar>
          ) : (
            <Calendar
              className='bg-dark orange'
              multiple
              range
              rangeHover
              numberOfMonths={1}
              value={values}
              onChange={(ranges) => {
                const isClickedOutsideUnAvailbleDates = initialValue.every(
                  ([start, end]) =>
                    ranges.some(
                      (range) =>
                        range[0]?.format?.() === start &&
                        range[1]?.format?.() === end
                    )
                );

                if (!isClickedOutsideUnAvailbleDates) return false;

                setValues(ranges);
              }}
              mapDays={({ date }) => {
                let className;
                const strDate = date.format();

                if (isReserved(strDate)) className = 'reserved';
                if (className) return { className };
              }}
            >
              <Button
                fullWidth
                variant='contained'
                onClick={() => handleReserva(values)}
              >
                RESERVA
              </Button>
            </Calendar>
          )}
        </Grid>
      )}
    </>
  );
};
