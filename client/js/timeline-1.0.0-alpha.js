/**
 * TimeLine 1.0.0-alpha
 * Copyright (c) 2018 Beth
 * 无论希望同步什么，该插件都会把这个东西同步到唯一的一个时间轴上
 * depend [no]
 */

 /**
  * 希望解决的问题
  * 1.和时间本身无关，就是要相互同步执行；
  * 2.如果有一个模块慢了，其他模块需要进行自动对齐
  * 3.如果有一个模块快了，自己需要慢下来（以慢的为基准）
  * 4.如何实现链式动画播放
  */

  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
        (global.TimeLine = factory())
  })(this, (function() {
    'use strict';

    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ?
        'symbol' : typeof obj;
    }

    var defineProperty = function (obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value
      }

      return obj;
    }

    /**
     * Check if a variable is a boolean
     */
    function isBoolean(variable) {
      return variable === true || variable === false;
    }

    /**
     * Check if a variable is a function
     */
    function isFunction(variable) {
      return Object.prototype.toString.call(variable) === '[object Function]';
    }

    /**
     * Check if a variable is an HTMLElement or SVGElement
     */
    function isNode(variable) {
      return !!(variable && variable.nodeType);
    }

    /**
     * Check if a variable is a number
     */
    function isNumber(variable) {
      return typeof variable === 'number';
    }

    /**
     * Check if a variable is a plain object (and not an instance)
     */
    function isPlainObject(variable) {
      if (
        !variable ||
        (typeof variable === 'undefined' ? 'undefined' : _typeof(variable)) !== 'object' ||
        variable.nodeType ||
        Object.prototype.toString.call(variable) !== '[object Object]'
      ) {
        return false;
      }
      var proto = Object.getPrototypeOf(variable);
      return !proto || proto.hasOwnProperty('constructor') && proto.constructor === Object;
    }

    /**
     * Check if a variable is a string
     */
    function isString(variable) {
      return typeof variable === 'string';
    }

    /**
     * Check is a property is an enumerable member of an object
     */
    function propertyIsEnumerable(obj, property) {
      return Object.prototype.propertyIsEnumerable.call(obj, property);
    }

    // Project
    /**
     * Add a single className to an Element
     */
    function addClass(element, className) {
      if (element instanceof Element) {
        if (element.classList) {
          element.classList.add(className);
        } else {
          removeClass(element, className);
          element.className += (element.className.length ? " " : "") + className;
        }
      }
    }

    /**
     * Remove a single className from an Element
     */
    function removeClass(element, className) {
      if (element instanceof Element) {
        if (element.classList) {
          element.classList.remove(className);
        } else {
          // TODO: Need some jsperf tests on performance - can we get rid of the regex and maybe use split / array manipulation?
          element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)", "gi"), " ");
        }
      }
    }

    /**
     * Clone an array, works for array-like too
     */
    function cloneArray(arrayLike) {
      // prototype.slice.call(arguments) || arguments.toArray().slice()
      return Array.prototype.slice.call(arrayLike, 0);
    }

    function toArray(s) {
      try {
        return Array.prototype.slice.call(s);
      } catch (e) {
        var arr = [];
        for (var i = 0; i < s.length; i++) {
          // arr.push(s[i])
          arr[i] = s[i];
        }
        return arr;
      }
    }

    /**
     * The <strong><code>defineProperty() </code></strong> function provides a
     * shortcut to defining a property that cannot be accidentally iterated across
     */
    function defineProperty$1(proto, name, value, readonly) {
      if (proto) {
        Object.defineProperty(proto, name, {
          configurable: !readonly,
          writable: !readonly,
          value: value,
        });
      }
    }

    /**
     * Shim to get the current milliseconds - on anything except old IE it'll use
     * Date.now() and save creating an object. If that doesn't exist then it'll
     * create one that gets GC.
     */
    var now = Date.now ? Date.now : function() {
      return new Date().getTime();
    }

    // Project
    // Constants
    var Actions = {};
    /**
     * Used to register an action. This should never be called by users
     * directly, instead it should be called via an action: <br />
     * <code>TimeLine('registerAction', 'name', TimeLineActionFn);</code>
     */
    function registerAction(args, internal) {
      var name = args[0];
      var callback = args[1];
      if (!isString(name)) {
        console.warn('TimeLineJS: Trying to set "registerAction" name to an invalid value:', name)
      } else if (!isFunction(callback)) {
        console.warn('TimeLineJS: Trying to set "registerAction" callback to an invalid value:', name, callback);
      } else if (Actions[name] && !propertyIsEnumerable(Actions, name)) {
        console.warn('TimeLineJS: Trying to override internal "registerAction" callback', name);
      } else if (internal === true) {
        defineProperty$1(Actions, name, callback)
      } else {
        Actions[name] = callback;
      }
    }

    /**
     * init a action
     */
    registerAction(['registerAction', registerAction], true);

    /**
     * the core source
     */
    var DURATION_NORMAL = 400;
    var DEFAULT_CACHE = true;
    var DEFAULT_DELAY = 0;
    var DEFAULT_DURATION = DURATION_NORMAL;
    var DEFAULT_FPSLIMIT = 60;
    var DEFAULT_LOOP = 0;
    var DEFAULT_PROMISE = true;
    var DEFAULT_PROMISE_REJECT_EMPTY = true;
    var DEFAULT_QUEUE = "";
    var DEFAULT_REPEAT = 0;
    var DEFAULT_SPEED = 1;
    var DEFAULT_SYNC = true;
    var Duration = {
      fast: DURATION_FAST,
      normal: DURATION_NORMAL,
      slow: DURATION_SLOW
    };
    
    // Error checking
    /**
     * Parse a duration value and return an ms number. Optionally return a
     * default value if the number is not valid
     */
    function parseDuration(duration, def) {
      if (isNumber(duration)) {
        return duration;
      }
      if (isString(duration)) {
        return Duration[duration.toLowerCase()] || parseFloat(duration.replace("ms", "").replace("s", "000"));
      }
      return def = null ? undefined : parseDuration(def);
    }

    /**
     * Validate a <code>cache</code> option.
     */
    function validateCache(value) {
      if (isBoolean(value)) {
        return value;
      }
      if (value != null) {
        console.warn('TimeLineJS: Trying to set "cache" to an invalid value: ', value);
      }
    }

    /**
     * Validate a <code>begin</code> option.
     */
    function validateBegin(value) {
      if (isFunction(value)) {
        return value;
      }
      if (value !== null) {
        console.warn('TimeLineJS: Trying to set "begin" to an invalid value:', value)
      }
    }

    /**
     * Validate a <code>complete</code> option
     */
    function validateComplete(value, noError) {
      if (isFunction(value)) {
        return value
      }
      if (value !== null && !noError) {
        console.warn('TimeLineJS: Trying to set "Complete" to an invalid value:', value)
      }
    }

    /**
     * Validate a <code>delay</code> option
     */
    function validateDelay(value) {
      var parsed = parseDuration(value);
      if (!isNaN(parsed)) {
        return parsed;
      }
      if (value !== null) {
        console.error('TimeLineJS: Trying to set "delay" to an invalid value:', value);
      }
    }

    /**
     * Validate a <code>duration</code> option
     */
    function validateDuration(value, noError) {
      var parsed = parseDuration(value);
      if (!isNaN(parsed) && parsed >= 0) {
        return parsed;
      }
      if (value !== null && !noError) {
        console.error('TimeLineJS: Trying to set "duration" to an invalid value: ', value);
      }
    }

    /**
     * Validate a <code>loop</code> option
     */
    function validateLoop(value) {
      switch(value) {
        case false:
          return 0;
        case true:
          return true;
        default:
          var parsed = parseInt(value, 10);
          if (!isNaN(parsed) && parsed >= 0) {
            return parsed;
          }
          break;
      }
      if (value !== null) {
        console.warn('TimeLineJS: Trying to set "loop" to an invalid value: ', value);
      }
    }

    /**
     * Validate a <code>progress</code> option
     */
    function validateProgress(value) {
      if (isFunction(value)) {
        return value;
      }
      if (value !== null) {
        console.warn('TimeLineJS: Trying to set "progress" to an invalid value:', value)
      }
    }

    /**
     * Validate a <code>promise</code> option.
     */
    function validatePromise(value) {
      if (isBoolean(value)) {
        return value;
      }
      if (value !== null) {
        console.warn('TimeLineJS: Trying to set "promise" to an invalid value:', value)
      }
    }

    /**
     * Validate a <code>promiseRejectEmpty</code> option
     */
    function validatePromiseRejectEmpty(value) {
      if (isBoolean(value)) {
        return value;
      }
      if (value !== null) {
        console.warn('TimeLineJS: Trying to set "promiseRejectEmpty" to an invalid value:', value)
      }
    }

    /**
     * 
     */
    
    var defaults$1 = {
      mobile: false,
    }

    // NOTE: Add the variable here, then add the default state in 'reset' below.
    var cache$1 = void 0,
        begin = void 0,
        complete = void 0,
        delay = void 0,
        duration = void 0,
        loop = void 0,
        mobile = void 0,
        minFrameTime = void 0,
        promise = void 0,
        promiseRejectEmpty = void 0,
        queue = void 0,
        repeat = void 0,
        speed = void 0,
        sync = void 0;
    // TMPORTAQNT: Make sure any new defaults get added to the actions/set.ts list
    Object.defineProperties(defaults$1, {
      reset: {
        enumerable: true,
        value: function value() {
          cache$1 = DEFAULT_CACHE;
          begin = undefined;
          complete = undefined;
          delay = DEFAULT_DELAY;
          duration = DEFAULT_DURATION;
          loop = DEFAULT_LOOP;
          minFrameTime = FUZZY_MS_PER_SECOND / DEFAULT_FPSLIMIT;
          promise = DEFAULT_PROMISE;
          promiseRejectEmpty = DEFAULT_PROMISE_REJECT_EMPTY;
          queue = DEFAULT_QUEUE;
          repeat = DEFAULT_REPEAT;
          speed = DEFAULT_SPEED;
          sync = DEFAULT_SYNC;
        }
      },
      cache: {
        enumerable: true,
        get: function() {
          return cache$1;
        },
        set: function() {
          value = validateCache()
        }
      }
    });

    function TimeLine$1() {

    }


    var TimeLine$2 = TimeLine$1;

    return TimeLine$2;
  }));

