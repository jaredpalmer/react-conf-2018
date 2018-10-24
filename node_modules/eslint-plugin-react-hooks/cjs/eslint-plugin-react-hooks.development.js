/** @license React v16.6.0
 * eslint-plugin-react-hooks.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

/* eslint-disable no-for-of-loops/no-for-of-loops */



/**
 * Catch all identifiers that begin with "use" followed by an uppercase Latin
 * character to exclude identifiers like "user".
 */

function isHookName(s) {
  return (/^use[A-Z0-9].*$/.test(s)
  );
}

/**
 * We consider hooks to be a hook name identifier or a member expression
 * containing a hook name.
 */

function isHook(node) {
  if (node.type === 'Identifier') {
    return isHookName(node.name);
  } else if (node.type === 'MemberExpression' && !node.computed && isHook(node.property)) {
    // Only consider React.useFoo() to be namespace hooks for now to avoid false positives.
    // We can expand this check later.
    var obj = node.object;
    return obj.type === 'Identifier' && obj.name === 'React';
  } else {
    return false;
  }
}

/**
 * Checks if the node is a React component name. React component names must
 * always start with a non-lowercase letter. So `MyComponent` or `_MyComponent`
 * are valid component names for instance.
 */

function isComponentName(node) {
  if (node.type === 'Identifier') {
    return !/^[a-z]/.test(node.name);
  } else {
    return false;
  }
}

function isInsideComponentOrHook(node) {
  while (node) {
    var functionName = getFunctionName(node);
    if (functionName) {
      if (isComponentName(functionName) || isHook(functionName)) {
        return true;
      }
    }
    node = node.parent;
  }
  return false;
}

