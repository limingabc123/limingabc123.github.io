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
 * Recent posts widget JSX component.
 * @module view/widget/recent_posts
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;
var ArticleMedia = require('../common/article_media');

/**
 * Recent posts widget JSX component.
 *
 * @example
 * <RecentPosts
 *     title="Widget title"
 *     posts={[
 *         {
 *             url: '/url/to/post',
 *             title: 'Post title',
 *             date: '******',
 *             dateXml: '******',
 *             thumbnail: '/path/to/thumbnail',
 *             categories: [{ name: 'Category name', url: '/path/to/category' }]
 *         }
 *     ]} />
 */
var RecentPosts = /*#__PURE__*/function (_Component) {
  function RecentPosts() {
    _classCallCheck(this, RecentPosts);
    return _callSuper(this, RecentPosts, arguments);
  }
  _inherits(RecentPosts, _Component);
  return _createClass(RecentPosts, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        posts = _this$props.posts;
      return (0, _inferno.createVNode)(1, "div", "card widget", (0, _inferno.createVNode)(1, "div", "card-content", [(0, _inferno.createVNode)(1, "h3", "menu-label", title, 0), posts.map(function (post) {
        return (0, _inferno.createComponentVNode)(2, ArticleMedia, {
          "thumbnail": post.thumbnail,
          "url": post.url,
          "title": post.title,
          "date": post.date,
          "dateXml": post.dateXml,
          "categories": post.categories
        });
      })], 0), 2, {
        "data-type": "recent-posts"
      });
    }
  }]);
}(Component);
/**
 * Cacheable recent posts widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <RecentPosts.Cacheable
 *     site={{ posts: {...} }}
 *     helper={{
 *         url_for: function() {...},
 *         __: function() {...},
 *         date_xml: function() {...},
 *         date: function() {...}
 *     }}
 *     limit={5} />
 */
RecentPosts.Cacheable = cacheComponent(RecentPosts, 'widget.recentposts', function (props) {
  var site = props.site,
    helper = props.helper,
    widget = props.widget;
  var _widget$limit = widget.limit,
    limit = _widget$limit === void 0 ? 5 : _widget$limit;
  var url_for = helper.url_for,
    __ = helper.__,
    date_xml = helper.date_xml,
    date = helper.date;
  if (!site.posts.length) {
    return null;
  }
  var posts = site.posts.sort('date', -1).limit(limit).map(function (post) {
    return {
      url: url_for(post.link || post.path),
      title: post.title,
      date: date(post.date),
      dateXml: date_xml(post.date),
      thumbnail: post.thumbnail ? url_for(post.thumbnail) : null,
      categories: post.categories.map(function (category) {
        return {
          name: category.name,
          url: url_for(category.path)
        };
      })
    };
  });
  return {
    posts: posts,
    title: __('widget.recents')
  };
});
module.exports = RecentPosts;