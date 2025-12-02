"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _inferno = require("inferno");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
 * Web app meta tags.
 * @module view/misc/web_app
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Web app meta tags.
 *
 * @example
 * <WebApp
 *     name="******"
 *     manifest="/path/to/manifest.json"
 *     tileIcon="/path/to/image"
 *     themeColor="#000000"
 *     icons={[
 *         { src: '/path/to/image', sizes: '128x128 256x256' },
 *         { src: '/path/to/image', sizes: '512x512' },
 *     ]} />
 */
var WebApp = /*#__PURE__*/function (_Component) {
  function WebApp() {
    _classCallCheck(this, WebApp);
    return _callSuper(this, WebApp, arguments);
  }
  _inherits(WebApp, _Component);
  return _createClass(WebApp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        name = _this$props.name,
        manifest = _this$props.manifest,
        tileIcon = _this$props.tileIcon,
        themeColor = _this$props.themeColor;
      var icons = [];
      if (Array.isArray(this.props.icons)) {
        var _ref;
        icons = this.props.icons.map(function (icon) {
          var sizes = icon.sizes,
            src = icon.src;
          if (src && sizes) {
            return icon.sizes.split(/\s+/).map(function (size) {
              return {
                sizes: size,
                src: src
              };
            });
          }
          return null;
        });
        icons = icons.filter(Boolean);
        icons = (_ref = []).concat.apply(_ref, _toConsumableArray(icons));
      }
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "link", null, null, 1, {
        "rel": "manifest",
        "href": manifest
      }), themeColor ? (0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "name": "theme-color",
        "content": themeColor
      }) : null, (0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "name": "application-name",
        "content": name
      }), tileIcon ? (0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "name": "msapplication-TileImage",
        "content": tileIcon
      }) : null, themeColor ? (0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "name": "msapplication-TileColor",
        "content": themeColor
      }) : null, (0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "name": "apple-mobile-web-app-capable",
        "content": "yes"
      }), (0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "name": "apple-mobile-web-app-title",
        "content": name
      }), (0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "name": "apple-mobile-web-app-status-bar-style",
        "content": "default"
      }), icons.map(function (icon) {
        return (0, _inferno.createVNode)(1, "link", null, null, 1, {
          "rel": "apple-touch-icon",
          "sizes": icon.sizes,
          "href": icon.src
        });
      })], 0);
    }
  }]);
}(Component);
/**
 * Cacheable web app meta tags.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}) and manifest generator ({@link module:hexo/generator/manifest}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <WebApp.Cacheable
 *     name="******"
 *     themeColor="#000000"
 *     favicon="/path/to/image"
 *     icons={[
 *         { src: '/path/to/image', sizes: '128x128 256x256' },
 *         { src: '/path/to/image', sizes: '512x512' },
 *     ]}
 *     helper={{ url_for: function() {...} }} />
 */
WebApp.Cacheable = cacheComponent(WebApp, 'misc.webapp', function (props) {
  var name = props.name,
    themeColor = props.themeColor,
    favicon = props.favicon,
    icons = props.icons,
    helper = props.helper;
  var tileIcon = null;
  if (Array.isArray(icons)) {
    tileIcon = icons.find(function (icon) {
      return icon.sizes.toLowerCase().indexOf('144x144') > -1;
    });
    if (tileIcon) {
      tileIcon = tileIcon.src;
    } else if (icons.length) {
      tileIcon = icons[0].src;
    }
  }
  if (!tileIcon) {
    tileIcon = favicon;
  }
  return {
    name: name,
    icons: icons,
    tileIcon: tileIcon,
    themeColor: themeColor,
    manifest: helper.url_for('/manifest.json')
  };
});
module.exports = WebApp;