/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/electron-squirrel-startup/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/index.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! path */ "path");
var spawn = (__webpack_require__(/*! child_process */ "child_process").spawn);
var debug = __webpack_require__(/*! debug */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js")('electron-squirrel-startup');
var app = (__webpack_require__(/*! electron */ "electron").app);

var run = function(args, done) {
  var updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
  debug('Spawning `%s` with args `%s`', updateExe, args);
  spawn(updateExe, args, {
    detached: true
  }).on('close', done);
};

var check = function() {
  if (process.platform === 'win32') {
    var cmd = process.argv[1];
    debug('processing squirrel command `%s`', cmd);
    var target = path.basename(process.execPath);

    if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
      run(['--createShortcut=' + target + ''], app.quit);
      return true;
    }
    if (cmd === '--squirrel-uninstall') {
      run(['--removeShortcut=' + target + ''], app.quit);
      return true;
    }
    if (cmd === '--squirrel-obsolete') {
      app.quit();
      return true;
    }
  }
  return false;
};

module.exports = check();


/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js ***!
  \**********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js":
/*!********************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js ***!
  \********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/electron-squirrel-startup/node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js");
}


/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js ***!
  \*******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(/*! fs */ "fs");
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(/*! net */ "net");
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/ms/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/ms/index.js ***!
  \*************************************************************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./src/electronAPI.ts":
