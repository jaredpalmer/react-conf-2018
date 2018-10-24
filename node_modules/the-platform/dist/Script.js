'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Script = exports.ScriptResource = exports.scriptCache = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCache = require('react-cache');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var scriptCache = exports.scriptCache = (0, _reactCache.createCache)();
var ScriptResource = exports.ScriptResource = (0, _reactCache.createResource)(load, function (_ref) {
  var src = _ref.src;
  return src;
});

function load(_ref2) {
  var src = _ref2.src;

  var script = document.createElement('script');
  script.src = src;

  return new Promise(function (resolve, reject) {
    script.onload = resolve;
    script.onerror = reject;
    // @todo decide if this is sensible.
    // script.async = true
    document.body.appendChild(script);
  });
}

var Script = function Script(_ref3) {
  var children = _ref3.children,
      rest = _objectWithoutProperties(_ref3, ['children']);

  if (_utils.isBrowser) {
    ScriptResource.read(scriptCache, rest);
  }

  if (typeof children === 'function') {
    return children();
  }

  return children;
};
exports.Script = Script;