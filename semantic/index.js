"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withMobile = exports.TextBox = exports.Table = exports.Select = exports.Ready = exports.Password = exports.Mobile = exports.Menu = exports.DoubleSelect = exports.Desktop = exports.CheckBox = void 0;
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _recompose = require("recompose");
var _controls = require("../base/controls");
var _hoc = require("../base/hoc");
var _compose = require("@ln613/compose");
var _semanticUiReact = require("semantic-ui-react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var toTitleCase = function toTitleCase(s) {
  return s.replace(/\w\S*/g, function (t) {
    return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
  });
};

// form controls

var textBox = function textBox(p) {
  return /*#__PURE__*/_react["default"].createElement(_controls.ElemDiv, null, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Input, p));
};
var password = function password(p) {
  return /*#__PURE__*/_react["default"].createElement(_controls.ElemDiv, null, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Input, _extends({}, p, {
    type: "password"
  })));
};
var select = function select(p) {
  return /*#__PURE__*/_react["default"].createElement(_controls.ElemDiv, {
    className: "fg1 fixdd"
  }, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Dropdown, _extends({
    selection: true
  }, p)));
};
var withTextValue = (0, _recompose.withProps)(function (p) {
  return _objectSpread(_objectSpread({}, p), {}, {
    options: (p.options || []).map(function (o) {
      return !(0, _ramda.is)(Object, o) ? {
        text: o,
        value: o
      } : !o.text && o.name ? _objectSpread(_objectSpread({}, o), {}, {
        text: o.name,
        value: o.id
      }) : o;
    })
  });
});
var checkBox = function checkBox(p) {
  return /*#__PURE__*/_react["default"].createElement(_controls.ElemDiv, null, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Checkbox, _extends({}, p, {
    checked: p.value
  })));
};
var TextBox = (0, _hoc.withAll)(textBox);
exports.TextBox = TextBox;
var Password = (0, _hoc.withAll)(password);
exports.Password = Password;
var Select = (0, _hoc.withAll)(withTextValue(select));
exports.Select = Select;
var CheckBox = (0, _hoc.withCheck)(checkBox);

// responsive
exports.CheckBox = CheckBox;
var Mobile = function Mobile(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Responsive, _semanticUiReact.Responsive.onlyMobile, children);
};
exports.Mobile = Mobile;
var Desktop = function Desktop(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Responsive, {
    minWidth: _semanticUiReact.Responsive.onlyTablet.minWidth
  }, children);
};
exports.Desktop = Desktop;
var withMobile = function withMobile(Comp) {
  return function (p) {
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(Mobile, null, /*#__PURE__*/_react["default"].createElement(Comp, _extends({}, p, {
      isMobile: true
    }))), /*#__PURE__*/_react["default"].createElement(Desktop, null, /*#__PURE__*/_react["default"].createElement(Comp, _extends({}, p, {
      isMobile: false
    }))));
  };
};

// menu
exports.withMobile = withMobile;
var items = function items(menus, setVisible) {
  return (menus || []).map(function (x, i) {
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      to: '/' + (i === 0 ? '' : x),
      onClick: function onClick() {
        return setVisible(false);
      },
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Menu.Item, {
      name: x,
      style: {
        fontWeight: 'bold'
      }
    }));
  });
};
var _menu = function _menu(children, color, rightItems) {
  return /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Menu, {
    inverted: true,
    color: color || 'black',
    style: {
      margin: 0
    }
  }, children, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Menu.Menu, {
    position: "right"
  }, rightItems));
};
var Menu1 = function Menu1(_ref3) {
  var color = _ref3.color,
    menus = _ref3.menus,
    children = _ref3.children,
    rightItems = _ref3.rightItems,
    visible = _ref3.visible,
    setVisible = _ref3.setVisible;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(Mobile, null, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Sidebar.Pushable, null, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Sidebar, {
    as: _semanticUiReact.Menu,
    animation: "overlay",
    icon: "labeled",
    inverted: true,
    vertical: true,
    visible: visible,
    color: color || 'black'
  }, items(menus, setVisible)), /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Sidebar.Pusher, {
    dimmed: visible,
    onClick: function onClick() {
      return visible && setVisible(false);
    },
    style: {
      minHeight: '100vh'
    }
  }, _menu( /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Menu.Item, {
    onClick: function onClick() {
      return setVisible(!visible);
    },
    icon: "sidebar"
  }), color, rightItems), children))), /*#__PURE__*/_react["default"].createElement(Desktop, null, _menu(items(menus, setVisible), color, rightItems), children));
};
var Menu = (0, _compose.withState)('visible')(Menu1);

