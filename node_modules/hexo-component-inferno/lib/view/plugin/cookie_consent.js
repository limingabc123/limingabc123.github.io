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
 * A JSX component for alerting users about the use of cookies.
 * @module view/plugin/cookie_consent
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * A JSX component for alerting users about the use of cookies.
 *
 * @see https://www.osano.com/cookieconsent/
 * @example
 * <CookieConsent
 *     head={true}
 *     type="info"
 *     theme="classic"
 *     static={false}
 *     position="bottom-left"
 *     policyLink="/path/to/cookie/policy"
 *     text={{
 *         message: 'This website uses cookies to improve your experience.',
 *         dismiss: 'Got it!',
 *         allow: 'Allow cookies',
 *         deny: 'Decline',
 *         link: 'Learn more',
 *         policy: 'Cookie Policy',
 *     }}
 *     cssUrl="/path/to/cookieconsent.css"
 *     jsUrl="/path/to/cookieconsent.js" />
 */
var CookieConsent = /*#__PURE__*/function (_Component) {
  function CookieConsent() {
    _classCallCheck(this, CookieConsent);
    return _callSuper(this, CookieConsent, arguments);
  }
  _inherits(CookieConsent, _Component);
  return _createClass(CookieConsent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        head = _this$props.head,
        text = _this$props.text,
        jsUrl = _this$props.jsUrl,
        cssUrl = _this$props.cssUrl;
      var _this$props2 = this.props,
        type = _this$props2.type,
        theme = _this$props2.theme,
        position = _this$props2.position,
        policyLink = _this$props2.policyLink;
      var message = text.message,
        dismiss = text.dismiss,
        allow = text.allow,
        deny = text.deny,
        link = text.link,
        policy = text.policy;
      var js = "window.addEventListener(\"load\", () => {\n      window.cookieconsent.initialise({\n        type: ".concat(JSON.stringify(type), ",\n        theme: ").concat(JSON.stringify(theme), ",\n        static: ").concat(JSON.stringify(this.props["static"]), ",\n        position: ").concat(JSON.stringify(position), ",\n        content: {\n          message: ").concat(JSON.stringify(message), ",\n          dismiss: ").concat(JSON.stringify(dismiss), ",\n          allow: ").concat(JSON.stringify(allow), ",\n          deny: ").concat(JSON.stringify(deny), ",\n          link: ").concat(JSON.stringify(link), ",\n          policy: ").concat(JSON.stringify(policy), ",\n          href: ").concat(JSON.stringify(policyLink), ",\n        },\n        palette: {\n          popup: {\n            background: \"#edeff5\",\n            text: \"#838391\"\n          },\n          button: {\n            background: \"#4b81e8\"\n          },\n        },\n      });\n    });");
      if (head) {
        return (0, _inferno.createVNode)(1, "link", null, null, 1, {
          "rel": "stylesheet",
          "href": cssUrl
        });
      }
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": jsUrl,
        "defer": true
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: js
        }
      })], 4);
    }
  }]);
}(Component);
/**
 * Cacheable JSX component for alerting users about the use of cookies.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <CookieConsent.Cacheable
 *     head={true}
 *     plugin={{
 *         info: "info",
 *         theme: "classic",
 *         static: false,
 *         position: "bottom-left",
 *         policyLink: "/path/to/cookie/policy"
 *     }}
 *     helper={{
 *         __: function() {...},
 *         cdn: function() {...}
 *     }} />
 */
CookieConsent.Cacheable = cacheComponent(CookieConsent, 'plugin.cookieconsent', function (props) {
  var head = props.head,
    plugin = props.plugin,
    helper = props.helper;
  var _plugin$type = plugin.type,
    type = _plugin$type === void 0 ? 'info' : _plugin$type,
    _plugin$theme = plugin.theme,
    theme = _plugin$theme === void 0 ? 'edgeless' : _plugin$theme,
    _plugin$position = plugin.position,
    position = _plugin$position === void 0 ? 'bottom-left' : _plugin$position,
    _plugin$policyLink = plugin.policyLink,
    policyLink = _plugin$policyLink === void 0 ? 'https://www.cookiesandyou.com/' : _plugin$policyLink;
  return {
    head: head,
    type: type,
    theme: theme,
    position: position,
    policyLink: policyLink,
    "static": plugin["static"] || false,
    text: {
      message: helper.__('plugin.cookie_consent.message'),
      dismiss: helper.__('plugin.cookie_consent.dismiss'),
      allow: helper.__('plugin.cookie_consent.allow'),
      deny: helper.__('plugin.cookie_consent.deny'),
      link: helper.__('plugin.cookie_consent.link'),
      policy: helper.__('plugin.cookie_consent.policy')
    },
    cssUrl: helper.cdn('cookieconsent', '3.1.1', 'build/cookieconsent.min.css'),
    jsUrl: helper.cdn('cookieconsent', '3.1.1', 'build/cookieconsent.min.js')
  };
});
module.exports = CookieConsent;