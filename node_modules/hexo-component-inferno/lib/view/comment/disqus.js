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
 * Disqus comment JSX component.
 * @module view/comment/disqus
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Disqus comment JSX component.
 *
 * @see https://disqus.com/admin/install/platforms/universalcode/
 * @example
 * <Disqus
 *     shortname="******"
 *     disqusId="******"
 *     permalink="/page/permanent/path"
 *     path="/path/to/page" />
 */
var Disqus = /*#__PURE__*/function (_Component) {
  function Disqus() {
    _classCallCheck(this, Disqus);
    return _callSuper(this, Disqus, arguments);
  }
  _inherits(Disqus, _Component);
  return _createClass(Disqus, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        shortname = _this$props.shortname,
        disqusId = _this$props.disqusId,
        path = _this$props.path,
        permalink = _this$props.permalink;
      if (!shortname) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You forgot to set the "), (0, _inferno.createVNode)(1, "code", null, "shortname", 16), (0, _inferno.createTextVNode)(" for Disqus. Please set it in"), (0, _inferno.createTextVNode)(' '), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 0);
      }
      var js = "var disqus_config = function () {\n            this.page.url = '".concat(permalink, "';\n            this.page.identifier = '").concat(disqusId || path, "';\n        };\n        (function() {\n            var d = document, s = d.createElement('script');  \n            s.src = '//' + '").concat(shortname, "' + '.disqus.com/embed.js';\n            s.setAttribute('data-timestamp', +new Date());\n            (d.head || d.body).appendChild(s);\n        })();");
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", null, (0, _inferno.createVNode)(1, "noscript", null, [(0, _inferno.createTextVNode)("Please enable JavaScript to view the"), (0, _inferno.createTextVNode)(' '), (0, _inferno.createVNode)(1, "a", null, "comments powered by Disqus.", 16, {
        "href": "//disqus.com/?ref_noscript"
      })], 0), 2, {
        "id": "disqus_thread"
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: js
        }
      })], 4);
    }
  }]);
}(Component);
/**
 * Cacheable Disqus comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Disqus.Cacheable
 *     comment={{ shortname: '*******' }}
 *     page={{
 *         path: '/path/to/page',
 *         disqusId: '******',
 *         permalink: '/page/permanent/link'
 *     }} />
 */
Disqus.Cacheable = cacheComponent(Disqus, 'comment.disqus', function (props) {
  var comment = props.comment,
    page = props.page;
  return {
    path: page.path,
    shortname: comment.shortname,
    disqusId: page.disqusId,
    permalink: page.permalink
  };
});
module.exports = Disqus;