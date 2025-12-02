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
 * Outdated browser detection plugin JSX component.
 * @module view/plugin/outdated_browser
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Outdated browser detection plugin JSX component.
 *
 * @see https://github.com/outdatedbrowser/outdated-browser
 * @example
 * <OutdatedBrowser
 *     head={true}
 *     cssUrl="/path/to/outdatedbrowser.css"
 *     jsUrl="/path/to/outdatedbrowser.js" />
 */
var OutdatedBrowser = /*#__PURE__*/function (_Component) {
  function OutdatedBrowser() {
    _classCallCheck(this, OutdatedBrowser);
    return _callSuper(this, OutdatedBrowser, arguments);
  }
  _inherits(OutdatedBrowser, _Component);
  return _createClass(OutdatedBrowser, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        head = _this$props.head,
        jsUrl = _this$props.jsUrl,
        cssUrl = _this$props.cssUrl;
      var js = "window.addEventListener(\"load\", function () {\n            outdatedBrowser({\n                bgColor: '#f25648',\n                color: '#ffffff',\n                lowerThan: 'object-fit' // display on IE11 or below\n            });\n        });";
      if (head) {
        return (0, _inferno.createVNode)(1, "link", null, null, 1, {
          "rel": "stylesheet",
          "href": cssUrl
        });
      }
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, "Your browser is out-of-date!", 16), (0, _inferno.createVNode)(1, "p", null, [(0, _inferno.createTextVNode)("Update your browser to view this website correctly.&npsb;"), (0, _inferno.createVNode)(1, "a", null, [(0, _inferno.createTextVNode)("Update my browser now"), (0, _inferno.createTextVNode)(' ')], 0, {
        "id": "btnUpdateBrowser",
        "href": "http://outdatedbrowser.com/"
      })], 4), (0, _inferno.createVNode)(1, "p", "last", (0, _inferno.createVNode)(1, "a", null, "\xD7", 16, {
        "href": "#",
        "id": "btnCloseUpdateBrowser",
        "title": "Close"
      }), 2)], 4, {
        "id": "outdated"
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
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
 * Cacheable outdated browser detection plugin JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <OutdatedBrowser.Cacheable
 *     head={true}
 *     helper={{ cdn: function() {...} }} />
 */
OutdatedBrowser.Cacheable = cacheComponent(OutdatedBrowser, 'plugin.outdatedbrowser', function (props) {
  var head = props.head,
    helper = props.helper;
  return {
    head: head,
    cssUrl: helper.cdn('outdatedbrowser', '1.1.5', 'outdatedbrowser/outdatedbrowser.min.css'),
    jsUrl: helper.cdn('outdatedbrowser', '1.1.5', 'outdatedbrowser/outdatedbrowser.min.js')
  };
});
module.exports = OutdatedBrowser;