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
 * Tags widget JSX component.
 * @module view/widget/tags
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Tags widget JSX component.
 *
 * @example
 * <Tags
 *     title="Widget title"
 *     showCount={true}
 *     tags={[
 *         {
 *             url: '/path/to/category/page',
 *             name: 'Category name',
 *             count: 1
 *         }
 *     ]} />
 */
var Tags = /*#__PURE__*/function (_Component) {
  function Tags() {
    _classCallCheck(this, Tags);
    return _callSuper(this, Tags, arguments);
  }
  _inherits(Tags, _Component);
  return _createClass(Tags, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        tags = _this$props.tags,
        title = _this$props.title,
        showCount = _this$props.showCount;
      return (0, _inferno.createVNode)(1, "div", "card widget", (0, _inferno.createVNode)(1, "div", "card-content", (0, _inferno.createVNode)(1, "div", "menu", [(0, _inferno.createVNode)(1, "h3", "menu-label", title, 0), (0, _inferno.createVNode)(1, "div", "field is-grouped is-grouped-multiline", tags.map(function (tag) {
        return (0, _inferno.createVNode)(1, "div", "control", (0, _inferno.createVNode)(1, "a", "tags has-addons", [(0, _inferno.createVNode)(1, "span", "tag", tag.name, 0), showCount ? (0, _inferno.createVNode)(1, "span", "tag", tag.count, 0) : null], 0, {
          "href": tag.url
        }), 2);
      }), 0)], 4), 2), 2, {
        "data-type": "tags"
      });
    }
  }]);
}(Component);
/**
 * Cacheable tags widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @see https://github.com/hexojs/hexo/blob/4.2.0/lib/plugins/helper/list_tags.js
 * @example
 * <Tags.Cacheable
 *     site={{ tags: {...} }}
 *     helper={{
 *         url_for: function() {...},
 *         _p: function() {...}
 *     }}
 *     tags={{...}}
 *     widget={{
 *       order_by: "name",
 *       amount: 100,
 *       show_count: true
 *     }} />
 */
Tags.Cacheable = cacheComponent(Tags, 'widget.tags', function (props) {
  var helper = props.helper,
    _props$widget = props.widget,
    widget = _props$widget === void 0 ? {} : _props$widget;
  var _widget$order_by = widget.order_by,
    order_by = _widget$order_by === void 0 ? 'name' : _widget$order_by,
    amount = widget.amount,
    _widget$show_count = widget.show_count,
    show_count = _widget$show_count === void 0 ? true : _widget$show_count;
  var tags = props.tags || props.site.tags;
  var url_for = helper.url_for,
    _p = helper._p;
  if (!tags || !tags.length) {
    return null;
  }
  tags = tags.sort(order_by).filter(function (tag) {
    return tag.length;
  });
  if (amount) {
    tags = tags.limit(amount);
  }
  return {
    showCount: show_count,
    title: _p('common.tag', Infinity),
    tags: tags.map(function (tag) {
      return {
        name: tag.name,
        count: tag.length,
        url: url_for(tag.path)
      };
    })
  };
});
module.exports = Tags;