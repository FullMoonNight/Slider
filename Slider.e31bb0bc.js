// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _render = new WeakSet();

var _getTemplate = new WeakSet();

var _createSlides = new WeakSet();

var _createTrail = new WeakSet();

var _setActiveElement = new WeakSet();

var _setAutoScroll = new WeakSet();

/* Сделать выделение активного слайда
Сделать авто-прокрутку если есть поле delay
 */
var Slider = /*#__PURE__*/function () {
  function Slider(selector, _options) {
    _classCallCheck(this, Slider);

    _setAutoScroll.add(this);

    _setActiveElement.add(this);

    _createTrail.add(this);

    _createSlides.add(this);

    _getTemplate.add(this);

    _render.add(this);

    _defineProperty(this, "eventHandler", this.eventHandler.bind(this));

    this.options = _options;
    this.$sliderMain = document.querySelector(selector);
    this.index = 1;
    this.countSlides = _options.elements.length;

    _classPrivateMethodGet(this, _render, _render2).call(this);

    this.$sliderMain.addEventListener("click", this.eventHandler);

    _classPrivateMethodGet(this, _setActiveElement, _setActiveElement2).call(this);

    _options.delay && _classPrivateMethodGet(this, _setAutoScroll, _setAutoScroll2).call(this);
  }

  _createClass(Slider, [{
    key: "scrollLeft",
    value: function scrollLeft() {
      this.index = this.index == 1 ? this.countSlides : --this.index;
      this.scrollTo(this.index);
      clearInterval(this.interval);

      _classPrivateMethodGet(this, _setAutoScroll, _setAutoScroll2).call(this);
    }
  }, {
    key: "scrollRight",
    value: function scrollRight() {
      this.index = this.index == this.countSlides ? 1 : ++this.index;
      this.scrollTo(this.index);
      clearInterval(this.interval);

      _classPrivateMethodGet(this, _setAutoScroll, _setAutoScroll2).call(this);
    }
  }, {
    key: "eventHandler",
    value: function eventHandler(evt) {
      var type = evt.target.dataset.type;

      switch (type) {
        case "arrow":
          {
            if (evt.target.dataset.arrow == "left") this.scrollLeft();else this.scrollRight();
            break;
          }

        case "trail":
          {
            this.index = +evt.target.dataset.trail;
            this.scrollTo(+evt.target.dataset.trail);
            break;
          }
      }
    }
  }, {
    key: "scrollTo",
    value: function scrollTo() {
      var slider = this.$sliderMain.querySelector(".slider");
      slider.style.left = "".concat(-(this.index - 1) * 100, "%");

      _classPrivateMethodGet(this, _setActiveElement, _setActiveElement2).call(this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$sliderMain.removeEventListener("click", this.eventHandler);
      clearInterval(this.interval);
      this.$sliderMain.innerHTML = "";
    }
  }]);

  return Slider;
}();

exports.Slider = Slider;

var _render2 = function _render2() {
  this.$sliderMain.innerHTML = _classPrivateMethodGet(this, _getTemplate, _getTemplate2).call(this);
};

var _getTemplate2 = function _getTemplate2() {
  return "\n\t\t<div class=\"container\">\n\t\t<div class=\"slider\" style=\"width: ".concat(this.options.elements.length * 100, "%\">\n\t\t\t").concat(_classPrivateMethodGet(this, _createSlides, _createSlides2).call(this, this.options), "\n\t\t</div>\n\t\t").concat(this.options.elements.length <= 1 ? "" : "\n\t\t\t<div class=\"arrows\">\n\t\t\t\t<i class=\"fas fa-chevron-left\" data-type=\"arrow\" data-arrow=\"left\"></i>\n\t\t\t\t<i class=\"fas fa-chevron-right\" data-type=\"arrow\" data-arrow=\"right\"></i>\n\t\t\t</div>", "\n\t\t<div class=\"trail\">\n\t\t\t").concat(_classPrivateMethodGet(this, _createTrail, _createTrail2).call(this, this.options), "\n\t\t</div>\n\t</div>\n\t\t");
};

var _createSlides2 = function _createSlides2(options) {
  var wrapper = document.createElement("div");
  options.elements.forEach(function (elem, index) {
    wrapper.insertAdjacentHTML("beforeend", "\n\t\t\t\t<div class=\"elem\" data-id=\"".concat(index + 1, "\">\n\t\t\t\t\t<h1>").concat(elem.title, "</h1>\n\t\t\t\t\t<p>").concat(elem.content, "</p>\n\t\t\t\t</div>"));
    elem.color && (wrapper.querySelector("[data-id=\"".concat(index + 1, "\"]")).style.backgroundColor = elem.color);
    elem.img && (wrapper.querySelector("[data-id=\"".concat(index + 1, "\"]")).style.backgroundImage = "url('".concat(elem.img, "')"));
  });
  return wrapper.innerHTML;
};

var _createTrail2 = function _createTrail2(options) {
  var wrapper = document.createElement("div");

  for (var i = 0; i < options.elements.length; ++i) {
    wrapper.insertAdjacentHTML("beforeend", "\n\t\t\t<div class=\"block-".concat(i + 1, "\" data-type=\"trail\" data-trail=\"").concat(i + 1, "\">").concat(i + 1, "</div>"));
  }

  return wrapper.innerHTML;
};

var _setActiveElement2 = function _setActiveElement2() {
  var _this = this;

  var $elems = this.$sliderMain.querySelectorAll(".elem");
  var $trails = this.$sliderMain.querySelectorAll('[data-type="trail"]');

  _toConsumableArray(this.$sliderMain.querySelectorAll(".active")).forEach(function (elem) {
    elem.classList.remove("active");
  });

  setTimeout(function () {
    $elems[_this.index - 1].classList.add("active");
  }, 200);
  $trails[this.index - 1].classList.add("active");
};

var _setAutoScroll2 = function _setAutoScroll2() {
  var _this2 = this;

  this.interval = setInterval(function () {
    _this2.scrollRight();
  }, this.options.delay);
};
},{}],"C:/Users/Даниил/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/Даниил/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/Даниил/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/Даниил/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _slider = require("./src/slider.js");

require("./src/style");

var slider = new _slider.Slider("#slider", {
  elements: [{
    title: "Element 1",
    content: "Content 1",
    color: "#d3a613"
  }, {
    title: "Element 2",
    content: "Content 2",
    img: "https://i.stack.imgur.com/fhEwl.png"
  }, {
    title: "Element 3",
    content: "Content 3",
    color: "#ffa3a3"
  }, {
    title: "Element 4",
    content: "Content 4",
    color: "#d3a613"
  }, {
    title: "Element 5",
    content: "Content 5",
    img: "https://imgfilestorage.com/1/9/47/84619.png"
  }, {
    title: "Element 6",
    content: "Content 6",
    color: "#ffa3a3"
  }],
  delay: 2000
});
window.s = slider;
},{"./src/slider.js":"src/slider.js","./src/style":"src/style.scss"}],"C:/Users/Даниил/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55077" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Даниил/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Slider.e31bb0bc.js.map