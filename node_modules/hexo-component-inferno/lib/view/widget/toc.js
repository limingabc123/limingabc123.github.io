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
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Table of contents widget JSX component.
 * @module view/widget/toc
 */
var _require = require('hexo-util'),
  getTocObj = _require.tocObj,
  unescapeHTML = _require.unescapeHTML;
var _require2 = require('inferno'),
  Component = _require2.Component;
var _require3 = require('../../util/cache'),
  cacheComponent = _require3.cacheComponent;

/**
 * Export a tree of headings of an article
 * @private
 * @example
 * getToc('HTML content...');
 * // {
 * //    "1": {
 * //        "id": "How-to-enable-table-of-content-for-a-post",
 * //        "text": "How to enable table of content for a post",
 * //        "index": "1"
 * //    },
 * //    "2": {
 * //        "1": {
 * //            "1": {
 * //                "id": "Third-level-title",
 * //                "text": "Third level title",
 * //                "index": "2.1.1"
 * //            },
 * //            "id": "Second-level-title",
 * //            "text": "Second level title",
 * //            "index": "2.1"
 * //        },
 * //        "2": {
 * //            "id": "Another-second-level-title",
 * //            "text": "Another second level title",
 * //            "index": "2.2"
 * //        },
 * //        "id": "First-level-title",
 * //        "text": "First level title",
 * //        "index": "2"
 * //    }
 * // }
 */
function getToc(content, maxDepth) {
  var toc = {};
  var tocObj = getTocObj(content, {
    min_depth: 1,
    max_depth: 6
  });
  var levels = Array.from(new Set(tocObj.map(function (item) {
    return item.level;
  }))).sort(function (a, b) {
    return a - b;
  }).slice(0, maxDepth);
  var counters = new Array(levels.length).fill(0);
  tocObj.forEach(function (item) {
    if (!levels.includes(item.level)) {
      return;
    }
    var text = item.text,
      id = item.id;
    var normalizedLevel = levels.indexOf(item.level);
    for (var i = 0; i < counters.length; i++) {
      if (i > normalizedLevel) {
        counters[i] = 0;
      } else if (i < normalizedLevel) {
        if (counters[i] === 0) {
          // if headings start with a lower level heading, set the former heading index to 1
          // e.g. h3, h2, h1, h2, h3 => 1.1.1, 1.2, 2, 2.1, 2.1.1
          counters[i] = 1;
        }
      } else {
        counters[i] += 1;
      }
    }
    var node = toc;
    var _iterator = _createForOfIteratorHelper(counters.slice(0, normalizedLevel + 1)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _i = _step.value;
        if (!(_i in node)) {
          node[_i] = {};
        }
        node = node[_i];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    node.id = id;
    node.text = text;
    node.index = counters.slice(0, normalizedLevel + 1).join('.');
  });
  return toc;
}

/**
 * Table of contents widget JSX component.
 *
 * @example
 * <Toc
 *     title="Widget title"
 *     content="HTML content"
 *     showIndex={true}
 *     collapsed={true}
 *     maxDepth={3}
 *     jsUrl="******" />
 */
var Toc = /*#__PURE__*/function (_Component) {
  function Toc() {
    _classCallCheck(this, Toc);
    return _callSuper(this, Toc, arguments);
  }
  _inherits(Toc, _Component);
  return _createClass(Toc, [{
    key: "renderToc",
    value: function renderToc(toc) {
      var _this = this;
      var showIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var result;
      var keys = Object.keys(toc).filter(function (key) {
        return !['id', 'index', 'text'].includes(key);
      }).map(function (key) {
        return parseInt(key, 10);
      }).sort(function (a, b) {
        return a - b;
      });
      if (keys.length > 0) {
        result = (0, _inferno.createVNode)(1, "ul", "menu-list", keys.map(function (i) {
          return _this.renderToc(toc[i], showIndex);
        }), 0);
      }
      if ('id' in toc && 'index' in toc && 'text' in toc) {
        result = (0, _inferno.createVNode)(1, "li", null, [(0, _inferno.createVNode)(1, "a", "level is-mobile", (0, _inferno.createVNode)(1, "span", "level-left", [showIndex ? (0, _inferno.createVNode)(1, "span", "level-item", toc.index, 0) : null, (0, _inferno.createVNode)(1, "span", "level-item", unescapeHTML(toc.text), 0)], 0), 2, {
          "href": '#' + toc.id
        }), result], 0);
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        showIndex = _this$props.showIndex,
        _this$props$maxDepth = _this$props.maxDepth,
        maxDepth = _this$props$maxDepth === void 0 ? 3 : _this$props$maxDepth,
        _this$props$collapsed = _this$props.collapsed,
        collapsed = _this$props$collapsed === void 0 ? true : _this$props$collapsed;
      var toc = getToc(this.props.content, maxDepth);
      if (!Object.keys(toc).length) {
        return null;
      }
      var css = '#toc .menu-list > li > a.is-active + .menu-list { display: block; }' + '#toc .menu-list > li > a + .menu-list { display: none; }';
      return (0, _inferno.createVNode)(1, "div", "card widget", [(0, _inferno.createVNode)(1, "div", "card-content", (0, _inferno.createVNode)(1, "div", "menu", [(0, _inferno.createVNode)(1, "h3", "menu-label", this.props.title, 0), this.renderToc(toc, showIndex)], 0), 2), collapsed ? (0, _inferno.createVNode)(1, "style", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: css
        }
      }) : null, (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": this.props.jsUrl,
        "defer": true
      })], 0, {
        "id": "toc",
        "data-type": "toc"
      });
    }
  }]);
}(Component);
/**
 * Cacheable table of contents widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Toc.Cacheable
 *     config={{ toc: true }}
 *     page={{ layout: 'post', content: 'HTML content' }}
 *     widget={{ index: true, collapsed: true, depth: 3 }}
 *     helper={{
 *         _p: function() {...},
 *         url_for: function() {...}
 *     }} /> />
 */
Toc.Cacheable = cacheComponent(Toc, 'widget.toc', function (props) {
  var config = props.config,
    page = props.page,
    widget = props.widget,
    helper = props.helper;
  var layout = page.layout,
    content = page.content,
    encrypt = page.encrypt,
    origin = page.origin;
  var index = widget.index,
    _widget$collapsed = widget.collapsed,
    collapsed = _widget$collapsed === void 0 ? true : _widget$collapsed,
    _widget$depth = widget.depth,
    depth = _widget$depth === void 0 ? 3 : _widget$depth;
  if (config.toc !== true || layout !== 'page' && layout !== 'post') {
    return null;
  }
  return {
    title: helper._p('widget.catalogue', Infinity),
    collapsed: collapsed !== false,
    maxDepth: depth | 0,
    showIndex: index !== false,
    content: encrypt ? origin : content,
    jsUrl: helper.url_for('/js/toc.js')
  };
});
module.exports = Toc;