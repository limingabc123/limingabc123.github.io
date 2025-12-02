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
 * Baidu share buttons JSX component.
 * @module view/share/bdshare
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Baidu share buttons JSX component.
 *
 * @see http://share.baidu.com/code
 * @example
 * <BdShare />
 */
var BdShare = /*#__PURE__*/function (_Component) {
  function BdShare() {
    _classCallCheck(this, BdShare);
    return _callSuper(this, BdShare, arguments);
  }
  _inherits(BdShare, _Component);
  return _createClass(BdShare, [{
    key: "render",
    value: function render() {
      var js = 'window._bd_share_config = { "common": { "bdSnsKey": {}, "bdText": "", "bdMini": "2", "bdPic": "", "bdStyle": "0", "bdSize": "16" }, "share": {} }; with (document) 0[(getElementsByTagName(\'head\')[0] || body).appendChild(createElement(\'script\')).src = \'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\' + ~(-new Date() / 36e5)];';
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", "bdsharebuttonbox", [(0, _inferno.createVNode)(1, "a", "bds_more", null, 1, {
        "href": "#",
        "data-cmd": "more"
      }), (0, _inferno.createVNode)(1, "a", "bds_qzone", null, 1, {
        "href": "#",
        "data-cmd": "qzone",
        "title": "分享到QQ空间"
      }), (0, _inferno.createVNode)(1, "a", "bds_tsina", null, 1, {
        "href": "#",
        "data-cmd": "tsina",
        "title": "分享到新浪微博"
      }), (0, _inferno.createVNode)(1, "a", "bds_tqq", null, 1, {
        "href": "#",
        "data-cmd": "tqq",
        "title": "分享到腾讯微博"
      }), (0, _inferno.createVNode)(1, "a", "bds_renren", null, 1, {
        "href": "#",
        "data-cmd": "renren",
        "title": "分享到人人网"
      }), (0, _inferno.createVNode)(1, "a", "bds_weixin", null, 1, {
        "href": "#",
        "data-cmd": "weixin",
        "title": "分享到微信"
      })], 4), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: js
        }
      })], 4);
    }
  }]);
}(Component);
/**
 * Cacheable Baidu share buttons JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <BdShare.Cacheable />
 */
BdShare.Cacheable = cacheComponent(BdShare, 'share.bdshare', function (props) {
  return {};
});
module.exports = BdShare;