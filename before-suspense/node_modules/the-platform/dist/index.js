'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Audio = require('./Audio');

Object.keys(_Audio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Audio[key];
    }
  });
});

var _Img = require('./Img');

Object.keys(_Img).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Img[key];
    }
  });
});

var _Preload = require('./Preload');

Object.keys(_Preload).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Preload[key];
    }
  });
});

var _Script = require('./Script');

Object.keys(_Script).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Script[key];
    }
  });
});

var _Stylesheet = require('./Stylesheet');

Object.keys(_Stylesheet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Stylesheet[key];
    }
  });
});

var _Video = require('./Video');

Object.keys(_Video).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Video[key];
    }
  });
});