import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
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
    let result = dateValue?.format('L LT').toString();
    if (result) {
      result = result.substring(0, 22);
      return result;
    }
  }

  let result = getResult();


  const handleDateChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
    console.log(newValue);
  };

  const onCheckout = () => {
    // telegram.MainButton.text = "Send";
    // telegram.MainButton.show();
    console.log(getResult());
    telegram.sendData(getResult());
  }

  //@ts-ignore
  // Telegram.WebApp.onEvent("mainButtonClicked", function () {
  //   telegram.sendData(getResult());
  // })
  

  return (
    <div className="App">
      
      <div className='container'>
      <h1 className='title'>Выберите дату</h1>
        <MobileDatePicker
          className='input'
          label="Date"
          inputFormat="DD/MM/YYYY"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField focused={false}  {...params}/>} 
          />
        <MobileTimePicker
          className='input'
          label="Time"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField focused={false} {...params}/>}
          ampm={false}
        />
        
        {dateValue && <>
          <h2 className='title'>Ваша дата:</h2>
          <div className='time'>{result}</div>
          <button className="button" onClick={onCheckout}>Submit</button>
        </>}
      </div>
    </div>
  );
}

export default App;
