import React, { useContext, useState, useEffect } from 'react';
import '../../styles/calendar.css';
import {
  Button,
  Checkbox,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { GlobalUserDataContext } from '../../auth/helpers/globalUserData';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useTheme } from '@emotion/react';
import { toast } from 'sonner';
import { formatDatesArray } from '../../helpers/formattedDate';
import { useNavigate } from 'react-router-dom';


export const ProductCalendar = ({ fechasReservadas, instrumento }) => {
  const [reserved, setReserved] = useState([]);
  const [values, setValues] = useState([]);
  const [viewError, setViewError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (fechasReservadas.length > 0) {
      const formattedDates = formatDatesArray(fechasReservadas);
      setReserved(formattedDates);
      setValues(formattedDates);
    }
  }, [fechasReservadas]);

  const reservas = reserved.length;

  function isReserved(strDate) {
    return reserved.some(([start, end]) => strDate >= start && strDate <= end);
  }

  const { isLogged } = useContext(GlobalUserDataContext);

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleReserva = (fechas) => {
    const fechasSeleccionadas = fechas.slice(reservas);

    if (isLogged) {
     fechasSeleccionadas.forEach((element) => {
        console.log(`${element[0].format('YYYY-MM-DD')} hasta ${element[1].format('YYYY-MM-DD')}`);
      });
//pasar la data al page de booking

      navigate('/booking', { state: { instrumento, values: fechasSeleccionadas } });
    } else {
      toast.warning('Debes estar logueado, así que regístrate');
    }
  };

  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };


  return (
    <>
      {viewError ? (
        <Grid container justifyContent={'center'}>
          <Typography variant='h4' textAlign={'center'}>
            Hubo un problema al obtener las fechas, inténtelo de nuevo más tarde
          </Typography>
          <Button variant='contained' onClick={() => setViewError(false)}>
            Reintentar
          </Button>
        </Grid>
      ) : (
        <Grid container justifyContent={'center'}>
          {!isSmallScreen ? (
            <Calendar
            maxSelectCount={1}  
            className='bg-dark orange'
              multiple
              range
              marginRight={2}
              rangeHover
              numberOfMonths={2}
              weekStartDayIndex={1}
              weekDays={dias}
              months={meses}
              value={values}
              minDate={new DateObject()}
              onChange={(ranges) => {
                const isClickedOutsideUnAvailbleDates = reserved.every(
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
            ></Calendar>
          ) : (
            <Calendar
 
              className='bg-dark orange'
              multiple
              range
              rangeHover
              numberOfMonths={1}
              weekStartDayIndex={1}
              weekDays={dias}
              minDate={new DateObject()}
              months={meses}
              value={values}
              onChange={(ranges) => {
                const isClickedOutsideUnAvailbleDates = reserved.every(
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
            ></Calendar>
          )}
        </Grid>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Button
          fullWidth
          variant='contained'
          onClick={() => handleReserva(values)}
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: '#121312',
            maxWidth: '250px',
          }}
          disabled={!checkboxChecked}
        >
          INICIAR RESERVA
        </Button>
        <div style={{ marginTop: '1em' }}>
        <Checkbox
          //defaultChecked={false}
          onChange={handleCheckboxChange}
          checked={checkboxChecked}
        />
          He leído y estoy de acuerdo con las políticas de reserva
        </div>
      </div>
    </>
  );
  7;
};
