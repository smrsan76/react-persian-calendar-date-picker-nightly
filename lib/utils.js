"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCloneObject = exports.shallowCloneObject = exports.putZero = exports.isBeforeDate = exports.checkDayInDayRange = exports.isSameMonth = exports.isSameDay = exports.getDateAccordingToMonth = exports.getMonthFirstWeekday = exports.getMonthLength = exports.getMonthName = exports.createUniqueRange = exports.toPersianNumber = exports.getToday = exports.PERSIAN_MONTHS = exports.WEEK_DAYS = void 0;

var _jalaaliJs = _interopRequireDefault(require("jalaali-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var PERSIAN_NUMBERS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
var PERSIAN_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
exports.PERSIAN_MONTHS = PERSIAN_MONTHS;
var WEEK_DAYS = {
  saturday: 'شنبه',
  sunday: 'یکشنبه',
  monday: 'دوشنبه',
  tuesday: 'سه شنبه',
  wednesday: 'چهارشنبه',
  thursday: 'پنجشنبه',
  friday: 'جمعه'
};
exports.WEEK_DAYS = WEEK_DAYS;

var getToday = function getToday() {
  var todayDate = new Date();
  var todayYear = todayDate.getFullYear();
  var todayMonth = todayDate.getMonth() + 1;
  var todayDay = todayDate.getDate();

  var _jalaali$toJalaali = _jalaaliJs["default"].toJalaali(todayYear, todayMonth, todayDay),
      J_YEAR = _jalaali$toJalaali.jy,
      J_MONTH = _jalaali$toJalaali.jm,
      J_DAY = _jalaali$toJalaali.jd;

  var currentDate = {
    year: J_YEAR,
    month: J_MONTH,
    day: J_DAY
  };
  return currentDate;
};

exports.getToday = getToday;

var createUniqueRange = function createUniqueRange(number, startingId) {
  return Array.from(Array(number).keys()).map(function (key) {
    return {
      value: key + 1,
      id: "".concat(startingId, "-").concat(key)
    };
  });
};

exports.createUniqueRange = createUniqueRange;

var toPersianNumber = function toPersianNumber(number) {
  return number.toString().split('').map(function (letter) {
    return PERSIAN_NUMBERS[Number(letter)];
  }).join('');
};

exports.toPersianNumber = toPersianNumber;

var getMonthName = function getMonthName(month) {
  return PERSIAN_MONTHS[month - 1];
};

exports.getMonthName = getMonthName;

var getMonthLength = function getMonthLength(date) {
  return _jalaaliJs["default"].jalaaliMonthLength(date.year, date.month);
};

exports.getMonthLength = getMonthLength;

var getMonthFirstWeekday = function getMonthFirstWeekday(_date) {
  var gregorianFirstDay = _jalaaliJs["default"].toGregorian(_date.year, _date.month, 1);

  var gregorianDate = new Date(gregorianFirstDay.gy, gregorianFirstDay.gm - 1, gregorianFirstDay.gd);
  var weekday = gregorianDate.getDay();
  return weekday < 6 ? weekday + 1 : 0;
};

exports.getMonthFirstWeekday = getMonthFirstWeekday;

var getDateAccordingToMonth = function getDateAccordingToMonth(date, direction) {
  var toSum = direction === 'NEXT' ? 1 : -1;
  var newMonthIndex = date.month + toSum;
  var newYear = date.year;

  if (newMonthIndex < 1) {
    newMonthIndex = 12;
    newYear -= 1;
  }

  if (newMonthIndex > 12) {
    newMonthIndex = 1;
    newYear += 1;
  }

  var newDate = {
    year: newYear,
    month: newMonthIndex,
    day: 1
  };
  return newDate;
};

exports.getDateAccordingToMonth = getDateAccordingToMonth;

var isSameDay = function isSameDay(day1, day2) {
  if (!day1 || !day2) return false;
  return day1.day === day2.day && day1.month === day2.month && day1.year === day2.year;
};

exports.isSameDay = isSameDay;

var isSameMonth = function isSameMonth(month1, month2) {
  if (!month1 || !month2) return false;
  return month1.month === month2.month && month1.year === month2.year;
};

exports.isSameMonth = isSameMonth;

var toExtendedDay = function toExtendedDay(date) {
  return [date.year, date.month, date.day];
};

var toNativeDate = function toNativeDate(date) {
  var gregorian = _jalaaliJs["default"].toGregorian.apply(_jalaaliJs["default"], _toConsumableArray(toExtendedDay(date)));

  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
};

var isBeforeDate = function isBeforeDate(day1, day2) {
  if (!day1 || !day2) return false;
  return toNativeDate(day1) < toNativeDate(day2);
};

exports.isBeforeDate = isBeforeDate;

var checkDayInDayRange = function checkDayInDayRange(_ref) {
  var day = _ref.day,
      from = _ref.from,
      to = _ref.to;
  if (!day || !from || !to) return false;
  var nativeDay = toNativeDate(day);
  var nativeFrom = toNativeDate(from);
  var nativeTo = toNativeDate(to);
  return nativeDay > nativeFrom && nativeDay < nativeTo;
};

exports.checkDayInDayRange = checkDayInDayRange;

var putZero = function putZero(number) {
  return number.toString().length === 1 ? "0".concat(number) : number;
};

exports.putZero = putZero;

var shallowCloneObject = function shallowCloneObject(obj) {
  return _objectSpread({}, obj);
};

exports.shallowCloneObject = shallowCloneObject;

var deepCloneObject = function deepCloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.deepCloneObject = deepCloneObject;