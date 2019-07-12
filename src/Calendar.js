import React from 'react';
import PropTypes from 'prop-types';

import Months from './Calendar/Months';

const Calendar = ({
  selectedDay,
  selectedDayRange,
  onChange,
  onDisabledDayError,
  isDayRange,
  isMultipleDays,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  colorPrimary,
  colorPrimaryLight,
  selectedDays,
  dayBtnProps,
  showMonthArrowBtns,
  showMultipleMonths,
  displayMonthsFrom,
  displayMonthsTo,
  displayYear,
}) => {
  const shouldPrepareAnimation = showMonthArrowBtns && !showMultipleMonths;

  return (
    <div
      className={`Calendar ${calendarClassName} ${!shouldPrepareAnimation && '-no-nav'}`}
      style={{ '--cl-color-primary': colorPrimary, '--cl-color-primary-light': colorPrimaryLight }}
    >
      <Months
        selectedDay={selectedDay}
        selectedDayRange={selectedDayRange}
        onChange={onChange}
        onDisabledDayError={onDisabledDayError}
        isDayRange={isDayRange}
        isMultipleDays={isMultipleDays}
        calendarTodayClassName={calendarTodayClassName}
        calendarSelectedDayClassName={calendarSelectedDayClassName}
        calendarRangeStartClassName={calendarRangeStartClassName}
        calendarRangeBetweenClassName={calendarRangeBetweenClassName}
        calendarRangeEndClassName={calendarRangeEndClassName}
        disabledDays={disabledDays}
        selectedDays={selectedDays}
        dayBtnProps={dayBtnProps}
        showMonthArrowBtns={showMonthArrowBtns}
        showMultipleMonths={showMultipleMonths}
        displayMonthsFrom={displayMonthsFrom}
        displayMonthsTo={displayMonthsTo}
        displayYear={displayYear}
        shouldPrepareAnimation={shouldPrepareAnimation}
      />
    </div>
  );
};

const dayShape = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

const monthShape = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

Calendar.defaultProps = {
  onChange: () => null,
  isDayRange: false,
  isMultipleDays: false,
  onDisabledDayError: () => null,
  selectedDay: null,
  selectedDayRange: {
    from: null,
    to: null,
  },
  disabledDays: [],
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  calendarClassName: '',
  calendarTodayClassName: '',
  calendarSelectedDayClassName: '',
  calendarRangeStartClassName: '',
  calendarRangeBetweenClassName: '',
  calendarRangeEndClassName: '',
  showMonthArrowBtns: true,
  showMultipleMonths: false,
  displayMonthsFrom: null,
  displayMonthsTo: null,
  displayYear: null,
};

Calendar.propTypes = {
  onChange: PropTypes.func,
  isDayRange: PropTypes.bool,
  isMultipleDays: PropTypes.bool,
  onDisabledDayError: PropTypes.func,
  selectedDay: PropTypes.shape(dayShape),
  selectedDayRange: PropTypes.shape({
    from: PropTypes.shape(dayShape),
    to: PropTypes.shape(dayShape),
  }),
  disabledDays: PropTypes.arrayOf(PropTypes.shape(dayShape)),
  calendarClassName: PropTypes.string,
  calendarTodayClassName: PropTypes.string,
  calendarSelectedDayClassName: PropTypes.string,
  calendarRangeStartClassName: PropTypes.string,
  calendarRangeBetweenClassName: PropTypes.string,
  calendarRangeEndClassName: PropTypes.string,
  colorPrimary: PropTypes.string,
  colorPrimaryLight: PropTypes.string,
  showMonthArrowBtns: PropTypes.bool,
  showMultipleMonths: PropTypes.bool,
  displayMonthsFrom: PropTypes.shape(monthShape),
  displayMonthsTo: PropTypes.shape(monthShape),
  displayYear: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export { Calendar };
