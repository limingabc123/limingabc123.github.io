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
 * External links widget JSX component.
 * @module view/widget/links
 */
var _require = require('url'),
  URL = _require.URL;
var _require2 = require('inferno'),
  Component = _require2.Component;
var _require3 = require('../../util/cache'),
  cacheComponent = _require3.cacheComponent;

/**
 * External links widget JSX component.
 *
 * @example
 * <Links
 *     title="Widget title"
 *     links={{
 *         'Link Name 1': '/path/to/external/site',
 *         'Link Name 2': {
 *              'link': '/path/to/external/site',
 *              'hide_hostname': true,
 *        }
 *     }} />
 */
var Links = /*#__PURE__*/function (_Component) {
  function Links() {
    _classCallCheck(this, Links);
    return _callSuper(this, Links, arguments);
  }
  _inherits(Links, _Component);
  return _createClass(Links, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        links = _this$props.links;
      for (var name in links) {
        var link = links[name];
        if (typeof link === 'string') {
          link = {
            link: link
          };
          links[name] = link;
        }
        if (link.hide_hostname !== true) {
          try {
            link.hostname = new URL(link.link).hostname;
          } catch (e) {}
        }
      }
      return (0, _inferno.createVNode)(1, "div", "card widget", (0, _inferno.createVNode)(1, "div", "card-content", (0, _inferno.createVNode)(1, "div", "menu", [(0, _inferno.createVNode)(1, "h3", "menu-label", title, 0), (0, _inferno.createVNode)(1, "ul", "menu-list", Object.keys(links).map(function (i) {
        return (0, _inferno.createVNode)(1, "li", null, (0, _inferno.createVNode)(1, "a", "level is-mobile", [(0, _inferno.createVNode)(1, "span", "level-left", (0, _inferno.createVNode)(1, "span", "level-item", i, 0), 2), links[i].hostname ? (0, _inferno.createVNode)(1, "span", "level-right", (0, _inferno.createVNode)(1, "span", "level-item tag", links[i].hostname, 0), 2) : null], 0, {
          "href": links[i].link,
          "target": "_blank",
          "rel": "noopener"
        }), 2);
      }), 0)], 4), 2), 2, {
        "data-type": "links"
      });
    }
  }]);
}(Component);
/**
 * Cacheable external links widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Links.Cacheable
 *     links={{
 *         'Link Name 1': '/path/to/external/site',
 *         'Link Name 2': '/path/to/external/site'
 *     }}
 *     helper={{ __: function() {...} }} />
 */
Links.Cacheable = cacheComponent(Links, 'widget.links', function (props) {
  var helper = props.helper,
    widget = props.widget;
  if (!Object.keys(widget.links).length) {
    return null;
  }
  return {
    title: helper.__('widget.links'),
    links: widget.links
  };
});
module.exports = Links;