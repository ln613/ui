"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCheck = exports.withAll = exports.withInput = exports.withForm = void 0;

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _ramda = require("ramda");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          args = _objectWithoutProperties(_ref, ["name", "index", "label", "noLabel", "form", "setForm"]);

      var path = name.replace(/\[/g, '.').replace(/\]/g, '').split('.');
      var value = (0, _ramda.view)((0, _ramda.lensPath)(path), form);
      if (!(0, _ramda.isNil)(index) && (0, _ramda.is)(Array, value)) value = value[index];

      var onChange = function onChange(e, i, v) {
        var val = getElemValue(e, i, v);
        setForm(name, val, index);
        if (args.onChange) args.onChange(val, index);
      };

      var o = _objectSpread({}, args, {
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