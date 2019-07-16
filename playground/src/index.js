import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import { Calendar } from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDays, setValue] = useState([
    { day: 11, month: 4, year: 1398 },
    { day: 15, month: 4, year: 1398 },
  ]);
  const [numOfMonths, setNumOfMonths] = useState(1);

  const handleMonthNumChange = e => {
    const { value } = e.target;
    setNumOfMonths(Number(value));
  };

  const displayMonthsFrom = { year: 1398, month: 1 };

  const minDate = { year: 1398, month: 5, day: 1 };
  const maxDate = { year: 1398, month: 5, day: 31 };

  return (
    <>
      <label htmlFor="num">
        Number of months:
        <input
          id="num"
          type="number"
          value={numOfMonths}
          min={1}
          max={12}
          onChange={handleMonthNumChange}
        />
      </label>
      <br />
      <br />
      <Calendar
        isMultipleDays
        showMultipleMonths
        displayMonthsFrom={displayMonthsFrom}
        displayMonthsTo={{ year: 1398, month: numOfMonths }}
        selectedDays={selectedDays}
        onChange={setValue}
        minDate={minDate}
        maxDate={maxDate}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
