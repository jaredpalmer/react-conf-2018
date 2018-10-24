'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Video = exports.VideoResource = exports.videoCache = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCache = require('react-cache');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var videoCache = exports.videoCache = (0, _reactCache.createCache)();
var VideoResource = exports.VideoResource = (0, _reactCache.createResource)(load, function (_ref) {
  var src = _ref.src;
  return src;
});

function load(_ref2) {
  var src = _ref2.src;

  var video = document.createElement('video');

  return new Promise(function (resolve, reject) {
    video.oncanplay = resolve;
    video.onerror = reject;
    video.src = src;
  });
}

var Video = exports.Video = function Video(props) {
  if (_utils.isBrowser) {
    VideoResource.read(videoCache, props);
  }

  return _react2.default.createElement('video', props);
};