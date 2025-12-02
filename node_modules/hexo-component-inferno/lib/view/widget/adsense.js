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
 * Google AdSense widget JSX component.
 * @module view/widget/adsense
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Google AdSense widget JSX component.
 *
 * @see https://www.google.com/adsense/new/
 * @example
 * <AdSense
 *     title="Widget title"
 *     clientId="******"
 *     slotId="******" />
 */
var AdSense = /*#__PURE__*/function (_Component) {
  function AdSense() {
    _classCallCheck(this, AdSense);
    return _callSuper(this, AdSense, arguments);
  }
  _inherits(AdSense, _Component);
  return _createClass(AdSense, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        clientId = _this$props.clientId,
        slotId = _this$props.slotId;
      if (!clientId || !slotId) {
        return (0, _inferno.createVNode)(1, "div", "card widget", (0, _inferno.createVNode)(1, "div", "card-content", (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You need to set "), (0, _inferno.createVNode)(1, "code", null, "client_id", 16), (0, _inferno.createTextVNode)(" and "), (0, _inferno.createVNode)(1, "code", null, "slot_id", 16), (0, _inferno.createTextVNode)(" to show this AD unit. Please set it in "), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 4), 2), 2);
      }
      return (0, _inferno.createVNode)(1, "div", "card widget", (0, _inferno.createVNode)(1, "div", "card-content", (0, _inferno.createVNode)(1, "div", "menu", [(0, _inferno.createVNode)(1, "h3", "menu-label", title, 0), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "async": true,
        "src": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      }), (0, _inferno.createVNode)(1, "ins", "adsbygoogle", null, 1, {
        "style": "display:block",
        "data-ad-client": clientId,
        "data-ad-slot": slotId,
        "data-ad-format": "auto",
        "data-full-width-responsive": "true"
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
        }
      })], 4), 2), 2, {
        "data-type": "adsense"
      });
    }
  }]);
}(Component);
/**
 * Cacheable Google AdSense widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <AdSense.Cacheable
 *     widget={{ client_id: '******', slot_id: '******' }}
 *     helper={{ __: function() {...} }} />
 */
AdSense.Cacheable = cacheComponent(AdSense, 'widget.adsense', function (props) {
  var widget = props.widget,
    helper = props.helper;
  var client_id = widget.client_id,
    slot_id = widget.slot_id;
  return {
    title: helper.__('widget.adsense'),
    clientId: client_id,
    slotId: slot_id
  };
});
module.exports = AdSense;