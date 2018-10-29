import { addEventListener } from 'consolidated-events';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Attempts to parse the offset provided as a prop as a percentage. For
 * instance, if the component has been provided with the string "20%" as
 * a value of one of the offset props. If the value matches, then it returns
 * a numeric version of the prop. For instance, "20%" would become `0.2`.
 * If `str` isn't a percentage, then `undefined` will be returned.
 *
 * @param {string} str The value of an offset prop to be converted to a
 *   number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was not a percentage.
 */
function parseOffsetAsPercentage(str) {
  if (str.slice(-1) === '%') {
    return parseFloat(str.slice(0, -1)) / 100;
  }
}

/**
 * Attempts to parse the offset provided as a prop as a pixel value. If
 * parsing fails, then `undefined` is returned. Three examples of values that
 * will be successfully parsed are:
 * `20`
 * "20px"
 * "20"
 *
 * @param {string|number} str A string of the form "{number}" or "{number}px",
 *   or just a number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was neither a number nor string ending in "px".
 */
function parseOffsetAsPixels(str) {
  if (!isNaN(parseFloat(str)) && isFinite(str)) {
    return parseFloat(str);
  } else if (str.slice(-2) === 'px') {
    return parseFloat(str.slice(0, -2));
  }
}

/**
 * @param {string|number} offset
 * @param {number} contextHeight
 * @return {number} A number representing `offset` converted into pixels.
 */
function computeOffsetPixels(offset, contextHeight) {
  var pixelOffset = parseOffsetAsPixels(offset);

  if (typeof pixelOffset === 'number') {
    return pixelOffset;
  }

  var percentOffset = parseOffsetAsPercentage(offset);
  if (typeof percentOffset === 'number') {
    return percentOffset * contextHeight;
  }
}

var constants = {
  above: 'above',
  inside: 'inside',
  below: 'below',
  invisible: 'invisible'
};

function debugLog() {
  if (process.env.NODE_ENV !== 'production') {
    console.log(arguments); // eslint-disable-line no-console
  }
}

var errorMessage = '<Waypoint> expected to receive a single React element child.\n\n' + 'See https://goo.gl/LrBNgw for more info.';

/**
 * Raise an error if more that one child was provided to "children"
 *
 * @param {?React.element} children
 * @return {undefined}
 */
function ensureChildrenIsValid(children) {
  if (children) {
    try {
      React.Children.only(children);
    } catch (e) {
      throw new Error(errorMessage);
    }
  }
}

/**
 * When an element's type is a string, it represents a DOM node with that tag name
 * https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements
 *
 * @param {React.element} Component
 * @return {bool} Whether the component is a DOM Element
 */
function isDOMElement(Component) {
  return typeof Component.type === 'string';
}

var errorMessage$1 = '<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a ' + 'DOM element (e.g. <div>) nor does it use the innerRef prop.\n\n' + 'See https://goo.gl/LrBNgw for more info.';

/**
 * Raise an error if "children" is not a DOM Element and there is no ref provided to Waypoint
 *
 * @param {?React.element} children
 * @param {?HTMLElement} ref
 * @return {undefined}
 */
function ensureRefIsProvidedByChild(children, ref) {
  if (children && !isDOMElement(children) && !ref) {
    throw new Error(errorMessage$1);
  }
}

/**
 * @param {object} bounds An object with bounds data for the waypoint and
 *   scrollable parent
 * @return {string} The current position of the waypoint in relation to the
 *   visible portion of the scrollable parent. One of `constants.above`,
 *   `constants.below`, or `constants.inside`.
 */
