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
 * KaTeX math renderer plugin JSX component.
 * @module view/plugin/katex
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * KaTeX math renderer plugin JSX component.
 *
 * @see https://katex.org/
 * @example
 * <KaTeX
 *     cssUrl="/path/to/katex.css"
 *     jsUrl="/path/to/katex.js"
 *     autoRenderUrl="/path/to/auto-render.js"
 *     mhchemUrl="/path/to/mhchem.js" />
 */
var KaTeX = /*#__PURE__*/function (_Component) {
  function KaTeX() {
    _classCallCheck(this, KaTeX);
    return _callSuper(this, KaTeX, arguments);
  }
  _inherits(KaTeX, _Component);
  return _createClass(KaTeX, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        cssUrl = _this$props.cssUrl,
        jsUrl = _this$props.jsUrl,
        autoRenderUrl = _this$props.autoRenderUrl,
        mhchemUrl = _this$props.mhchemUrl;
      var js = "window.addEventListener(\"load\", function() {\n            document.querySelectorAll('[role=\"article\"] > .content').forEach(function(element) {\n                renderMathInElement(element);\n            });\n        });";
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "link", null, null, 1, {
        "rel": "stylesheet",
        "href": cssUrl
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": jsUrl,
        "defer": true
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": autoRenderUrl,
        "defer": true
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": mhchemUrl,
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
 * Cacheable KaTeX math renderer plugin JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <KaTeX.Cacheable
 *     head={true}
 *     helper={{ cdn: function() {...} }} />
 */
KaTeX.Cacheable = cacheComponent(KaTeX, 'plugin.katex', function (props) {
  var head = props.head,
    helper = props.helper;
  if (head) {
    return null;
  }
  return {
    jsUrl: helper.cdn('katex', '0.15.1', 'dist/katex.min.js'),
    cssUrl: helper.cdn('katex', '0.15.1', 'dist/katex.min.css'),
    autoRenderUrl: helper.cdn('katex', '0.15.1', 'dist/contrib/auto-render.min.js'),
    mhchemUrl: helper.cdn('katex', '0.15.1', 'dist/contrib/mhchem.min.js')
  };
});
module.exports = KaTeX;