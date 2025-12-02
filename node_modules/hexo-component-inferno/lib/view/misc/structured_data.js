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
 * A JSX component that renders simple Google structured data.
 * @module view/misc/structured_data
 */
var urlFn = require('url');
var moment = require('moment');
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('hexo-util'),
  stripHTML = _require2.stripHTML,
  escapeHTML = _require2.escapeHTML;

/**
 * A JSX component that renders simple Google structured data.
 *
 * @name StructuredData
 * @example
 * <StructuredData
 *     title="Page title"
 *     url="/page/url"
 *     author="Page author name"
 *     publisher="Page publisher name"
 *     publisherLogo="/path/to/logo"
 *     description="Page description"
 *     images={[ '/path/to/image' ]}
 *     date="Page publish date"
 *     updated="Page update date" />
 */
module.exports = /*#__PURE__*/function (_Component) {
  function _class() {
    _classCallCheck(this, _class);
    return _callSuper(this, _class, arguments);
  }
  _inherits(_class, _Component);
  return _createClass(_class, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        url = _this$props.url,
        author = _this$props.author,
        publisher = _this$props.publisher;
      var _this$props2 = this.props,
        description = _this$props2.description,
        images = _this$props2.images,
        date = _this$props2.date,
        updated = _this$props2.updated,
        publisherLogo = _this$props2.publisherLogo;
      if (description) {
        description = escapeHTML(stripHTML(description).substring(0, 200).trim()).replace(/\n/g, ' ');
      }
      if (!Array.isArray(images)) {
        images = [images];
      }
      images = images.map(function (path) {
        if (!urlFn.parse(path).host) {
          // resolve `path`'s absolute path relative to current page's url
          // `path` can be both absolute (starts with `/`) or relative.
          return urlFn.resolve(url, path);
        }
        return path;
      }).filter(function (url) {
        return url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif') || url.endsWith('.webp');
      });
      if (typeof publisherLogo === 'string' && !urlFn.parse(publisherLogo).host) {
        publisherLogo = urlFn.resolve(url, publisherLogo);
      }
      if (date && (moment.isMoment(date) || moment.isDate(date)) && !isNaN(date.valueOf())) {
        date = date.toISOString();
      }
      if (updated && (moment.isMoment(updated) || moment.isDate(updated)) && !isNaN(updated.valueOf())) {
        updated = updated.toISOString();
      }
      var data = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        },
        headline: title,
        image: images,
        datePublished: date,
        dateModified: updated,
        author: {
          '@type': 'Person',
          name: author
        },
        publisher: {
          '@type': 'Organization',
          name: publisher,
          logo: {
            '@type': 'ImageObject',
            url: publisherLogo
          }
        },
        description: description
      };
      return (0, _inferno.createVNode)(1, "script", null, null, 1, {
        "type": "application/ld+json",
        "dangerouslySetInnerHTML": {
          __html: JSON.stringify(data)
        }
      });
    }
  }]);
}(Component);