Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.deepCloneObject = exports.shallowCloneObject = exports.putZero = exports.isBeforeDate = exports.checkDayInDayRange = exports.isSameMonth = exports.isSameDay = exports.getDateAccordingToMonth = exports.getMonthFirstWeekday = exports.getMonthLength = exports.getMonthName = exports.createUniqueRange = exports.toPersianNumber = exports.getToday = exports.PERSIAN_MONTHS = exports.WEEK_DAYS = void 0;

const _jalaaliJs = _interopRequireDefault(require('jalaali-js'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

const PERSIAN_NUMBERS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];
exports.PERSIAN_MONTHS = PERSIAN_MONTHS;
const WEEK_DAYS = {
  saturday: 'شنبه',
  sunday: 'یکشنبه',
  monday: 'دوشنبه',
  tuesday: 'سه شنبه',
  wednesday: 'چهارشنبه',
  thursday: 'پنجشنبه',
  friday: 'جمعه',
};
exports.WEEK_DAYS = WEEK_DAYS;

const getToday = function getToday() {
  const todayDate = new Date();
  const todayYear = todayDate.getFullYear();
  const todayMonth = todayDate.getMonth() + 1;
  const todayDay = todayDate.getDate();

  const _jalaali$toJalaali = _jalaaliJs.default.toJalaali(todayYear, todayMonth, todayDay);
  const J_YEAR = _jalaali$toJalaali.jy;
  const J_MONTH = _jalaali$toJalaali.jm;
  const J_DAY = _jalaali$toJalaali.jd;

  const currentDate = {
    year: J_YEAR,
    month: J_MONTH,
    day: J_DAY,
  };
  return currentDate;
};

exports.getToday = getToday;

const createUniqueRange = function createUniqueRange(number, startingId) {
  return Array.from(Array(number).keys()).map(function(key) {
    return {
      value: key + 1,
      id: ''.concat(startingId, '-').concat(key),
    };
  });
};

exports.createUniqueRange = createUniqueRange;

const toPersianNumber = function toPersianNumber(number) {
  return number
    .toString()
    .split('')
    .map(function(letter) {
      return PERSIAN_NUMBERS[Number(letter)];
    })
    .join('');
};

exports.toPersianNumber = toPersianNumber;

const getMonthName = function getMonthName(month) {
  return PERSIAN_MONTHS[month - 1];
};

exports.getMonthName = getMonthName;

const getMonthLength = function getMonthLength(date) {
  return _jalaaliJs.default.jalaaliMonthLength(date.year, date.month);
};

exports.getMonthLength = getMonthLength;

const getMonthFirstWeekday = function getMonthFirstWeekday(_date) {
  const gregorianFirstDay = _jalaaliJs.default.toGregorian(_date.year, _date.month, 1);

  const gregorianDate = new Date(
    gregorianFirstDay.gy,
    gregorianFirstDay.gm - 1,
    gregorianFirstDay.gd,
  );
  const weekday = gregorianDate.getDay();
  return weekday < 6 ? weekday + 1 : 0;
};

exports.getMonthFirstWeekday = getMonthFirstWeekday;

const getDateAccordingToMonth = function getDateAccordingToMonth(date, direction) {
  const toSum = direction === 'NEXT' ? 1 : -1;
  let newMonthIndex = date.month + toSum;
  let newYear = date.year;

  if (newMonthIndex < 1) {
    newMonthIndex = 12;
    newYear -= 1;
  }

  if (newMonthIndex > 12) {
    newMonthIndex = 1;
    newYear += 1;
  }

  const newDate = {
    year: newYear,
    month: newMonthIndex,
    day: 1,
  };
  return newDate;
};

exports.getDateAccordingToMonth = getDateAccordingToMonth;

const isSameDay = function isSameDay(day1, day2) {
  if (!day1 || !day2) return false;
  return day1.day === day2.day && day1.month === day2.month && day1.year === day2.year;
};

exports.isSameDay = isSameDay;

const isSameMonth = function isSameMonth(month1, month2) {
  if (!month1 || !month2) return false;
  return month1.month === month2.month && month1.year === month2.year;
};

exports.isSameMonth = isSameMonth;

const toExtendedDay = function toExtendedDay(date) {
  return [date.year, date.month, date.day];
};

const toNativeDate = function toNativeDate(date) {
  const gregorian = _jalaaliJs.default.toGregorian.apply(
    _jalaaliJs.default,
    _toConsumableArray(toExtendedDay(date)),
  );

  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
};

const isBeforeDate = function isBeforeDate(day1, day2) {
  if (!day1 || !day2) return false;
  return toNativeDate(day1) < toNativeDate(day2);
};

exports.isBeforeDate = isBeforeDate;

const checkDayInDayRange = function checkDayInDayRange(_ref) {
  const { day } = _ref;
  const { from } = _ref;
  const { to } = _ref;
  if (!day || !from || !to) return false;
  const nativeDay = toNativeDate(day);
  const nativeFrom = toNativeDate(from);
  const nativeTo = toNativeDate(to);
  return nativeDay > nativeFrom && nativeDay < nativeTo;
};

exports.checkDayInDayRange = checkDayInDayRange;

const putZero = function putZero(number) {
  return number.toString().length === 1 ? '0'.concat(number) : number;
};

exports.putZero = putZero;

const shallowCloneObject = function shallowCloneObject(obj) {
  return _objectSpread({}, obj);
};

exports.shallowCloneObject = shallowCloneObject;

const deepCloneObject = function deepCloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.deepCloneObject = deepCloneObject;
