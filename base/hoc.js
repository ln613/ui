"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withInput = exports.withForm = exports.withCheck = exports.withAll = void 0;
var _reactRedux = require("react-redux");
var _recompose = require("recompose");
var _ramda = require("ramda");
var _excluded = ["name", "index", "label", "noLabel", "form", "setForm"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var setForm = function setForm(n, v) {
  return {
    type: 'setForm',
    path: 'form.' + n,
    payload: v
  };
};
var getElemValue = function getElemValue(e, i, v) {
  var t = i || e.target;
  var val = t.value;
  if (t.type === 'checkbox') val = t.checked;
  if (typeof val === 'undefined') val = v;
  return val;
};
var withForm = (0, _reactRedux.connect)(function (s) {
  return {
    form: s.form
  };
}, {
  setForm: setForm
});
exports.withForm = withForm;
var withInput = function withInput(isCheck) {
  return function (comp) {
    return function (_ref) {
      var name = _ref.name,
        index = _ref.index,
        label = _ref.label,
        noLabel = _ref.noLabel,
        form = _ref.form,
        setForm = _ref.setForm,
        args = _objectWithoutProperties(_ref, _excluded);
      var path = name.replace(/\[/g, '.').replace(/\]/g, '').split('.');
      var value = (0, _ramda.view)((0, _ramda.lensPath)(path), form);
      if (!(0, _ramda.isNil)(index) && (0, _ramda.is)(Array, value)) value = value[index];
      var onChange = function onChange(e, i, v) {
        var val = getElemValue(e, i, v);
        setForm(name, val, index);
        if (args.onChange) args.onChange(val, index);
      };
      var o = _objectSpread(_objectSpread({}, args), {}, {
        id: path.join('_'),
        name: name,
        value: value,
        label: label,
        onChange: onChange
      });
      if (!noLabel && !label && path.length > 1) o.label = path[1];
      return comp(o);
    };
  };
};
exports.withInput = withInput;
var withAll = (0, _recompose.compose)(withForm, withInput(false));
exports.withAll = withAll;
var withCheck = (0, _recompose.compose)(withForm, withInput(true));
exports.withCheck = withCheck;