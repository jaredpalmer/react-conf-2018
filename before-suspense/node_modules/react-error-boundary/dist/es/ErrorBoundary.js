import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ErrorBoundaryFallbackComponent from './ErrorBoundaryFallbackComponent';

var babelPluginFlowReactPropTypes_proptype_ComponentType = require('react').babelPluginFlowReactPropTypes_proptype_ComponentType || require('prop-types').any;

var ErrorBoundary = function (_Component) {
  _inherits(ErrorBoundary, _Component);

  function ErrorBoundary() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ErrorBoundary);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ErrorBoundary.__proto__ || _Object$getPrototypeOf(ErrorBoundary)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      error: null,
      info: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ErrorBoundary, [{
    key: 'componentDidCatch',
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;


      if (typeof onError === 'function') {
        try {
          onError.call(this, error, info ? info.componentStack : '');
        } catch (ignoredError) {}
      }

      this.setState({ error: error, info: info });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          FallbackComponent = _props.FallbackComponent;
      var _state = this.state,
          error = _state.error,
          info = _state.info;


      if (error !== null) {
        return React.createElement(FallbackComponent, {
          componentStack: info ? info.componentStack : '',
          error: error
        });
      }

      return children;
    }
  }]);

  return ErrorBoundary;
}(Component);

ErrorBoundary.defaultProps = {
  FallbackComponent: ErrorBoundaryFallbackComponent
};
ErrorBoundary.propTypes = {
  error: typeof Error === 'function' ? require('prop-types').instanceOf(Error) : require('prop-types').any,
  info: require('prop-types').shape({
    componentStack: require('prop-types').string.isRequired
  })
};


export var withErrorBoundary = function withErrorBoundary(Component, FallbackComponent, onError) {
  return function (props) {
    return React.createElement(
      ErrorBoundary,
      { FallbackComponent: FallbackComponent, onError: onError },
      React.createElement(Component, props)
    );
  };
};

withErrorBoundary.propTypes = babelPluginFlowReactPropTypes_proptype_ComponentType === require('prop-types').any ? {} : babelPluginFlowReactPropTypes_proptype_ComponentType;
export default ErrorBoundary;