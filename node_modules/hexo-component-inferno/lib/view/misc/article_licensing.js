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
 * A JSX component that renders article licensing block.
 * @module view/misc/article_licensing
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * A JSX component that renders article licensing block.
 *
 * @example
 * <ArticleLicensing
 *     title="article title"
 *     link="full article URL"
 *     author="author name"
 *     authorTitle="Author"
 *     createdAt={date}
 *     createdTitle="Posted on"
 *     updatedAt={date}
 *     updatedTitle="Updated on"
 *     licenses={{
 *         'Creative Commons': {
 *             url: 'https://creativecommons.org/'
 *         },
 *         'Attribution 4.0 International': {
 *             icon: ['fab fa-creative-commons-by', 'fab fa-creative-commons-nc'],
 *             url: 'https://creativecommons.org/licenses/by-nc/4.0/'
 *         },
 *     }}
 *     licensedTitle="Licensed under" />
 */
var ArticleLicensing = /*#__PURE__*/function (_Component) {
  function ArticleLicensing() {
    _classCallCheck(this, ArticleLicensing);
    return _callSuper(this, ArticleLicensing, arguments);
  }
  _inherits(ArticleLicensing, _Component);
  return _createClass(ArticleLicensing, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        link = _this$props.link,
        author = _this$props.author,
        authorTitle = _this$props.authorTitle,
        createdAt = _this$props.createdAt,
        createdTitle = _this$props.createdTitle,
        updatedAt = _this$props.updatedAt,
        updatedTitle = _this$props.updatedTitle,
        licenses = _this$props.licenses,
        licensedTitle = _this$props.licensedTitle;
      return (0, _inferno.createVNode)(1, "div", "article-licensing box", [(0, _inferno.createVNode)(1, "div", "licensing-title", [title ? (0, _inferno.createVNode)(1, "p", null, title, 0) : null, (0, _inferno.createVNode)(1, "p", null, (0, _inferno.createVNode)(1, "a", null, link, 0, {
        "href": link
      }), 2)], 0), (0, _inferno.createVNode)(1, "div", "licensing-meta level is-mobile", (0, _inferno.createVNode)(1, "div", "level-left", [author ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, authorTitle, 0), (0, _inferno.createVNode)(1, "p", null, author, 0)], 4), 2) : null, createdAt ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, createdTitle, 0), (0, _inferno.createVNode)(1, "p", null, createdAt, 0)], 4), 2) : null, updatedAt ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, updatedTitle, 0), (0, _inferno.createVNode)(1, "p", null, updatedAt, 0)], 4), 2) : null, licenses && Object.keys(licenses).length ? (0, _inferno.createVNode)(1, "div", "level-item is-narrow", (0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "h6", null, licensedTitle, 0), (0, _inferno.createVNode)(1, "p", null, Object.keys(licenses).map(function (name) {
        return (0, _inferno.createVNode)(1, "a", licenses[name].icon ? 'icons' : '', licenses[name].icon ?
        // eslint-disable-line no-nested-ternary
        Array.isArray(licenses[name].icon) ? licenses[name].icon.map(function (icon) {
          return (0, _inferno.createVNode)(1, "i", "icon ".concat(icon));
        }) : (0, _inferno.createVNode)(1, "i", "icon ".concat(licenses[name].icon)) : name, 0, {
          "rel": "noopener",
          "target": "_blank",
          "title": name,
          "href": licenses[name].url
        });
      }), 0)], 4), 2) : null], 0), 2)], 4);
    }
  }]);
}(Component);
/**
 * A JSX component that renders article licensing block.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <ArticleLicensing.Cacheable
 *     config={{
 *         article: {
 *             licenses: {
 *                 'Creative Commons': 'https://creativecommons.org/',
 *                 'Attribution 4.0 International': {
 *                     icon: 'fab fa-creative-commons-by',
 *                     url: 'https://creativecommons.org/licenses/by/4.0/'
 *                 },
 *             }
 *         }
 *     }}
 *     page={page}
 *     helper={{
 *         __: function() {...},
 *         url_for: function() {...}
 *     }} />
 */
ArticleLicensing.Cacheable = cacheComponent(ArticleLicensing, 'misc.articlelicensing', function (props) {
  var config = props.config,
    page = props.page,
    helper = props.helper;
  var _ref = config.article || {},
    licenses = _ref.licenses;
  var links = {};
  if (licenses) {
    Object.keys(licenses).forEach(function (name) {
      var license = licenses[name];
      links[name] = {
        url: helper.url_for(typeof license === 'string' ? license : license.url),
        icon: license.icon
      };
    });
  }
  return {
    title: page.title,
    link: decodeURI(page.permalink),
    author: page.author || config.author,
    authorTitle: helper.__('article.licensing.author'),
    createdAt: page.date ? helper.date(page.date) : null,
    createdTitle: helper.__('article.licensing.created_at'),
    updatedAt: page.updated ? helper.date(page.updated) : null,
    updatedTitle: helper.__('article.licensing.updated_at'),
    licenses: links,
    licensedTitle: helper.__('article.licensing.licensed_under')
  };
});
module.exports = ArticleLicensing;