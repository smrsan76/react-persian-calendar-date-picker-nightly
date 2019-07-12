Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _react = _interopRequireWildcard(require('react'));

const _utils = require('../utils');

const _Month = _interopRequireDefault(require('./Month'));

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  const target = _objectWithoutPropertiesLoose(source, excluded);
  let key;
  let i;
  if (Object.getOwnPropertySymbols) {
    const sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  const target = {};
  const sourceKeys = Object.keys(source);
  let key;
  let i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

const Months = function Months(_ref) {
  const { showMultipleMonths } = _ref;
  const { displayYear } = _ref;
  const { displayMonthsFrom } = _ref;
  const { displayMonthsTo } = _ref;
  const otherProps = _objectWithoutProperties(_ref, [
    'showMultipleMonths',
    'displayYear',
    'displayMonthsFrom',
    'displayMonthsTo',
  ]);

  const _useState = (0, _react.useState)({
    months: [],
  });
  const _useState2 = _slicedToArray(_useState, 2);
  const mainState = _useState2[0];
  const setMainState = _useState2[1];

  const updateMonths = function updateMonths() {
    let currentMonth = (showMultipleMonths && displayMonthsFrom) || (0, _utils.getToday)();
    let monthsStart = (0, _utils.shallowCloneObject)(currentMonth);
    let monthsEnd = (0, _utils.shallowCloneObject)(currentMonth);
    const months = [];

    if (showMultipleMonths) {
      if (displayYear) {
        const year = typeof displayYear === 'boolean' ? currentMonth.year : displayYear;
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
      months,
      prevShowMultipleMonths: showMultipleMonths,
      prevDisplayYear: displayYear,
      prevDisplayMonthsFrom: displayMonthsFrom,
      prevDisplayMonthsTo: displayMonthsTo,
    });
  };

  const isNecessaryToUpdateMonths = function isNecessaryToUpdateMonths() {
    const { months } = mainState;
    const { prevShowMultipleMonths } = mainState;
    const { prevDisplayYear } = mainState;
    const { prevDisplayMonthsFrom } = mainState;
    const { prevDisplayMonthsTo } = mainState;
    if (!months.length) return true;
    if (showMultipleMonths !== prevShowMultipleMonths) return true;

    if (showMultipleMonths) {
      if (displayYear !== prevDisplayYear) return true;
      if (!(0, _utils.isSameMonth)(displayMonthsFrom, prevDisplayMonthsFrom)) return true;
      if (!(0, _utils.isSameMonth)(displayMonthsTo, prevDisplayMonthsTo)) return true;
    }

    return false;
  };

  const renderMonths = function renderMonths() {
    const { months } = mainState;
    return months.map(function(m) {
      return _react.default.createElement(
        _Month.default,
        _extends(
          {
            key: ''.concat(m.year, '_').concat(m.month),
            monthDate: m,
            showMultipleMonths,
          },
          otherProps,
        ),
      );
    });
  };

  if (isNecessaryToUpdateMonths()) {
    updateMonths();
  }

  return renderMonths();
};

const _default = Months;
exports.default = _default;
