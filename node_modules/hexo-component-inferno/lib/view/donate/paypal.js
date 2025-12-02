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
 * Paypal donation JSX component.
 * @module view/donate/paypal
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Paypal donation JSX component.
 *
 * @see https://www.paypal.com/donate/buttons
 * @example
 * <Paypal
 *     title="******"
 *     business="******"
 *     currencyCode="******" />
 */
var Paypal = /*#__PURE__*/function (_Component) {
  function Paypal() {
    _classCallCheck(this, Paypal);
    return _callSuper(this, Paypal, arguments);
  }
  _inherits(Paypal, _Component);
  return _createClass(Paypal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        business = _this$props.business,
        currencyCode = _this$props.currencyCode;
      if (!business || !currencyCode) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You forgot to set the "), (0, _inferno.createVNode)(1, "code", null, "business", 16), (0, _inferno.createTextVNode)(" or "), (0, _inferno.createVNode)(1, "code", null, "currency_code", 16), (0, _inferno.createTextVNode)(" for Paypal. Please set it in "), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 4);
      }
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "a", "button donate", [(0, _inferno.createVNode)(1, "span", "icon is-small", (0, _inferno.createVNode)(1, "i", "fab fa-paypal"), 2), (0, _inferno.createVNode)(1, "span", null, title, 0)], 4, {
        "data-type": "paypal",
        "onclick": "document.getElementById('paypal-donate-form').submit()"
      }), (0, _inferno.createVNode)(1, "form", null, [(0, _inferno.createVNode)(64, "input", null, null, 1, {
        "type": "hidden",
        "name": "cmd",
        "value": "_donations"
      }), (0, _inferno.createVNode)(64, "input", null, null, 1, {
        "type": "hidden",
        "name": "business",
        "value": business
      }), (0, _inferno.createVNode)(64, "input", null, null, 1, {
        "type": "hidden",
        "name": "currency_code",
        "value": currencyCode
      })], 4, {
        "action": "https://www.paypal.com/cgi-bin/webscr",
        "method": "post",
        "target": "_blank",
        "rel": "noopener",
        "id": "paypal-donate-form"
      })], 4);
    }
  }]);
}(Component);
/**
 * Cacheable Paypal donation JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Paypal.Cacheable
 *     donate={{ type: 'paypal', business: '******' currency_code: '******' }}
 *     helper={{ __: function() {...} }} />
 */
Paypal.Cacheable = cacheComponent(Paypal, 'donate.paypal', function (props) {
  var donate = props.donate,
    helper = props.helper;
  return {
    business: donate.business,
    currencyCode: donate.currency_code,
    title: helper.__('donate.' + donate.type)
  };
});
module.exports = Paypal;