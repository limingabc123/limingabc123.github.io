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
 * Waline comment JSX component.
 * @module view/comment/waline
 */
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Waline comment JSX component.
 *
 * @see https://waline.js.org/guide/get-started.html
 * @example
 * <Waline
 *     serverURL="https://path/to/waline/server"
 *     path="window.location.pathname"
 *     lang="zh-CN"
 *     locale={{placeholder: "", ...}}
 *     emoji={["https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo"]}
 *     dark="auto"
 *     meta={["nick", "mail", "link"]}
 *     requiredMeta={[]}
 *     login="enable"
 *     wordLimit={0},
 *     pageSize={10}
 *     imageUploader={true}
 *     highlighter={true}
 *     texRenderer={false}
 *     search={true}
 *     visitor={false}
 *     pageview={false}
 *     comment={false}
 *     copyright={true}
 *     jsUrl="/path/to/Waline.js" />
 */
var Waline = /*#__PURE__*/function (_Component) {
  function Waline() {
    _classCallCheck(this, Waline);
    return _callSuper(this, Waline, arguments);
  }
  _inherits(Waline, _Component);
  return _createClass(Waline, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        serverURL = _this$props.serverURL,
        _this$props$path = _this$props.path,
        path = _this$props$path === void 0 ? 'window.location.pathname' : _this$props$path,
        _this$props$lang = _this$props.lang,
        lang = _this$props$lang === void 0 ? 'zh-CN' : _this$props$lang,
        locale = _this$props.locale,
        _this$props$emoji = _this$props.emoji,
        emoji = _this$props$emoji === void 0 ? ['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo'] : _this$props$emoji,
        _this$props$dark = _this$props.dark,
        dark = _this$props$dark === void 0 ? '' : _this$props$dark,
        _this$props$meta = _this$props.meta,
        meta = _this$props$meta === void 0 ? ['nick', 'mail', 'link'] : _this$props$meta,
        _this$props$requiredM = _this$props.requiredMeta,
        requiredMeta = _this$props$requiredM === void 0 ? [] : _this$props$requiredM,
        _this$props$login = _this$props.login,
        login = _this$props$login === void 0 ? 'enable' : _this$props$login,
        _this$props$wordLimit = _this$props.wordLimit,
        wordLimit = _this$props$wordLimit === void 0 ? 0 : _this$props$wordLimit,
        _this$props$pageSize = _this$props.pageSize,
        pageSize = _this$props$pageSize === void 0 ? 10 : _this$props$pageSize,
        _this$props$imageUplo = _this$props.imageUploader,
        imageUploader = _this$props$imageUplo === void 0 ? false : _this$props$imageUplo,
        _this$props$highlight = _this$props.highlighter,
        highlighter = _this$props$highlight === void 0 ? false : _this$props$highlight,
        _this$props$texRender = _this$props.texRenderer,
        texRenderer = _this$props$texRender === void 0 ? false : _this$props$texRender,
        _this$props$search = _this$props.search,
        search = _this$props$search === void 0 ? false : _this$props$search,
        _this$props$pageview = _this$props.pageview,
        pageview = _this$props$pageview === void 0 ? false : _this$props$pageview,
        _this$props$comment = _this$props.comment,
        comment = _this$props$comment === void 0 ? false : _this$props$comment,
        _this$props$copyright = _this$props.copyright,
        copyright = _this$props$copyright === void 0 ? true : _this$props$copyright,
        jsUrl = _this$props.jsUrl,
        cssUrl = _this$props.cssUrl;
      if (!serverURL) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You forgot to set the "), (0, _inferno.createVNode)(1, "code", null, "server_url", 16), (0, _inferno.createTextVNode)(" for Waline. Please set it in"), (0, _inferno.createTextVNode)(' '), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 0);
      }
      var js = "Waline.init({\n            el: '#waline-thread',\n            serverURL: ".concat(JSON.stringify(serverURL), ",\n            path: ").concat(path, ",\n            ").concat(lang ? "lang: ".concat(JSON.stringify(lang), ",") : '', "\n            ").concat(locale ? "locale: ".concat(JSON.stringify(locale), ",") : '', "\n            ").concat(emoji ? "emoji: ".concat(JSON.stringify(emoji), ",") : '', "\n            ").concat(dark ? "dark: ".concat(JSON.stringify(dark), ",") : '', "\n            ").concat(meta ? "meta: ".concat(JSON.stringify(meta), ",") : '', "\n            ").concat(Array.isArray(requiredMeta) ? "requiredMeta: ".concat(JSON.stringify(requiredMeta), ",") : '', "\n            ").concat(login ? "login: ".concat(JSON.stringify(login), ",") : '', "\n            ").concat(wordLimit ? "wordLimit: ".concat(JSON.stringify(wordLimit), ",") : '', "\n            ").concat(pageSize ? "pageSize: ".concat(JSON.stringify(pageSize), ",") : '', "\n            ").concat(imageUploader === false ? "imageUploader: false," : '', "\n            ").concat(highlighter === false ? "highlighter: false," : '', "\n            ").concat(texRenderer === false ? "texRenderer: false," : '', "\n            ").concat(search === false ? "search: false," : '', "\n            ").concat(typeof pageview !== 'undefined' ? "pageview: ".concat(JSON.stringify(pageview), ",") : '', "\n            ").concat(typeof comment !== 'undefined' ? "comment: ".concat(JSON.stringify(comment), ",") : '', "\n            ", "copyright: ".concat(JSON.stringify(copyright), ","), "\n        });");
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", "content", null, 1, {
        "id": "waline-thread"
      }), (0, _inferno.createVNode)(1, "link", null, null, 1, {
        "rel": "stylesheet",
        "href": cssUrl
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
 * Cacheable Waline comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Waline.Cacheable
 *     comment={{
 *         server_url: "https://path/to/waline/server",
 *         path: "window.location.pathname",
 *         lang: "zh-CN",
 *         locale: {placeholder: "", ...},
 *         emoji: "https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo",
 *         dark: "",
 *         meta: ["nick", "mail", "link"],
 *         required_meta: [],
 *         login: false,
 *         word_limit: 0,
 *         page_size: 10,
 *         image_uploader: true,
 *         highlighter: true,
 *         tex_renderer: false,
 *         search: true,
 *         pageview: false,
 *         comment: false,
 *         copyright: true,
 *     }}
 *     helper={{ cdn: function() {...} }} />
 */
Waline.Cacheable = cacheComponent(Waline, 'comment.waline', function (props) {
  var comment = props.comment,
    helper = props.helper,
    page = props.page,
    config = props.config;
  return {
    serverURL: comment.server_url,
    path: comment.path,
    lang: comment.lang || page.lang || page.language || config.language || 'zh-CN',
    locale: comment.locale,
    emoji: comment.emoji,
    dark: comment.dark,
    meta: comment.meta,
    requiredMeta: comment.required_meta,
    login: comment.login,
    wordLimit: comment.word_limit,
    pageSize: comment.page_size,
    imageUploader: comment.image_uploader,
    highlighter: comment.highlighter,
    texRenderer: comment.tex_renderer,
    search: comment.search,
    pageview: comment.pageview,
    comment: comment.comment,
    copyright: comment.copyright,
    jsUrl: helper.cdn('@waline/client', '2.6.3', 'dist/waline.js'),
    cssUrl: helper.cdn('@waline/client', '2.6.3', 'dist/waline.css')
  };
});
module.exports = Waline;