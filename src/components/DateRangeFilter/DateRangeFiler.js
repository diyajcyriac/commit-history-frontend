import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <input {...params.inputProps} />}
        />
      </div>
      <div>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <input {...params.inputProps} />}
        />
      </div>
    </LocalizationProvider>
  );
}

export default DateRangePicker;
