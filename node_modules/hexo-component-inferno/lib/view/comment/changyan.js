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
 * ChangYan comment JSX component.
 * @module view/comment/changyan
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * ChangYan comment JSX component.
 *
 * @see http://changyan.kuaizhan.com/static/help/
 * @example
 * <ChangYan
 *     appId="******"
 *     conf="******"
 *     path="/path/to/page" />
 */
var ChangYan = /*#__PURE__*/function (_Component) {
  function ChangYan() {
    _classCallCheck(this, ChangYan);
    return _callSuper(this, ChangYan, arguments);
  }
  _inherits(ChangYan, _Component);
  return _createClass(ChangYan, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        appId = _this$props.appId,
        conf = _this$props.conf,
        path = _this$props.path;
      if (!appId || !conf) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You forgot to set the "), (0, _inferno.createVNode)(1, "code", null, "app_id", 16), (0, _inferno.createTextVNode)(" or "), (0, _inferno.createVNode)(1, "code", null, "conf", 16), (0, _inferno.createTextVNode)(" for Changyan. Please set it in "), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 4);
      }
      var js = "window.changyan.api.config({appid: '".concat(appId, "',conf: '").concat(conf, "'});");
      /* eslint-disable react/no-unknown-property */
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", null, null, 1, {
        "id": "SOHUCS",
        "sid": path
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "charset": "utf-8",
        "src": "https://changyan.sohu.com/upload/changyan.js"
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: js
        }
      })], 4);
      /* eslint-enable react/no-unknown-property */
    }
  }]);
}(Component);
/**
 * Cacheable ChangYan comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <ChangYan.Cacheable
 *     comment={{ app_id: '*******', conf='******' }}
 *     page={{ path: '/path/to/page' }} />
 */
ChangYan.Cacheable = cacheComponent(ChangYan, 'comment.changyan', function (props) {
  var comment = props.comment,
    page = props.page;
  return {
    appId: comment.app_id,
    conf: comment.conf,
    path: page.path
  };
});
module.exports = ChangYan;