// ready
exports.Menu = Menu;
var Ready = function Ready(_ref4) {
  var on = _ref4.on,
    children = _ref4.children;
  return on.every(ready) ? children : /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Loader, {
    active: true,
    inline: "centered"
  });
};
exports.Ready = Ready;
var ready = function ready(x) {
  return (0, _ramda.is)(Array, x) ? x.length > 0 : (0, _ramda.is)(Object, x) ? Object.keys(x).length > 0 : !(0, _ramda.isNil)(x);
};

// table

var _Table = function _Table(_ref5) {
  var data = _ref5.data,
    name = _ref5.name,
    link = _ref5.link,
    equalWidth = _ref5.equalWidth,
    setSort = _ref5.setSort,
    children = _ref5.children,
    history = _ref5.history,
    isMobile = _ref5.isMobile;
  children = children && ((0, _ramda.is)(Array, children) ? children : [children]);
  var l = data || [];
  var keys = l.length > 0 ? Object.keys(l[0]).filter(function (k) {
    return !hidden(k, children);
  }) : [];
  //const sort = (filter[name] || {}).sort;
  //const sortby = sort && sort[0];
  //const sortDir = sort && sort[1];

  return /*#__PURE__*/_react["default"].createElement("table", {
    className: "ui celled striped table unstackable ".concat(isMobile ? 'mobile' : ''),
    id: name,
    style: isMobile ? {
      fontSize: '12px'
    } : {}
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, keys.map(function (k, i) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: "th".concat(i),
      style: equalWidth ? {
        width: Math.floor(100 / keys.length) + '%'
      } : {}
    }, title(k, children));
  }))), /*#__PURE__*/_react["default"].createElement("tbody", null, l.map(function (o, i) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: "tr".concat(i),
      className: link ? 'cp' : '',
      onClick: function onClick() {
        return link && history.push((0, _ramda.is)(Function, link) ? link(o) : '/' + name + '/' + o.id);
      }
    }, keys.map(function (k) {
      return col(i, k, o, children);
    }));
  })));
};
var Table = (0, _recompose.compose)((0, _reactRedux.connect)(null, {
  setSort: function setSort(name, prop, dir) {
    return {
      type: actionTypes.Set_Sort,
      name: name,
      prop: prop,
      dir: dir
    };
  }
}), _reactRouterDom.withRouter)(_Table);
exports.Table = Table;
var col = function col(idx, key, obj, children) {
  if (!(0, _ramda.is)(Array, children)) children = children ? [children] : [];
  var c = (0, _ramda.find)(function (x) {
    return x.key === key;
  }, children) || (0, _ramda.find)(function (x) {
    return (0, _ramda.isNil)(x.key);
  }, children) || {
    props: {}
  };
  var p = c.props;
  var v = obj[key];
  var cls = p["class"] || '';
  if (p.center) cls += ' tac';
  if (p.right) cls += ' tar';
  if (p.input) {
    v = /*#__PURE__*/_react["default"].createElement(TextBox, {
      name: p.path.replace('{i}', idx),
      noLabel: true,
      className: "".concat(p.center ? 'text-center' : '', " ").concat(p.right ? 'text-right' : '')
    });
    cls += ' edit';
  } else if (p.select) {
    v = /*#__PURE__*/_react["default"].createElement(Select, {
      name: p.path.replace('{i}', idx),
      options: p.options
    });
  }
  return /*#__PURE__*/_react["default"].createElement("td", {
    key: "td".concat(key + idx),
    className: cls
  }, p.children ? p.children(obj, obj[key]) : v && v.props ? v : /*#__PURE__*/_react["default"].createElement("div", {
    dangerouslySetInnerHTML: {
      __html: v
    }
  }));
};
var prop = function prop(_prop) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return function (key, children) {
    var child = (0, _ramda.find)(function (x) {
      return x.key === key;
    }, children || []);
    return child && child.props[_prop] || val;
  };
};
var title = function title(key, children) {
  return prop('title', toTitleCase(key))(key, children);
};
var hidden = prop('hidden', false);

// className={sortby === k ? (sortDir === 1 ? '_asc' : '_desc') : ''}
// onClick={() => setSort(name, k, sortDir === 1 ? 2 : 1)}

