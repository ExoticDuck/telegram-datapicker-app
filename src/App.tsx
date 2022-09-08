import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MobileDatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Button, TextField } from '@mui/material';
import 'dayjs/locale/ru';

function App() {

  var utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    telegram.ready();
  });

  //@ts-ignore
  const telegram = window.Telegram.WebApp;

  const getResult = () => {
    let result = dateValue?.add(3, 'hours').toString();
    if (result) {
      result = result.substring(0, 22);
      return result;
    }
  }

  let result = getResult()

  const handleDateChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
    console.log(newValue);
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Send";
    telegram.MainButton.show();
  }

  //@ts-ignore
  Telegram.WebApp.onEvent("mainButtonClicked", () => {
    telegram.sendData(result);
  })

  return (
    <div className="App">
      <div className='container'>
        <h1 className='title'>Select date</h1>
        <MobileDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />} />
        <TimePicker
          label="Time"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          ampm={false}
        />
        {dateValue && <>
          <h2 className='title'>Your date is:</h2>
          <div className='time'>{result}</div>
          <button className="button" onClick={onCheckout}>Submit</button>
        </>}
      </div>
    </div>
  );
}

export default App;
