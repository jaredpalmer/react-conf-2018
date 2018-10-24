'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Img = exports.ImgResource = exports.imgCache = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCache = require('react-cache');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imgCache = exports.imgCache = (0, _reactCache.createCache)();
var ImgResource = exports.ImgResource = (0, _reactCache.createResource)(load, function (_ref) {
  var src = _ref.src;
  return src;
});

function load(_ref2) {
  var src = _ref2.src;

  var image = new Image();

  return new Promise(function (resolve, reject) {
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });
}

var Img = exports.Img = function Img(props) {
  if (_utils.isBrowser) {
    ImgResource.read(imgCache, props);
  }

  return _react2.default.createElement('img', props);
};