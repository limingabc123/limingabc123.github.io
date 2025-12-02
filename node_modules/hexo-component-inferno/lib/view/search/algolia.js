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
 * Algolia search engine JSX component.
 * @module view/search/algolia
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Algolia search engine JSX component.
 *
 * @see https://www.algolia.com/
 * @example
 * <Algolia
 *     translation={{
 *         hint: '******',
 *         no_result: '******',
 *         untitled: '******',
 *         empty_preview: '******'
 *     }}
 *     applicationId="******"
 *     apiKey="******"
 *     indexName="******"
 *     jsUrl="******"
 *     algoliaSearchUrl="******"
 *     instantSearchUrl="******" />
 */
var Algolia = /*#__PURE__*/function (_Component) {
  function Algolia() {
    _classCallCheck(this, Algolia);
    return _callSuper(this, Algolia, arguments);
  }
  _inherits(Algolia, _Component);
  return _createClass(Algolia, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        translation = _this$props.translation,
        applicationId = _this$props.applicationId,
        apiKey = _this$props.apiKey,
        indexName = _this$props.indexName,
        jsUrl = _this$props.jsUrl,
        algoliaSearchUrl = _this$props.algoliaSearchUrl,
        instantSearchUrl = _this$props.instantSearchUrl;
      if (!applicationId || !apiKey || !indexName) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("It seems that you forget to set the "), (0, _inferno.createVNode)(1, "code", null, "applicationId", 16), (0, _inferno.createTextVNode)(", "), (0, _inferno.createVNode)(1, "code", null, "apiKey", 16), (0, _inferno.createTextVNode)(", or"), (0, _inferno.createTextVNode)(' '), (0, _inferno.createVNode)(1, "code", null, "indexName", 16), (0, _inferno.createTextVNode)(" for the Aloglia. Please set it in "), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 0);
      }
      var config = {
        applicationId: applicationId,
        apiKey: apiKey,
        indexName: indexName
      };
      var js = "document.addEventListener('DOMContentLoaded', function () {\n            loadAlgolia(".concat(JSON.stringify(config), ", ").concat(JSON.stringify(translation), ");\n        });");
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", "searchbox", (0, _inferno.createVNode)(1, "div", "searchbox-container", [(0, _inferno.createVNode)(1, "div", "searchbox-header", [(0, _inferno.createVNode)(1, "div", "searchbox-input-container", null, 1, {
        "id": "algolia-input"
      }), (0, _inferno.createVNode)(1, "div", null, null, 1, {
        "id": "algolia-poweredby",
        "style": "display:flex;margin:0 .5em 0 1em;align-items:center;line-height:0"
      }), (0, _inferno.createVNode)(1, "a", "searchbox-close", "\xD7", 16, {
        "href": "javascript:;"
      })], 4), (0, _inferno.createVNode)(1, "div", "searchbox-body"), (0, _inferno.createVNode)(1, "div", "searchbox-footer")], 4), 2), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": algoliaSearchUrl,
        "crossorigin": "anonymous",
        "defer": true
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": instantSearchUrl,
        "crossorigin": "anonymous",
        "defer": true
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
 * Cacheable Algolia search engine JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Algolia.Cacheable
 *     config={{
 *         algolia: {
 *             applicationID: '******',
 *             apiKey: '******',
 *             indexName: '******'
 *         }
 *     }}
 *     helper={{
 *         __: function() {...},
 *         cdn: function() {...},
 *         url_for: function() {...}
 *     }} />
 */
Algolia.Cacheable = cacheComponent(Algolia, 'search.algolia', function (props) {
  var config = props.config,
    helper = props.helper;
  var algolia = config.algolia;
  return {
    translation: {
      hint: helper.__('search.hint'),
      no_result: helper.__('search.no_result'),
      untitled: helper.__('search.untitled'),
      empty_preview: helper.__('search.empty_preview')
    },
    applicationId: algolia ? algolia.applicationID : null,
    apiKey: algolia ? algolia.apiKey : null,
    indexName: algolia ? algolia.indexName : null,
    algoliaSearchUrl: helper.cdn('algoliasearch', '4.0.3', 'dist/algoliasearch-lite.umd.js'),
    instantSearchUrl: helper.cdn('instantsearch.js', '4.3.1', 'dist/instantsearch.production.min.js'),
    jsUrl: helper.url_for('/js/algolia.js')
  };
});
module.exports = Algolia;