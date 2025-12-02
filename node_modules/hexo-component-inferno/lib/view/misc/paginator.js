"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _inferno = require("inferno");
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
 * Paginator JSX component.
 * @module view/misc/paginator
 */
var _require = require('inferno'),
  Component = _require.Component;

/**
 * Paginator JSX component.
 *
 * @name Paginator
 * @example
 * <Paginator
 *     current={1}
 *     total={10}
 *     baseUrl="/page/base/url"
 *     path="/config/pagination/dir"
 *     urlFor={ function () {...} }
 *     prevTitle="Prev"
 *     nextTitle="Next" />
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
      var _this$props = this.props,
        current = _this$props.current,
        total = _this$props.total,
        baseUrl = _this$props.baseUrl,
        path = _this$props.path,
        urlFor = _this$props.urlFor,
        prevTitle = _this$props.prevTitle,
        nextTitle = _this$props.nextTitle;
      function getPageUrl(i) {
        return urlFor(i === 1 ? baseUrl : baseUrl + path + '/' + i + '/');
      }
      function pagination(c, m) {
        var current = c;
        var last = m;
        var delta = 1;
        var left = current - delta;
        var right = current + delta + 1;
        var range = [];
        var elements = [];
        var l;
        for (var i = 1; i <= last; i++) {
          if (i === 1 || i === last || i >= left && i < right) {
            range.push(i);
          }
        }
        for (var _i = 0, _range = range; _i < _range.length; _i++) {
          var _i2 = _range[_i];
          if (l) {
            if (_i2 - l === 2) {
              elements.push((0, _inferno.createVNode)(1, "li", null, (0, _inferno.createVNode)(1, "a", "pagination-link", l + 1, 0, {
                "href": getPageUrl(l + 1)
              }), 2));
            } else if (_i2 - l !== 1) {
              elements.push((0, _inferno.createVNode)(1, "li", null, (0, _inferno.createVNode)(1, "span", "pagination-ellipsis", null, 1, {
                "dangerouslySetInnerHTML": {
                  __html: '&hellip;'
                }
              }), 2));
            }
          }
          elements.push((0, _inferno.createVNode)(1, "li", null, (0, _inferno.createVNode)(1, "a", "pagination-link".concat(c === _i2 ? ' is-current' : ''), _i2, 0, {
            "href": getPageUrl(_i2)
          }), 2));
          l = _i2;
        }
        return elements;
      }
      return (0, _inferno.createVNode)(1, "nav", "pagination", [(0, _inferno.createVNode)(1, "div", "pagination-previous".concat(current > 1 ? '' : ' is-invisible is-hidden-mobile'), (0, _inferno.createVNode)(1, "a", null, prevTitle, 0, {
        "href": getPageUrl(current - 1)
      }), 2), (0, _inferno.createVNode)(1, "div", "pagination-next".concat(current < total ? '' : ' is-invisible is-hidden-mobile'), (0, _inferno.createVNode)(1, "a", null, nextTitle, 0, {
        "href": getPageUrl(current + 1)
      }), 2), (0, _inferno.createVNode)(1, "ul", "pagination-list is-hidden-mobile", pagination(current, total), 0)], 4, {
        "role": "navigation",
        "aria-label": "pagination"
      });
    }
  }]);
}(Component);