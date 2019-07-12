"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _Month = _interopRequireDefault(require("./Month"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Months = function Months(_ref) {
  var showMultipleMonths = _ref.showMultipleMonths,
      displayYear = _ref.displayYear,
      displayMonthsFrom = _ref.displayMonthsFrom,
      displayMonthsTo = _ref.displayMonthsTo,
      otherProps = _objectWithoutProperties(_ref, ["showMultipleMonths", "displayYear", "displayMonthsFrom", "displayMonthsTo"]);

  var _useState = (0, _react.useState)({
    months: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      mainState = _useState2[0],
      setMainState = _useState2[1];

  var today = (0, _utils.getToday)();

  var updateMonths = function updateMonths() {
    var currentMonth = today;
    var monthsStart = (0, _utils.shallowCloneObject)(currentMonth);
    var monthsEnd = (0, _utils.shallowCloneObject)(currentMonth);
    var months = [];

    if (showMultipleMonths) {
      if (displayYear) {
        var year = typeof displayYear === 'boolean' ? currentMonth.year : displayYear;
        monthsStart = {
          year: year,
          month: 1
        };
        monthsEnd = {
          year: year,
          month: 12
        };
      } else if (displayMonthsFrom && displayMonthsTo) {
        monthsStart = (0, _utils.shallowCloneObject)(displayMonthsFrom);
        monthsEnd = (0, _utils.shallowCloneObject)(displayMonthsTo);
      }

      monthsStart.day = 1;
      monthsEnd.day = 1;
    }

    if ((0, _utils.isBeforeDate)(monthsEnd, monthsStart)) {
      currentMonth = monthsEnd;
      monthsEnd = monthsStart;
      monthsStart = (0, _utils.shallowCloneObject)(currentMonth);
    } else {
      currentMonth = (0, _utils.shallowCloneObject)(monthsStart);
    }

    while (!(0, _utils.isBeforeDate)(monthsEnd, currentMonth)) {
      months.push((0, _utils.shallowCloneObject)(currentMonth));
      currentMonth = (0, _utils.getDateAccordingToMonth)(currentMonth, 'NEXT');
    }

    setMainState({
      months: months,
      prevShowMultipleMonths: showMultipleMonths,
      prevDisplayYear: displayYear,
      prevDisplayMonthsFrom: displayMonthsFrom,
      prevDisplayMonthsTo: displayMonthsTo
    });
  };

  var isNecessaryToUpdateMonths = function isNecessaryToUpdateMonths() {
    var months = mainState.months,
        prevShowMultipleMonths = mainState.prevShowMultipleMonths,
        prevDisplayYear = mainState.prevDisplayYear,
        prevDisplayMonthsFrom = mainState.prevDisplayMonthsFrom,
        prevDisplayMonthsTo = mainState.prevDisplayMonthsTo;
    if (!months.length) return true;
    if (showMultipleMonths !== prevShowMultipleMonths) return true;

    if (showMultipleMonths) {
      if (displayYear !== prevDisplayYear) return true;
      if (displayMonthsFrom && !(0, _utils.isSameMonth)(displayMonthsFrom, prevDisplayMonthsFrom)) return true;
      if (displayMonthsTo && !(0, _utils.isSameMonth)(displayMonthsTo, prevDisplayMonthsTo)) return true;
    }

    return false;
  };

  var renderMonths = function renderMonths() {
    var months = mainState.months;
    return months.map(function (m) {
      return _react["default"].createElement(_Month["default"], _extends({
        key: "".concat(m.year, "_").concat(m.month),
        monthDate: m,
        showMultipleMonths: showMultipleMonths
      }, otherProps));
    });
  };

  if (isNecessaryToUpdateMonths()) {
    updateMonths();
  }

  return renderMonths();
};

var _default = Months;
exports["default"] = _default;