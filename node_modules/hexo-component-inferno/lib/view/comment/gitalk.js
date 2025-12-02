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
 * Gitalk comment JSX component.
 * @module view/comment/gitalk
 */
var crypto = require('crypto');
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Gitalk comment JSX component.
 *
 * @see https://github.com/gitalk/gitalk
 * @example
 * <Gitalk
 *     id="******",
 *     repo="******",
 *     owner="******",
 *     admin={["******"]},
 *     clientId="******",
 *     clientSecret="******",
 *     createIssueManually={false},
 *     distractionFreeMode={false},
 *     pagerDirection="last",
 *     perPage={10},
 *     proxy="******",
 *     flipMoveOptions={...},
 *     enableHotKey={true},
 *     language="zh-CN",
 *     jsUrl="/path/to/gitalk.js",
 *     cssUrl="/path/to/gitalk.css" />
 */
var Gitalk = /*#__PURE__*/function (_Component) {
  function Gitalk() {
    _classCallCheck(this, Gitalk);
    return _callSuper(this, Gitalk, arguments);
  }
  _inherits(Gitalk, _Component);
  return _createClass(Gitalk, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        id = _this$props.id,
        repo = _this$props.repo,
        owner = _this$props.owner,
        admin = _this$props.admin,
        clientId = _this$props.clientId,
        clientSecret = _this$props.clientSecret,
        _this$props$createIss = _this$props.createIssueManually,
        createIssueManually = _this$props$createIss === void 0 ? false : _this$props$createIss,
        _this$props$distracti = _this$props.distractionFreeMode,
        distractionFreeMode = _this$props$distracti === void 0 ? false : _this$props$distracti,
        _this$props$pagerDire = _this$props.pagerDirection,
        pagerDirection = _this$props$pagerDire === void 0 ? 'last' : _this$props$pagerDire,
        _this$props$perPage = _this$props.perPage,
        perPage = _this$props$perPage === void 0 ? 10 : _this$props$perPage,
        proxy = _this$props.proxy,
        flipMoveOptions = _this$props.flipMoveOptions,
        enableHotKey = _this$props.enableHotKey,
        language = _this$props.language,
        jsUrl = _this$props.jsUrl,
        cssUrl = _this$props.cssUrl;
      if (!id || !repo || !owner || !admin || !clientId || !clientSecret) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You forgot to set the "), (0, _inferno.createVNode)(1, "code", null, "owner", 16), (0, _inferno.createTextVNode)(", "), (0, _inferno.createVNode)(1, "code", null, "admin", 16), (0, _inferno.createTextVNode)(", "), (0, _inferno.createVNode)(1, "code", null, "repo", 16), (0, _inferno.createTextVNode)(","), (0, _inferno.createVNode)(1, "code", null, "client_id", 16), (0, _inferno.createTextVNode)(", or "), (0, _inferno.createVNode)(1, "code", null, "client_secret", 16), (0, _inferno.createTextVNode)(" for Gitalk. Please set it in"), (0, _inferno.createTextVNode)(' '), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 0);
      }
      var js = "var gitalk = new Gitalk({\n            id: ".concat(JSON.stringify(id), ",\n            repo: ").concat(JSON.stringify(repo), ",\n            owner: ").concat(JSON.stringify(owner), ",\n            clientID: ").concat(JSON.stringify(clientId), ",\n            clientSecret: ").concat(JSON.stringify(clientSecret), ",\n            admin: ").concat(JSON.stringify(admin), ",\n            createIssueManually: ").concat(!!createIssueManually, ",\n            distractionFreeMode: ").concat(!!distractionFreeMode, ",\n            perPage: ").concat(JSON.stringify(perPage), ",\n            pagerDirection: ").concat(JSON.stringify(pagerDirection), ",\n            ").concat(proxy ? "proxy: ".concat(JSON.stringify(proxy), ",") : '', "\n            ").concat(flipMoveOptions ? "flipMoveOptions: ".concat(JSON.stringify(flipMoveOptions), ",") : '', "\n            enableHotKey: ").concat(enableHotKey ? !!enableHotKey : true, ",\n            ").concat(language ? "language: ".concat(JSON.stringify(language), ",") : '', "\n        })\n        gitalk.render('comment-container')");
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", null, null, 1, {
        "id": "comment-container"
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
 * Cacheable Gitalk comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Gitalk.Cacheable
 *     comment={{
 *         repo: '******',
 *         owner: '******',
 *         admin: ['******'],
 *         client_id: '******',
 *         client_secret: '******',
 *         create_issue_manually: false,
 *         distraction_free_mode: false,
 *         pager_direction: 'last',
 *         per_page: 10,
 *         proxy: '******',
 *         flip_move_options: {...},
 *         enable_hotkey: true,
 *         language: 'zh-CN'
 *     }}
 *     page={{ path: '/path/to/page' }}
 *     helper={{ cdn: function() {...} }} />
 */
Gitalk.Cacheable = cacheComponent(Gitalk, 'comment.gitalk', function (props) {
  var helper = props.helper,
    comment = props.comment;

  // FIXME: config name change
  var id = crypto.createHash('md5').update(props.page.path).digest('hex');
  return {
    id: id,
    repo: comment.repo,
    owner: comment.owner,
    admin: comment.admin,
    clientId: comment.client_id,
    clientSecret: comment.client_secret,
    createIssueManually: comment.create_issue_manually,
    distractionFreeMode: comment.distraction_free_mode,
    pagerDirection: comment.pager_direction,
    perPage: comment.per_page,
    proxy: comment.proxy,
    flipMoveOptions: comment.flip_move_options,
    enableHotKey: comment.enable_hotkey,
    language: comment.language,
    cssUrl: helper.cdn('gitalk', '1.7.2', 'dist/gitalk.css'),
    jsUrl: helper.cdn('gitalk', '1.7.2', 'dist/gitalk.min.js')
  };
});
module.exports = Gitalk;