'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preload = exports.PreloadResource = exports.preloadCache = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCache = require('react-cache');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var preloadCache = exports.preloadCache = (0, _reactCache.createCache)();
var PreloadResource = exports.PreloadResource = (0, _reactCache.createResource)(load, function (_ref) {
  var href = _ref.href,
      as = _ref.as;
  return href + '.' + as;
});

function load(_ref2) {
  var href = _ref2.href,
      as = _ref2.as,
      _ref2$media = _ref2.media,
      media = _ref2$media === undefined ? 'all' : _ref2$media;

  var link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.media = media;
  link.href = href;

  return new Promise(function (resolve, reject) {
    link.onload = resolve;
    link.onerror = reject;
    document.body.appendChild(link);
  });
}

var Preload = function Preload(_ref3) {
  var children = _ref3.children,
      rest = _objectWithoutProperties(_ref3, ['children']);

  if (_utils.isBrowser) {
    PreloadResource.read(preloadCache, rest);
  }

  if (typeof children === 'function') {
    return children();
  }

  return children;
};
exports.Preload = Preload;