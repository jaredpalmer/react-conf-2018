'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stylesheet = exports.StylesheetResource = exports.stylesheetCache = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCache = require('react-cache');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylesheetCache = exports.stylesheetCache = (0, _reactCache.createCache)();
var StylesheetResource = exports.StylesheetResource = (0, _reactCache.createResource)(load, function (_ref) {
  var href = _ref.href,
      media = _ref.media;
  return href + '.' + media;
});

function load(_ref2) {
  var href = _ref2.href,
      _ref2$media = _ref2.media,
      media = _ref2$media === undefined ? 'all' : _ref2$media;

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = media;

  return new Promise(function (resolve, reject) {
    link.onload = resolve;
    link.onerror = reject;
    document.body.appendChild(link);
  });
}

var Stylesheet = exports.Stylesheet = function Stylesheet(props) {
  if (_utils.isBrowser) {
    StylesheetResource.read(stylesheetCache, props);
  }

  return _react2.default.createElement('link', props);
};