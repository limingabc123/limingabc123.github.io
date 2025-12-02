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
 * DisqusJS comment JSX component.
 * @module view/comment/disqusjs
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * DisqusJS comment JSX component.
 *
 * @see https://github.com/SukkaW/DisqusJS
 * @example
 * <DisqusJs
 *     shortname="******"
 *     apiKey="******"
 *     api="******"
 *     admin="******"
 *     adminLabel={false}
 *     nesting={4}
 *     disqusId="******"
 *     path="/path/to/page"
 *     permalink="/page/permanent/path"
 *     pageTitle="******"
 *     siteTitle="******"
 *     jsUrl="/path/to/disqus.js"
 *     cssUrl="/path/to/disqusjs.css" />
 */
var DisqusJs = /*#__PURE__*/function (_Component) {
  function DisqusJs() {
    _classCallCheck(this, DisqusJs);
    return _callSuper(this, DisqusJs, arguments);
  }
  _inherits(DisqusJs, _Component);
  return _createClass(DisqusJs, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        shortname = _this$props.shortname,
        apiKey = _this$props.apiKey,
        api = _this$props.api,
        admin = _this$props.admin,
        adminLabel = _this$props.adminLabel,
        nesting = _this$props.nesting,
        disqusId = _this$props.disqusId,
        path = _this$props.path,
        permalink = _this$props.permalink,
        pageTitle = _this$props.pageTitle,
        siteTitle = _this$props.siteTitle,
        jsUrl = _this$props.jsUrl,
        cssUrl = _this$props.cssUrl;
      if (!shortname) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You forgot to set the "), (0, _inferno.createVNode)(1, "code", null, "shortname", 16), (0, _inferno.createTextVNode)(" or "), (0, _inferno.createVNode)(1, "code", null, "api_key", 16), (0, _inferno.createTextVNode)(" for Disqus. Please set it in "), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 4);
      }
      var url = permalink || path;
      var identifier = disqusId || path;
      var js = "new DisqusJS({\n            shortname: '".concat(shortname, "',\n            apikey: ").concat(JSON.stringify(apiKey), ",\n            ").concat(siteTitle ? "siteName: ".concat(JSON.stringify(siteTitle), ",") : '', "\n            ").concat(identifier ? "identifier: ".concat(JSON.stringify(identifier), ",") : '', "\n            ").concat(url ? "url: ".concat(JSON.stringify(url), ",") : '', "\n            ").concat(pageTitle ? "title: ".concat(JSON.stringify(pageTitle), ",") : '', "\n            ").concat(api ? "api: ".concat(JSON.stringify(api), ",") : '', "\n            ").concat(admin ? "admin: ".concat(JSON.stringify(admin), ",") : '', "\n            ").concat(adminLabel ? "adminLabel: ".concat(JSON.stringify(adminLabel), ",") : '', "\n            ").concat(nesting ? "nesting: ".concat(JSON.stringify(nesting), ",") : '', "\n        });");
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "link", null, null, 1, {
        "rel": "stylesheet",
        "href": cssUrl
      }), (0, _inferno.createVNode)(1, "div", null, (0, _inferno.createVNode)(1, "noscript", null, [(0, _inferno.createTextVNode)("Please enable JavaScript to view the"), (0, _inferno.createTextVNode)(' '), (0, _inferno.createVNode)(1, "a", null, "comments powered by Disqus.", 16, {
        "href": "//disqus.com/?ref_noscript"
      })], 0), 2, {
        "id": "disqus_thread"
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": jsUrl
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: js
        }
      })], 4);
    }
  }]);
}(Component);
/**
 * Cacheable DisqusJS comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <DisqusJs.Cacheable
 *     comment={{
 *         shortname: '******',
 *         api_key: '******',
 *         api: '******',
 *         admin: '******',
 *         admin_label: false,
 *         nesting: 4
 *     }}
 *     page={{
 *         path: '/path/to/page',
 *         disqusId: '******',
 *         permalink: '******'
 *         title: '******'
 *     }}
 *     config={{ title: '******' }}
 *     helper={{ cdn: function() { ... } }} />
 */
DisqusJs.Cacheable = cacheComponent(DisqusJs, 'comment.disqusjs', function (props) {
  var config = props.config,
    page = props.page,
    helper = props.helper,
    comment = props.comment;
  return {
    path: page.path,
    shortname: comment.shortname,
    apiKey: comment.api_key,
    api: comment.api,
    admin: comment.admin,
    adminLabel: comment.admin_label,
    nesting: comment.nesting,
    disqusId: page.disqusId,
    permalink: page.permalink,
    pageTitle: page.title,
    siteTitle: config.title,
    jsUrl: helper.cdn('disqusjs', '1.3.0', 'dist/disqus.js'),
    cssUrl: helper.cdn('disqusjs', '1.3.0', 'dist/disqusjs.css')
  };
});
module.exports = DisqusJs;