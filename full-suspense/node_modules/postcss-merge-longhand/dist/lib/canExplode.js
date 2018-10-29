'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isCustomProp = require('./isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isInherit = node => ~node.value.indexOf('inherit');
const isInitial = node => ~node.value.indexOf('initial');

exports.default = (prop, includeCustomProps = true) => {
    if (includeCustomProps && (0, _isCustomProp2.default)(prop)) {
        return false;
    }

    return !isInherit(prop) && !isInitial(prop);
};

module.exports = exports['default'];