var RuleOfHooks = {
  create: function (context) {
    var codePathReactHooksMapStack = [];
    var codePathSegmentStack = [];
    return {
      // Maintain code segment path stack as we traverse.
      onCodePathSegmentStart: function (segment) {
        return codePathSegmentStack.push(segment);
      },
      onCodePathSegmentEnd: function () {
        return codePathSegmentStack.pop();
      },

      // Maintain code path stack as we traverse.
      onCodePathStart: function () {
        return codePathReactHooksMapStack.push(new Map());
      },

      // Process our code path.
      //
      // Everything is ok if all React Hooks are both reachable from the initial
      // segment and reachable from every final segment.
      onCodePathEnd: function (codePath, codePathNode) {
        var reactHooksMap = codePathReactHooksMapStack.pop();
        if (reactHooksMap.size === 0) {
          return;
        }

        // All of the segments which are cyclic are recorded in this set.
        var cyclic = new Set();

        /**
         * Count the number of code paths from the start of the function to this
         * segment. For example:
         *
         * ```js
         * function MyComponent() {
         *   if (condition) {
         *     // Segment 1
         *   } else {
         *     // Segment 2
         *   }
         *   // Segment 3
         * }
         * ```
         *
         * Segments 1 and 2 have one path to the beginning of `MyComponent` and
         * segment 3 has two paths to the beginning of `MyComponent` since we
         * could have either taken the path of segment 1 or segment 2.
         *
         * Populates `cyclic` with cyclic segments.
         */

        function countPathsFromStart(segment) {
          var cache = countPathsFromStart.cache;

          var paths = cache.get(segment.id);

          // If `paths` is null then we've found a cycle! Add it to `cyclic` and
          // any other segments which are a part of this cycle.
          if (paths === null) {
            if (cyclic.has(segment.id)) {
              return 0;
            } else {
              cyclic.add(segment.id);
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = segment.prevSegments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var prevSegment = _step.value;

                  countPathsFromStart(prevSegment);
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

              return 0;
            }
          }

          // We have a cached `paths`. Return it.
          if (paths !== undefined) {
            return paths;
          }

          // Compute `paths` and cache it. Guarding against cycles.
          cache.set(segment.id, null);
          if (segment.prevSegments.length === 0) {
            paths = 1;
          } else {
            paths = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = segment.prevSegments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _prevSegment = _step2.value;

                paths += countPathsFromStart(_prevSegment);
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
          }
          cache.set(segment.id, paths);

          return paths;
        }

        /**
         * Count the number of code paths from this segment to the end of the
         * function. For example:
         *
         * ```js
         * function MyComponent() {
         *   // Segment 1
         *   if (condition) {
         *     // Segment 2
         *   } else {
         *     // Segment 3
         *   }
         * }
         * ```
         *
         * Segments 2 and 3 have one path to the end of `MyComponent` and
         * segment 1 has two paths to the end of `MyComponent` since we could
         * either take the path of segment 1 or segment 2.
         *
         * Populates `cyclic` with cyclic segments.
         */

        function countPathsToEnd(segment) {
          var cache = countPathsToEnd.cache;

          var paths = cache.get(segment.id);

          // If `paths` is null then we've found a cycle! Add it to `cyclic` and
          // any other segments which are a part of this cycle.
          if (paths === null) {
            if (cyclic.has(segment.id)) {
              return 0;
            } else {
              cyclic.add(segment.id);
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = segment.nextSegments[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var nextSegment = _step3.value;

                  countPathsToEnd(nextSegment);
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

              return 0;
            }
          }

          // We have a cached `paths`. Return it.
          if (paths !== undefined) {
            return paths;
          }

          // Compute `paths` and cache it. Guarding against cycles.
          cache.set(segment.id, null);
          if (segment.nextSegments.length === 0) {
            paths = 1;
          } else {
            paths = 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = segment.nextSegments[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _nextSegment = _step4.value;

                paths += countPathsToEnd(_nextSegment);
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
          }
          cache.set(segment.id, paths);

          return paths;
        }

        /**
         * Gets the shortest path length to the start of a code path.
         * For example:
         *
         * ```js
         * function MyComponent() {
         *   if (condition) {
         *     // Segment 1
         *   }
         *   // Segment 2
         * }
         * ```
         *
         * There is only one path from segment 1 to the code path start. Its
         * length is one so that is the shortest path.
         *
         * There are two paths from segment 2 to the code path start. One
         * through segment 1 with a length of two and another directly to the
         * start with a length of one. The shortest path has a length of one
         * so we would return that.
         */

        function shortestPathLengthToStart(segment) {
          var cache = shortestPathLengthToStart.cache;

          var length = cache.get(segment.id);

          // If `length` is null then we found a cycle! Return infinity since
          // the shortest path is definitely not the one where we looped.
          if (length === null) {
            return Infinity;
          }

          // We have a cached `length`. Return it.
          if (length !== undefined) {
            return length;
          }

          // Compute `length` and cache it. Guarding against cycles.
          cache.set(segment.id, null);
          if (segment.prevSegments.length === 0) {
            length = 1;
          } else {
            length = Infinity;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = segment.prevSegments[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var prevSegment = _step5.value;

                var prevLength = shortestPathLengthToStart(prevSegment);
                if (prevLength < length) {
                  length = prevLength;
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }

            length += 1;
          }
          cache.set(segment.id, length);
          return length;
        }

        countPathsFromStart.cache = new Map();
        countPathsToEnd.cache = new Map();
        shortestPathLengthToStart.cache = new Map();

        // Count all code paths to the end of our component/hook. Also primes
        // the `countPathsToEnd` cache.
        var allPathsFromStartToEnd = countPathsToEnd(codePath.initialSegment);

        // Gets the function name for our code path. If the function name is
        // `undefined` then we know either that we have an anonymous function
        // expression or our code path is not in a function. In both cases we
        // will want to error since neither are React functional components or
        // hook functions.
        var codePathFunctionName = getFunctionName(codePathNode);

        // This is a valid code path for React hooks if we are direcly in a React
        // functional component or we are in a hook function.
        var isSomewhereInsideComponentOrHook = isInsideComponentOrHook(codePathNode);
        var isDirectlyInsideComponentOrHook = codePathFunctionName ? isComponentName(codePathFunctionName) || isHook(codePathFunctionName) : false;

        // Compute the earliest finalizer level using information from the
        // cache. We expect all reachable final segments to have a cache entry
        // after calling `visitSegment()`.
        var shortestFinalPathLength = Infinity;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = codePath.finalSegments[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var finalSegment = _step6.value;

            if (!finalSegment.reachable) {
              continue;
            }
            var length = shortestPathLengthToStart(finalSegment);
            if (length < shortestFinalPathLength) {
              shortestFinalPathLength = length;
            }
          }

          // Make sure all React Hooks pass our lint invariants. Log warnings
          // if not.
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = reactHooksMap[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _step7$value = _step7.value,
                segment = _step7$value[0],
                reactHooks = _step7$value[1];

            // NOTE: We could report here that the hook is not reachable, but
            // that would be redundant with more general "no unreachable"
            // lint rules.
            if (!segment.reachable) {
              continue;
            }

            // If there are any final segments with a shorter path to start then
            // we possibly have an early return.
            //
            // If our segment is a final segment itself then siblings could
            // possibly be early returns.
            var possiblyHasEarlyReturn = segment.nextSegments.length === 0 ? shortestFinalPathLength <= shortestPathLengthToStart(segment) : shortestFinalPathLength < shortestPathLengthToStart(segment);

            // Count all the paths from the start of our code path to the end of
            // our code path that go _through_ this segment. The critical piece
            // of this is _through_. If we just call `countPathsToEnd(segment)`
            // then we neglect that we may have gone through multiple paths to get
            // to this point! Consider:
            //
            // ```js
            // function MyComponent() {
            //   if (a) {
            //     // Segment 1
            //   } else {
            //     // Segment 2
            //   }
            //   // Segment 3
            //   if (b) {
            //     // Segment 4
            //   } else {
            //     // Segment 5
            //   }
            // }
            // ```
            //
            // In this component we have four code paths:
            //
            // 1. `a = true; b = true`
            // 2. `a = true; b = false`
            // 3. `a = false; b = true`
            // 4. `a = false; b = false`
            //
            // From segment 3 there are two code paths to the end through segment
            // 4 and segment 5. However, we took two paths to get here through
            // segment 1 and segment 2.
            //
            // If we multiply the paths from start (two) by the paths to end (two)
            // for segment 3 we get four. Which is our desired count.
            var pathsFromStartToEnd = countPathsFromStart(segment) * countPathsToEnd(segment);

            // Is this hook a part of a cyclic segment?
            var cycled = cyclic.has(segment.id);

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = reactHooks[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var hook = _step8.value;

                // Report an error if a hook may be called more then once.
                if (cycled) {
                  context.report(hook, 'React Hook "' + context.getSource(hook) + '" may be executed ' + 'more than once. Possibly because it is called in a loop. ' + 'React Hooks must be called in the exact same order in ' + 'every component render.');
                }

                // If this is not a valid code path for React hooks then we need to
                // log a warning for every hook in this code path.
                //
                // Pick a special message depending on the scope this hook was
                // called in.
                if (isDirectlyInsideComponentOrHook) {
                  // Report an error if a hook does not reach all finalizing code
                  // path segments.
                  //
                  // Special case when we think there might be an early return.
                  if (!cycled && pathsFromStartToEnd !== allPathsFromStartToEnd) {
                    context.report(hook, 'React Hook "' + context.getSource(hook) + '" is called ' + 'conditionally. React Hooks must be called in the exact ' + 'same order in every component render.' + (possiblyHasEarlyReturn ? ' Did you accidentally call a React Hook after an' + ' early return?' : ''));
                  }
                } else if (codePathNode.parent && (codePathNode.parent.type === 'MethodDefinition' || codePathNode.parent.type === 'ClassProperty') && codePathNode.parent.value === codePathNode) {
                  // Ignore class methods for now because they produce too many
                  // false positives due to feature flag checks. We're less
                  // sensitive to them in classes because hooks would produce
                  // runtime errors in classes anyway, and because a use*()
                  // call in a class, if it works, is unambigously *not* a hook.
                } else if (codePathFunctionName) {
                  // Custom message if we found an invalid function name.
                  context.report(hook, 'React Hook "' + context.getSource(hook) + '" is called in ' + ('function "' + context.getSource(codePathFunctionName) + '" ') + 'which is neither a React function component or a custom ' + 'React Hook function.');
                } else if (codePathNode.type === 'Program') {
                  // For now, ignore if it's in top level scope.
                  // We could warn here but there are false positives related
                  // configuring libraries like `history`.
                } else {
                  // Assume in all other cases the user called a hook in some
                  // random function callback. This should usually be true for
                  // anonymous function expressions. Hopefully this is clarifying
                  // enough in the common case that the incorrect message in
                  // uncommon cases doesn't matter.
                  if (isSomewhereInsideComponentOrHook) {
                    context.report(hook, 'React Hook "' + context.getSource(hook) + '" cannot be called ' + 'inside a callback. React Hooks must be called in a ' + 'React function component or a custom React Hook function.');
                  }
                }
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      },


      // Missed opportunity...We could visit all `Identifier`s instead of all
      // `CallExpression`s and check that _every use_ of a hook name is valid.
      // But that gets complicated and enters type-system territory, so we're
      // only being strict about hook calls for now.
      CallExpression: function (node) {
        if (isHook(node.callee)) {
          // Add the hook node to a map keyed by the code path segment. We will
          // do full code path analysis at the end of our code path.
          var reactHooksMap = last(codePathReactHooksMapStack);
          var codePathSegment = last(codePathSegmentStack);
          var reactHooks = reactHooksMap.get(codePathSegment);
          if (!reactHooks) {
            reactHooks = [];
            reactHooksMap.set(codePathSegment, reactHooks);
          }
          reactHooks.push(node.callee);
        }
      }
    };
  }
};

/**
 * Gets tbe static name of a function AST node. For function declarations it is
 * easy. For anonymous function expressions it is much harder. If you search for
 * `IsAnonymousFunctionDefinition()` in the ECMAScript spec you'll find places
 * where JS gives anonymous function expressions names. We roughly detect the
 * same AST nodes with some exceptions to better fit our usecase.
 */

function getFunctionName(node) {
  if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' && node.id) {
    // function useHook() {}
    // const whatever = function useHook() {};
    //
    // Function declaration or function expression names win over any
    // assignment statements or other renames.
    return node.id;
  } else if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
    if (node.parent.type === 'VariableDeclarator' && node.parent.init === node) {
      // const useHook = () => {};
      return node.parent.id;
    } else if (node.parent.type === 'AssignmentExpression' && node.parent.right === node && node.parent.operator === '=') {
      // useHook = () => {};
      return node.parent.left;
    } else if (node.parent.type === 'Property' && node.parent.value === node && !node.parent.computed) {
      // {useHook: () => {}}
      // {useHook() {}}
      return node.parent.key;

      // NOTE: We could also support `ClassProperty` and `MethodDefinition`
      // here to be pedantic. However, hooks in a class are an anti-pattern. So
      // we don't allow it to error early.
      //
      // class {useHook = () => {}}
      // class {useHook() {}}
    } else if (node.parent.type === 'AssignmentPattern' && node.parent.right === node && !node.parent.computed) {
      // const {useHook = () => {}} = {};
      // ({useHook = () => {}} = {});
      //
      // Kinda clowny, but we'd said we'd follow spec convention for
      // `IsAnonymousFunctionDefinition()` usage.
      return node.parent.left;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

/**
 * Convenience function for peeking the last item in a stack.
 */

function last(array) {
  return array[array.length - 1];
}

var rules = {
  'rules-of-hooks': RuleOfHooks
};

var src = Object.freeze({
	rules: rules
});

var eslintPluginReactHooks = src;

module.exports = eslintPluginReactHooks;
  })();
}
