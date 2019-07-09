Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _react = _interopRequireWildcard(require('react'));

const _propTypes = _interopRequireDefault(require('prop-types'));

const _Calendar = require('./Calendar');

const _DatePickerInput = _interopRequireDefault(require('./DatePickerInput'));

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

let shouldPreventFocus;
let mousePosition;

const DatePicker = function DatePicker(_ref) {
  const { isDayRange } = _ref;
  const { isMultipleDays } = _ref;
  const { selectedDay } = _ref;
  const { onChange } = _ref;
  const { formatInputText } = _ref;
  const { inputPlaceholder } = _ref;
  const { inputClassName } = _ref;
  const { renderInput } = _ref;
  const { selectedDayRange } = _ref;
  const { wrapperClassName } = _ref;
  const { calendarClassName } = _ref;
  const { calendarTodayClassName } = _ref;
  const { calendarSelectedDayClassName } = _ref;
  const { calendarRangeStartClassName } = _ref;
  const { calendarRangeBetweenClassName } = _ref;
  const { calendarRangeEndClassName } = _ref;
  const { disabledDays } = _ref;
  const { onDisabledDayError } = _ref;
  const { colorPrimary } = _ref;
  const { colorPrimaryLight } = _ref;
  const { selectedDays } = _ref;
  const { dayBtnProps } = _ref;
  const calendarContainer = (0, _react.useRef)(null);
  const dateInput = (0, _react.useRef)(null);

  const _useState = (0, _react.useState)(false);
  const _useState2 = _slicedToArray(_useState, 2);
  const isCalendarOpen = _useState2[0];
  const setCalendarVisiblity = _useState2[1];

  const handleMouseMove = function handleMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    mousePosition = {
      x,
      y,
    };
  }; // get mouse live position

  (0, _react.useEffect)(function() {
    document.addEventListener('mousemove', handleMouseMove, false);
    return function() {
      document.removeEventListener('mousemove', handleMouseMove, false);
    };
  }, []); // handle input focus/blur

  (0, _react.useEffect)(
    function() {
      const shouldCloseCalendar = !isDayRange
        ? !isCalendarOpen
        : !isCalendarOpen && selectedDayRange.from && selectedDayRange.to;
      if (shouldCloseCalendar) dateInput.current.blur();
    },
    [selectedDay, isCalendarOpen],
  );

  const toggleCalendar = function toggleCalendar() {
    return setCalendarVisiblity(!isCalendarOpen);
  }; // keep calendar open if clicked inside the calendar

  const handleBlur = function handleBlur(e) {
    e.persist();
    const calendar = calendarContainer.current;
    if (!calendar) return;
    const calendarPosition = calendar.getBoundingClientRect();

    const isInBetween = function isInBetween(value, start, end) {
      return value >= start && value <= end;
    };

    const isInsideCalendar =
      isInBetween(mousePosition.x, calendarPosition.left, calendarPosition.right) &&
      isInBetween(mousePosition.y, calendarPosition.top, calendarPosition.bottom);

    if (isInsideCalendar) {
      shouldPreventFocus = true;
      e.target.focus();
      shouldPreventFocus = false;
      return;
    }

    toggleCalendar();
  };

  const handleFocus = function handleFocus() {
    if (shouldPreventFocus) return;
    toggleCalendar();
  };

  const handleDaySelect = function handleDaySelect(day) {
    onChange(day);
    toggleCalendar();
  };

  const handleDayRangeSelect = function handleDayRangeSelect(range) {
    onChange(range);
    if (range.from && range.to) toggleCalendar();
  };

  return _react.default.createElement(
    'div',
    {
      className: 'DatePicker '.concat(wrapperClassName),
    },
    isCalendarOpen &&
      _react.default.createElement(
        'div',
        {
          ref: calendarContainer,
          className: 'DatePicker__calendarContainer',
        },
        _react.default.createElement(_Calendar.Calendar, {
          onDaySelect: handleDaySelect,
          selectedDay,
          onChange: isDayRange ? handleDayRangeSelect : handleDaySelect,
          selectedDayRange,
          onDayRangeSelect: handleDayRangeSelect,
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
          onDisabledDayError,
          selectedDays,
          dayBtnProps,
        }),
      ),
    _react.default.createElement(_DatePickerInput.default, {
      ref: dateInput,
      onFocus: handleFocus,
      onBlur: handleBlur,
      formatInputText,
      selectedDay,
      selectedDayRange,
      inputPlaceholder,
      inputClassName,
      renderInput,
      isDayRange,
      isMultipleDays,
      selectedDays,
    }),
  );
};

DatePicker.defaultProps = {
  wrapperClassName: '',
};
DatePicker.propTypes = {
  wrapperClassName: _propTypes.default.string,
};
const _default = DatePicker;
exports.default = _default;
