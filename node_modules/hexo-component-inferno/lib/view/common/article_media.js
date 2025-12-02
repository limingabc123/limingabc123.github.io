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
 * A simple article overview JSX component.
 * @module view/common/article_media
 */
var _require = require('inferno'),
  Component = _require.Component;

/**
 * A simple article overview JSX component.
 *
 * @name ArticleMedia
 * @example
 * <ArticleMedia
 *     thumbnail="/path/to/thumbnail/image.png"
 *     url="/path/to/article"
 *     title="Article title"
 *     date="Article publish date"
 *     dateXml="Article publish date in XML format (see https://hexo.io/docs/helpers#date-xml)"
 *     categories={[
 *         { url: '/path/to/category', name: 'Category name' }
 *     ]} />
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
        thumbnail = _this$props.thumbnail,
        url = _this$props.url,
        title = _this$props.title,
        date = _this$props.date,
        dateXml = _this$props.dateXml,
        categories = _this$props.categories;
      var categoryTags = [];
      categories.forEach(function (category, i) {
        categoryTags.push((0, _inferno.createVNode)(1, "a", null, category.name, 0, {
          "href": category.url
        }));
        if (i < categories.length - 1) {
          categoryTags.push(' / ');
        }
      });
      return (0, _inferno.createVNode)(1, "article", "media", [thumbnail ? (0, _inferno.createVNode)(1, "figure", "media-left", (0, _inferno.createVNode)(1, "a", "image", (0, _inferno.createVNode)(1, "img", null, null, 1, {
        "src": thumbnail,
        "alt": title
      }), 2, {
        "href": url
      }), 2) : null, (0, _inferno.createVNode)(1, "div", "media-content", [(0, _inferno.createVNode)(1, "p", "date", (0, _inferno.createVNode)(1, "time", null, date, 0, {
        "dateTime": dateXml
      }), 2), (0, _inferno.createVNode)(1, "p", "title", (0, _inferno.createVNode)(1, "a", null, title, 0, {
        "href": url
      }), 2), categoryTags.length ? (0, _inferno.createVNode)(1, "p", "categories", categoryTags, 0) : null], 0)], 0);
    }
  }]);
}(Component);