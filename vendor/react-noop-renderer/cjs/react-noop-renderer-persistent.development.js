/** @license React v16.6.0
 * react-noop-renderer-persistent.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const regeneratorRuntime = require("regenerator-runtime");

if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var ReactFiberPersistentReconciler = require('react-reconciler/persistent');
var _assign = require('object-assign');
var expect = require('expect');

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;

function createPortal(children, containerInfo,
// TODO: figure out the API for cross-renderer implementation.
implementation) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : '' + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}

var NO_CONTEXT = {};
var UPDATE_SIGNAL = {};
{
  Object.freeze(NO_CONTEXT);
  Object.freeze(UPDATE_SIGNAL);
}

function createReactNoop(reconciler, useMutation) {
  var _marked = /*#__PURE__*/regeneratorRuntime.mark(flushUnitsOfWork);

  var scheduledCallback = null;
  var scheduledCallbackTimeout = -1;
  var instanceCounter = 0;
  var hostDiffCounter = 0;
  var hostUpdateCounter = 0;
  var hostCloneCounter = 0;

  function appendChildToContainerOrInstance(parentInstance, child) {
    var index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  }

  function appendChildToContainer(parentInstance, child) {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('appendChildToContainer() first argument is not a container.');
    }
    appendChildToContainerOrInstance(parentInstance, child);
  }

  function appendChild(parentInstance, child) {
    if (typeof parentInstance.rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('appendChild() first argument is not an instance.');
    }
    appendChildToContainerOrInstance(parentInstance, child);
  }

  function insertInContainerOrInstanceBefore(parentInstance, child, beforeChild) {
    var index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    var beforeIndex = parentInstance.children.indexOf(beforeChild);
    if (beforeIndex === -1) {
      throw new Error('This child does not exist.');
    }
    parentInstance.children.splice(beforeIndex, 0, child);
  }

  function insertInContainerBefore(parentInstance, child, beforeChild) {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('insertInContainerBefore() first argument is not a container.');
    }
    insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
  }

  function insertBefore(parentInstance, child, beforeChild) {
    if (typeof parentInstance.rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('insertBefore() first argument is not an instance.');
    }
    insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
  }

  function removeChildFromContainerOrInstance(parentInstance, child) {
    var index = parentInstance.children.indexOf(child);
    if (index === -1) {
      throw new Error('This child does not exist.');
    }
    parentInstance.children.splice(index, 1);
  }

  function removeChildFromContainer(parentInstance, child) {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('removeChildFromContainer() first argument is not a container.');
    }
    removeChildFromContainerOrInstance(parentInstance, child);
  }

  function removeChild(parentInstance, child) {
    if (typeof parentInstance.rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('removeChild() first argument is not an instance.');
    }
    removeChildFromContainerOrInstance(parentInstance, child);
  }

  function cloneInstance(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle, keepChildren, recyclableInstance) {
    var clone = {
      id: instance.id,
      type: type,
      children: keepChildren ? instance.children : [],
      text: shouldSetTextContent(type, newProps) ? newProps.children + '' : null,
      prop: newProps.prop,
      hidden: newProps.hidden === true
    };
    Object.defineProperty(clone, 'id', {
      value: clone.id,
      enumerable: false
    });
    Object.defineProperty(clone, 'text', {
      value: clone.text,
      enumerable: false
    });
    hostCloneCounter++;
    return clone;
  }

  function shouldSetTextContent(type, props) {
    if (type === 'errorInBeginPhase') {
      throw new Error('Error in host config.');
    }
    return typeof props.children === 'string' || typeof props.children === 'number';
  }

  var elapsedTimeInMs = 0;

  var sharedHostConfig = {
    getRootHostContext: function () {
      return NO_CONTEXT;
    },
    getChildHostContext: function () {
      return NO_CONTEXT;
    },
    getPublicInstance: function (instance) {
      return instance;
    },
    createInstance: function (type, props) {
      if (type === 'errorInCompletePhase') {
        throw new Error('Error in host config.');
      }
      var inst = {
        id: instanceCounter++,
        type: type,
        children: [],
        text: shouldSetTextContent(type, props) ? props.children + '' : null,
        prop: props.prop,
        hidden: props.hidden === true
      };
      // Hide from unit tests
      Object.defineProperty(inst, 'id', { value: inst.id, enumerable: false });
      Object.defineProperty(inst, 'text', {
        value: inst.text,
        enumerable: false
      });
      return inst;
    },
    appendInitialChild: function (parentInstance, child) {
      parentInstance.children.push(child);
    },
    finalizeInitialChildren: function (domElement, type, props) {
      return false;
    },
    prepareUpdate: function (instance, type, oldProps, newProps) {
      if (type === 'errorInCompletePhase') {
        throw new Error('Error in host config.');
      }
      if (oldProps === null) {
        throw new Error('Should have old props');
      }
      if (newProps === null) {
        throw new Error('Should have new props');
      }
      hostDiffCounter++;
      return UPDATE_SIGNAL;
    },


    shouldSetTextContent: shouldSetTextContent,

    shouldDeprioritizeSubtree: function (type, props) {
      return !!props.hidden;
    },
    createTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
      var inst = { text: text, id: instanceCounter++, hidden: false };
      // Hide from unit tests
      Object.defineProperty(inst, 'id', { value: inst.id, enumerable: false });
      return inst;
    },
    scheduleDeferredCallback: function (callback, options) {
      if (scheduledCallback) {
        throw new Error('Scheduling a callback twice is excessive. Instead, keep track of ' + 'whether the callback has already been scheduled.');
      }
      scheduledCallback = callback;
      if (typeof options === 'object' && options !== null && typeof options.timeout === 'number') {
        var newTimeout = options.timeout;
        if (scheduledCallbackTimeout === -1 || scheduledCallbackTimeout > newTimeout) {
          scheduledCallbackTimeout = newTimeout;
        }
      }
      return 0;
    },
    cancelDeferredCallback: function () {
      if (scheduledCallback === null) {
        throw new Error('No callback is scheduled.');
      }
      scheduledCallback = null;
      scheduledCallbackTimeout = -1;
    },


    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,

    prepareForCommit: function () {},
    resetAfterCommit: function () {},
    now: function () {
      return elapsedTimeInMs;
    },


    isPrimaryRenderer: true,
    supportsHydration: false
  };

  var hostConfig = useMutation ? _assign({}, sharedHostConfig, {

    supportsMutation: true,
    supportsPersistence: false,

    commitMount: function (instance, type, newProps) {
      // Noop
    },
    commitUpdate: function (instance, updatePayload, type, oldProps, newProps) {
      if (oldProps === null) {
        throw new Error('Should have old props');
      }
      hostUpdateCounter++;
      instance.prop = newProps.prop;
      instance.hidden = newProps.hidden === true;
      if (shouldSetTextContent(type, newProps)) {
        instance.text = newProps.children + '';
      }
    },
    commitTextUpdate: function (textInstance, oldText, newText) {
      hostUpdateCounter++;
      textInstance.text = newText;
    },


    appendChild: appendChild,
    appendChildToContainer: appendChildToContainer,
    insertBefore: insertBefore,
    insertInContainerBefore: insertInContainerBefore,
    removeChild: removeChild,
    removeChildFromContainer: removeChildFromContainer,

    hideInstance: function (instance) {
      instance.hidden = true;
    },
    hideTextInstance: function (textInstance) {
      textInstance.hidden = true;
    },
    unhideInstance: function (instance, props) {
      if (!props.hidden) {
        instance.hidden = false;
      }
    },
    unhideTextInstance: function (textInstance, text) {
      textInstance.hidden = false;
    },
    resetTextContent: function (instance) {
      instance.text = null;
    }
  }) : _assign({}, sharedHostConfig, {
    supportsMutation: false,
    supportsPersistence: true,

    cloneInstance: cloneInstance,

    createContainerChildSet: function (container) {
      return [];
    },
    appendChildToContainerChildSet: function (childSet, child) {
      childSet.push(child);
    },
    finalizeContainerChildren: function (container, newChildren) {},
    replaceContainerChildren: function (container, newChildren) {
      container.children = newChildren;
    },
    cloneHiddenInstance: function (instance, type, props, internalInstanceHandle) {
      var clone = cloneInstance(instance, null, type, props, props, internalInstanceHandle, true, null);
      clone.hidden = true;
      return clone;
    },
    cloneUnhiddenInstance: function (instance, type, props, internalInstanceHandle) {
      var clone = cloneInstance(instance, null, type, props, props, internalInstanceHandle, true, null);
      clone.hidden = props.hidden;
      return clone;
    },
    createHiddenTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
      var inst = { text: text, id: instanceCounter++, hidden: true };
      // Hide from unit tests
      Object.defineProperty(inst, 'id', {
        value: inst.id,
        enumerable: false
      });
      return inst;
    }
  });

  var NoopRenderer = reconciler(hostConfig);

  var rootContainers = new Map();
  var roots = new Map();
  var DEFAULT_ROOT_ID = '<default>';

  var yieldedValues = null;

  var unitsRemaining = void 0;

  function flushUnitsOfWork(n) {
    var didStop, cb, values;
    return regeneratorRuntime.wrap(function flushUnitsOfWork$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            didStop = false;

          case 1:
            if (!(!didStop && scheduledCallback !== null)) {
              _context.next = 13;
              break;
            }

            cb = scheduledCallback;

            scheduledCallback = null;
            unitsRemaining = n;
            cb({
              timeRemaining: function () {
                if (yieldedValues !== null) {
                  return 0;
                }
                if (unitsRemaining-- > 0) {
                  return 999;
                }
                didStop = true;
                return 0;
              },

              didTimeout: scheduledCallbackTimeout !== -1 && elapsedTimeInMs > scheduledCallbackTimeout
            });

            if (!(yieldedValues !== null)) {
              _context.next = 11;
              break;
            }

            values = yieldedValues;

            yieldedValues = null;
            _context.next = 11;
            return values;

          case 11:
            _context.next = 1;
            break;

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  function childToJSX(child, text) {
    if (text !== null) {
      return text;
    }
    if (child === null) {
      return null;
    }
    if (typeof child === 'string') {
      return child;
    }
    if (Array.isArray(child)) {
      if (child.length === 0) {
        return null;
      }
      if (child.length === 1) {
        return childToJSX(child[0], null);
      }
      // $FlowFixMe
      var _children = child.map(function (c) {
        return childToJSX(c, null);
      });
      if (_children.every(function (c) {
        return typeof c === 'string' || typeof c === 'number';
      })) {
        return _children.join('');
      }
      return _children;
    }
    if (Array.isArray(child.children)) {
      // This is an instance.
      var instance = child;
      var _children2 = childToJSX(instance.children, instance.text);
      var props = { prop: instance.prop };
      if (instance.hidden) {
        props.hidden = true;
      }
      if (_children2 !== null) {
        props.children = _children2;
      }
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: instance.type,
        key: null,
        ref: null,
        props: props,
        _owner: null,
        _store: {}
      };
    }
    // This is a text instance
    var textInstance = child;
    if (textInstance.hidden) {
      return '';
    }
    return textInstance.text;
  }

  var ReactNoop = {
    getChildren: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;

      var container = rootContainers.get(rootID);
      if (container) {
        return container.children;
      } else {
        return null;
      }
    },
    getOrCreateRootContainer: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      var isConcurrent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var root = roots.get(rootID);
      if (!root) {
        var container = { rootID: rootID, children: [] };
        rootContainers.set(rootID, container);
        root = NoopRenderer.createContainer(container, isConcurrent, false);
        roots.set(rootID, root);
      }
      return root.current.stateNode.containerInfo;
    },
    getChildrenAsJSX: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;

      var children = childToJSX(ReactNoop.getChildren(rootID), null);
      if (children === null) {
        return null;
      }
      if (Array.isArray(children)) {
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type: REACT_FRAGMENT_TYPE,
          key: null,
          ref: null,
          props: { children: children },
          _owner: null,
          _store: {}
        };
      }
      return children;
    },
    createPortal: function (children, container) {
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      return createPortal(children, container, null, key);
    },


    // Shortcut for testing a single root
    render: function (element, callback) {
      ReactNoop.renderToRootWithID(element, DEFAULT_ROOT_ID, callback);
    },
    renderLegacySyncRoot: function (element, callback) {
      var rootID = DEFAULT_ROOT_ID;
      var isConcurrent = false;
      var container = ReactNoop.getOrCreateRootContainer(rootID, isConcurrent);
      var root = roots.get(container.rootID);
      NoopRenderer.updateContainer(element, root, null, callback);
    },
    renderToRootWithID: function (element, rootID, callback) {
      var isConcurrent = true;
      var container = ReactNoop.getOrCreateRootContainer(rootID, isConcurrent);
      var root = roots.get(container.rootID);
      NoopRenderer.updateContainer(element, root, null, callback);
    },
    unmountRootWithID: function (rootID) {
      var root = roots.get(rootID);
      if (root) {
        NoopRenderer.updateContainer(null, root, null, function () {
          roots.delete(rootID);
          rootContainers.delete(rootID);
        });
      }
    },
    findInstance: function (componentOrElement) {
      if (componentOrElement == null) {
        return null;
      }
      // Unsound duck typing.
      var component = componentOrElement;
      if (typeof component.id === 'number') {
        return component;
      }
      {
        return NoopRenderer.findHostInstanceWithWarning(component, 'findInstance');
      }
      return NoopRenderer.findHostInstance(component);
    },
    flushDeferredPri: function () {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;

      // The legacy version of this function decremented the timeout before
      // returning the new time.
      // TODO: Convert tests to use flushUnitsOfWork or flushAndYield instead.
      var n = timeout / 5 - 1;

      var values = [];
      // eslint-disable-next-line no-for-of-loops/no-for-of-loops
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = flushUnitsOfWork(n)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          values.push.apply(values, value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return values;
    },
    flush: function () {
      return ReactNoop.flushUnitsOfWork(Infinity);
    },
    flushAndYield: function () {
      var unitsOfWork = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;

      return flushUnitsOfWork(unitsOfWork);
    },
    flushUnitsOfWork: function (n) {
      var values = yieldedValues || [];
      yieldedValues = null;
      // eslint-disable-next-line no-for-of-loops/no-for-of-loops
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = flushUnitsOfWork(n)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;

          values.push.apply(values, value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return values;
    },
    flushThrough: function (expected) {
      var actual = [];
      if (expected.length !== 0) {
        // eslint-disable-next-line no-for-of-loops/no-for-of-loops
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = flushUnitsOfWork(Infinity)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var value = _step3.value;

            actual.push.apply(actual, value);
            if (actual.length >= expected.length) {
              break;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
      expect(actual).toEqual(expected);
    },
    flushNextYield: function () {
      var actual = null;
      // eslint-disable-next-line no-for-of-loops/no-for-of-loops
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = flushUnitsOfWork(Infinity)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var value = _step4.value;

          actual = value;
          break;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return actual !== null ? actual : [];
    },
    flushWithHostCounters: function (fn) {
      hostDiffCounter = 0;
      hostUpdateCounter = 0;
      hostCloneCounter = 0;
      try {
        ReactNoop.flush();
        return useMutation ? {
          hostDiffCounter: hostDiffCounter,
          hostUpdateCounter: hostUpdateCounter
        } : {
          hostDiffCounter: hostDiffCounter,
          hostCloneCounter: hostCloneCounter
        };
      } finally {
        hostDiffCounter = 0;
        hostUpdateCounter = 0;
        hostCloneCounter = 0;
      }
    },
    expire: function (ms) {
      ReactNoop.advanceTime(ms);
      return ReactNoop.flushExpired();
    },
    advanceTime: function (ms) {
      elapsedTimeInMs += ms;
    },
    flushExpired: function () {
      return ReactNoop.flushUnitsOfWork(0);
    },
    yield: function (value) {
      if (yieldedValues === null) {
        yieldedValues = [value];
      } else {
        yieldedValues.push(value);
      }
    },
    clearYields: function () {
      var values = yieldedValues;
      yieldedValues = null;
      return values;
    },
    hasScheduledCallback: function () {
      return !!scheduledCallback;
    },


    batchedUpdates: NoopRenderer.batchedUpdates,

    deferredUpdates: NoopRenderer.deferredUpdates,

    unbatchedUpdates: NoopRenderer.unbatchedUpdates,

    interactiveUpdates: NoopRenderer.interactiveUpdates,

    flushSync: function (fn) {
      yieldedValues = [];
      NoopRenderer.flushSync(fn);
      return yieldedValues;
    },


    // Logs the current state of the tree.
    dumpTree: function () {
      var _console;

      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;

      var root = roots.get(rootID);
      var rootContainer = rootContainers.get(rootID);
      if (!root || !rootContainer) {
        console.log('Nothing rendered yet.');
        return;
      }

      var bufferedLog = [];
      function log() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        bufferedLog.push.apply(bufferedLog, args.concat(['\n']));
      }

      function logHostInstances(children, depth) {
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          var indent = '  '.repeat(depth);
          if (typeof child.text === 'string') {
            log(indent + '- ' + child.text);
          } else {
            // $FlowFixMe - The child should've been refined now.
            log(indent + '- ' + child.type + '#' + child.id);
            // $FlowFixMe - The child should've been refined now.
            logHostInstances(child.children, depth + 1);
          }
        }
      }
      function logContainer(container, depth) {
        log('  '.repeat(depth) + '- [root#' + container.rootID + ']');
        logHostInstances(container.children, depth + 1);
      }

      function logUpdateQueue(updateQueue, depth) {
        log('  '.repeat(depth + 1) + 'QUEUED UPDATES');
        var firstUpdate = updateQueue.firstUpdate;
        if (!firstUpdate) {
          return;
        }

        log('  '.repeat(depth + 1) + '~', '[' + firstUpdate.expirationTime + ']');
        while (firstUpdate.next) {
          log('  '.repeat(depth + 1) + '~', '[' + firstUpdate.expirationTime + ']');
        }
      }

      function logFiber(fiber, depth) {
        log('  '.repeat(depth) + '- ' + (
        // need to explicitly coerce Symbol to a string
        fiber.type ? fiber.type.name || fiber.type.toString() : '[root]'), '[' + fiber.childExpirationTime + (fiber.pendingProps ? '*' : '') + ']');
        if (fiber.updateQueue) {
          logUpdateQueue(fiber.updateQueue, depth);
        }
        // const childInProgress = fiber.progressedChild;
        // if (childInProgress && childInProgress !== fiber.child) {
        //   log(
        //     '  '.repeat(depth + 1) + 'IN PROGRESS: ' + fiber.pendingWorkPriority,
        //   );
        //   logFiber(childInProgress, depth + 1);
        //   if (fiber.child) {
        //     log('  '.repeat(depth + 1) + 'CURRENT');
        //   }
        // } else if (fiber.child && fiber.updateQueue) {
        //   log('  '.repeat(depth + 1) + 'CHILDREN');
        // }
        if (fiber.child) {
          logFiber(fiber.child, depth + 1);
        }
        if (fiber.sibling) {
          logFiber(fiber.sibling, depth);
        }
      }

      log('HOST INSTANCES:');
      logContainer(rootContainer, 0);
      log('FIBERS:');
      logFiber(root.current, 0);

      (_console = console).log.apply(_console, bufferedLog);
    },
    flushWithoutCommitting: function (expectedFlush) {
      var rootID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ROOT_ID;

      var root = roots.get(rootID);
      var batch = {
        _defer: true,
        _expirationTime: 1,
        _onComplete: function () {
          root.firstBatch = null;
        },
        _next: null
      };
      root.firstBatch = batch;
      var actual = ReactNoop.flush();
      expect(actual).toEqual(expectedFlush);
      return function (expectedCommit) {
        batch._defer = false;
        NoopRenderer.flushRoot(root, 1);
        expect(yieldedValues).toEqual(expectedCommit);
      };
    },
    getRoot: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;

      return roots.get(rootID);
    }
  };

  return ReactNoop;
}

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */

var ReactNoopPersistent = createReactNoop(ReactFiberPersistentReconciler, // reconciler
false // useMutation
);



var ReactNoopPersistent$2 = Object.freeze({
	default: ReactNoopPersistent
});

var ReactNoopPersistent$3 = ( ReactNoopPersistent$2 && ReactNoopPersistent ) || ReactNoopPersistent$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var persistent = ReactNoopPersistent$3.default || ReactNoopPersistent$3;

module.exports = persistent;
  })();
}
