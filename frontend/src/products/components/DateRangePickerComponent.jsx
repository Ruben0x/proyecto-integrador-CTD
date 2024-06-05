import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

const DateRangePickerComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (startDate && date && dayjs(date).isBefore(startDate)) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date && date < startDate) {
      setStartDate(date);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        customInput={<TextField label='Fecha de inicio' variant='outlined' />}
      />
      <Box sx={{ mx: 2 }}>a</Box>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        customInput={<TextField label='Fecha de fin' variant='outlined' />}
      />
    </Box>
  );
};

export default DateRangePickerComponent;
