import React, { useState } from 'react';

import {
  shallowCloneObject,
  isBeforeDate,
  getDateAccordingToMonth,
  getToday,
  isSameMonth,
} from '../utils';
import Month from './Month';

const Months = ({
  showMultipleMonths,
  displayYear,
  displayMonthsFrom,
  displayMonthsTo,
  ...otherProps
}) => {
  const [mainState, setMainState] = useState({ months: [] });
  const today = getToday();

  const updateMonths = () => {
    let currentMonth = today;
    let monthsStart = shallowCloneObject(currentMonth);
    let monthsEnd = shallowCloneObject(currentMonth);
    const months = [];

    if (showMultipleMonths) {
      if (displayYear) {
        const year = typeof displayYear === 'boolean' ? currentMonth.year : displayYear;
        monthsStart = { year, month: 1 };
        monthsEnd = { year, month: 12 };
      } else if (displayMonthsFrom && displayMonthsTo) {
        monthsStart = shallowCloneObject(displayMonthsFrom);
        monthsEnd = shallowCloneObject(displayMonthsTo);
      }
      monthsStart.day = 1;
      monthsEnd.day = 1;
    }

    if (isBeforeDate(monthsEnd, monthsStart)) {
      currentMonth = monthsEnd;
      monthsEnd = monthsStart;
      monthsStart = shallowCloneObject(currentMonth);
    } else {
      currentMonth = shallowCloneObject(monthsStart);
    }

    while (!isBeforeDate(monthsEnd, currentMonth)) {
      months.push(shallowCloneObject(currentMonth));
      currentMonth = getDateAccordingToMonth(currentMonth, 'NEXT');
    }

    setMainState({
      months,
      prevShowMultipleMonths: showMultipleMonths,
      prevDisplayYear: displayYear,
      prevDisplayMonthsFrom: displayMonthsFrom,
      prevDisplayMonthsTo: displayMonthsTo,
    });
  };

  const isNecessaryToUpdateMonths = () => {
    const {
      months,
      prevShowMultipleMonths,
      prevDisplayYear,
      prevDisplayMonthsFrom,
      prevDisplayMonthsTo,
    } = mainState;

    if (!months.length) return true;
    if (showMultipleMonths !== prevShowMultipleMonths) return true;
    if (showMultipleMonths) {
      if (displayYear !== prevDisplayYear) return true;
      if (displayMonthsFrom && !isSameMonth(displayMonthsFrom, prevDisplayMonthsFrom)) return true;
      if (displayMonthsTo && !isSameMonth(displayMonthsTo, prevDisplayMonthsTo)) return true;
    }
    return false;
  };

  const renderMonths = () => {
    const { months } = mainState;

    return months.map(m => (
      <Month
        key={`${m.year}_${m.month}`}
        monthDate={m}
        showMultipleMonths={showMultipleMonths}
        {...otherProps}
      />
    ));
  };

  if (isNecessaryToUpdateMonths()) {
    updateMonths();
  }

  return renderMonths();
};

export default Months;
