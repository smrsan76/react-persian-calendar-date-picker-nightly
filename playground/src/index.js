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
  const displayMonthsFrom = { year: 1398, month: 4 };
  const displayMonthsTo = { year: 1398, month: 6 };

  return (
    <Calendar
      selectedDays={selectedDays}
      onChange={setValue}
      isMultipleDays
      showMultipleMonths
      displayMonthsFrom={displayMonthsFrom}
      displayMonthsTo={displayMonthsTo}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
