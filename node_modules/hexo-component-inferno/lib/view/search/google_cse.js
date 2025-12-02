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
 * Google custom search engine JSX component.
 * @module view/search/google_cse
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Google custom search engine JSX component.
 *
 * @see https://cse.google.com/cse/create/new
 * @example
 * <GoogleCSE
 *     cx="******"
 *     hint="Placeholder text"
 *     jsUrl="******" />
 */
var GoogleCSE = /*#__PURE__*/function (_Component) {
  function GoogleCSE() {
    _classCallCheck(this, GoogleCSE);
    return _callSuper(this, GoogleCSE, arguments);
  }
  _inherits(GoogleCSE, _Component);
  return _createClass(GoogleCSE, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        cx = _this$props.cx,
        hint = _this$props.hint,
        jsUrl = _this$props.jsUrl;
      var css = '.searchbox .searchbox-body { background: white; }';
      var js1 = "(function() {\n            var cx = '".concat(cx, "';\n            var gcse = document.createElement('script');\n            gcse.type = 'text/javascript';\n            gcse.async = true;\n            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;\n            var s = document.getElementsByTagName('script')[0];\n            s.parentNode.insertBefore(gcse, s);\n        })();");
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "style", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: css
        }
      }), (0, _inferno.createVNode)(1, "div", "searchbox", [(0, _inferno.createVNode)(1, "div", "searchbox-container", [(0, _inferno.createVNode)(1, "div", "searchbox-header", [(0, _inferno.createVNode)(1, "div", "searchbox-input-container", (0, _inferno.createVNode)(64, "input", "searchbox-input", null, 1, {
        "type": "text",
        "placeholder": hint
      }), 2), (0, _inferno.createVNode)(1, "a", "searchbox-close", "\xD7", 16, {
        "href": "javascript:;"
      })], 4), function () {
        if (cx) {
          var innerHtml = '<gcse:searchresults-only></gcse:searchresults-only>';
          return (0, _inferno.createVNode)(1, "div", "searchbox-body", null, 1, {
            "dangerouslySetInnerHTML": {
              __html: innerHtml
            }
          });
        }
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("It seems that you forget to set the "), (0, _inferno.createVNode)(1, "code", null, "cx", 16), (0, _inferno.createTextVNode)(" value for the Google CSE. Please set it in "), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 4);
      }()], 0), cx ? (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: js1
        }
      }) : null], 0), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": jsUrl
      })], 4);
    }
  }]);
}(Component);
/**
 * Cacheable Google custom search engine JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <GoogleCSE.Cacheable
 *     search={{ cx: '******' }}
 *     helper={{
 *         __: function() {...},
 *         url_for: function() {...}
 *     }} />
 */
GoogleCSE.Cacheable = cacheComponent(GoogleCSE, 'search.google', function (props) {
  var helper = props.helper,
    search = props.search;
  return {
    cx: search.cx,
    hint: helper.__('search.hint'),
    jsUrl: helper.url_for('/js/google_cse.js')
  };
});
module.exports = GoogleCSE;