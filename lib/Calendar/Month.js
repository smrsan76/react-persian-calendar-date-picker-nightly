"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Month = function Month(_ref) {
  var selectedDay = _ref.selectedDay,
      selectedDayRange = _ref.selectedDayRange,
      onChange = _ref.onChange,
      onDisabledDayError = _ref.onDisabledDayError,
      isDayRange = _ref.isDayRange,
      isMultipleDays = _ref.isMultipleDays,
      calendarTodayClassName = _ref.calendarTodayClassName,
      calendarSelectedDayClassName = _ref.calendarSelectedDayClassName,
      calendarRangeStartClassName = _ref.calendarRangeStartClassName,
      calendarRangeBetweenClassName = _ref.calendarRangeBetweenClassName,
      calendarRangeEndClassName = _ref.calendarRangeEndClassName,
      disabledDays = _ref.disabledDays,
      selectedDays = _ref.selectedDays,
      dayBtnProps = _ref.dayBtnProps,
      showMultipleMonths = _ref.showMultipleMonths,
      shouldPrepareAnimation = _ref.shouldPrepareAnimation,
      monthDate = _ref.monthDate,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate;
  var monthYearTextWrapper = (0, _react.useRef)(null);
  var calendarSectionWrapper = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)({
    status: 'NEXT',
    cycleCount: 1,
    activeDate: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      mainState = _useState2[0],
      setMainState = _useState2[1];

  var today = (0, _utils.getToday)();
  var activeDate = mainState.activeDate ? (0, _utils.shallowCloneObject)(mainState.activeDate) : null;

  var setActiveDate = function setActiveDate() {
    if (selectedDay) activeDate = (0, _utils.shallowCloneObject)(selectedDay);else if (selectedDays && selectedDays.length) activeDate = (0, _utils.shallowCloneObject)(selectedDays[0]);else if (selectedDayRange && selectedDayRange.from) activeDate = (0, _utils.shallowCloneObject)(selectedDayRange.from);else activeDate = (0, _utils.shallowCloneObject)(today);
  };

  if (!activeDate) setActiveDate();

  var getDate = function getDate(isThisMonth) {
    return isThisMonth ? activeDate : (0, _utils.getDateAccordingToMonth)(activeDate, mainState.status);
  };

  var getDayRangeValue = function getDayRangeValue(day) {
    var clonedDayRange = (0, _utils.deepCloneObject)(selectedDayRange);
    var dayRangeValue = clonedDayRange.from && clonedDayRange.to ? {
      from: null,
      to: null
    } : clonedDayRange;
    var dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
    dayRangeValue[dayRangeProp] = day;
    var from = dayRangeValue.from,
        to = dayRangeValue.to; // swap from and to values if from is later than to

    if ((0, _utils.isBeforeDate)(dayRangeValue.to, dayRangeValue.from)) {
      dayRangeValue.from = to;
      dayRangeValue.to = from;
    }

    var checkIncludingDisabledDay = function checkIncludingDisabledDay(disabledDay) {
      return (0, _utils.checkDayInDayRange)({
        day: disabledDay,
        from: dayRangeValue.from,
        to: dayRangeValue.to
      });
    };

    var includingDisabledDay = disabledDays.find(checkIncludingDisabledDay);

    if (includingDisabledDay) {
      onDisabledDayError(includingDisabledDay);
      return selectedDayRange;
    }

    return dayRangeValue;
  };

  var handleDayClick = function handleDayClick(day) {
    if (!isMultipleDays) {
      var newDayValue = isDayRange ? getDayRangeValue(day) : day;
      onChange(newDayValue);
      return;
    }

    var isSelectedBefore = selectedDays.some(function (sd) {
      return (0, _utils.isSameDay)(sd, day);
    });

    if (isSelectedBefore) {
      onChange(selectedDays.filter(function (sd) {
        return !(0, _utils.isSameDay)(sd, day);
      }));
      return;
    }

    onChange([].concat(_toConsumableArray(selectedDays), [day]));
  };

  var getDayClassNames = function getDayClassNames(dayItem) {
    var isToday = (0, _utils.isSameDay)(dayItem, today);
    var isSelected = false;

    if (selectedDay) {
      isSelected = (0, _utils.isSameDay)(dayItem, selectedDay);
    } else if (selectedDays.length) {
      selectedDays.some(function (sd) {
        if (!(0, _utils.isSameDay)(dayItem, sd)) return false;
        isSelected = true;
        return true;
      });
    }

    var startingDay = selectedDayRange.from,
        endingDay = selectedDayRange.to;
    var isStartedDayRange = (0, _utils.isSameDay)(dayItem, startingDay);
    var isEndingDayRange = (0, _utils.isSameDay)(dayItem, endingDay);
    var isWithinRange = (0, _utils.checkDayInDayRange)({
      day: dayItem,
      from: startingDay,
      to: endingDay
    });
    var classNames = ''.concat(isToday && !isSelected ? " -today ".concat(calendarTodayClassName) : '').concat(!dayItem.isStandard ? ' -blank' : '').concat(isSelected ? " -selected ".concat(calendarSelectedDayClassName) : '').concat(isStartedDayRange ? " -selectedStart ".concat(calendarRangeStartClassName) : '').concat(isEndingDayRange ? " -selectedEnd ".concat(calendarRangeEndClassName) : '').concat(isWithinRange ? " -selectedBetween ".concat(calendarRangeBetweenClassName) : '').concat(dayItem.isDisabled ? '-disabled' : '');
    return classNames;
  };

  var getViewMonthDays = function getViewMonthDays(isNewMonth) {
    var date = typeof isNewMonth === 'boolean' ? getDate(!isNewMonth) : (0, _utils.shallowCloneObject)(isNewMonth);
    var prependingBlankDays = (0, _utils.createUniqueRange)((0, _utils.getMonthFirstWeekday)(date), 'starting-blank'); // all months will have an additional 7 days(week) for rendering purpose

    var appendingBlankDays = (0, _utils.createUniqueRange)(7 - (0, _utils.getMonthFirstWeekday)(date), 'ending-blank');
    var standardDays = (0, _utils.createUniqueRange)((0, _utils.getMonthLength)(date), 'standard').map(function (day) {
      return _objectSpread({}, day, {
        isStandard: true,
        month: date.month,
        year: date.year
      });
    });
    var allDays = prependingBlankDays.concat(standardDays, appendingBlankDays);
    return allDays;
  }; // animate monthYear text in header and month days


  var animateContent = function animateContent(direction, parentRef) {
    var textWrapper = parentRef.current;
    var wrapperChildren = Array.from(textWrapper.children);
    var shownItem = wrapperChildren.find(function (child) {
      return child.classList.contains('-shown');
    });
    if (!shownItem) return; // prevent simultaneous animations

    var hiddenItem = wrapperChildren.find(function (child) {
      return child !== shownItem;
    });
    var baseClass = shownItem.classList[0];
    var isNextMonth = direction === 'NEXT';

    var getAnimationClass = function getAnimationClass(value) {
      return value ? '-hiddenNext' : '-hiddenPrevious';
    };

    shownItem.className = "".concat(baseClass, " ").concat(getAnimationClass(!isNextMonth));
    hiddenItem.className = "".concat(baseClass, " ").concat(getAnimationClass(isNextMonth));
    hiddenItem.classList.add('-shownAnimated');
  };

  var handleAnimationEnd = function handleAnimationEnd(_ref2) {
    var target = _ref2.target;
    target.classList.remove('-hiddenNext');
    target.classList.remove('-hiddenPrevious');
    target.classList.replace('-shownAnimated', '-shown');
  };

  var updateDate = function updateDate() {
    setMainState(_objectSpread({}, mainState, {
      cycleCount: mainState.cycleCount + 1,
      activeDate: (0, _utils.getDateAccordingToMonth)(activeDate, mainState.status)
    }));
  };

  var handleMonthClick = function handleMonthClick(direction) {
    setMainState(_objectSpread({}, mainState, {
      status: direction
    }));
    animateContent(direction, monthYearTextWrapper);
    animateContent(direction, calendarSectionWrapper);
  };

  var getMonthYearText = function getMonthYearText(isNewMonth) {
    var date = typeof isNewMonth === 'boolean' ? getDate(!isNewMonth) : (0, _utils.shallowCloneObject)(isNewMonth);
    var year = (0, _utils.toPersianNumber)(date.year).slice(-2);
    var month = (0, _utils.getMonthName)(date.month);
    return "".concat(month, " ").concat(year);
  }; // determine the hidden animated item


  var isCycleCountEven = mainState.cycleCount % 2 === 0;

  var MonthHeader = function MonthHeader() {
    return _react["default"].createElement("div", {
      className: "Calendar__header"
    }, shouldPrepareAnimation && _react["default"].createElement("button", {
      className: "Calendar__monthArrowWrapper -right",
      onClick: function onClick() {
        return handleMonthClick('PREVIOUS');
      },
      "aria-label": "\u0645\u0627\u0647 \u0642\u0628\u0644",
      type: "button"
    }, _react["default"].createElement("span", {
      className: "Calendar__monthArrow",
      alt: "\u0641\u0644\u0634 \u0631\u0627\u0633\u062A"
    }, "\xA0")), _react["default"].createElement("div", {
      className: "Calendar__monthYearContainer",
      ref: monthYearTextWrapper
    }, "\xA0", _react["default"].createElement("span", {
      onAnimationEnd: handleAnimationEnd,
      className: "Calendar__monthYear -shown"
    }, getMonthYearText(showMultipleMonths ? monthDate : isCycleCountEven)), shouldPrepareAnimation && _react["default"].createElement("span", {
      onAnimationEnd: handleAnimationEnd,
      className: "Calendar__monthYear -hiddenNext"
    }, getMonthYearText(!isCycleCountEven))), shouldPrepareAnimation && _react["default"].createElement("button", {
      className: "Calendar__monthArrowWrapper -left",
      onClick: function onClick() {
        return handleMonthClick('NEXT');
      },
      "aria-label": "\u0645\u0627\u0647 \u0628\u0639\u062F",
      type: "button"
    }, _react["default"].createElement("span", {
      className: "Calendar__monthArrow",
      alt: "\u0641\u0644\u0634 \u0686\u067E"
    }, "\xA0")));
  };

  var WeekDays = function WeekDays() {
    return Object.keys(_utils.WEEK_DAYS).map(function (key) {
      return _react["default"].createElement("span", {
        key: key,
        className: "Calendar__weekDay"
      }, _utils.WEEK_DAYS[key][0]);
    });
  };

  var MonthDays = function MonthDays(isNewMonth) {
    var allDays = getViewMonthDays(isNewMonth);
    return allDays.map(function (_ref3) {
      var id = _ref3.id,
          day = _ref3.value,
          month = _ref3.month,
          year = _ref3.year,
          isStandard = _ref3.isStandard;
      var dayItem = {
        day: day,
        month: month,
        year: year
      };
      var isOneOfDisabledDays = disabledDays.some(function (disabledDay) {
        return (0, _utils.isSameDay)(dayItem, disabledDay);
      });
      var isBeforeMinDate = (0, _utils.isBeforeDate)(dayItem, minDate);
      var isAfterMaxDate = (0, _utils.isBeforeDate)(maxDate, dayItem);
      var isStandardAndOverflowedDate = isStandard && (isBeforeMinDate || isAfterMaxDate);
      var isDisabled = isOneOfDisabledDays || isStandardAndOverflowedDate;
      var additionalClass = getDayClassNames(_objectSpread({}, dayItem, {
        isStandard: isStandard,
        isDisabled: isDisabled
      }));
      return _react["default"].createElement("button", _extends({
        key: id,
        className: "Calendar__day ".concat(additionalClass),
        onClick: function onClick() {
          if (isDisabled) {
            onDisabledDayError(dayItem); // good for showing error messages

            return;
          }

          handleDayClick({
            day: day,
            month: month,
            year: year
          });
        },
        disabled: !isStandard,
        type: "button"
      }, dayBtnProps), (0, _utils.toPersianNumber)(day));
    });
  };

  var MonthSection = function MonthSection() {
    return _react["default"].createElement("div", {
      ref: calendarSectionWrapper,
      className: "Calendar__sectionWrapper"
    }, _react["default"].createElement("div", {
      onAnimationEnd: function onAnimationEnd(e) {
        handleAnimationEnd(e);
        updateDate();
      },
      className: "Calendar__section -shown"
    }, MonthDays(showMultipleMonths ? monthDate : isCycleCountEven)), shouldPrepareAnimation && _react["default"].createElement("div", {
      onAnimationEnd: function onAnimationEnd(e) {
        handleAnimationEnd(e);
        updateDate();
      },
      className: "Calendar__section -hiddenNext"
    }, MonthDays(!isCycleCountEven)));
  };

  return _react["default"].createElement("div", {
    className: "Calendar__month"
  }, MonthHeader(), _react["default"].createElement("div", {
    className: "Calendar__weekDays"
  }, WeekDays()), MonthSection());
};

var _default = Month;
exports["default"] = _default;