// DoubleSelect

var s1 = {
  display: 'flex',
  flexDirection: 'row'
};
var s2 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '8px',
  marginRight: '8px'
};
var s3 = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
};
var s4 = {
  marginBottom: '8px'
};
var select2 = function select2(_ref6) {
  var options = _ref6.options,
    placeholder = _ref6.placeholder,
    isGroup = _ref6.isGroup,
    size = _ref6.size,
    multiple = _ref6.multiple,
    onChange = _ref6.onChange,
    value = _ref6.value;
  return /*#__PURE__*/_react["default"].createElement("select", {
    onChange: onChange,
    size: size,
    multiple: multiple,
    value: value
  }, (0, _ramda.isNil)(placeholder) ? null : /*#__PURE__*/_react["default"].createElement("option", {
    value: ""
  }, placeholder), isGroup ? Object.keys(options).map(function (k) {
    return optionGroup(k, options);
  }) : options.map(option));
};
var Select2 = (0, _hoc.withAll)(select2);
var option = function option(o) {
  return /*#__PURE__*/_react["default"].createElement("option", {
    key: o.value || o.id || o,
    value: o.value || o.id || o
  }, o.text || o.name || o);
};
var optionGroup = function optionGroup(key, options) {
  return /*#__PURE__*/_react["default"].createElement("optgroup", {
    label: key,
    key: key
  }, (options[key] || []).map(option));
};
var _DoubleSelect = function _DoubleSelect(_ref7) {
  var name = _ref7.name,
    src = _ref7.src,
    dst = _ref7.dst,
    srcTitle = _ref7.srcTitle,
    dstTitle = _ref7.dstTitle,
    size = _ref7.size,
    buttonStyle = _ref7.buttonStyle,
    onChange = _ref7.onChange,
    onAdd = _ref7.onAdd,
    onRemove = _ref7.onRemove;
  return /*#__PURE__*/_react["default"].createElement("div", {
    name: name,
    style: s1
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: s3
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("b", null, srcTitle)), /*#__PURE__*/_react["default"].createElement(Select2, {
    name: name + '_src',
    options: src,
    size: size || 8,
    multiple: true,
    onChange: onChange
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: s2
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: buttonStyle,
    onClick: onAdd,
    style: s4
  }, ">>"), /*#__PURE__*/_react["default"].createElement("button", {
    className: buttonStyle,
    onClick: onRemove
  }, "<<")), /*#__PURE__*/_react["default"].createElement("div", {
    style: s3
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("b", null, dstTitle)), /*#__PURE__*/_react["default"].createElement(Select2, {
    name: name + '_dst',
    options: dst,
    size: size || 8,
    multiple: true,
    onChange: onChange
  })));
};
var getSelectedValue = function getSelectedValue(x) {
  return (0, _ramda.is)(Object, x) ? x.value || x.id : x;
};
var joinOptions = function joinOptions(o, l, r) {
  return innerJoin(function (a, b) {
    return (r ? not : identity)(a.value == getSelectedValue(b));
  }, o, l);
};
var DoubleSelect = (0, _recompose.compose)(_hoc.withForm, (0, _recompose.withProps)(function (_ref8) {
  var name = _ref8.name,
    options = _ref8.options,
    form = _ref8.form,
    setForm = _ref8.setForm;
  var _name$split = name.split('.'),
    _name$split2 = _slicedToArray(_name$split, 2),
    fn = _name$split2[0],
    n = _name$split2[1];
  var f = form;
  var selectedOptions = f && f[fn] && f[fn][n] || [];
  var src = joinOptions(options, selectedOptions, true);
  var dst = joinOptions(options, selectedOptions);
  var srcSelected = joinOptions(options, f && f[fn] && f[fn][n + '_src'] || []);
  var dstSelected = joinOptions(options, f && f[fn] && f[fn][n + '_dst'] || []);
  var onAdd = function onAdd() {
    setForm(name, dst.concat(srcSelected));
    setForm(name + '_src', []);
  };
  var onRemove = function onRemove() {
    setForm(name, difference(dst, dstSelected));
    setForm(name + '_dst', []);
  };
  return {
    src: src,
    dst: dst,
    onAdd: onAdd,
    onRemove: onRemove
  };
}))(_DoubleSelect);
exports.DoubleSelect = DoubleSelect;