function getCurrentPosition(bounds) {
  if (bounds.viewportBottom - bounds.viewportTop === 0) {
    return constants.invisible;
  }

  // top is within the viewport
  if (bounds.viewportTop <= bounds.waypointTop && bounds.waypointTop <= bounds.viewportBottom) {
    return constants.inside;
  }

  // bottom is within the viewport
  if (bounds.viewportTop <= bounds.waypointBottom && bounds.waypointBottom <= bounds.viewportBottom) {
    return constants.inside;
  }

  // top is above the viewport and bottom is below the viewport
  if (bounds.waypointTop <= bounds.viewportTop && bounds.viewportBottom <= bounds.waypointBottom) {
    return constants.inside;
  }

  if (bounds.viewportBottom < bounds.waypointTop) {
    return constants.below;
  }

  if (bounds.waypointTop < bounds.viewportTop) {
    return constants.above;
  }

  return constants.invisible;
}

var timeout = void 0;
var timeoutQueue = [];

function onNextTick(cb) {
  timeoutQueue.push(cb);

  if (!timeout) {
    timeout = setTimeout(function () {
      timeout = null;

      // Drain the timeoutQueue
      var item = void 0;
      // eslint-disable-next-line no-cond-assign
      while (item = timeoutQueue.shift()) {
        item();
      }
    }, 0);
  }

  var isSubscribed = true;

  return function () {
    function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      var index = timeoutQueue.indexOf(cb);
      if (index === -1) {
        return;
      }

      timeoutQueue.splice(index, 1);

      if (!timeoutQueue.length && timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    }

    return unsubscribe;
  }();
}

function resolveScrollableAncestorProp(scrollableAncestor) {
  // When Waypoint is rendered on the server, `window` is not available.
  // To make Waypoint easier to work with, we allow this to be specified in
  // string form and safely convert to `window` here.
  if (scrollableAncestor === 'window') {
    return global.window;
  }

  return scrollableAncestor;
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
  topOffset: '0px',
  bottomOffset: '0px',
  horizontal: false,
  onEnter: function () {
    function onEnter() {}

    return onEnter;
  }(),
  onLeave: function () {
    function onLeave() {}

    return onLeave;
  }(),
  onPositionChange: function () {
    function onPositionChange() {}

    return onPositionChange;
  }(),

  fireOnRapidScroll: true
};

/**
 * Calls a function when you scroll to the element.
 */

