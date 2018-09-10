"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var _ramda = require("ramda");

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _reactRouterDom = require("react-router-dom");

var _semantic = require("../semantic");

var _base = require("../base");

console.log('wm');
console.log(_semantic.withMobile);

var _Table = function _Table(_ref) {
  var data = _ref.data,
      name = _ref.name,
      link = _ref.link,
      equalWidth = _ref.equalWidth,
      setSort = _ref.setSort,
      children = _ref.children,
      history = _ref.history,
      isMobile = _ref.isMobile;
  children = children && ((0, _ramda.is)(Array, children) ? children : [children]);
  var l = data || [];
  var keys = l.length > 0 ? Object.keys(l[0]).filter(function (k) {
    return !hidden(k, children);
  }) : []; //const sort = (filter[name] || {}).sort;
  //const sortby = sort && sort[0];
  //const sortDir = sort && sort[1];

  return React.createElement("table", {
    class: "ui celled striped table unstackable ".concat(isMobile ? 'mobile' : ''),
    id: name,
    style: isMobile ? {
      fontSize: '12px'
    } : {}
  }, React.createElement("thead", null, React.createElement("tr", null, keys.map(function (k, i) {
    return React.createElement("th", {
      key: "th".concat(i),
      style: equalWidth ? {
        width: Math.floor(100 / keys.length) + '%'
      } : {}
    }, title(k, children));
  }))), React.createElement("tbody", null, l.map(function (o, i) {
    return React.createElement("tr", {
      key: "tr".concat(i),
      class: link ? "cp" : "",
      onClick: function onClick() {
        return link && history.push((0, _ramda.is)(Function, link) ? link(o.id) : '/' + name + '/' + o.id);
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
    return isNil(x.key);
  }, children) || {
    props: {}
  };
  var p = c.props;
  var v = obj[key];
  var cls = p.class || '';
  if (p.center) cls += ' tac';
  if (p.right) cls += ' tar';

  if (p.input) {
    v = React.createElement(_base.TextBox, {
      name: p.path.replace('{i}', idx),
      noLabel: true,
      className: "".concat(p.center ? 'text-center' : '', " ").concat(p.right ? 'text-right' : '')
    });
    cls += ' edit';
  } else if (p.select) {
    v = React.createElement(_base.Select, {
      name: p.path.replace('{i}', idx),
      placeholder: "",
      options: p.options
    });
  }

  return React.createElement("td", {
    key: "td".concat(key + idx),
    class: cls
  }, p.children ? p.children(obj, obj[key]) : v && v.props ? v : React.createElement("div", {
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

var hidden = prop('hidden', false); // class={sortby === k ? (sortDir === 1 ? '_asc' : '_desc') : ''}
// onClick={() => setSort(name, k, sortDir === 1 ? 2 : 1)}