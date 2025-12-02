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
 * A JSX component that renders Open Graph tags.
 * @module view/misc/open_graph
 *
 * @see https://hexo.io/docs/helpers#open-graph
 * @see https://github.com/hexojs/hexo/blob/4.2.0/lib/plugins/helper/open_graph.js
 */
var urlFn = require('url');
var moment = require('moment');
var _require = require('inferno'),
  Component = _require.Component;
var _require2 = require('hexo-util'),
  encodeURL = _require2.encodeURL,
  stripHTML = _require2.stripHTML,
  escapeHTML = _require2.escapeHTML;
var localeMap = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  hu: 'hu_HU',
  id: 'id_ID',
  it: 'it_IT',
  ja: 'ja_JP',
  ko: 'ko_KR',
  nl: 'nl_NL',
  ru: 'ru_RU',
  th: 'th_TH',
  tr: 'tr_TR',
  vi: 'vi_VN'
};
var localeRegex = new RegExp(Object.keys(localeMap).join('|'), 'i');

/**
 * A JSX component that renders Open Graph tags.
 *
 * @name OpenGraph
 * @see https://hexo.io/docs/helpers#open-graph
 * @see https://github.com/hexojs/hexo/blob/4.2.0/lib/plugins/helper/open_graph.js
 * @example
 * <OpenGraph
 *     type="blog"
 *     title="Page title"
 *     language="Page language"
 *     description="Page description"
 *     date="Page publish date"
 *     updated="Page update date"
 *     author="Page author"
 *     keywords="keyword1,keyword2,..."
 *     images={[ '/path/to/image.png' ]}
 *     url="/path/to/page"
 *     siteName="Site name"
 *     twitterId="Twitter ID"
 *     twitterCard="summary"
 *     twitterSite="Twitter Site"
 *     googlePlus="/path/to/google/plus"
 *     facebookAdmins="Facebook admin ID"
 *     facebookAppId="Facebook APP ID" />
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
        type = _this$props.type,
        title = _this$props.title,
        date = _this$props.date,
        updated = _this$props.updated,
        author = _this$props.author,
        url = _this$props.url,
        siteName = _this$props.siteName,
        twitterCard = _this$props.twitterCard,
        twitterSite = _this$props.twitterSite,
        googlePlus = _this$props.googlePlus,
        facebookAdmins = _this$props.facebookAdmins,
        facebookAppId = _this$props.facebookAppId;
      var _this$props2 = this.props,
        description = _this$props2.description,
        language = _this$props2.language,
        images = _this$props2.images,
        keywords = _this$props2.keywords,
        twitterId = _this$props2.twitterId;
      var htmlTags = [];
      if (description) {
        description = escapeHTML(stripHTML(description).substring(0, 200).trim()).replace(/\n/g, ' ');
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "name": "description",
          "content": description
        }));
      }
      htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "property": "og:type",
        "content": type || 'website'
      }));
      htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "property": "og:title",
        "content": title
      }));
      htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "property": "og:url",
        "content": encodeURL(url)
      }));
      htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "property": "og:site_name",
        "content": siteName
      }));
      if (description) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "og:description",
          "content": description
        }));
      }
      if (language) {
        if (language.length === 2) {
          language = language.replace(localeRegex, function (str) {
            return localeMap[str];
          });
          htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
            "property": "og:locale",
            "content": language
          }));
        } else if (language.length === 5) {
          var territory = language.slice(-2);
          var territoryRegex = new RegExp(territory.concat('$'));
          language = language.replace('-', '_').replace(territoryRegex, territory.toUpperCase());
          htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
            "property": "og:locale",
            "content": language
          }));
        }
      }
      if (!Array.isArray(images)) {
        images = [images];
      }
      images.map(function (path) {
        if (!urlFn.parse(path).host) {
          // resolve `path`'s absolute path relative to current page's url
          // `path` can be both absolute (starts with `/`) or relative.
          return urlFn.resolve(url, path);
        }
        return path;
      }).forEach(function (path) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "og:image",
          "content": path
        }));
      });
      if (date && (moment.isMoment(date) || moment.isDate(date)) && !isNaN(date.valueOf())) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "article:published_time",
          "content": date.toISOString()
        }));
      }
      if (updated && (moment.isMoment(updated) || moment.isDate(updated)) && !isNaN(updated.valueOf())) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "article:modified_time",
          "content": updated.toISOString()
        }));
      }
      if (author) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "article:author",
          "content": author
        }));
      }
      if (keywords) {
        if (typeof keywords === 'string') {
          keywords = [keywords];
        }
        keywords.map(function (tag) {
          return tag.name ? tag.name : tag;
        }).filter(Boolean).forEach(function (keyword) {
          htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
            "property": "article:tag",
            "content": keyword
          }));
        });
      }
      htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
        "property": "twitter:card",
        "content": twitterCard || 'summary'
      }));
      if (images.length) {
        var image = images[0];
        if (!urlFn.parse(image).host) {
          // resolve `path`'s absolute path relative to current page's url
          // `path` can be both absolute (starts with `/`) or relative.
          image = urlFn.resolve(url, image);
        }
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "twitter:image:src",
          "content": image
        }));
      }
      if (twitterId) {
        if (twitterId[0] !== '@') {
          twitterId = "@".concat(twitterId);
        }
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "twitter:creator",
          "content": twitterId
        }));
      }
      if (twitterSite) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "twitter:site",
          "content": twitterSite
        }));
      }
      if (googlePlus) {
        htmlTags.push((0, _inferno.createVNode)(1, "link", null, null, 1, {
          "rel": "publisher",
          "href": googlePlus
        }));
      }
      if (facebookAdmins) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "fb:admins",
          "content": facebookAdmins
        }));
      }
      if (facebookAppId) {
        htmlTags.push((0, _inferno.createVNode)(1, "meta", null, null, 1, {
          "property": "fb:app_id",
          "content": facebookAppId
        }));
      }
      return (0, _inferno.createFragment)(htmlTags, 0);
    }
  }]);
}(Component);