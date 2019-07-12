"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Months = _interopRequireDefault(require("./Calendar/Months"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Calendar = function Calendar(_ref) {
  var selectedDay = _ref.selectedDay,
      selectedDayRange = _ref.selectedDayRange,
      onChange = _ref.onChange,
      onDisabledDayError = _ref.onDisabledDayError,
      isDayRange = _ref.isDayRange,
      isMultipleDays = _ref.isMultipleDays,
      calendarClassName = _ref.calendarClassName,
      calendarTodayClassName = _ref.calendarTodayClassName,
      calendarSelectedDayClassName = _ref.calendarSelectedDayClassName,
      calendarRangeStartClassName = _ref.calendarRangeStartClassName,
      calendarRangeBetweenClassName = _ref.calendarRangeBetweenClassName,
      calendarRangeEndClassName = _ref.calendarRangeEndClassName,
      disabledDays = _ref.disabledDays,
      colorPrimary = _ref.colorPrimary,
      colorPrimaryLight = _ref.colorPrimaryLight,
      selectedDays = _ref.selectedDays,
      dayBtnProps = _ref.dayBtnProps,
      showMonthArrowBtns = _ref.showMonthArrowBtns,
      showMultipleMonths = _ref.showMultipleMonths,
      displayMonthsFrom = _ref.displayMonthsFrom,
      displayMonthsTo = _ref.displayMonthsTo,
      displayYear = _ref.displayYear;
  var shouldPrepareAnimation = showMonthArrowBtns && !showMultipleMonths;
  return _react["default"].createElement("div", {
    className: "Calendar ".concat(calendarClassName, " ").concat(!shouldPrepareAnimation && '-no-nav'),
    style: {
      '--cl-color-primary': colorPrimary,
      '--cl-color-primary-light': colorPrimaryLight
    }
  }, _react["default"].createElement(_Months["default"], {
    selectedDay: selectedDay,
    selectedDayRange: selectedDayRange,
    onChange: onChange,
    onDisabledDayError: onDisabledDayError,
    isDayRange: isDayRange,
    isMultipleDays: isMultipleDays,
    calendarTodayClassName: calendarTodayClassName,
    calendarSelectedDayClassName: calendarSelectedDayClassName,
    calendarRangeStartClassName: calendarRangeStartClassName,
    calendarRangeBetweenClassName: calendarRangeBetweenClassName,
    calendarRangeEndClassName: calendarRangeEndClassName,
    disabledDays: disabledDays,
    selectedDays: selectedDays,
    dayBtnProps: dayBtnProps,
    showMonthArrowBtns: showMonthArrowBtns,
    showMultipleMonths: showMultipleMonths,
    displayMonthsFrom: displayMonthsFrom,
    displayMonthsTo: displayMonthsTo,
    displayYear: displayYear,
    shouldPrepareAnimation: shouldPrepareAnimation
  }));
};

exports.Calendar = Calendar;
var dayShape = {
  year: _propTypes["default"].number.isRequired,
  month: _propTypes["default"].number.isRequired,
  day: _propTypes["default"].number.isRequired
};
var monthShape = {
  year: _propTypes["default"].number.isRequired,
  month: _propTypes["default"].number.isRequired
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
    to: null
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
  displayYear: null
};
Calendar.propTypes = {
  onChange: _propTypes["default"].func,
  isDayRange: _propTypes["default"].bool,
  isMultipleDays: _propTypes["default"].bool,
  onDisabledDayError: _propTypes["default"].func,
  selectedDay: _propTypes["default"].shape(dayShape),
  selectedDayRange: _propTypes["default"].shape({
    from: _propTypes["default"].shape(dayShape),
    to: _propTypes["default"].shape(dayShape)
  }),
  disabledDays: _propTypes["default"].arrayOf(_propTypes["default"].shape(dayShape)),
  calendarClassName: _propTypes["default"].string,
  calendarTodayClassName: _propTypes["default"].string,
  calendarSelectedDayClassName: _propTypes["default"].string,
  calendarRangeStartClassName: _propTypes["default"].string,
  calendarRangeBetweenClassName: _propTypes["default"].string,
  calendarRangeEndClassName: _propTypes["default"].string,
  colorPrimary: _propTypes["default"].string,
  colorPrimaryLight: _propTypes["default"].string,
  showMonthArrowBtns: _propTypes["default"].bool,
  showMultipleMonths: _propTypes["default"].bool,
  displayMonthsFrom: _propTypes["default"].shape(monthShape),
  displayMonthsTo: _propTypes["default"].shape(monthShape),
  displayYear: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].bool])
};