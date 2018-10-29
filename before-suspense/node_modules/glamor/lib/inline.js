'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inline;

var _index = require('./index');

function toTag(ids) {
  var idhash = ids.reduce(function (o, x) {
    return o[x + ''] = true, o;
  }, {});
  var rules = _index.styleSheet.rules().filter(function (x) {
    var regex = /css\-([a-zA-Z0-9\_\-]+)/gm;
    var match = regex.exec(x.cssText);
    if (match && idhash[match[1] + '']) {
      return true;
    }
    return false;
  });
  return '<style>' + rules.map(function (x) {
    return x.cssText;
  }).join('') + '</style>';
}

function inline(html) {
  var regex = /\<|css\-([a-zA-Z0-9]+)/gm;

  var match = void 0,
      lastBackIndex = 0,
      idBuffer = [],
      result = [],
      insed = {};

  var plain = _index.styleSheet.rules().filter(function (x) {
    return !/css\-([a-zA-Z0-9\_\-]+)/gm.exec(x.cssText);
  });
  plain.length > 0 && result.push('<style>' + plain.map(function (x) {
    return x.cssText;
  }).join('') + '</style>');

  while ((match = regex.exec(html)) !== null) {
    if (match[0] === '<') {
      idBuffer = idBuffer.filter(function (x) {
        return !insed[x];
      });
      idBuffer.length > 0 && result.push(toTag(idBuffer));
      result.push(html.substring(lastBackIndex, match.index));
      lastBackIndex = match.index;
      idBuffer.forEach(function (x) {
        return insed[x] = true;
      });
      idBuffer = [];
    } else {
      idBuffer.push(match[1]);
    }
  }
  result.push(html.substring(lastBackIndex, html.length));
  return result.join('');
}