/*!****************************!*\
  !*** ./src/electronAPI.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.electronAPI = void 0;
var electron_1 = __webpack_require__(/*! electron */ "electron");
var child_process_1 = __importDefault(__webpack_require__(/*! child_process */ "child_process"));
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
var path = __importStar(__webpack_require__(/*! path */ "path"));
var os_1 = __importDefault(__webpack_require__(/*! os */ "os"));
var electronAPI = /** @class */ (function () {
    function electronAPI() {
        var _this = this;
        this.dataFolder = electron_1.app.getPath("userData");
        this.exec = child_process_1.default.exec;
        this.initialize = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                electron_1.ipcMain.handle("dialog:open-file", function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, electron_1.dialog
                                    .showOpenDialog({
                                    properties: ["openFile"],
                                })
                                    .then(function (response) {
                                    return response.filePaths[0];
                                })
                                    .catch(function (err) {
                                    console.error(err);
                                    _this.error(event.sender, "An error occured while trying to open the file explorer");
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                electron_1.ipcMain.handle("dialog:open-directory", function (event) {
                    return electron_1.dialog
                        .showOpenDialog({
                        properties: ["createDirectory", "openDirectory"],
                    })
                        .then(function (response) {
                        return response.filePaths[0];
                    })
                        .catch(function (err) {
                        console.error(err);
                        _this.error(event.sender, "An error occured while trying to open the file explorer");
                    });
                });
                electron_1.ipcMain.handle("save:save", function (_, obj) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        try {
                            fs_1.default.writeFileSync(path.join(this.dataFolder, "data/".concat(obj.id, ".json")), JSON.stringify(obj), "utf-8");
                            this.success(_.sender, "Lab successfully saved");
                        }
                        catch (e) {
                            console.error(e);
                            this.error(_.sender, "An error occured while saving the lab");
                        }
                        return [2 /*return*/];
                    });
                }); });
                electron_1.ipcMain.handle("save:load", function (event, name) { return __awaiter(_this, void 0, void 0, function () {
                    var files, lab_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        try {
                            files = fs_1.default.readdirSync(path.join(this.dataFolder, "data"));
                            lab_1 = [];
                            files
                                .map(function (fileName) { return ({
                                name: fileName,
                                time: fs_1.default
                                    .statSync(path.join(_this.dataFolder, "data", fileName))
                                    .mtime.getTime(),
                            }); })
                                .sort(function (a, b) { return b.time - a.time; })
                                .forEach(function (file) {
                                lab_1.push(JSON.parse(fs_1.default.readFileSync(path.join(_this.dataFolder, "data", file.name), "utf-8")));
                            });
                            event.sender.send("save:load", lab_1);
                        }
                        catch (e) {
                            console.error(e);
                            this.error(event.sender, "An error occured while loading the labs");
                        }
                        return [2 /*return*/];
                    });
                }); });
                electron_1.ipcMain.handle('fs:save-file', function (event, filePath, fileName, content) { return __awaiter(_this, void 0, void 0, function () {
                    var fullPath;
                    return __generator(this, function (_a) {
                        try {
                            fullPath = path.join(filePath, fileName);
                            if (!fs_1.default.existsSync(filePath))
                                fs_1.default.mkdirSync(filePath, {
                                    recursive: true
                                });
                            fs_1.default.writeFileSync(fullPath, content, "utf-8");
                        }
                        catch (e) {
                            console.warn(e.message);
                        }
                        return [2 /*return*/];
                    });
                }); });
                electron_1.ipcMain.handle("save:delete", function (_, id) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        try {
                            fs_1.default.unlinkSync(path.join(this.dataFolder, "data", "".concat(id, ".json")));
                            this.success(_.sender, "Lab successfully deleted");
                        }
                        catch (e) {
                            console.error(e);
                            this.error(_.sender, "An error occured while deleting the lab");
                        }
                        return [2 /*return*/];
                    });
                }); });
                electron_1.ipcMain.handle("os:getHomeDirectory", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, os_1.default.homedir()];
                    });
                }); });
                electron_1.ipcMain.handle("os:getDataFolder", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.dataFolder];
                    });
                }); });
                electron_1.ipcMain.handle("fs:read-directory", function (_, directoryPath) { return __awaiter(_this, void 0, void 0, function () {
                    var filesData, readFile, filesNames;
                    return __generator(this, function (_a) {
                        filesData = {
                            confFile: "",
                            startupFiles: [{ deviceName: '', fileData: '' }],
                            shutdownFiles: [{ deviceName: '', fileData: '' }]
                        };
                        readFile = function (filePath) {
                            return fs_1.default.readFileSync(filePath, "utf-8");
                        };
                        try {
                            filesNames = fs_1.default.readdirSync(directoryPath);
                            filesNames.forEach(function (fileName) {
                                if (path.extname(fileName) == ".conf") {
                                    filesData.confFile = readFile(path.join(directoryPath, fileName));
                                }
                                if (path.extname(fileName) == ".startup") {
                                    var deviceName = path.basename(fileName, '.startup').toUpperCase();
                                    var fileData = readFile(path.join(directoryPath, fileName));
                                    filesData.startupFiles.push({ 'deviceName': deviceName, 'fileData': fileData });
                                }
                                if (path.extname(fileName) == ".shutdown") {
                                    var deviceName = path.basename(fileName, '.startup').toUpperCase();
                                    var fileData = readFile(path.join(directoryPath, fileName));
                                    filesData.shutdownFiles.push({ 'deviceName': deviceName, 'fileData': fileData });
                                }
                            });
                            return [2 /*return*/, filesData];
                        }
                        catch (err) {
                            console.warn(err);
                            this.error(_.sender, "An error occured while trying to read the folder " + directoryPath);
                        }
                        return [2 /*return*/];
                    });
                }); });
                electron_1.ipcMain.handle("kathara:version", function (_) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        try {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    _this.exec('kathara -v', function (error, stdout, stderr) {
                                        if (stderr)
                                            reject(stderr);
                                        resolve(stdout);
                                    });
                                })];
                        }
                        catch (err) {
                            console.warn(err);
                            this.error(_.sender, "Error whyle searching for ");
                        }
                        return [2 /*return*/];
                    });
                }); });
                electron_1.ipcMain.handle("kathara:start", function (_, path) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        try {
                            this.currentSpawn = child_process_1.default.spawn("kathara lstart", {
                                cwd: path,
                                shell: true
                            });
                            this.currentSpawn.on('error', function () { /* eslint-disable */ ; (oo_oo(), console.log('error', "44a3f3a1_0")); });
                            this.currentSpawn.on('message', function () { /* eslint-disable */ ; (oo_oo(), console.log('message', "44a3f3a1_1")); });
                        }
                        catch (err) {
                            console.warn(err);
                            this.error(_.sender, "Error trying to start the lab ");
                        }
                        return [2 /*return*/];
                    });
                }); });
                electron_1.ipcMain.handle("kathara:stop", function (_, path) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        try {
                            this.currentSpawn = child_process_1.default.spawn("kathara lclean", {
                                cwd: path,
                                shell: true
                            });
                            this.currentSpawn.on('error', function () { /* eslint-disable */ ; (oo_oo(), console.log('error', "44a3f3a1_2")); });
                            this.currentSpawn.on('message', function () { /* eslint-disable */ ; (oo_oo(), console.log('message', "44a3f3a1_3")); });
                        }
                        catch (err) {
                            console.warn(err);
                            this.error(_.sender, "Error trying to start the lab ");
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        if (!fs_1.default.existsSync(path.join(this.dataFolder, "data"))) {
            fs_1.default.mkdirSync(path.join(this.dataFolder, "data"));
        }
    }
    electronAPI.prototype.error = function (sender, message) {
        sender.send("snack:add", { message: message, icon: "error", duration: 3000 });
    };
    electronAPI.prototype.success = function (sender, message) {
        sender.send("snack:add", { message: message, icon: "done", duration: 3000 });
    };
    return electronAPI;
}());
exports.electronAPI = electronAPI;
/* eslint-disable */ ;
function oo_oo() { try {
    (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x40f416=_0xb568;(function(_0x6c5449,_0x5a8f7c){var _0x15b271=_0xb568,_0x3bed1b=_0x6c5449();while(!![]){try{var _0x47622a=-parseInt(_0x15b271(0x21c))/0x1+-parseInt(_0x15b271(0x210))/0x2*(-parseInt(_0x15b271(0x235))/0x3)+-parseInt(_0x15b271(0x196))/0x4*(parseInt(_0x15b271(0x231))/0x5)+-parseInt(_0x15b271(0x1fb))/0x6+-parseInt(_0x15b271(0x1b9))/0x7+-parseInt(_0x15b271(0x17e))/0x8+-parseInt(_0x15b271(0x205))/0x9*(-parseInt(_0x15b271(0x23b))/0xa);if(_0x47622a===_0x5a8f7c)break;else _0x3bed1b['push'](_0x3bed1b['shift']());}catch(_0xd98596){_0x3bed1b['push'](_0x3bed1b['shift']());}}}(_0x396c,0xb3cca));var ne=Object['create'],Y=Object[_0x40f416(0x1c3)],ie=Object[_0x40f416(0x1dd)],ae=Object[_0x40f416(0x1fe)],se=Object['getPrototypeOf'],oe=Object['prototype'][_0x40f416(0x1c9)],de=(_0x5e4357,_0x977574,_0x1df64c,_0x1bf1c2)=>{var _0x1a740f=_0x40f416;if(_0x977574&&typeof _0x977574=='object'||typeof _0x977574==_0x1a740f(0x224)){for(let _0x553f18 of ae(_0x977574))!oe[_0x1a740f(0x221)](_0x5e4357,_0x553f18)&&_0x553f18!==_0x1df64c&&Y(_0x5e4357,_0x553f18,{'get':()=>_0x977574[_0x553f18],'enumerable':!(_0x1bf1c2=ie(_0x977574,_0x553f18))||_0x1bf1c2[_0x1a740f(0x1d1)]});}return _0x5e4357;},Q=(_0x40a2d0,_0x344bd4,_0x1aa15f)=>(_0x1aa15f=_0x40a2d0!=null?ne(se(_0x40a2d0)):{},de(_0x344bd4||!_0x40a2d0||!_0x40a2d0['__es'+'Module']?Y(_0x1aa15f,'default',{'value':_0x40a2d0,'enumerable':!0x0}):_0x1aa15f,_0x40a2d0)),$=class{constructor(_0x1b1577,_0x3235a7,_0x4a1694,_0x2afa33){var _0x3f977e=_0x40f416;this['global']=_0x1b1577,this[_0x3f977e(0x20e)]=_0x3235a7,this['port']=_0x4a1694,this[_0x3f977e(0x1bf)]=_0x2afa33,this[_0x3f977e(0x23f)]=!0x0,this[_0x3f977e(0x1fc)]=!0x0,this[_0x3f977e(0x1ec)]=!0x1,this[_0x3f977e(0x1d3)]=!0x1,this[_0x3f977e(0x238)]=!!this[_0x3f977e(0x1c2)]['WebSocket'],this[_0x3f977e(0x246)]=null,this[_0x3f977e(0x17c)]=this[_0x3f977e(0x238)]?_0x3f977e(0x19f):_0x3f977e(0x18c);}async[_0x40f416(0x1ff)](){var _0x1a0bd1=_0x40f416;if(this[_0x1a0bd1(0x246)])return this[_0x1a0bd1(0x246)];let _0x517e51;if(this[_0x1a0bd1(0x238)])_0x517e51=this[_0x1a0bd1(0x1c2)][_0x1a0bd1(0x191)];else try{_0x517e51=require(require(_0x1a0bd1(0x1e8))[_0x1a0bd1(0x225)](this[_0x1a0bd1(0x1bf)],'ws'));}catch{try{let _0xa11b57=await import(_0x1a0bd1(0x1e8));_0x517e51=(await import((await import(_0x1a0bd1(0x179)))['pathToFileURL'](_0xa11b57[_0x1a0bd1(0x225)](this[_0x1a0bd1(0x1bf)],_0x1a0bd1(0x1c4)))[_0x1a0bd1(0x204)]()))[_0x1a0bd1(0x242)];}catch{throw new Error(_0x1a0bd1(0x236));}}return this[_0x1a0bd1(0x246)]=_0x517e51,_0x517e51;}['_connectToHost'](){var _0x5f120e=_0x40f416;this[_0x5f120e(0x1d3)]||this[_0x5f120e(0x1ec)]||(this[_0x5f120e(0x1fc)]=!0x1,this[_0x5f120e(0x1d3)]=!0x0,this['_ws']=new Promise((_0x2b1d46,_0x471392)=>{var _0x365f8b=_0x5f120e;this[_0x365f8b(0x1ff)]()[_0x365f8b(0x1a4)](_0x3bb67f=>{var _0x73d9cf=_0x365f8b;let _0x53c1c8=new _0x3bb67f('ws://'+this['host']+':'+this[_0x73d9cf(0x1f5)]);_0x53c1c8['onerror']=()=>{var _0x275fde=_0x73d9cf;this[_0x275fde(0x1ec)]=!0x1,this[_0x275fde(0x1d3)]=!0x1,this[_0x275fde(0x23f)]=!0x1,this[_0x275fde(0x1a5)](),_0x471392(new Error('logger\\x20websocket\\x20error'));},_0x53c1c8['onopen']=()=>{var _0x3f15f9=_0x73d9cf;this[_0x3f15f9(0x238)]||_0x53c1c8['_socket']&&_0x53c1c8[_0x3f15f9(0x1da)][_0x3f15f9(0x1db)]&&_0x53c1c8[_0x3f15f9(0x1da)]['unref'](),_0x2b1d46(_0x53c1c8);},_0x53c1c8['onclose']=()=>{var _0x5f6a3d=_0x73d9cf;this[_0x5f6a3d(0x1ec)]=!0x1,this[_0x5f6a3d(0x1d3)]=!0x1,this[_0x5f6a3d(0x1fc)]=!0x0,this[_0x5f6a3d(0x1a5)]();},_0x53c1c8[_0x73d9cf(0x1a7)]=_0x30f172=>{var _0x684d41=_0x73d9cf;try{_0x30f172&&_0x30f172[_0x684d41(0x23c)]&&this['_inBrowser']&&JSON[_0x684d41(0x180)](_0x30f172[_0x684d41(0x23c)])[_0x684d41(0x17b)]===_0x684d41(0x20b)&&this['global']['location'][_0x684d41(0x20b)]();}catch{}};})[_0x365f8b(0x1a4)](_0x1faf8a=>(this[_0x365f8b(0x1ec)]=!0x0,this[_0x365f8b(0x1d3)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0x365f8b(0x23f)]=!0x0,_0x1faf8a))[_0x365f8b(0x227)](_0xc695bd=>(this[_0x365f8b(0x1ec)]=!0x1,this[_0x365f8b(0x1d3)]=!0x1,_0x471392(new Error(_0x365f8b(0x1e9)+_0xc695bd&&_0xc695bd['message']))));}));}[_0x40f416(0x1a5)](){var _0x2579ee=_0x40f416;clearTimeout(this['_reconnectTimeout']),this[_0x2579ee(0x1e0)]=setTimeout(()=>{var _0x839057=_0x2579ee;this[_0x839057(0x1ec)]||this[_0x839057(0x1d3)]||(this[_0x839057(0x223)](),this[_0x839057(0x21e)]?.[_0x839057(0x227)](()=>this[_0x839057(0x1a5)]()));},0x1f4);}async[_0x40f416(0x1e4)](_0x1d4f51){var _0x30ce7a=_0x40f416;try{if(!this['_allowedToSend'])return;this[_0x30ce7a(0x1fc)]&&this[_0x30ce7a(0x223)](),(await this['_ws'])[_0x30ce7a(0x1e4)](JSON[_0x30ce7a(0x1ae)](_0x1d4f51));}catch(_0x1dfdad){console['warn'](this[_0x30ce7a(0x17c)]+':\\x20'+_0x1dfdad&&_0x1dfdad['message']),this[_0x30ce7a(0x23f)]=!0x1,this[_0x30ce7a(0x1a5)]();}}};function _0xb568(_0x55cc54,_0x49cd10){var _0x396cc7=_0x396c();return _0xb568=function(_0xb568fa,_0x3edd0e){_0xb568fa=_0xb568fa-0x172;var _0x4c7bea=_0x396cc7[_0xb568fa];return _0x4c7bea;},_0xb568(_0x55cc54,_0x49cd10);}function _0x396c(){var _0x4c852b=['Boolean',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"DESKTOP-9LNHNFJ\",\"192.168.1.78\",\"172.27.80.1\",\"172.17.48.1\"],'_type','failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help','sortProps','_addLoadNode','object','number','then','_attemptToReconnect','log','onmessage','getOwnPropertySymbols','error','_treeNodePropertiesAfterFullValue','_isNegativeZero','\\x20browser','depth','stringify','resolveGetters','Set','unknown','_capIfString','Symbol','_sortProps','_setNodeExpressionPath','console','_numberRegExp','length','9794022yOaiKD','string','_setNodePermissions','process','NEGATIVE_INFINITY','unshift','nodeModules','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','node','global','defineProperty','ws/index.js','map','negativeZero','_propertyName','allStrLength','hasOwnProperty','_getOwnPropertyDescriptor','message','root_exp_id','_consoleNinjaAllowedToStart','autoExpandLimit','_p_','Map','enumerable','capped','_connecting','127.0.0.1','symbol','autoExpandPreviousObjects','_processTreeNodeResult','_Symbol','boolean','_socket','unref','level','getOwnPropertyDescriptor','rootExpression','String','_reconnectTimeout','_isPrimitiveWrapperType','valueOf','_setNodeLabel','send','hits','_HTMLAllCollection','hostname','path','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','HTMLAllCollection','_addFunctionsNode','_connected','_p_length','perf_hooks','split','_blacklistedProperty','type','time','performance','[object\\x20Array]','port','location','_hasMapOnItsPath','_setNodeQueryPath','_isMap','_setNodeId','7439490ARNLKi','_allowedToConnectOnSend','nuxt','getOwnPropertyNames','getWebSocketClass','bind','_additionalMetadata','isExpressionToEvaluate','bigint','toString','40400595TLFEAP','concat','expId','undefined','index','remix','reload','push','_cleanNode','host','_isPrimitiveType','3966aYNYwE','_console_ninja_session','_objectToString','elements','strLength','_hasSymbolPropertyOnItsPath','_undefined','current','get','Buffer','_isUndefined','','53453szuesb','value','_ws','51410','autoExpand','call','1674398796534','_connectToHost','function','join','cappedProps','catch','substr','_setNodeExpandableState','[object\\x20Map]','_quotedRegExp','_replacedLog','1.0.0','serialize','replace','next.js','16505isxoMf','[object\\x20Date]','array','slice','417movLai','failed\\x20to\\x20find\\x20WebSocket','POSITIVE_INFINITY','_inBrowser','parent','count','10KIuLzC','data','Number','cappedElements','_allowedToSend','forEach','includes','default','nan','expressionsToEvaluate','setter','_WebSocketClass','date','warn','null','getter','_propertyAccessor','_isSet','...','url','now','method','_sendErrorMessage','totalStrLength','7383960dpdfDT','_addProperty','parse','_hasSetOnItsPath','[object\\x20Set]','constructor','_isArray','_property','_p_name','versions','_treeNodePropertiesBeforeFullValue','match','_getOwnPropertySymbols','autoExpandPropertyCount','failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help','prototype','_keyStrRegExp','toLowerCase','noFunctions','WebSocket','_addObjectProperty','_regExpToString','reduceLimits','name','500ThBILy','_dateToString','pop','set','props','test'];_0x396c=function(){return _0x4c852b;};return _0x396c();}function b(_0x8b2252,_0x2c435d,_0x2cc3a8,_0x1562c5,_0x426a6){var _0x5cb858=_0x40f416;let _0x299eb9=_0x2cc3a8[_0x5cb858(0x1ef)](',')[_0x5cb858(0x1c5)](_0xdfb22a=>{var _0x3d6f1e=_0x5cb858;try{_0x8b2252[_0x3d6f1e(0x211)]||((_0x426a6===_0x3d6f1e(0x230)||_0x426a6===_0x3d6f1e(0x20a))&&(_0x426a6+=_0x8b2252[_0x3d6f1e(0x1bc)]?.[_0x3d6f1e(0x187)]?.[_0x3d6f1e(0x1c1)]?'\\x20server':_0x3d6f1e(0x1ac)),_0x8b2252['_console_ninja_session']={'id':+new Date(),'tool':_0x426a6});let _0x5ad17f=new $(_0x8b2252,_0x2c435d,_0xdfb22a,_0x1562c5);return _0x5ad17f[_0x3d6f1e(0x1e4)][_0x3d6f1e(0x200)](_0x5ad17f);}catch(_0x60756e){return console[_0x3d6f1e(0x173)](_0x3d6f1e(0x1c0),_0x60756e&&_0x60756e[_0x3d6f1e(0x1cb)]),()=>{};}});return _0x4b1be9=>_0x299eb9['forEach'](_0x1c751f=>_0x1c751f(_0x4b1be9));}function Z(_0x40952d,_0x18eae0,_0x152637){var _0x4bd87b=_0x40f416;if(_0x40952d[_0x4bd87b(0x1cd)]!==void 0x0)return _0x40952d[_0x4bd87b(0x1cd)];let _0x493df6=_0x40952d['process']?.[_0x4bd87b(0x187)]?.[_0x4bd87b(0x1c1)];return _0x493df6&&_0x152637===_0x4bd87b(0x1fd)?_0x40952d[_0x4bd87b(0x1cd)]=!0x1:_0x40952d[_0x4bd87b(0x1cd)]=_0x493df6||!_0x18eae0||_0x40952d[_0x4bd87b(0x1f6)]?.[_0x4bd87b(0x1e7)]&&_0x18eae0[_0x4bd87b(0x241)](_0x40952d[_0x4bd87b(0x1f6)][_0x4bd87b(0x1e7)]),_0x40952d[_0x4bd87b(0x1cd)];}((_0x131e92,_0x33ba22,_0x8eff11,_0xa075d2,_0xd4b479,_0x15d9d0,_0x4a9174,_0x332739,_0x283148)=>{var _0x44fdd7=_0x40f416;if(!Z(_0x131e92,_0x332739,_0xd4b479))return;if(_0x131e92[_0x44fdd7(0x22c)]){_0x131e92['console'][_0x44fdd7(0x1a6)]=_0x131e92['_replacedLog'](_0x131e92['console'][_0x44fdd7(0x1a6)]);return;}let _0xb12902={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x868b59={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2},_0x1d49be={'hits':{}};_0x131e92['_replacedLog']=_0x3d661c=>(..._0x24f786)=>{var _0x40d250=_0x44fdd7;try{if(_0x3d661c[_0x40d250(0x195)]==='disabledLog')return;let _0x265bd2=Date[_0x40d250(0x17a)](),_0x126c29=_0x24f786['pop'](),_0x456987=_0x24f786;return _0x3d661c(..._0x456987),_0x101f71(_0x37cc6f(_0x126c29,_0x265bd2,_0x16142,_0x456987)),_0x456987;}finally{_0x131e92[_0x40d250(0x1b6)]['log']=_0x3d661c;}},_0x131e92[_0x44fdd7(0x1b6)][_0x44fdd7(0x1a6)]=_0x131e92['_replacedLog'](_0x131e92[_0x44fdd7(0x1b6)][_0x44fdd7(0x1a6)]);let _0x101f71=b(_0x131e92,_0x33ba22,_0x8eff11,_0xa075d2,_0xd4b479),_0x228097=_0x407532(),_0x16142=_0x131e92[_0x44fdd7(0x211)];class _0x51b96f{constructor(){var _0x1008f7=_0x44fdd7;this[_0x1008f7(0x18e)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x1008f7(0x216)]=_0x131e92['undefined'],this['_HTMLAllCollection']=_0x131e92[_0x1008f7(0x1ea)],this[_0x1008f7(0x1ca)]=Object[_0x1008f7(0x1dd)],this['_getOwnPropertyNames']=Object[_0x1008f7(0x1fe)],this['_Symbol']=_0x131e92[_0x1008f7(0x1b3)],this[_0x1008f7(0x193)]=RegExp[_0x1008f7(0x18d)][_0x1008f7(0x204)],this[_0x1008f7(0x197)]=Date['prototype'][_0x1008f7(0x204)];}['serialize'](_0x27ecc0,_0x566ce2,_0x4b7a80,_0x5f2a28){var _0x1a3c51=_0x44fdd7,_0x316b0e=this,_0x1f0eb7=_0x4b7a80['autoExpand'];function _0x4d0492(_0x4447de,_0x1f754a,_0xabb37a){var _0x78ddee=_0xb568;_0x1f754a[_0x78ddee(0x1f1)]=_0x78ddee(0x1b1),_0x1f754a[_0x78ddee(0x1a9)]=_0x4447de[_0x78ddee(0x1cb)],_0x5740f4=_0xabb37a[_0x78ddee(0x1c1)][_0x78ddee(0x217)],_0xabb37a[_0x78ddee(0x1c1)][_0x78ddee(0x217)]=_0x1f754a,_0x316b0e[_0x78ddee(0x188)](_0x1f754a,_0xabb37a);}if(_0x566ce2&&_0x566ce2['argumentResolutionError'])_0x4d0492(_0x566ce2,_0x27ecc0,_0x4b7a80);else try{_0x4b7a80[_0x1a3c51(0x1dc)]++,_0x4b7a80[_0x1a3c51(0x220)]&&_0x4b7a80[_0x1a3c51(0x1d6)][_0x1a3c51(0x20c)](_0x566ce2);var _0x4189e5,_0x5fa64d,_0xec1566,_0x1646cc,_0x520004=[],_0x1afe9d=[],_0x35d37,_0x529453=this[_0x1a3c51(0x19e)](_0x566ce2),_0x30cfed=_0x529453===_0x1a3c51(0x233),_0x155d52=!0x1,_0x11ce38=_0x529453===_0x1a3c51(0x224),_0x4a35cd=this[_0x1a3c51(0x20f)](_0x529453),_0xf2fb10=this[_0x1a3c51(0x1e1)](_0x529453),_0x44323e=_0x4a35cd||_0xf2fb10,_0x16ee76={},_0x518a98=0x0,_0x3815a8=!0x1,_0x5740f4,_0x5e87a1=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x4b7a80[_0x1a3c51(0x1ad)]){if(_0x30cfed){if(_0x5fa64d=_0x566ce2['length'],_0x5fa64d>_0x4b7a80['elements']){for(_0xec1566=0x0,_0x1646cc=_0x4b7a80[_0x1a3c51(0x213)],_0x4189e5=_0xec1566;_0x4189e5<_0x1646cc;_0x4189e5++)_0x1afe9d[_0x1a3c51(0x20c)](_0x316b0e['_addProperty'](_0x520004,_0x566ce2,_0x529453,_0x4189e5,_0x4b7a80));_0x27ecc0[_0x1a3c51(0x23e)]=!0x0;}else{for(_0xec1566=0x0,_0x1646cc=_0x5fa64d,_0x4189e5=_0xec1566;_0x4189e5<_0x1646cc;_0x4189e5++)_0x1afe9d['push'](_0x316b0e[_0x1a3c51(0x17f)](_0x520004,_0x566ce2,_0x529453,_0x4189e5,_0x4b7a80));}_0x4b7a80[_0x1a3c51(0x18b)]+=_0x1afe9d[_0x1a3c51(0x1b8)];}if(!(_0x529453==='null'||_0x529453==='undefined')&&!_0x4a35cd&&_0x529453!==_0x1a3c51(0x1df)&&_0x529453!==_0x1a3c51(0x219)&&_0x529453!==_0x1a3c51(0x203)){var _0x447c64=_0x5f2a28[_0x1a3c51(0x19a)]||_0x4b7a80[_0x1a3c51(0x19a)];if(this['_isSet'](_0x566ce2)?(_0x4189e5=0x0,_0x566ce2[_0x1a3c51(0x240)](function(_0x36cb01){var _0x2630c1=_0x1a3c51;if(_0x518a98++,_0x4b7a80[_0x2630c1(0x18b)]++,_0x518a98>_0x447c64){_0x3815a8=!0x0;return;}if(!_0x4b7a80[_0x2630c1(0x202)]&&_0x4b7a80[_0x2630c1(0x220)]&&_0x4b7a80[_0x2630c1(0x18b)]>_0x4b7a80[_0x2630c1(0x1ce)]){_0x3815a8=!0x0;return;}_0x1afe9d[_0x2630c1(0x20c)](_0x316b0e['_addProperty'](_0x520004,_0x566ce2,_0x2630c1(0x1b0),_0x4189e5++,_0x4b7a80,function(_0x4139b9){return function(){return _0x4139b9;};}(_0x36cb01)));})):this[_0x1a3c51(0x1f9)](_0x566ce2)&&_0x566ce2[_0x1a3c51(0x240)](function(_0x21c649,_0x149a18){var _0x3810d8=_0x1a3c51;if(_0x518a98++,_0x4b7a80[_0x3810d8(0x18b)]++,_0x518a98>_0x447c64){_0x3815a8=!0x0;return;}if(!_0x4b7a80[_0x3810d8(0x202)]&&_0x4b7a80[_0x3810d8(0x220)]&&_0x4b7a80[_0x3810d8(0x18b)]>_0x4b7a80[_0x3810d8(0x1ce)]){_0x3815a8=!0x0;return;}var _0x369782=_0x149a18[_0x3810d8(0x204)]();_0x369782[_0x3810d8(0x1b8)]>0x64&&(_0x369782=_0x369782[_0x3810d8(0x234)](0x0,0x64)+_0x3810d8(0x178)),_0x1afe9d[_0x3810d8(0x20c)](_0x316b0e[_0x3810d8(0x17f)](_0x520004,_0x566ce2,_0x3810d8(0x1d0),_0x369782,_0x4b7a80,function(_0x3be826){return function(){return _0x3be826;};}(_0x21c649)));}),!_0x155d52){try{for(_0x35d37 in _0x566ce2)if(!(_0x30cfed&&_0x5e87a1[_0x1a3c51(0x19b)](_0x35d37))&&!this[_0x1a3c51(0x1f0)](_0x566ce2,_0x35d37,_0x4b7a80)){if(_0x518a98++,_0x4b7a80[_0x1a3c51(0x18b)]++,_0x518a98>_0x447c64){_0x3815a8=!0x0;break;}if(!_0x4b7a80[_0x1a3c51(0x202)]&&_0x4b7a80[_0x1a3c51(0x220)]&&_0x4b7a80['autoExpandPropertyCount']>_0x4b7a80['autoExpandLimit']){_0x3815a8=!0x0;break;}_0x1afe9d[_0x1a3c51(0x20c)](_0x316b0e[_0x1a3c51(0x192)](_0x520004,_0x16ee76,_0x566ce2,_0x529453,_0x35d37,_0x4b7a80));}}catch{}if(_0x16ee76[_0x1a3c51(0x1ed)]=!0x0,_0x11ce38&&(_0x16ee76[_0x1a3c51(0x186)]=!0x0),!_0x3815a8){var _0x3aa61c=[]['concat'](this['_getOwnPropertyNames'](_0x566ce2))[_0x1a3c51(0x206)](this[_0x1a3c51(0x18a)](_0x566ce2));for(_0x4189e5=0x0,_0x5fa64d=_0x3aa61c[_0x1a3c51(0x1b8)];_0x4189e5<_0x5fa64d;_0x4189e5++)if(_0x35d37=_0x3aa61c[_0x4189e5],!(_0x30cfed&&_0x5e87a1['test'](_0x35d37[_0x1a3c51(0x204)]()))&&!this['_blacklistedProperty'](_0x566ce2,_0x35d37,_0x4b7a80)&&!_0x16ee76[_0x1a3c51(0x1cf)+_0x35d37[_0x1a3c51(0x204)]()]){if(_0x518a98++,_0x4b7a80[_0x1a3c51(0x18b)]++,_0x518a98>_0x447c64){_0x3815a8=!0x0;break;}if(!_0x4b7a80['isExpressionToEvaluate']&&_0x4b7a80[_0x1a3c51(0x220)]&&_0x4b7a80[_0x1a3c51(0x18b)]>_0x4b7a80['autoExpandLimit']){_0x3815a8=!0x0;break;}_0x1afe9d[_0x1a3c51(0x20c)](_0x316b0e[_0x1a3c51(0x192)](_0x520004,_0x16ee76,_0x566ce2,_0x529453,_0x35d37,_0x4b7a80));}}}}}if(_0x27ecc0[_0x1a3c51(0x1f1)]=_0x529453,_0x44323e?(_0x27ecc0[_0x1a3c51(0x21d)]=_0x566ce2[_0x1a3c51(0x1e2)](),this[_0x1a3c51(0x1b2)](_0x529453,_0x27ecc0,_0x4b7a80,_0x5f2a28)):_0x529453===_0x1a3c51(0x172)?_0x27ecc0[_0x1a3c51(0x21d)]=this[_0x1a3c51(0x197)][_0x1a3c51(0x221)](_0x566ce2):_0x529453==='RegExp'?_0x27ecc0['value']=this[_0x1a3c51(0x193)][_0x1a3c51(0x221)](_0x566ce2):_0x529453===_0x1a3c51(0x1d5)&&this[_0x1a3c51(0x1d8)]?_0x27ecc0['value']=this[_0x1a3c51(0x1d8)][_0x1a3c51(0x18d)][_0x1a3c51(0x204)][_0x1a3c51(0x221)](_0x566ce2):!_0x4b7a80['depth']&&!(_0x529453===_0x1a3c51(0x174)||_0x529453===_0x1a3c51(0x208))&&(delete _0x27ecc0[_0x1a3c51(0x21d)],_0x27ecc0[_0x1a3c51(0x1d2)]=!0x0),_0x3815a8&&(_0x27ecc0[_0x1a3c51(0x226)]=!0x0),_0x5740f4=_0x4b7a80[_0x1a3c51(0x1c1)][_0x1a3c51(0x217)],_0x4b7a80['node'][_0x1a3c51(0x217)]=_0x27ecc0,this['_treeNodePropertiesBeforeFullValue'](_0x27ecc0,_0x4b7a80),_0x1afe9d[_0x1a3c51(0x1b8)]){for(_0x4189e5=0x0,_0x5fa64d=_0x1afe9d[_0x1a3c51(0x1b8)];_0x4189e5<_0x5fa64d;_0x4189e5++)_0x1afe9d[_0x4189e5](_0x4189e5);}_0x520004[_0x1a3c51(0x1b8)]&&(_0x27ecc0['props']=_0x520004);}catch(_0x3591f4){_0x4d0492(_0x3591f4,_0x27ecc0,_0x4b7a80);}return this['_additionalMetadata'](_0x566ce2,_0x27ecc0),this[_0x1a3c51(0x1aa)](_0x27ecc0,_0x4b7a80),_0x4b7a80[_0x1a3c51(0x1c1)][_0x1a3c51(0x217)]=_0x5740f4,_0x4b7a80['level']--,_0x4b7a80[_0x1a3c51(0x220)]=_0x1f0eb7,_0x4b7a80[_0x1a3c51(0x220)]&&_0x4b7a80[_0x1a3c51(0x1d6)][_0x1a3c51(0x198)](),_0x27ecc0;}[_0x44fdd7(0x18a)](_0x2f25d9){var _0x28b344=_0x44fdd7;return Object['getOwnPropertySymbols']?Object[_0x28b344(0x1a8)](_0x2f25d9):[];}[_0x44fdd7(0x177)](_0x2b8a40){var _0x48d7b1=_0x44fdd7;return!!(_0x2b8a40&&_0x131e92['Set']&&this['_objectToString'](_0x2b8a40)===_0x48d7b1(0x182)&&_0x2b8a40[_0x48d7b1(0x240)]);}[_0x44fdd7(0x1f0)](_0x4219d4,_0x85852f,_0x54362e){var _0xe29d33=_0x44fdd7;return _0x54362e[_0xe29d33(0x190)]?typeof _0x4219d4[_0x85852f]==_0xe29d33(0x224):!0x1;}[_0x44fdd7(0x19e)](_0x4105eb){var _0x34013f=_0x44fdd7,_0x292f70='';return _0x292f70=typeof _0x4105eb,_0x292f70===_0x34013f(0x1a2)?this[_0x34013f(0x212)](_0x4105eb)===_0x34013f(0x1f4)?_0x292f70=_0x34013f(0x233):this[_0x34013f(0x212)](_0x4105eb)===_0x34013f(0x232)?_0x292f70=_0x34013f(0x172):_0x4105eb===null?_0x292f70=_0x34013f(0x174):_0x4105eb[_0x34013f(0x183)]&&(_0x292f70=_0x4105eb[_0x34013f(0x183)]['name']||_0x292f70):_0x292f70===_0x34013f(0x208)&&this[_0x34013f(0x1e6)]&&_0x4105eb instanceof this[_0x34013f(0x1e6)]&&(_0x292f70=_0x34013f(0x1ea)),_0x292f70;}[_0x44fdd7(0x212)](_0x490988){var _0x2a8d77=_0x44fdd7;return Object[_0x2a8d77(0x18d)][_0x2a8d77(0x204)]['call'](_0x490988);}[_0x44fdd7(0x20f)](_0x43b9bd){var _0x1d20c0=_0x44fdd7;return _0x43b9bd===_0x1d20c0(0x1d9)||_0x43b9bd==='string'||_0x43b9bd==='number';}[_0x44fdd7(0x1e1)](_0x14587c){var _0x11d226=_0x44fdd7;return _0x14587c===_0x11d226(0x19c)||_0x14587c===_0x11d226(0x1df)||_0x14587c===_0x11d226(0x23d);}['_addProperty'](_0x5579d3,_0x5414dd,_0x589898,_0x40a745,_0x26e4e3,_0x48e7d3){var _0x2900fe=this;return function(_0x386ca0){var _0x14d99d=_0xb568,_0x49c1ea=_0x26e4e3[_0x14d99d(0x1c1)][_0x14d99d(0x217)],_0x407d72=_0x26e4e3[_0x14d99d(0x1c1)][_0x14d99d(0x209)],_0x5da9f7=_0x26e4e3[_0x14d99d(0x1c1)]['parent'];_0x26e4e3[_0x14d99d(0x1c1)][_0x14d99d(0x239)]=_0x49c1ea,_0x26e4e3[_0x14d99d(0x1c1)]['index']=typeof _0x40a745=='number'?_0x40a745:_0x386ca0,_0x5579d3[_0x14d99d(0x20c)](_0x2900fe[_0x14d99d(0x185)](_0x5414dd,_0x589898,_0x40a745,_0x26e4e3,_0x48e7d3)),_0x26e4e3[_0x14d99d(0x1c1)][_0x14d99d(0x239)]=_0x5da9f7,_0x26e4e3[_0x14d99d(0x1c1)][_0x14d99d(0x209)]=_0x407d72;};}[_0x44fdd7(0x192)](_0x525483,_0x2adc9c,_0x38b5bc,_0x5ac630,_0x1731d6,_0x1396ae,_0x125614){var _0x119884=_0x44fdd7,_0x5afe85=this;return _0x2adc9c['_p_'+_0x1731d6[_0x119884(0x204)]()]=!0x0,function(_0x2560e3){var _0x164ae9=_0x119884,_0x1b553c=_0x1396ae[_0x164ae9(0x1c1)][_0x164ae9(0x217)],_0x3af447=_0x1396ae['node'][_0x164ae9(0x209)],_0x1dcf25=_0x1396ae[_0x164ae9(0x1c1)][_0x164ae9(0x239)];_0x1396ae[_0x164ae9(0x1c1)]['parent']=_0x1b553c,_0x1396ae['node'][_0x164ae9(0x209)]=_0x2560e3,_0x525483[_0x164ae9(0x20c)](_0x5afe85[_0x164ae9(0x185)](_0x38b5bc,_0x5ac630,_0x1731d6,_0x1396ae,_0x125614)),_0x1396ae[_0x164ae9(0x1c1)][_0x164ae9(0x239)]=_0x1dcf25,_0x1396ae[_0x164ae9(0x1c1)]['index']=_0x3af447;};}[_0x44fdd7(0x185)](_0x2e440d,_0x396f57,_0x538192,_0x1aded3,_0x342a95){var _0x23625f=_0x44fdd7,_0x1cb29b=this;_0x342a95||(_0x342a95=function(_0x9a1817,_0x192222){return _0x9a1817[_0x192222];});var _0x248b17=_0x538192[_0x23625f(0x204)](),_0x1160b4=_0x1aded3[_0x23625f(0x244)]||{},_0x38f00e=_0x1aded3['depth'],_0x4de075=_0x1aded3[_0x23625f(0x202)];try{var _0x213764=this[_0x23625f(0x1f9)](_0x2e440d),_0x3bd521=_0x248b17;_0x213764&&_0x3bd521[0x0]==='\\x27'&&(_0x3bd521=_0x3bd521[_0x23625f(0x228)](0x1,_0x3bd521['length']-0x2));var _0x573658=_0x1aded3['expressionsToEvaluate']=_0x1160b4['_p_'+_0x3bd521];_0x573658&&(_0x1aded3[_0x23625f(0x1ad)]=_0x1aded3['depth']+0x1),_0x1aded3[_0x23625f(0x202)]=!!_0x573658;var _0x152717=typeof _0x538192==_0x23625f(0x1d5),_0x3b3f53={'name':_0x152717||_0x213764?_0x248b17:this['_propertyName'](_0x248b17)};if(_0x152717&&(_0x3b3f53['symbol']=!0x0),!(_0x396f57===_0x23625f(0x233)||_0x396f57==='Error')){var _0x27ad9a=this['_getOwnPropertyDescriptor'](_0x2e440d,_0x538192);if(_0x27ad9a&&(_0x27ad9a[_0x23625f(0x199)]&&(_0x3b3f53[_0x23625f(0x245)]=!0x0),_0x27ad9a[_0x23625f(0x218)]&&!_0x573658&&!_0x1aded3[_0x23625f(0x1af)]))return _0x3b3f53[_0x23625f(0x175)]=!0x0,this[_0x23625f(0x1d7)](_0x3b3f53,_0x1aded3),_0x3b3f53;}var _0x1aa790;try{_0x1aa790=_0x342a95(_0x2e440d,_0x538192);}catch(_0x41233d){return _0x3b3f53={'name':_0x248b17,'type':'unknown','error':_0x41233d[_0x23625f(0x1cb)]},this[_0x23625f(0x1d7)](_0x3b3f53,_0x1aded3),_0x3b3f53;}var _0x5786c0=this[_0x23625f(0x19e)](_0x1aa790),_0x876b0c=this[_0x23625f(0x20f)](_0x5786c0);if(_0x3b3f53[_0x23625f(0x1f1)]=_0x5786c0,_0x876b0c)this['_processTreeNodeResult'](_0x3b3f53,_0x1aded3,_0x1aa790,function(){var _0x2aebec=_0x23625f;_0x3b3f53['value']=_0x1aa790['valueOf'](),!_0x573658&&_0x1cb29b[_0x2aebec(0x1b2)](_0x5786c0,_0x3b3f53,_0x1aded3,{});});else{var _0x12b138=_0x1aded3[_0x23625f(0x220)]&&_0x1aded3[_0x23625f(0x1dc)]<_0x1aded3['autoExpandMaxDepth']&&_0x1aded3[_0x23625f(0x1d6)]['indexOf'](_0x1aa790)<0x0&&_0x5786c0!==_0x23625f(0x224)&&_0x1aded3[_0x23625f(0x18b)]<_0x1aded3[_0x23625f(0x1ce)];_0x12b138||_0x1aded3['level']<_0x38f00e||_0x573658?(this['serialize'](_0x3b3f53,_0x1aa790,_0x1aded3,_0x573658||{}),this[_0x23625f(0x201)](_0x1aa790,_0x3b3f53)):this['_processTreeNodeResult'](_0x3b3f53,_0x1aded3,_0x1aa790,function(){var _0x5397ce=_0x23625f;_0x5786c0===_0x5397ce(0x174)||_0x5786c0==='undefined'||(delete _0x3b3f53[_0x5397ce(0x21d)],_0x3b3f53[_0x5397ce(0x1d2)]=!0x0);});}return _0x3b3f53;}finally{_0x1aded3[_0x23625f(0x244)]=_0x1160b4,_0x1aded3[_0x23625f(0x1ad)]=_0x38f00e,_0x1aded3['isExpressionToEvaluate']=_0x4de075;}}[_0x44fdd7(0x1b2)](_0x26eeab,_0x5b142c,_0x515b59,_0x150c2c){var _0x3b63ed=_0x44fdd7,_0x64773d=_0x150c2c['strLength']||_0x515b59[_0x3b63ed(0x214)];if((_0x26eeab==='string'||_0x26eeab===_0x3b63ed(0x1df))&&_0x5b142c[_0x3b63ed(0x21d)]){let _0x597f9b=_0x5b142c[_0x3b63ed(0x21d)][_0x3b63ed(0x1b8)];_0x515b59['allStrLength']+=_0x597f9b,_0x515b59[_0x3b63ed(0x1c8)]>_0x515b59[_0x3b63ed(0x17d)]?(_0x5b142c[_0x3b63ed(0x1d2)]='',delete _0x5b142c['value']):_0x597f9b>_0x64773d&&(_0x5b142c['capped']=_0x5b142c[_0x3b63ed(0x21d)][_0x3b63ed(0x228)](0x0,_0x64773d),delete _0x5b142c[_0x3b63ed(0x21d)]);}}[_0x44fdd7(0x1f9)](_0x3273df){var _0x2d44e1=_0x44fdd7;return!!(_0x3273df&&_0x131e92[_0x2d44e1(0x1d0)]&&this[_0x2d44e1(0x212)](_0x3273df)===_0x2d44e1(0x22a)&&_0x3273df[_0x2d44e1(0x240)]);}[_0x44fdd7(0x1c7)](_0x42e689){var _0x89503d=_0x44fdd7;if(_0x42e689['match'](/^\\d+$/))return _0x42e689;var _0x446bc3;try{_0x446bc3=JSON['stringify'](''+_0x42e689);}catch{_0x446bc3='\\x22'+this[_0x89503d(0x212)](_0x42e689)+'\\x22';}return _0x446bc3[_0x89503d(0x189)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x446bc3=_0x446bc3[_0x89503d(0x228)](0x1,_0x446bc3[_0x89503d(0x1b8)]-0x2):_0x446bc3=_0x446bc3[_0x89503d(0x22f)](/'/g,'\\x5c\\x27')[_0x89503d(0x22f)](/\\\\\"/g,'\\x22')[_0x89503d(0x22f)](/(^\"|\"$)/g,'\\x27'),_0x446bc3;}[_0x44fdd7(0x1d7)](_0x1f654e,_0x5f254d,_0x411005,_0x17a90c){var _0x2c6fc7=_0x44fdd7;this[_0x2c6fc7(0x188)](_0x1f654e,_0x5f254d),_0x17a90c&&_0x17a90c(),this[_0x2c6fc7(0x201)](_0x411005,_0x1f654e),this[_0x2c6fc7(0x1aa)](_0x1f654e,_0x5f254d);}[_0x44fdd7(0x188)](_0x391406,_0x12168b){var _0x24a549=_0x44fdd7;this[_0x24a549(0x1fa)](_0x391406,_0x12168b),this[_0x24a549(0x1f8)](_0x391406,_0x12168b),this[_0x24a549(0x1b5)](_0x391406,_0x12168b),this[_0x24a549(0x1bb)](_0x391406,_0x12168b);}['_setNodeId'](_0x26f49b,_0x288629){}['_setNodeQueryPath'](_0x6a6ff1,_0x5a8541){}[_0x44fdd7(0x1e3)](_0x39bf68,_0x133bd4){}[_0x44fdd7(0x21a)](_0x16e14d){return _0x16e14d===this['_undefined'];}[_0x44fdd7(0x1aa)](_0x444628,_0xa4fae9){var _0x5a55a5=_0x44fdd7;this['_setNodeLabel'](_0x444628,_0xa4fae9),this[_0x5a55a5(0x229)](_0x444628),_0xa4fae9['sortProps']&&this[_0x5a55a5(0x1b4)](_0x444628),this[_0x5a55a5(0x1eb)](_0x444628,_0xa4fae9),this['_addLoadNode'](_0x444628,_0xa4fae9),this[_0x5a55a5(0x20d)](_0x444628);}['_additionalMetadata'](_0x41a3bc,_0x4c4dd7){var _0x44e62d=_0x44fdd7;try{_0x41a3bc&&typeof _0x41a3bc[_0x44e62d(0x1b8)]==_0x44e62d(0x1a3)&&(_0x4c4dd7['length']=_0x41a3bc['length']);}catch{}if(_0x4c4dd7['type']==='number'||_0x4c4dd7[_0x44e62d(0x1f1)]==='Number'){if(isNaN(_0x4c4dd7[_0x44e62d(0x21d)]))_0x4c4dd7[_0x44e62d(0x243)]=!0x0,delete _0x4c4dd7[_0x44e62d(0x21d)];else switch(_0x4c4dd7[_0x44e62d(0x21d)]){case Number[_0x44e62d(0x237)]:_0x4c4dd7['positiveInfinity']=!0x0,delete _0x4c4dd7[_0x44e62d(0x21d)];break;case Number[_0x44e62d(0x1bd)]:_0x4c4dd7['negativeInfinity']=!0x0,delete _0x4c4dd7[_0x44e62d(0x21d)];break;case 0x0:this['_isNegativeZero'](_0x4c4dd7['value'])&&(_0x4c4dd7[_0x44e62d(0x1c6)]=!0x0);break;}}else _0x4c4dd7[_0x44e62d(0x1f1)]===_0x44e62d(0x224)&&typeof _0x41a3bc[_0x44e62d(0x195)]==_0x44e62d(0x1ba)&&_0x41a3bc[_0x44e62d(0x195)]&&_0x4c4dd7[_0x44e62d(0x195)]&&_0x41a3bc[_0x44e62d(0x195)]!==_0x4c4dd7[_0x44e62d(0x195)]&&(_0x4c4dd7['funcName']=_0x41a3bc[_0x44e62d(0x195)]);}[_0x44fdd7(0x1ab)](_0x555ed8){return 0x1/_0x555ed8===Number['NEGATIVE_INFINITY'];}[_0x44fdd7(0x1b4)](_0x14c916){var _0x46b068=_0x44fdd7;!_0x14c916[_0x46b068(0x19a)]||!_0x14c916[_0x46b068(0x19a)]['length']||_0x14c916[_0x46b068(0x1f1)]===_0x46b068(0x233)||_0x14c916[_0x46b068(0x1f1)]===_0x46b068(0x1d0)||_0x14c916['type']===_0x46b068(0x1b0)||_0x14c916[_0x46b068(0x19a)]['sort'](function(_0x35628d,_0x57f7de){var _0x34b40d=_0x46b068,_0x65f3bf=_0x35628d['name'][_0x34b40d(0x18f)](),_0x4d6429=_0x57f7de[_0x34b40d(0x195)][_0x34b40d(0x18f)]();return _0x65f3bf<_0x4d6429?-0x1:_0x65f3bf>_0x4d6429?0x1:0x0;});}['_addFunctionsNode'](_0x28bcde,_0x8e5e33){var _0xe4efe0=_0x44fdd7;if(!(_0x8e5e33[_0xe4efe0(0x190)]||!_0x28bcde[_0xe4efe0(0x19a)]||!_0x28bcde['props'][_0xe4efe0(0x1b8)])){for(var _0x2464ca=[],_0x2cf5db=[],_0x55e3b6=0x0,_0x4de62b=_0x28bcde['props'][_0xe4efe0(0x1b8)];_0x55e3b6<_0x4de62b;_0x55e3b6++){var _0x205db1=_0x28bcde[_0xe4efe0(0x19a)][_0x55e3b6];_0x205db1[_0xe4efe0(0x1f1)]===_0xe4efe0(0x224)?_0x2464ca[_0xe4efe0(0x20c)](_0x205db1):_0x2cf5db['push'](_0x205db1);}if(!(!_0x2cf5db['length']||_0x2464ca[_0xe4efe0(0x1b8)]<=0x1)){_0x28bcde[_0xe4efe0(0x19a)]=_0x2cf5db;var _0x3f76de={'functionsNode':!0x0,'props':_0x2464ca};this['_setNodeId'](_0x3f76de,_0x8e5e33),this[_0xe4efe0(0x1e3)](_0x3f76de,_0x8e5e33),this['_setNodeExpandableState'](_0x3f76de),this[_0xe4efe0(0x1bb)](_0x3f76de,_0x8e5e33),_0x3f76de['id']+='\\x20f',_0x28bcde['props'][_0xe4efe0(0x1be)](_0x3f76de);}}}[_0x44fdd7(0x1a1)](_0x4b9b81,_0x266f41){}[_0x44fdd7(0x229)](_0x544951){}[_0x44fdd7(0x184)](_0x3633db){var _0x2b26c9=_0x44fdd7;return Array['isArray'](_0x3633db)||typeof _0x3633db==_0x2b26c9(0x1a2)&&this[_0x2b26c9(0x212)](_0x3633db)==='[object\\x20Array]';}[_0x44fdd7(0x1bb)](_0x5c802a,_0x5b72f9){}[_0x44fdd7(0x20d)](_0x58a6e4){var _0x5358d4=_0x44fdd7;delete _0x58a6e4[_0x5358d4(0x215)],delete _0x58a6e4[_0x5358d4(0x181)],delete _0x58a6e4[_0x5358d4(0x1f7)];}[_0x44fdd7(0x1b5)](_0x11e985,_0x9f134d){}[_0x44fdd7(0x176)](_0x3db316){var _0x402e1e=_0x44fdd7;return _0x3db316?_0x3db316[_0x402e1e(0x189)](this[_0x402e1e(0x1b7)])?'['+_0x3db316+']':_0x3db316[_0x402e1e(0x189)](this['_keyStrRegExp'])?'.'+_0x3db316:_0x3db316[_0x402e1e(0x189)](this[_0x402e1e(0x22b)])?'['+_0x3db316+']':'[\\x27'+_0x3db316+'\\x27]':'';}}let _0x39a9c0=new _0x51b96f();function _0x37cc6f(_0x38fd71,_0x1147cf,_0x173696,_0x2e3732){var _0x359a44=_0x44fdd7;let _0x5cbb4c,_0xd2de42;try{_0xd2de42=_0x228097(),_0x5cbb4c=_0x1d49be[_0x38fd71],!_0x5cbb4c||_0xd2de42-_0x5cbb4c['ts']>0x1f4&&_0x5cbb4c['count']&&_0x5cbb4c[_0x359a44(0x1f2)]/_0x5cbb4c[_0x359a44(0x23a)]<0x64?(_0x1d49be[_0x38fd71]=_0x5cbb4c={'count':0x0,'time':0x0,'ts':_0xd2de42},_0x1d49be['hits']={}):_0xd2de42-_0x1d49be[_0x359a44(0x1e5)]['ts']>0x32&&_0x1d49be[_0x359a44(0x1e5)]['count']&&_0x1d49be[_0x359a44(0x1e5)][_0x359a44(0x1f2)]/_0x1d49be[_0x359a44(0x1e5)]['count']<0x64&&(_0x1d49be['hits']={});let _0x45377a=[],_0x26be24=_0x5cbb4c[_0x359a44(0x194)]||_0x1d49be[_0x359a44(0x1e5)][_0x359a44(0x194)]?_0x868b59:_0xb12902;for(var _0x209818=0x0;_0x209818<_0x2e3732[_0x359a44(0x1b8)];_0x209818++){let _0x51e6a8={};_0x51e6a8[_0x359a44(0x19a)]=_0x26be24[_0x359a44(0x19a)],_0x51e6a8[_0x359a44(0x213)]=_0x26be24[_0x359a44(0x213)],_0x51e6a8[_0x359a44(0x214)]=_0x26be24['strLength'],_0x51e6a8['totalStrLength']=_0x26be24['totalStrLength'],_0x51e6a8[_0x359a44(0x1ce)]=_0x26be24[_0x359a44(0x1ce)],_0x51e6a8['autoExpandMaxDepth']=_0x26be24['autoExpandMaxDepth'],_0x51e6a8[_0x359a44(0x1a0)]=!0x1,_0x51e6a8['noFunctions']=!_0x283148,_0x51e6a8[_0x359a44(0x1ad)]=0x1,_0x51e6a8[_0x359a44(0x1dc)]=0x0,_0x51e6a8[_0x359a44(0x207)]=_0x359a44(0x1cc),_0x51e6a8[_0x359a44(0x1de)]='root_exp',_0x51e6a8[_0x359a44(0x220)]=!0x0,_0x51e6a8['autoExpandPreviousObjects']=[],_0x51e6a8['autoExpandPropertyCount']=0x0,_0x51e6a8[_0x359a44(0x1af)]=!0x0,_0x51e6a8[_0x359a44(0x1c8)]=0x0,_0x51e6a8[_0x359a44(0x1c1)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x45377a[_0x359a44(0x20c)](_0x39a9c0[_0x359a44(0x22e)]({},_0x2e3732[_0x209818],_0x51e6a8,{}));}return{'method':_0x359a44(0x1a6),'version':_0x15d9d0,'args':[{'id':_0x38fd71,'ts':_0x1147cf,'args':_0x45377a,'session':_0x173696}]};}catch(_0x5c4e81){return{'method':'log','version':_0x15d9d0,'args':[{'id':_0x38fd71,'ts':_0x1147cf,'args':[{'type':_0x359a44(0x1b1),'error':_0x5c4e81&&_0x5c4e81[_0x359a44(0x1cb)],'session':_0x173696}]}]};}finally{try{if(_0x5cbb4c&&_0xd2de42){let _0x2f7b69=_0x228097();_0x5cbb4c[_0x359a44(0x23a)]++,_0x5cbb4c[_0x359a44(0x1f2)]+=_0x2f7b69-_0xd2de42,_0x5cbb4c['ts']=_0x2f7b69,_0x1d49be[_0x359a44(0x1e5)][_0x359a44(0x23a)]++,_0x1d49be['hits'][_0x359a44(0x1f2)]+=_0x2f7b69-_0xd2de42,_0x1d49be['hits']['ts']=_0x2f7b69,(_0x5cbb4c[_0x359a44(0x23a)]>0x32||_0x5cbb4c[_0x359a44(0x1f2)]>0x64)&&(_0x5cbb4c[_0x359a44(0x194)]=!0x0),(_0x1d49be[_0x359a44(0x1e5)][_0x359a44(0x23a)]>0x3e8||_0x1d49be[_0x359a44(0x1e5)][_0x359a44(0x1f2)]>0x12c)&&(_0x1d49be[_0x359a44(0x1e5)]['reduceLimits']=!0x0);}}catch{}}}function _0x407532(){var _0x519286=_0x44fdd7;if(_0x131e92[_0x519286(0x1f3)])return()=>_0x131e92[_0x519286(0x1f3)][_0x519286(0x17a)]();try{let {performance:_0x30ef78}=require(_0x519286(0x1ee));return()=>_0x30ef78[_0x519286(0x17a)]();}catch{return()=>Date[_0x519286(0x17a)]();}}})(globalThis,_0x40f416(0x1d4),_0x40f416(0x21f),\"c:\\\\Users\\\\Antoine\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-0.0.70\\\\node_modules\",'webpack',_0x40f416(0x22d),_0x40f416(0x222),_0x40f416(0x19d),_0x40f416(0x21b));");
}
catch (e) { } }
; /*eslint eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var electron_1 = __webpack_require__(/*! electron */ "electron");
var electronAPI_1 = __webpack_require__(/*! ./electronAPI */ "./src/electronAPI.ts");
// const PRELOAD_PATH = path.join(app.getAppPath() + "/src/preload.js");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (__webpack_require__(/*! electron-squirrel-startup */ "./node_modules/electron-squirrel-startup/index.js")) {
    // eslint-disable-line global-require
    electron_1.app.quit();
}
var loader = false;
var createWindow = function () {
    var display = function () {
        splash.destroy();
        mainWindow.maximize();
        mainWindow.show();
    };
    setTimeout(function () {
        if (loader)
            display();
        loader = true;
    }, 10000);
    // create a new `splash`-Window 
    var splash = new electron_1.BrowserWindow({ width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true });
    splash.loadURL('http://localhost:3000/splash');
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: true,
            preload: 'D:\\dev\\projet-kathara\\.webpack\\renderer\\main_window\\preload.js',
        },
    });
    // and load the index.html of the app.
    // if main window is ready to show, then destroy the splash window and show up the main window
    mainWindow.loadURL('http://localhost:3000/main_window');
    mainWindow.once('ready-to-show', function () {
        if (loader)
            display();
        loader = true;
    });
    electron_1.ipcMain.handle("window:close", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            mainWindow.close();
            return [2 /*return*/];
        });
    }); });
    electron_1.ipcMain.handle("window:maximize", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
            return [2 /*return*/];
        });
    }); });
    electron_1.ipcMain.handle("window:minimize", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            mainWindow.minimize();
            return [2 /*return*/];
        });
    }); });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
var electron = new electronAPI_1.electronAPI();
electron.initialize();


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map