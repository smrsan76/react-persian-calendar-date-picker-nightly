import React, { useRef, useState } from 'react';

import {
  WEEK_DAYS,
  getToday,
  toPersianNumber,
  getMonthName,
  getMonthLength,
  getMonthFirstWeekday,
  createUniqueRange,
  getDateAccordingToMonth,
  isSameDay,
  checkDayInDayRange,
  isBeforeDate,
  shallowCloneObject,
  deepCloneObject,
} from '../utils';

const Month = ({
  selectedDay,
  selectedDayRange,
  onChange,
  onDisabledDayError,
  isDayRange,
  isMultipleDays,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  selectedDays,
  dayBtnProps,
  showMultipleMonths,
  shouldPrepareAnimation,
  monthDate,
}) => {
  const monthYearTextWrapper = useRef(null);
  const calendarSectionWrapper = useRef(null);
  const [mainState, setMainState] = useState({
    status: 'NEXT',
    cycleCount: 1,
    activeDate: null,
  });

  const today = getToday();
  let activeDate = mainState.activeDate ? shallowCloneObject(mainState.activeDate) : null;

  const setActiveDate = () => {
    if (selectedDay) activeDate = shallowCloneObject(selectedDay);
    else if (selectedDays.length) activeDate = shallowCloneObject(selectedDays[0]);
    else if (selectedDayRange.from) activeDate = shallowCloneObject(selectedDayRange.from);
    else activeDate = shallowCloneObject(today);
  };

  if (!activeDate) setActiveDate();

  const getDate = isThisMonth => {
    return isThisMonth ? activeDate : getDateAccordingToMonth(activeDate, mainState.status);
  };

  const getDayRangeValue = day => {
    const clonedDayRange = deepCloneObject(selectedDayRange);
    const dayRangeValue =
      clonedDayRange.from && clonedDayRange.to ? { from: null, to: null } : clonedDayRange;
    const dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
    dayRangeValue[dayRangeProp] = day;
    const { from, to } = dayRangeValue;

    // swap from and to values if from is later than to
    if (isBeforeDate(dayRangeValue.to, dayRangeValue.from)) {
      dayRangeValue.from = to;
      dayRangeValue.to = from;
    }

    const checkIncludingDisabledDay = disabledDay => {
      return checkDayInDayRange({
        day: disabledDay,
        from: dayRangeValue.from,
        to: dayRangeValue.to,
      });
    };
    const includingDisabledDay = disabledDays.find(checkIncludingDisabledDay);
    if (includingDisabledDay) {
      onDisabledDayError(includingDisabledDay);
      return selectedDayRange;
    }

    return dayRangeValue;
  };

  const handleDayClick = day => {
    if (!isMultipleDays) {
      const newDayValue = isDayRange ? getDayRangeValue(day) : day;
      onChange(newDayValue);
      return;
    }
    const isSelectedBefore = selectedDays.some(sd => isSameDay(sd, day));
    if (isSelectedBefore) {
      onChange(selectedDays.filter(sd => !isSameDay(sd, day)));
      return;
    }
    onChange([...selectedDays, day]);
  };

  const getDayClassNames = dayItem => {
    const isToday = isSameDay(dayItem, today);
    let isSelected = false;
    if (selectedDay) {
      isSelected = isSameDay(dayItem, selectedDay);
    } else if (selectedDays.length) {
      selectedDays.some(sd => {
        if (!isSameDay(dayItem, sd)) return false;
        isSelected = true;
        return true;
      });
    }
    const { from: startingDay, to: endingDay } = selectedDayRange;
    const isStartedDayRange = isSameDay(dayItem, startingDay);
    const isEndingDayRange = isSameDay(dayItem, endingDay);
    const isWithinRange = checkDayInDayRange({ day: dayItem, from: startingDay, to: endingDay });
    const classNames = ''
      .concat(isToday && !isSelected ? ` -today ${calendarTodayClassName}` : '')
      .concat(!dayItem.isStandard ? ' -blank' : '')
      .concat(isSelected ? ` -selected ${calendarSelectedDayClassName}` : '')
      .concat(isStartedDayRange ? ` -selectedStart ${calendarRangeStartClassName}` : '')
      .concat(isEndingDayRange ? ` -selectedEnd ${calendarRangeEndClassName}` : '')
      .concat(isWithinRange ? ` -selectedBetween ${calendarRangeBetweenClassName}` : '')
      .concat(dayItem.isDisabled ? '-disabled' : '');
    return classNames;
  };

  const getViewMonthDays = isNewMonth => {
    const date =
      typeof isNewMonth === 'boolean' ? getDate(!isNewMonth) : shallowCloneObject(isNewMonth);
    const prependingBlankDays = createUniqueRange(getMonthFirstWeekday(date), 'starting-blank');

    // all months will have an additional 7 days(week) for rendering purpose
    const appendingBlankDays = createUniqueRange(7 - getMonthFirstWeekday(date), 'ending-blank');
    const standardDays = createUniqueRange(getMonthLength(date), 'standard').map(day => ({
      ...day,
      isStandard: true,
      month: date.month,
      year: date.year,
    }));
    const allDays = prependingBlankDays.concat(standardDays, appendingBlankDays);
    return allDays;
  };

  // animate monthYear text in header and month days
  const animateContent = (direction, parentRef) => {
    const { current: textWrapper } = parentRef;
    const wrapperChildren = Array.from(textWrapper.children);
    const shownItem = wrapperChildren.find(child => child.classList.contains('-shown'));
    if (!shownItem) return; // prevent simultaneous animations
    const hiddenItem = wrapperChildren.find(child => child !== shownItem);
    const baseClass = shownItem.classList[0];
    const isNextMonth = direction === 'NEXT';
    const getAnimationClass = value => (value ? '-hiddenNext' : '-hiddenPrevious');
    shownItem.className = `${baseClass} ${getAnimationClass(!isNextMonth)}`;
    hiddenItem.className = `${baseClass} ${getAnimationClass(isNextMonth)}`;
    hiddenItem.classList.add('-shownAnimated');
  };

  const handleAnimationEnd = ({ target }) => {
    target.classList.remove('-hiddenNext');
    target.classList.remove('-hiddenPrevious');
    target.classList.replace('-shownAnimated', '-shown');
  };

  const updateDate = () => {
    setMainState({
      ...mainState,
      cycleCount: mainState.cycleCount + 1,
      activeDate: getDateAccordingToMonth(activeDate, mainState.status),
    });
  };

  const handleMonthClick = direction => {
    setMainState({
      ...mainState,
      status: direction,
    });
    animateContent(direction, monthYearTextWrapper);
    animateContent(direction, calendarSectionWrapper);
  };

  const getMonthYearText = isNewMonth => {
    const date =
      typeof isNewMonth === 'boolean' ? getDate(!isNewMonth) : shallowCloneObject(isNewMonth);
    const year = toPersianNumber(date.year).slice(-2);
    const month = getMonthName(date.month);
    return `${month} ${year}`;
  };

  // determine the hidden animated item
  const isCycleCountEven = mainState.cycleCount % 2 === 0;

  const MonthHeader = () => (
    <div className="Calendar__header">
      {shouldPrepareAnimation && (
        <button
          className="Calendar__monthArrowWrapper -right"
          onClick={() => handleMonthClick('PREVIOUS')}
          aria-label="ماه قبل"
          type="button"
        >
          <span className="Calendar__monthArrow" alt="فلش راست">
            &nbsp;
          </span>
        </button>
      )}
      <div className="Calendar__monthYearContainer" ref={monthYearTextWrapper}>
        &nbsp;
        <span onAnimationEnd={handleAnimationEnd} className="Calendar__monthYear -shown">
          {getMonthYearText(showMultipleMonths ? monthDate : isCycleCountEven)}
        </span>
        {shouldPrepareAnimation && (
          <span onAnimationEnd={handleAnimationEnd} className="Calendar__monthYear -hiddenNext">
            {getMonthYearText(!isCycleCountEven)}
          </span>
        )}
      </div>
      {shouldPrepareAnimation && (
        <button
          className="Calendar__monthArrowWrapper -left"
          onClick={() => handleMonthClick('NEXT')}
          aria-label="ماه بعد"
          type="button"
        >
          <span className="Calendar__monthArrow" alt="فلش چپ">
            &nbsp;
          </span>
        </button>
      )}
    </div>
  );

  const WeekDays = () =>
    Object.keys(WEEK_DAYS).map(key => (
      <span key={key} className="Calendar__weekDay">
        {WEEK_DAYS[key][0]}
      </span>
    ));

  const MonthDays = isNewMonth => {
    const allDays = getViewMonthDays(isNewMonth);
    return allDays.map(({ id, value: day, month, year, isStandard }) => {
      const dayItem = { day, month, year };
      const isDisabled = disabledDays.some(disabledDay => isSameDay(dayItem, disabledDay));
      const additionalClass = getDayClassNames({ ...dayItem, isStandard, isDisabled });
      return (
        <button
          key={id}
          className={`Calendar__day ${additionalClass}`}
          onClick={() => {
            if (isDisabled) {
              onDisabledDayError(dayItem); // good for showing error messages
              return;
            }
            handleDayClick({ day, month, year });
          }}
          disabled={!isStandard}
          type="button"
          {...dayBtnProps}
        >
          {toPersianNumber(day)}
        </button>
      );
    });
  };

  const MonthSection = () => (
    <div ref={calendarSectionWrapper} className="Calendar__sectionWrapper">
      <div
        onAnimationEnd={e => {
          handleAnimationEnd(e);
          updateDate();
        }}
        className="Calendar__section -shown"
      >
        {MonthDays(showMultipleMonths ? monthDate : isCycleCountEven)}
      </div>
      {shouldPrepareAnimation && (
        <div
          onAnimationEnd={e => {
            handleAnimationEnd(e);
            updateDate();
          }}
          className="Calendar__section -hiddenNext"
        >
          {MonthDays(!isCycleCountEven)}
        </div>
      )}
    </div>
  );

  return (
    <div className="Calendar__month">
      {MonthHeader()}
      <div className="Calendar__weekDays">{WeekDays()}</div>
      {MonthSection()}
    </div>
  );
};

export default Month;
