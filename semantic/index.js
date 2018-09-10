"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = exports.Select = exports.TextBox = void 0;

var _recompose = require("recompose");

var _controls = require("../base/controls");

var _hoc = require("../base/hoc");

var _semanticUiReact = require("semantic-ui-react");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var textBox = function textBox(p) {
  return React.createElement(_controls.ElemDiv, null, React.createElement(_semanticUiReact.Input, p));
};

var select = function select(p) {
  return React.createElement(_controls.ElemDiv, null, React.createElement(_semanticUiReact.Dropdown, _extends({
    selection: true
  }, p)));
};

var withTextValue = (0, _recompose.withProps)(function (p) {
  return _objectSpread({}, p, {
    options: (p.options || []).map(function (o) {
      return !o.text && o.name ? _objectSpread({}, o, {
        text: o.name,
        value: o.id
      }) : o;
    })
  });
});

var checkBox = function checkBox(p) {
  return React.createElement(_controls.ElemDiv, null, React.createElement(_semanticUiReact.Checkbox, _extends({}, p, {
    checked: p.value
  })));
};

var TextBox = (0, _hoc.withAll)(textBox);
exports.TextBox = TextBox;
var Select = (0, _hoc.withAll)(withTextValue(select));
exports.Select = Select;
var CheckBox = (0, _hoc.withCheck)(checkBox);
exports.CheckBox = CheckBox;