var Waypoint = function (_React$Component) {
  _inherits(Waypoint, _React$Component);

  function Waypoint(props) {
    _classCallCheck(this, Waypoint);

    var _this = _possibleConstructorReturn(this, (Waypoint.__proto__ || Object.getPrototypeOf(Waypoint)).call(this, props));

    _this.refElement = function (e) {
      return _this._ref = e;
    };
    return _this;
  }

  _createClass(Waypoint, [{
    key: 'componentWillMount',
    value: function () {
      function componentWillMount() {
        ensureChildrenIsValid(this.props.children);
      }

      return componentWillMount;
    }()
  }, {
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        var _this2 = this;

        if (!Waypoint.getWindow()) {
          return;
        }

        // this._ref may occasionally not be set at this time. To help ensure that
        // this works smoothly, we want to delay the initial execution until the
        // next tick.
        this.cancelInitialTimeout = onNextTick(function () {
          // Berofe doing anything, we want to check that this._ref is avaliable in Waypoint
          ensureRefIsProvidedByChild(_this2.props.children, _this2._ref);

          _this2._handleScroll = _this2._handleScroll.bind(_this2);
          _this2.scrollableAncestor = _this2._findScrollableAncestor();

          if (process.env.NODE_ENV !== 'production' && _this2.props.debug) {
            debugLog('scrollableAncestor', _this2.scrollableAncestor);
          }

          _this2.scrollEventListenerUnsubscribe = addEventListener(_this2.scrollableAncestor, 'scroll', _this2._handleScroll, { passive: true });

          _this2.resizeEventListenerUnsubscribe = addEventListener(window, 'resize', _this2._handleScroll, { passive: true });

          _this2._handleScroll(null);
        });
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(newProps) {
        ensureChildrenIsValid(newProps.children);
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate() {
        if (!Waypoint.getWindow()) {
          return;
        }

        if (!this.scrollableAncestor) {
          // The Waypoint has not yet initialized.
          return;
        }

        // The element may have moved.
        this._handleScroll(null);
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (!Waypoint.getWindow()) {
          return;
        }

        if (this.scrollEventListenerUnsubscribe) {
          this.scrollEventListenerUnsubscribe();
        }
        if (this.resizeEventListenerUnsubscribe) {
          this.resizeEventListenerUnsubscribe();
        }

        if (this.cancelInitialTimeout) {
          this.cancelInitialTimeout();
        }
      }

      return componentWillUnmount;
    }()

    /**
     * Traverses up the DOM to find an ancestor container which has an overflow
     * style that allows for scrolling.
     *
     * @return {Object} the closest ancestor element with an overflow style that
     *   allows for scrolling. If none is found, the `window` object is returned
     *   as a fallback.
     */

  }, {
    key: '_findScrollableAncestor',
    value: function () {
      function _findScrollableAncestor() {
        var _props = this.props,
            horizontal = _props.horizontal,
            scrollableAncestor = _props.scrollableAncestor;


        if (scrollableAncestor) {
          return resolveScrollableAncestorProp(scrollableAncestor);
        }

        var node = this._ref;

        while (node.parentNode) {
          node = node.parentNode;

          if (node === document.body) {
            // We've reached all the way to the root node.
            return window;
          }

          var style = window.getComputedStyle(node);
          var overflowDirec = horizontal ? style.getPropertyValue('overflow-x') : style.getPropertyValue('overflow-y');
          var overflow = overflowDirec || style.getPropertyValue('overflow');

          if (overflow === 'auto' || overflow === 'scroll') {
            return node;
          }
        }

        // A scrollable ancestor element was not found, which means that we need to
        // do stuff on window.
        return window;
      }

      return _findScrollableAncestor;
    }()

    /**
     * @param {Object} event the native scroll event coming from the scrollable
     *   ancestor, or resize event coming from the window. Will be undefined if
     *   called by a React lifecyle method
     */

  }, {
    key: '_handleScroll',
    value: function () {
      function _handleScroll(event) {
        if (!this._ref) {
          // There's a chance we end up here after the component has been unmounted.
          return;
        }

        var bounds = this._getBounds();
        var currentPosition = getCurrentPosition(bounds);
        var previousPosition = this._previousPosition;

        if (process.env.NODE_ENV !== 'production' && this.props.debug) {
          debugLog('currentPosition', currentPosition);
          debugLog('previousPosition', previousPosition);
        }

        // Save previous position as early as possible to prevent cycles
        this._previousPosition = currentPosition;

        if (previousPosition === currentPosition) {
          // No change since last trigger
          return;
        }

        var callbackArg = {
          currentPosition: currentPosition,
          previousPosition: previousPosition,
          event: event,
          waypointTop: bounds.waypointTop,
          waypointBottom: bounds.waypointBottom,
          viewportTop: bounds.viewportTop,
          viewportBottom: bounds.viewportBottom
        };
        this.props.onPositionChange.call(this, callbackArg);

        if (currentPosition === constants.inside) {
          this.props.onEnter.call(this, callbackArg);
        } else if (previousPosition === constants.inside) {
          this.props.onLeave.call(this, callbackArg);
        }

        var isRapidScrollDown = previousPosition === constants.below && currentPosition === constants.above;
        var isRapidScrollUp = previousPosition === constants.above && currentPosition === constants.below;

        if (this.props.fireOnRapidScroll && (isRapidScrollDown || isRapidScrollUp)) {
          // If the scroll event isn't fired often enough to occur while the
          // waypoint was visible, we trigger both callbacks anyway.
          this.props.onEnter.call(this, {
            currentPosition: constants.inside,
            previousPosition: previousPosition,
            event: event,
            waypointTop: bounds.waypointTop,
            waypointBottom: bounds.waypointBottom,
            viewportTop: bounds.viewportTop,
            viewportBottom: bounds.viewportBottom
          });
          this.props.onLeave.call(this, {
            currentPosition: currentPosition,
            previousPosition: constants.inside,
            event: event,
            waypointTop: bounds.waypointTop,
            waypointBottom: bounds.waypointBottom,
            viewportTop: bounds.viewportTop,
            viewportBottom: bounds.viewportBottom
          });
        }
      }

      return _handleScroll;
    }()
  }, {
    key: '_getBounds',
    value: function () {
      function _getBounds() {
        var horizontal = this.props.horizontal;

        var _ref$getBoundingClien = this._ref.getBoundingClientRect(),
            left = _ref$getBoundingClien.left,
            top = _ref$getBoundingClien.top,
            right = _ref$getBoundingClien.right,
            bottom = _ref$getBoundingClien.bottom;

        var waypointTop = horizontal ? left : top;
        var waypointBottom = horizontal ? right : bottom;

        var contextHeight = void 0;
        var contextScrollTop = void 0;
        if (this.scrollableAncestor === window) {
          contextHeight = horizontal ? window.innerWidth : window.innerHeight;
          contextScrollTop = 0;
        } else {
          contextHeight = horizontal ? this.scrollableAncestor.offsetWidth : this.scrollableAncestor.offsetHeight;
          contextScrollTop = horizontal ? this.scrollableAncestor.getBoundingClientRect().left : this.scrollableAncestor.getBoundingClientRect().top;
        }

        if (process.env.NODE_ENV !== 'production' && this.props.debug) {
          debugLog('waypoint top', waypointTop);
          debugLog('waypoint bottom', waypointBottom);
          debugLog('scrollableAncestor height', contextHeight);
          debugLog('scrollableAncestor scrollTop', contextScrollTop);
        }

        var _props2 = this.props,
            bottomOffset = _props2.bottomOffset,
            topOffset = _props2.topOffset;

        var topOffsetPx = computeOffsetPixels(topOffset, contextHeight);
        var bottomOffsetPx = computeOffsetPixels(bottomOffset, contextHeight);
        var contextBottom = contextScrollTop + contextHeight;

        return {
          waypointTop: waypointTop,
          waypointBottom: waypointBottom,
          viewportTop: contextScrollTop + topOffsetPx,
          viewportBottom: contextBottom - bottomOffsetPx
        };
      }

      return _getBounds;
    }()

    /**
     * @return {Object}
     */

  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this3 = this;

        var children = this.props.children;


        if (!children) {
          // We need an element that we can locate in the DOM to determine where it is
          // rendered relative to the top of its context.
          return React.createElement('span', { ref: this.refElement, style: { fontSize: 0 } });
        }

        if (isDOMElement(children)) {
          var ref = function () {
            function ref(node) {
              _this3.refElement(node);
              if (children.ref) {
                children.ref(node);
              }
            }

            return ref;
          }();

          return React.cloneElement(children, { ref: ref });
        }

        return React.cloneElement(children, { innerRef: this.refElement });
      }

      return render;
    }()
  }]);

  return Waypoint;
}(React.Component);

Waypoint.propTypes = {
  children: PropTypes.node,
  debug: PropTypes.bool,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  onPositionChange: PropTypes.func,
  fireOnRapidScroll: PropTypes.bool,
  scrollableAncestor: PropTypes.any,
  horizontal: PropTypes.bool,

  // `topOffset` can either be a number, in which case its a distance from the
  // top of the container in pixels, or a string value. Valid string values are
  // of the form "20px", which is parsed as pixels, or "20%", which is parsed
  // as a percentage of the height of the containing element.
  // For instance, if you pass "-20%", and the containing element is 100px tall,
  // then the waypoint will be triggered when it has been scrolled 20px beyond
  // the top of the containing element.
  topOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // `bottomOffset` is like `topOffset`, but for the bottom of the container.
  bottomOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Waypoint.above = constants.above;
Waypoint.below = constants.below;
Waypoint.inside = constants.inside;
Waypoint.invisible = constants.invisible;
Waypoint.getWindow = function () {
  if (typeof window !== 'undefined') {
    return window;
  }
};
Waypoint.defaultProps = defaultProps;
Waypoint.displayName = 'Waypoint';

export default Waypoint;
