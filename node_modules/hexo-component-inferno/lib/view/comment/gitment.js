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
 * Gitment comment JSX component.
 * @module view/comment/gitment
 * @deprecated
 */
var crypto = require('crypto');
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('../../util/cache'),
  cacheComponent = _require2.cacheComponent;

/**
 * Gitment comment JSX component.
 *
 * @deprecated
 * @see https://github.com/imsun/gitment
 * @example
 * <Gitment
 *     id="******",
 *     repo="******",
 *     owner="******",
 *     clientId="******",
 *     clientSecret="******",
 *     perPage={10},
 *     maxCommentHeight={250} />
 */
var Gitment = /*#__PURE__*/function (_Component) {
  function Gitment() {
    _classCallCheck(this, Gitment);
    return _callSuper(this, Gitment, arguments);
  }
  _inherits(Gitment, _Component);
  return _createClass(Gitment, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        id = _this$props.id,
        repo = _this$props.repo,
        owner = _this$props.owner,
        clientId = _this$props.clientId,
        clientSecret = _this$props.clientSecret,
        _this$props$perPage = _this$props.perPage,
        perPage = _this$props$perPage === void 0 ? 20 : _this$props$perPage,
        _this$props$maxCommen = _this$props.maxCommentHeight,
        maxCommentHeight = _this$props$maxCommen === void 0 ? 250 : _this$props$maxCommen;
      if (!id || !repo || !owner || !clientId || !clientSecret) {
        return (0, _inferno.createVNode)(1, "div", "notification is-danger", [(0, _inferno.createTextVNode)("You forgot to set the "), (0, _inferno.createVNode)(1, "code", null, "owner", 16), (0, _inferno.createTextVNode)(", "), (0, _inferno.createVNode)(1, "code", null, "repo", 16), (0, _inferno.createTextVNode)(", "), (0, _inferno.createVNode)(1, "code", null, "clientId", 16), (0, _inferno.createTextVNode)(", or"), (0, _inferno.createTextVNode)(' '), (0, _inferno.createVNode)(1, "code", null, "clientSecret", 16), (0, _inferno.createTextVNode)(" for Gitment. Please set it in "), (0, _inferno.createVNode)(1, "code", null, "_config.yml", 16), (0, _inferno.createTextVNode)(".")], 0);
      }
      var js = "var gitment = new Gitment({\n            id: '".concat(id, "',\n            repo: '").concat(repo, "',\n            owner: '").concat(owner, "',\n            oauth: {\n                client_id: '").concat(clientId, "',\n                client_secret: '").concat(clientSecret, "',\n            },\n            perPage: ").concat(perPage, ",\n            maxCommentHeight: ").concat(maxCommentHeight, "\n        })\n        gitment.render('comment-container')");
      return (0, _inferno.createFragment)([(0, _inferno.createVNode)(1, "div", null, null, 1, {
        "id": "comment-container"
      }), (0, _inferno.createVNode)(1, "link", null, null, 1, {
        "rel": "stylesheet",
        "href": "https://imsun.github.io/gitment/style/default.css"
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "src": "https://imsun.github.io/gitment/dist/gitment.browser.js"
      }), (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "dangerouslySetInnerHTML": {
          __html: js
        }
      })], 4);
    }
  }]);
}(Component);
/**
 * Cacheable Gitment comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @deprecated
 * @see module:util/cache.cacheComponent
 * @example
 * <Gitment.Cacheable
 *     comment={{
 *         repo: '******',
 *         owner: '******',
 *         client_id: '******',
 *         client_secret: '******',
 *         per_page: 10,
 *         max_comment_height: 250
 *     }}
 *     page={{ path: '/path/to/page' }} />
 */
Gitment.Cacheable = cacheComponent(Gitment, 'comment.gitment', function (props) {
  var comment = props.comment;
  var id = crypto.createHash('md5').update(props.page.path).digest('hex');
  return {
    id: id,
    repo: comment.repo,
    owner: comment.owner,
    clientId: comment.client_id,
    clientSecret: comment.client_secret,
    perPage: comment.per_page,
    maxCommentHeight: comment.max_comment_height
  };
});
module.exports = Gitment;