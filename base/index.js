"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = exports.Select = exports.TextBox = void 0;

var _controls = require("./controls");

var _hoc = require("./hoc");

var TextBox = (0, _hoc.withAll)(_controls.textBox);
exports.TextBox = TextBox;
var Select = (0, _hoc.withAll)(_controls.select);
exports.Select = Select;
var CheckBox = (0, _hoc.withCheck)(_controls.checkBoxWithLabel);
exports.CheckBox = CheckBox;