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
 * Google FeedBurner widget JSX component.
 * @module view/widget/subscribe_email
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Google FeedBurner widget JSX component.
 *
 * @see https://feedburner.google.com/
 * @example
 * <SubscribeEmail
 *     title="Widget title"
 *     description="Description text"
 *     feedburnerId="******"
 *     buttonTitle="Subscribe now" />
 */
var SubscribeEmail = /*#__PURE__*/function (_Component) {
  function SubscribeEmail() {
    _classCallCheck(this, SubscribeEmail);
    return _callSuper(this, SubscribeEmail, arguments);
  }
  _inherits(SubscribeEmail, _Component);
  return _createClass(SubscribeEmail, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        description = _this$props.description,
        feedburnerId = _this$props.feedburnerId,
        buttonTitle = _this$props.buttonTitle;
      return (0, _inferno.createVNode)(1, "div", "card widget", (0, _inferno.createVNode)(1, "div", "card-content", (0, _inferno.createVNode)(1, "div", "menu", [(0, _inferno.createVNode)(1, "h3", "menu-label", title, 0), (0, _inferno.createVNode)(1, "form", null, [(0, _inferno.createVNode)(64, "input", null, null, 1, {
        "type": "hidden",
        "value": feedburnerId,
        "name": "uri"
      }), (0, _inferno.createVNode)(64, "input", null, null, 1, {
        "type": "hidden",
        "name": "loc",
        "value": "en_US"
      }), (0, _inferno.createVNode)(1, "div", "field has-addons", [(0, _inferno.createVNode)(1, "div", "control has-icons-left is-expanded", [(0, _inferno.createVNode)(64, "input", "input", null, 1, {
        "name": "email",
        "type": "email",
        "placeholder": "Email"
      }), (0, _inferno.createVNode)(1, "span", "icon is-small is-left", (0, _inferno.createVNode)(1, "i", "fas fa-envelope"), 2)], 4), (0, _inferno.createVNode)(1, "div", "control", (0, _inferno.createVNode)(64, "input", "button", null, 1, {
        "type": "submit",
        "value": buttonTitle
      }), 2)], 4), description ? (0, _inferno.createVNode)(1, "p", "help", description, 0) : null], 0, {
        "action": "https://feedburner.google.com/fb/a/mailverify",
        "method": "post",
        "target": "popupwindow",
        "onsubmit": "window.open('https://feedburner.google.com/fb/a/mailverify?uri=".concat(feedburnerId, "','popupwindow','scrollbars=yes,width=550,height=520');return true")
      })], 4), 2), 2, {
        "data-type": "subscribe-email"
      });
    }
  }]);
}(Component);
/**
 * Cacheable Google FeedBurner widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <SubscribeEmail.Cacheable
 *     widget={{
 *         description: 'Description text',
 *         feedburner_id: '******'
 *     }}
 *     helper={{ __: function() {...} }} />
 */
SubscribeEmail.Cacheable = cacheComponent(SubscribeEmail, 'widget.subscribeemail', function (props) {
  var helper = props.helper,
    widget = props.widget;
  var feedburner_id = widget.feedburner_id,
    description = widget.description;
  return {
    description: description,
    feedburnerId: feedburner_id,
    title: helper.__('widget.subscribe_email'),
    buttonTitle: helper.__('widget.subscribe')
  };
});
module.exports = SubscribeEmail;