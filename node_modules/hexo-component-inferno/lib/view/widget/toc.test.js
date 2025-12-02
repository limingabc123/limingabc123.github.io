"use strict";

var _inferno = require("inferno");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Toc = require('./toc');
var _require = require('inferno-test-utils'),
  renderIntoContainer = _require.renderIntoContainer,
  scryRenderedDOMElementsWithClass = _require.scryRenderedDOMElementsWithClass;
function createTocAndGetLevels(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var widget = renderIntoContainer((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, Toc, _objectSpread({
    "content": content
  }, options))));
  return scryRenderedDOMElementsWithClass(widget, 'level-item').map(function (item) {
    return item.innerHTML;
  });
}
test('Correctly render headings', function () {
  var levels = createTocAndGetLevels("\n    <h1>Title 1</h1>\n    <h2>Title 1.1</h2>\n    <h3>Title 1.1.1</h3>\n    <h3>Title 1.1.2</h3>\n    <h2>Title 1.2</h2>\n    <h3>Title 1.2.1</h3>\n    <h3>Title 1.2.2</h3>\n    <h1>Title 2</h1>\n    <h2>Title 2.1</h2>\n    <h2>Title 2.2</h2>\n    <h3>Title 2.2.1</h3>\n    <h3>Title 2.2.2</h3>\n  ");
  expect(levels).toEqual(['1', 'Title 1', '1.1', 'Title 1.1', '1.1.1', 'Title 1.1.1', '1.1.2', 'Title 1.1.2', '1.2', 'Title 1.2', '1.2.1', 'Title 1.2.1', '1.2.2', 'Title 1.2.2', '2', 'Title 2', '2.1', 'Title 2.1', '2.2', 'Title 2.2', '2.2.1', 'Title 2.2.1', '2.2.2', 'Title 2.2.2']);
});
test('Correctly render disjunct levels of heading', function () {
  var levels = createTocAndGetLevels("\n    <h2>Title 1</h2>\n    <h2>Title 2</h2>\n    <h4>Title 2.1</h4>\n    <h4>Title 2.2</h4>\n    <h4>Title 2.3</h4>\n    <h2>Title 3</h2>\n  ");
  expect(levels).toEqual(['1', 'Title 1', '2', 'Title 2', '2.1', 'Title 2.1', '2.2', 'Title 2.2', '2.3', 'Title 2.3', '3', 'Title 3']);
});