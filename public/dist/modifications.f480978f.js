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
})({"assets/js/components/modifications.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var modifications = {
  // =================== //
  // === PROPERTIES === //
  // ================= //
  // modification status :
  elementModification: false,
  // rotation :
  rotationValue: 0,
  // ================ //
  // === METHODS === //
  // ============== //
  checkModifAction: function checkModifAction() {
    if (elements.elementClicked !== false) {
      if (elements.elementClicked.classList.contains("center")) {
        modifications.elementModification = "position";
      } else if (elements.elementClicked.classList.contains("rotate")) {
        modifications.elementModification = "rotate";
      } else if (elements.elementClicked.classList.contains("resize_axes")) {
        modifications.elementModification = "resizeAxes";
      } else if (elements.elementClicked.classList.contains("resize_angles")) {
        modifications.elementModification = "resizeAngle";
        modifications.enableRound();
      } else if (elements.elementClicked.classList.contains("round_handler")) {
        modifications.elementModification = "round";

        if (elements.elementClicked.style.display === "block") {
          modifications.disableRound();
        }
      }
    }
  },
  enableRound: function enableRound() {
    if (elements.elementClicked.classList.contains("top_left")) {
      elements.currentRoundHandler = "top_left";
      elements.elemToModify.querySelector(".round_handler.top_left").style.display = "block";
    } else if (elements.elementClicked.classList.contains("top_right")) {
      elements.currentRoundHandler = "top_right";
      elements.elemToModify.querySelector(".round_handler.top_right").style.display = "block";
    } else if (elements.elementClicked.classList.contains("bottom_right")) {
      elements.currentRoundHandler = "bottom_right";
      elements.elemToModify.querySelector(".round_handler.bottom_right").style.display = "block";
    } else if (elements.elementClicked.classList.contains("bottom_left")) {
      elements.currentRoundHandler = "bottom_left";
      elements.elemToModify.querySelector(".round_handler.bottom_left").style.display = "block";
    }
  },
  disableRound: function disableRound() {
    var allRoundHandlers = document.querySelectorAll(".round_handler");

    var _iterator = _createForOfIteratorHelper(allRoundHandlers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var handler = _step.value;
        handler.style.display = "none";
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    ;
  },
  movingElement: function movingElement() {
    elements.selectElement();
    modifications.disableRound();
    var adjustValueX = handleMouse.cursorMovingPosX - handleMouse.cursorPosX;
    var adjustValueY = handleMouse.cursorMovingPosY - handleMouse.cursorPosY;

    if (handleKeys.holdShiftKey === true) {
      if (adjustValueX / adjustValueY > 0.5 || adjustValueX / adjustValueY < -0.5) {
        elements.elemToModify.style.left = elements.elementPosX + adjustValueX + "px";
      } else {
        elements.elemToModify.style.top = elements.elementPosY + adjustValueY + "px";
      }
    } else {
      elements.elemToModify.style.left = elements.elementPosX + adjustValueX + "px";
      elements.elemToModify.style.top = elements.elementPosY + adjustValueY + "px";
    }
  },
  // resizing element :
  resizeAngles: function resizeAngles() {
    elements.selectElement();
    modifications.disableRound();
    var asjustScreenX = (elements.mainContainerWidth - elements.containerWidth) / 2;
    var valuePosX = handleMouse.cursorMovingPosX - elements.elementPosX - asjustScreenX; //!

    var valuePosY = handleMouse.cursorMovingPosY - elements.elementPosY; //!

    if (modifications.elementModification === "resizeAngle") {
      if (elements.elementClicked.classList.contains("top_left")) {
        elements.elementWidth -= valuePosX;
        elements.elementHeight -= valuePosY; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosX += valuePosX / 2;
          elements.elementPosY += valuePosY / 2;
        } else {
          elements.elementPosX += valuePosX;
          elements.elementPosY += valuePosY;
        }
      } else if (elements.elementClicked.classList.contains("top_right")) {
        elements.elementWidth = valuePosX;
        elements.elementHeight -= valuePosY; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosX += (elements.initialElementWidth - valuePosX) / 2;
          elements.initialElementWidth = elements.elementWidth;
          elements.elementPosY += valuePosY / 2;
        } else {
          elements.elementPosY += valuePosY;
        }
      } else if (elements.elementClicked.classList.contains("bottom_right")) {
        elements.elementWidth = valuePosX;
        elements.elementHeight = valuePosY; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosX += (elements.initialElementWidth - valuePosX) / 2;
          elements.initialElementWidth = elements.elementWidth;
          elements.elementPosY += (elements.initialElementHeight - valuePosY) / 2;
          elements.initialElementHeight = elements.elementHeight;
        }
      } else if (elements.elementClicked.classList.contains("bottom_left")) {
        elements.elementWidth -= valuePosX;
        elements.elementHeight = valuePosY; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosX += valuePosX / 2;
          elements.elementPosY += (elements.initialElementHeight - valuePosY) / 2;
          elements.initialElementHeight = elements.elementHeight;
        } else {
          elements.elementPosX += valuePosX;
        }
      } // setting new size


      elements.elemToModify.style.width = elements.elementWidth + "px";
      elements.elemToModify.style.height = elements.elementHeight + "px"; // setting new position

      elements.elemToModify.style.left = elements.elementPosX + "px";
      elements.elemToModify.style.top = elements.elementPosY + "px";
    }
  },
  resizeAxes: function resizeAxes() {
    modifications.disableRound(); // elements.hydeRounds();

    elements.selectElement();
    var asjustScreenX = (elements.mainContainerWidth - elements.containerWidth) / 2;
    var valuePosX = handleMouse.cursorMovingPosX - elements.elementPosX - asjustScreenX;
    var valuePosY = handleMouse.cursorMovingPosY - elements.elementPosY;

    if (modifications.elementModification === "resizeAxes") {
      if (elements.elementClicked.classList.contains("resize_left")) {
        elements.elementWidth -= valuePosX; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosX += valuePosX / 2;
        } else {
          elements.elementPosX += valuePosX;
        }
      } else if (elements.elementClicked.classList.contains("resize_right")) {
        elements.elementWidth = valuePosX; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosX += (elements.initialElementWidth - valuePosX) / 2;
          elements.initialElementWidth = elements.elementWidth;
        }
      } else if (elements.elementClicked.classList.contains("resize_top")) {
        elements.elementHeight -= valuePosY; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosY += valuePosY / 2;
          elements.initialElementHeight = elements.elementHeight;
        } else {
          elements.elementPosY += valuePosY;
        }
      } else if (elements.elementClicked.classList.contains("resize_bottom")) {
        elements.elementHeight = valuePosY; // adjusting position value

        if (handleKeys.holdShiftKey === true) {
          elements.elementPosY += (elements.initialElementHeight - valuePosY) / 2;
          elements.initialElementHeight = elements.elementHeight;
        }
      } // setting new size


      elements.elemToModify.style.width = elements.elementWidth + "px";
      elements.elemToModify.style.height = elements.elementHeight + "px"; // setting new position

      elements.elemToModify.style.left = elements.elementPosX + "px";
      elements.elemToModify.style.top = elements.elementPosY + "px";
    }
  },
  handleElementRotation: function handleElementRotation(evt) {
    // modifications.disableRound();
    // todo fonction à améliorer.
    if (elements.selectedElement && modifications.elementModification === "rotate") {
      var currentIndex = elements.elemToModify.dataset.indexNumber;
      var rotateSign;
      var rotateAngle;
      var newRotationValue = -(handleMouse.cursorPosX - evt.clientX + (handleMouse.cursorPosY - evt.clientY)) / 2;
      handleMouse.cursorPosX = evt.clientX;
      handleMouse.cursorPosY = evt.clientY;
      handleMouse.shiftRotateValue += newRotationValue;

      if (handleKeys.holdShiftKey === true) {
        rotateAngle = 15;
      } else {
        rotateAngle = 1;
      }

      if (handleMouse.shiftRotateValue > 0) {
        rotateSign = 1;
      } else if (handleMouse.shiftRotateValue < 0) {
        rotateSign = -1;
      }

      if (handleMouse.shiftRotateValue >= rotateAngle || handleMouse.shiftRotateValue <= -rotateAngle) {
        modifications.rotationValue += rotateAngle * rotateSign;
        handleMouse.shiftRotateValue = 0;
      } else {
        modifications.rotationValue += 0;
      }

      if (modifications.rotationValue > 180) {
        modifications.rotationValue = 180;
      } else if (modifications.rotationValue < -180) {
        handleMouse.rotationValue = -180;
      } else if (modifications.rotationValue >= -180 && modifications.rotationValue <= 180) {
        elements.elemToModify.style.transform = "rotate(" + modifications.rotationValue + "deg)";
      }

      elements.elementsRotateValues["rotate-" + currentIndex] = modifications.rotationValue;
    }
  }
};
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44445" + '/');

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
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/components/modifications.js"], null)
//# sourceMappingURL=/modifications.f480978f.js.map