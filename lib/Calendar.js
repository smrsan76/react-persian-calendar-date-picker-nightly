Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Calendar = void 0;

const _react = _interopRequireWildcard(require('react'));

const _propTypes = _interopRequireDefault(require('prop-types'));

const _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  const newObj = {};
  if (obj != null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const desc =
          Object.defineProperty && Object.getOwnPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : {};
        if (desc.get || desc.set) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj.default = obj;
  return newObj;
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (let i = 1; i < arguments.length; i++) {
        const source = arguments[i];
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    let ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }),
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  const _arr = [];
  let _n = true;
  let _d = false;
  let _e;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i.return != null) _i.return();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

const Calendar = function Calendar(_ref) {
  const { selectedDay } = _ref;
  const { selectedDayRange } = _ref;
  const { onChange } = _ref;
  const { onDisabledDayError } = _ref;
  const { isDayRange } = _ref;
  const { isMultipleDays } = _ref;
  const { calendarClassName } = _ref;
  const { calendarTodayClassName } = _ref;
  const { calendarSelectedDayClassName } = _ref;
  const { calendarRangeStartClassName } = _ref;
  const { calendarRangeBetweenClassName } = _ref;
  const { calendarRangeEndClassName } = _ref;
  const { disabledDays } = _ref;
  const { colorPrimary } = _ref;
  const { colorPrimaryLight } = _ref;
  const { selectedDays } = _ref;
  const { dayBtnProps } = _ref;
  const { showMonthArrowBtns } = _ref;
  const { showMultipleMonths } = _ref;
  const { displayMonthsFrom } = _ref;
  const { displayMonthsTo } = _ref;
  const { displayYear } = _ref;
  const monthYearTextWrapper = (0, _react.useRef)(null);
  const calendarSectionWrapper = (0, _react.useRef)(null);

  const _useState = (0, _react.useState)({
    status: 'NEXT',
    cycleCount: 1,
    activeDate: null,
  });
  const _useState2 = _slicedToArray(_useState, 2);
  const mainState = _useState2[0];
  const setMainState = _useState2[1];

  const shouldPrepareAnimation = showMonthArrowBtns && !showMultipleMonths;
  const today = (0, _utils.getToday)();
  let activeDate = mainState.activeDate
    ? (0, _utils.shallowCloneObject)(mainState.activeDate)
    : null;

  const setActiveDate = function setActiveDate() {
    if (selectedDay) activeDate = (0, _utils.shallowCloneObject)(selectedDay);
    else if (selectedDays.length) activeDate = (0, _utils.shallowCloneObject)(selectedDays[0]);
    else if (selectedDayRange.from)
      activeDate = (0, _utils.shallowCloneObject)(selectedDayRange.from);
    else activeDate = (0, _utils.shallowCloneObject)(today);
  };

  if (!activeDate) setActiveDate();

  const renderWeekDays = function renderWeekDays() {
    return Object.keys(_utils.WEEK_DAYS).map(function(key) {
      return _react.default.createElement(
        'span',
        {
          key,
          className: 'Calendar__weekDay',
        },
        _utils.WEEK_DAYS[key][0],
      );
    });
  };

  const getDate = function getDate(isThisMonth) {
    return isThisMonth
      ? activeDate
      : (0, _utils.getDateAccordingToMonth)(activeDate, mainState.status);
  };

  const getMonthYearText = function getMonthYearText(isNewMonth) {
    const date =
      typeof isNewMonth === 'boolean'
        ? getDate(!isNewMonth)
        : (0, _utils.shallowCloneObject)(isNewMonth);
    const year = (0, _utils.toPersianNumber)(date.year).slice(-2);
    const month = (0, _utils.getMonthName)(date.month);
    return ''.concat(month, ' ').concat(year);
  };

  const getDayRangeValue = function getDayRangeValue(day) {
    const clonedDayRange = (0, _utils.deepCloneObject)(selectedDayRange);
    const dayRangeValue =
      clonedDayRange.from && clonedDayRange.to
        ? {
            from: null,
            to: null,
          }
        : clonedDayRange;
    const dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
    dayRangeValue[dayRangeProp] = day;
    const { from } = dayRangeValue;
    const { to } = dayRangeValue; // swap from and to values if from is later than to

    if ((0, _utils.isBeforeDate)(dayRangeValue.to, dayRangeValue.from)) {
      dayRangeValue.from = to;
      dayRangeValue.to = from;
    }

    const checkIncludingDisabledDay = function checkIncludingDisabledDay(disabledDay) {
      return (0, _utils.checkDayInDayRange)({
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

  const handleDayClick = function handleDayClick(day) {
    if (!isMultipleDays) {
      const newDayValue = isDayRange ? getDayRangeValue(day) : day;
      onChange(newDayValue);
      return;
    }

    const isSelectedBefore = selectedDays.some(function(sd) {
      return (0, _utils.isSameDay)(sd, day);
    });

    if (isSelectedBefore) {
      onChange(
        selectedDays.filter(function(sd) {
          return !(0, _utils.isSameDay)(sd, day);
        }),
      );
      return;
    }

    onChange([].concat(_toConsumableArray(selectedDays), [day]));
  };

  const getDayClassNames = function getDayClassNames(dayItem) {
    const isToday = (0, _utils.isSameDay)(dayItem, today);
    let isSelected = false;

    if (selectedDay) {
      isSelected = (0, _utils.isSameDay)(dayItem, selectedDay);
    } else if (selectedDays.length) {
      selectedDays.some(function(sd) {
        if (!(0, _utils.isSameDay)(dayItem, sd)) return false;
        isSelected = true;
        return true;
      });
    }

    const startingDay = selectedDayRange.from;
    const endingDay = selectedDayRange.to;
    const isStartedDayRange = (0, _utils.isSameDay)(dayItem, startingDay);
    const isEndingDayRange = (0, _utils.isSameDay)(dayItem, endingDay);
    const isWithinRange = (0, _utils.checkDayInDayRange)({
      day: dayItem,
      from: startingDay,
      to: endingDay,
    });
    const classNames = ''
      .concat(isToday && !isSelected ? ' -today '.concat(calendarTodayClassName) : '')
      .concat(!dayItem.isStandard ? ' -blank' : '')
      .concat(isSelected ? ' -selected '.concat(calendarSelectedDayClassName) : '')
      .concat(isStartedDayRange ? ' -selectedStart '.concat(calendarRangeStartClassName) : '')
      .concat(isEndingDayRange ? ' -selectedEnd '.concat(calendarRangeEndClassName) : '')
      .concat(isWithinRange ? ' -selectedBetween '.concat(calendarRangeBetweenClassName) : '')
      .concat(dayItem.isDisabled ? '-disabled' : '');
    return classNames;
  };

  const getViewMonthDays = function getViewMonthDays(isNewMonth) {
    const date =
      typeof isNewMonth === 'boolean'
        ? getDate(!isNewMonth)
        : (0, _utils.shallowCloneObject)(isNewMonth);
    const prependingBlankDays = (0, _utils.createUniqueRange)(
      (0, _utils.getMonthFirstWeekday)(date),
      'starting-blank',
    ); // all months will have an additional 7 days(week) for rendering purpose

    const appendingBlankDays = (0, _utils.createUniqueRange)(
      7 - (0, _utils.getMonthFirstWeekday)(date),
      'ending-blank',
    );
    const standardDays = (0, _utils.createUniqueRange)((0, _utils.getMonthLength)(date)).map(
      function(day) {
        return _objectSpread({}, day, {
          isStandard: true,
          month: date.month,
          year: date.year,
        });
      },
      'standard',
    );
    const allDays = prependingBlankDays.concat(standardDays, appendingBlankDays);
    return allDays;
  };

  const renderMonthDays = function renderMonthDays(isNewMonth) {
    const allDays = getViewMonthDays(isNewMonth);
    return allDays.map(function(_ref2) {
      const { id } = _ref2;
      const day = _ref2.value;
      const { month } = _ref2;
      const { year } = _ref2;
      const { isStandard } = _ref2;
      const dayItem = {
        day,
        month,
        year,
      };
      const isDisabled = disabledDays.some(function(disabledDay) {
        return (0, _utils.isSameDay)(dayItem, disabledDay);
      });
      const additionalClass = getDayClassNames(
        _objectSpread({}, dayItem, {
          isStandard,
          isDisabled,
        }),
      );
      return _react.default.createElement(
        'button',
        _extends(
          {
            key: id,
            className: 'Calendar__day '.concat(additionalClass),
            onClick: function onClick() {
              if (isDisabled) {
                onDisabledDayError(dayItem); // good for showing error messages

                return;
              }

              handleDayClick({
                day,
                month,
                year,
              });
            },
            disabled: !isStandard,
            type: 'button',
          },
          dayBtnProps,
        ),
        (0, _utils.toPersianNumber)(day),
      );
    });
  }; // animate monthYear text in header and month days

  const animateContent = function animateContent(direction, parentRef) {
    const textWrapper = parentRef.current;
    const wrapperChildren = Array.from(textWrapper.children);
    const shownItem = wrapperChildren.find(function(child) {
      return child.classList.contains('-shown');
    });
    if (!shownItem) return; // prevent simultaneous animations

    const hiddenItem = wrapperChildren.find(function(child) {
      return child !== shownItem;
    });
    const baseClass = shownItem.classList[0];
    const isNextMonth = direction === 'NEXT';

    const getAnimationClass = function getAnimationClass(value) {
      return value ? '-hiddenNext' : '-hiddenPrevious';
    };

    shownItem.className = ''.concat(baseClass, ' ').concat(getAnimationClass(!isNextMonth));
    hiddenItem.className = ''.concat(baseClass, ' ').concat(getAnimationClass(isNextMonth));
    hiddenItem.classList.add('-shownAnimated');
  };

  const handleMonthClick = function handleMonthClick(direction) {
    setMainState(
      _objectSpread({}, mainState, {
        status: direction,
      }),
    );
    animateContent(direction, monthYearTextWrapper);
    animateContent(direction, calendarSectionWrapper);
  };

  const handleAnimationEnd = function handleAnimationEnd(_ref3) {
    const { target } = _ref3;
    target.classList.remove('-hiddenNext');
    target.classList.remove('-hiddenPrevious');
    target.classList.replace('-shownAnimated', '-shown');
  };

  const updateDate = function updateDate() {
    setMainState(
      _objectSpread({}, mainState, {
        cycleCount: mainState.cycleCount + 1,
        activeDate: (0, _utils.getDateAccordingToMonth)(activeDate, mainState.status),
      }),
    );
  }; // determine the hidden animated item

  const isCycleCountEven = mainState.cycleCount % 2 === 0;

  const renderMonthHeader = function renderMonthHeader(month) {
    return _react.default.createElement(
      'div',
      {
        className: 'Calendar__header',
      },
      shouldPrepareAnimation &&
        _react.default.createElement(
          'button',
          {
            className: 'Calendar__monthArrowWrapper -right',
            onClick: function onClick() {
              return handleMonthClick('PREVIOUS');
            },
            'aria-label': '\u0645\u0627\u0647 \u0642\u0628\u0644',
            type: 'button',
          },
          _react.default.createElement(
            'span',
            {
              className: 'Calendar__monthArrow',
              alt: '\u0641\u0644\u0634 \u0631\u0627\u0633\u062A',
            },
            '\xA0',
          ),
        ),
      _react.default.createElement(
        'div',
        {
          className: 'Calendar__monthYearContainer',
          ref: monthYearTextWrapper,
        },
        '\xA0',
        _react.default.createElement(
          'span',
          {
            onAnimationEnd: handleAnimationEnd,
            className: 'Calendar__monthYear -shown',
          },
          getMonthYearText(showMultipleMonths ? month : isCycleCountEven),
        ),
        shouldPrepareAnimation &&
          _react.default.createElement(
            'span',
            {
              onAnimationEnd: handleAnimationEnd,
              className: 'Calendar__monthYear -hiddenNext',
            },
            getMonthYearText(!isCycleCountEven),
          ),
      ),
      shouldPrepareAnimation &&
        _react.default.createElement(
          'button',
          {
            className: 'Calendar__monthArrowWrapper -left',
            onClick: function onClick() {
              return handleMonthClick('NEXT');
            },
            'aria-label': '\u0645\u0627\u0647 \u0628\u0639\u062F',
            type: 'button',
          },
          _react.default.createElement(
            'span',
            {
              className: 'Calendar__monthArrow',
              alt: '\u0641\u0644\u0634 \u0686\u067E',
            },
            '\xA0',
          ),
        ),
    );
  };

  const renderMonthSection = function renderMonthSection(month) {
    return _react.default.createElement(
      'div',
      {
        ref: calendarSectionWrapper,
        className: 'Calendar__sectionWrapper',
      },
      _react.default.createElement(
        'div',
        {
          onAnimationEnd: function onAnimationEnd(e) {
            handleAnimationEnd(e);
            updateDate();
          },
          className: 'Calendar__section -shown',
        },
        renderMonthDays(showMultipleMonths ? month : isCycleCountEven),
      ),
      shouldPrepareAnimation &&
        _react.default.createElement(
          'div',
          {
            onAnimationEnd: function onAnimationEnd(e) {
              handleAnimationEnd(e);
              updateDate();
            },
            className: 'Calendar__section -hiddenNext',
          },
          renderMonthDays(!isCycleCountEven),
        ),
    );
  };

  const renderMonth = function renderMonth(month, key) {
    return _react.default.createElement(
      'div',
      {
        key,
        className: 'Calendar__month',
      },
      renderMonthHeader(month),
      _react.default.createElement(
        'div',
        {
          className: 'Calendar__weekDays',
        },
        renderWeekDays(),
      ),
      renderMonthSection(month),
    );
  };

  const renderMonths = function renderMonths() {
    let currentMonth = (0, _utils.shallowCloneObject)(activeDate);
    let monthsStart = (0, _utils.shallowCloneObject)(currentMonth);
    let monthsEnd = (0, _utils.shallowCloneObject)(currentMonth);
    let monthKey = 0;
    const monthsToRender = [];

    if (showMultipleMonths) {
      if (displayYear) {
        const year = typeof displayYear === 'boolean' ? activeDate.year : displayYear;
        monthsStart = {
          year,
          month: 1,
        };
        monthsEnd = {
          year,
          month: 12,
        };
      } else if (displayMonthsFrom && displayMonthsTo) {
        monthsStart = (0, _utils.shallowCloneObject)(displayMonthsFrom);
        monthsEnd = (0, _utils.shallowCloneObject)(displayMonthsTo);
      }
    }

    monthsStart.day = 1;
    monthsEnd.day = 1;

    if ((0, _utils.isBeforeDate)(monthsEnd, monthsStart)) {
      currentMonth = monthsEnd;
      monthsEnd = monthsStart;
      monthsStart = (0, _utils.shallowCloneObject)(currentMonth);
    } else {
      currentMonth = (0, _utils.shallowCloneObject)(monthsStart);
    }

    while (!(0, _utils.isBeforeDate)(monthsEnd, currentMonth)) {
      monthsToRender.push(renderMonth(currentMonth, monthKey));
      currentMonth = (0, _utils.getDateAccordingToMonth)(currentMonth, 'NEXT');
      monthKey += 1;
    }

    return monthsToRender;
  };

  return _react.default.createElement(
    'div',
    {
      className: 'Calendar '
        .concat(calendarClassName, ' ')
        .concat(!shouldPrepareAnimation && '-no-nav'),
      style: {
        '--cl-color-primary': colorPrimary,
        '--cl-color-primary-light': colorPrimaryLight,
      },
    },
    renderMonths(),
  );
};

exports.Calendar = Calendar;
const dayShape = {
  year: _propTypes.default.number.isRequired,
  month: _propTypes.default.number.isRequired,
  day: _propTypes.default.number.isRequired,
};
const monthShape = {
  year: _propTypes.default.number.isRequired,
  month: _propTypes.default.number.isRequired,
};
Calendar.defaultProps = {
  onChange: function onChange() {
    return null;
  },
  isDayRange: false,
  isMultipleDays: false,
  onDisabledDayError: function onDisabledDayError() {
    return null;
  },
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
  onChange: _propTypes.default.func,
  isDayRange: _propTypes.default.bool,
  isMultipleDays: _propTypes.default.bool,
  onDisabledDayError: _propTypes.default.func,
  selectedDay: _propTypes.default.shape(dayShape),
  selectedDayRange: _propTypes.default.shape({
    from: _propTypes.default.shape(dayShape),
    to: _propTypes.default.shape(dayShape),
  }),
  disabledDays: _propTypes.default.arrayOf(_propTypes.default.shape(dayShape)),
  calendarClassName: _propTypes.default.string,
  calendarTodayClassName: _propTypes.default.string,
  calendarSelectedDayClassName: _propTypes.default.string,
  calendarRangeStartClassName: _propTypes.default.string,
  calendarRangeBetweenClassName: _propTypes.default.string,
  calendarRangeEndClassName: _propTypes.default.string,
  colorPrimary: _propTypes.default.string,
  colorPrimaryLight: _propTypes.default.string,
  showMonthArrowBtns: _propTypes.default.bool,
  showMultipleMonths: _propTypes.default.bool,
  displayMonthsFrom: _propTypes.default.shape(monthShape),
  displayMonthsTo: _propTypes.default.shape(monthShape),
  displayYear: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
};
