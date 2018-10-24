'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Audio = exports.AudioResource = exports.audioCache = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCache = require('react-cache');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioCache = exports.audioCache = (0, _reactCache.createCache)();
var AudioResource = exports.AudioResource = (0, _reactCache.createResource)(load, function (_ref) {
  var src = _ref.src;
  return src;
});

function load(_ref2) {
  var src = _ref2.src;

  var audio = document.createElement('audio');

  return new Promise(function (resolve, reject) {
    audio.oncanplay = resolve;
    audio.onerror = reject;
    audio.src = src;
  });
}

var Audio = exports.Audio = function Audio(props) {
  if (_utils.isBrowser) {
    AudioResource.read(audioCache, props);
  }

  return _react2.default.createElement('audio', props);
};