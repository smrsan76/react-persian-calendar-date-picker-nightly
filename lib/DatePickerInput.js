"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DatePickerInput = _react["default"].forwardRef(function (_ref, ref) {
  var onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      selectedDay = _ref.selectedDay,
      selectedDayRange = _ref.selectedDayRange,
      inputPlaceholder = _ref.inputPlaceholder,
      inputClassName = _ref.inputClassName,
      formatInputText = _ref.formatInputText,
      renderInput = _ref.renderInput,
      isDayRange = _ref.isDayRange;

  var getSelectedDayValue = function getSelectedDayValue() {
    if (!selectedDay) return '';
    var year = (0, _utils.toPersianNumber)(selectedDay.year);
    var month = (0, _utils.toPersianNumber)((0, _utils.putZero)(selectedDay.month));
    var day = (0, _utils.toPersianNumber)((0, _utils.putZero)(selectedDay.day));
    return "".concat(year, "/").concat(month, "/").concat(day);
  };

  var getSelectedRangeValue = function getSelectedRangeValue() {
    if (!selectedDayRange.from || !selectedDayRange.to) return '';
    var from = selectedDayRange.from,
        to = selectedDayRange.to;
    var fromText = "".concat((0, _utils.toPersianNumber)((0, _utils.putZero)(from.year)).toString().slice(-2), "/").concat((0, _utils.toPersianNumber)((0, _utils.putZero)(from.month)), "/").concat((0, _utils.toPersianNumber)((0, _utils.putZero)(from.day)));
    var toText = "".concat((0, _utils.toPersianNumber)((0, _utils.putZero)(to.year)).toString().slice(-2), "/").concat((0, _utils.toPersianNumber)((0, _utils.putZero)(to.month)), "/").concat((0, _utils.toPersianNumber)((0, _utils.putZero)(to.day)));
    return "\u0627\u0632 ".concat(fromText, " \u062A\u0627 ").concat(toText);
  };

  var getValue = function getValue() {
    if (formatInputText()) return formatInputText();
    return isDayRange ? getSelectedRangeValue() : getSelectedDayValue();
  };

  var render = function render() {
    return renderInput({
      ref: ref,
      onFocus: onFocus,
      onBlur: onBlur
    }) || _react["default"].createElement("input", {
      readOnly: true,
      ref: ref,
      onFocus: onFocus,
      onBlur: onBlur,
      value: getValue(),
      placeholder: inputPlaceholder,
      className: "DatePicker__input ".concat(inputClassName),
      "aria-label": "\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0627\u0631\u06CC\u062E"
    });
  };

  return render();
});

DatePickerInput.defaultProps = {
  formatInputText: function formatInputText() {
    return '';
  },
  renderInput: function renderInput() {
    return null;
  },
  inputPlaceholder: 'انتخاب',
  inputClassName: ''
};
DatePickerInput.propTypes = {
  formatInputText: _propTypes["default"].func,
  inputPlaceholder: _propTypes["default"].string,
  inputClassName: _propTypes["default"].string,
  renderInput: _propTypes["default"].func
};
var _default = DatePickerInput;
exports["default"] = _default;