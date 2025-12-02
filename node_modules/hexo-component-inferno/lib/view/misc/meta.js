"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _inferno = require("inferno");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * A JSX component that renders &lt;meta&gt; tags.
 * @module view/misc/meta
 */
var _require = require('inferno'),
  Component = _require.Component;
function trim(str) {
  return str.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}
function split(str, sep) {
  var result = [];
  var matched = null;
  while ((matched = sep.exec(str)) !== null) {
    result.push(matched[0]);
  }
  return result;
}

/**
 * A JSX component that renders &lt;meta&gt; tags.
 *
 * @name Meta
 * @example
 * <Meta meta={[
 *     'name="generator";content="Hexo 4.2.0"'
 *     'property="article:author";content="PPOffice"'
 * ]} />
 */
module.exports = /*#__PURE__*/function (_Component) {
  function _class() {
    _classCallCheck(this, _class);
    return _callSuper(this, _class, arguments);
  }
  _inherits(_class, _Component);
  return _createClass(_class, [{
    key: "render",
    value: function render() {
      var _this$props$meta = this.props.meta,
        meta = _this$props$meta === void 0 ? [] : _this$props$meta;
      if (!Array.isArray(meta)) {
        meta = [meta];
      }
      var tags = meta.filter(function (entry) {
        return typeof entry === 'string';
      }).map(function (entry) {
        var props = split(entry, /(?:[^\\;]+|\\.)+/g).map(function (property) {
          var entry = split(property, /(?:[^\\=]+|\\.)+/g);
          if (entry.length < 2) {
            return null;
          }
          return _defineProperty({}, trim(entry[0]), trim(entry[1]));
        }).filter(function (property) {
          return property !== null;
        }).reduce(function (prev, current) {
          return Object.assign(prev, current);
        }, {});
        return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "meta", null, null, 1, _objectSpread({}, props)));
      });
      return (0, _inferno.createFragment)(tags, 0);
    }
  }]);
}(Component);