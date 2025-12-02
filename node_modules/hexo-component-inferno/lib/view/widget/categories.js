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
 * Categories widget JSX component.
 * @module view/widget/categories
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Categories widget JSX component.
 *
 * @example
 * <Categories
 *     title="Widget title"
 *     showCount={true}
 *     categories={[
 *         {
 *             url: '/path/to/category/page',
 *             name: 'Category name',
 *             count: 1,
 *             isCurrent: false,
 *             children: [{
 *                 url: '/path/to/category/page',
 *                 name: 'Subcategory name',
 *                 count: 1,
 *             }]
 *         }
 *     ]} />
 */
var Categories = /*#__PURE__*/function (_Component) {
  function Categories() {
    _classCallCheck(this, Categories);
    return _callSuper(this, Categories, arguments);
  }
  _inherits(Categories, _Component);
  return _createClass(Categories, [{
    key: "renderList",
    value: function renderList(categories, showCount) {
      var _this = this;
      return categories.map(function (category) {
        return (0, _inferno.createVNode)(1, "li", null, [(0, _inferno.createVNode)(1, "a", 'level is-mobile' + (category.isCurrent ? ' is-active' : ''), [(0, _inferno.createVNode)(1, "span", "level-start", (0, _inferno.createVNode)(1, "span", "level-item", category.name, 0), 2), showCount ? (0, _inferno.createVNode)(1, "span", "level-end", (0, _inferno.createVNode)(1, "span", "level-item tag", category.count, 0), 2) : null], 0, {
          "href": category.url
        }), category.children.length ? (0, _inferno.createVNode)(1, "ul", null, _this.renderList(category.children, showCount), 0) : null], 0);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        showCount = _this$props.showCount,
        categories = _this$props.categories;
      return (0, _inferno.createVNode)(1, "div", "card widget", (0, _inferno.createVNode)(1, "div", "card-content", (0, _inferno.createVNode)(1, "div", "menu", [(0, _inferno.createVNode)(1, "h3", "menu-label", title, 0), (0, _inferno.createVNode)(1, "ul", "menu-list", this.renderList(categories, showCount), 0)], 4), 2), 2, {
        "data-type": "categories"
      });
    }
  }]);
}(Component);
/**
 * Cacheable categories widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @see https://github.com/hexojs/hexo/blob/4.2.0/lib/plugins/helper/list_categories.js
 * @example
 * <Categories.Cacheable
 *     site={{ categories: {...} }}
 *     page={{
 *         base: '/path/base/url',
 *         _id: '******'
 *     }}
 *     helper={{
 *         url_for: function() {...},
 *         _p: function() {...}
 *     }}
 *     categories={{...}}
 *     orderBy="name"
 *     order={1}
 *     showCurrent={false}
 *     showCount={true}
 *     depth={3} />
 */
Categories.Cacheable = cacheComponent(Categories, 'widget.categories', function (props) {
  var page = props.page,
    helper = props.helper,
    _props$widget = props.widget,
    widget = _props$widget === void 0 ? {} : _props$widget;
  var _widget$categories = widget.categories,
    categories = _widget$categories === void 0 ? props.site.categories : _widget$categories,
    _widget$orderBy = widget.orderBy,
    orderBy = _widget$orderBy === void 0 ? 'name' : _widget$orderBy,
    _widget$order = widget.order,
    order = _widget$order === void 0 ? 1 : _widget$order,
    _widget$showCurrent = widget.showCurrent,
    showCurrent = _widget$showCurrent === void 0 ? false : _widget$showCurrent,
    _widget$showCount = widget.showCount,
    showCount = _widget$showCount === void 0 ? true : _widget$showCount;
  var url_for = helper.url_for,
    _p = helper._p;
  if (!categories || !categories.length) {
    return null;
  }
  var depth = 0;
  try {
    depth = parseInt(props.depth, 10);
  } catch (e) {}
  function prepareQuery(parent) {
    var query = {};
    if (parent) {
      query.parent = parent;
    } else {
      query.parent = {
        $exists: false
      };
    }
    return categories.find(query).sort(orderBy, order).filter(function (cat) {
      return cat.length;
    });
  }
  function hierarchicalList(level, parent) {
    return prepareQuery(parent).map(function (cat, i) {
      var children = [];
      if (!depth || level + 1 < depth) {
        children = hierarchicalList(level + 1, cat._id);
      }
      var isCurrent = false;
      if (showCurrent && page) {
        for (var j = 0; j < cat.length; j++) {
          var post = cat.posts.data[j];
          if (post && post._id === page._id) {
            isCurrent = true;
            break;
          }
        }
        // special case: category page
        isCurrent = isCurrent || page.base && page.base.startsWith(cat.path);
      }
      return {
        children: children,
        isCurrent: isCurrent,
        name: cat.name,
        count: cat.length,
        url: url_for(cat.path)
      };
    });
  }
  return {
    showCount: showCount,
    categories: hierarchicalList(0),
    title: _p('common.category', Infinity)
  };
});
module.exports = Categories;