"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = exports.Select = exports.TextBox = exports.ElemDiv = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

var _hoc = require("./hoc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ElemDiv = function ElemDiv(_ref) {
  var children = _ref.children;
  return _react.default.createElement("div", {
    class: "pv8"
  }, children);
};

exports.ElemDiv = ElemDiv;

var textBox = function textBox(p) {
  return _react.default.createElement(ElemDiv, null, _react.default.createElement("input", _extends({
    type: "text"
  }, p)));
};

var checkBox = function checkBox(p) {
  return _react.default.createElement("input", _extends({
    type: "checkbox",
    checked: p.value
  }, p));
};

var radio = function radio(p) {
  return _react.default.createElement(ElemDiv, null, _react.default.createElement("input", _extends({
    type: "radio"
  }, p)));
};

var select = function select(_ref2) {
  var options = _ref2.options,
      placeholder = _ref2.placeholder,
      isGroup = _ref2.isGroup,
      size = _ref2.size,
      multiple = _ref2.multiple,
      onChange = _ref2.onChange,
      value = _ref2.value;
  return _react.default.createElement("select", {
    onChange: onChange,
    size: size,
    multiple: multiple,
    value: value
  }, (0, _ramda.isNil)(placeholder) ? null : _react.default.createElement("option", {
    value: ""
  }, placeholder), isGroup ? Object.keys(options).map(function (k) {
    return optionGroup(k, options);
  }) : options.map(option));
};

var option = function option(o) {
  return _react.default.createElement("option", {
    key: o.value || o.id || o,
    value: o.value || o.id || o
  }, o.text || o.name || o);
};

var optionGroup = function optionGroup(key, options) {
  return _react.default.createElement("optgroup", {
    label: key,
    key: key
  }, (options[key] || []).map(option));
};

var checkBoxWithLabel = function checkBoxWithLabel(p) {
  return _react.default.createElement(ElemDiv, null, checkBox(p), p.title ? _react.default.createElement("label", {
    htmlFor: p.name,
    class: "label-align"
  }, p.title) : null);
};

var TextBox = (0, _hoc.withAll)(textBox);
exports.TextBox = TextBox;
var Select = (0, _hoc.withAll)(select);
exports.Select = Select;
var CheckBox = (0, _hoc.withCheck)(checkBoxWithLabel);
exports.CheckBox = CheckBox;