Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Calendar = void 0;

const _react = _interopRequireDefault(require('react'));

const _propTypes = _interopRequireDefault(require('prop-types'));

const _Months = _interopRequireDefault(require('./Calendar/Months'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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
  const shouldPrepareAnimation = showMonthArrowBtns && !showMultipleMonths;
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
    _react.default.createElement(_Months.default, {
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
      showMonthArrowBtns,
      showMultipleMonths,
      displayMonthsFrom,
      displayMonthsTo,
      displayYear,
      shouldPrepareAnimation,
    }),
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
