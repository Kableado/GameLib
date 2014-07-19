
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
    function fetchRemotePackage(packageName, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        if (event.loaded && event.total) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: event.total
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };
    function handleError(error) {
      console.error('package error:', error);
    };
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage('game.data', function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
  function runWithFS() {
function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}
Module['FS_createPath']('/', 'data', true, true);
    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 2344, 0, 0).open('GET', '/data/arrowshooter_down.png');
    new DataRequest(2344, 4698, 0, 0).open('GET', '/data/arrowshooter_left.png');
    new DataRequest(4698, 7037, 0, 0).open('GET', '/data/arrowshooter_right.png');
    new DataRequest(7037, 9313, 0, 0).open('GET', '/data/arrowshooter_up.png');
    new DataRequest(9313, 10366, 0, 0).open('GET', '/data/arrow_down.png');
    new DataRequest(10366, 11291, 0, 0).open('GET', '/data/arrow_left.png');
    new DataRequest(11291, 12228, 0, 0).open('GET', '/data/arrow_right.png');
    new DataRequest(12228, 13096, 0, 0).open('GET', '/data/arrow_up.png');
    new DataRequest(13096, 15920, 0, 0).open('GET', '/data/barrel.png');
    new DataRequest(15920, 18827, 0, 0).open('GET', '/data/barrel2.png');
    new DataRequest(18827, 69509, 0, 1).open('GET', '/data/coin.wav');
    new DataRequest(69509, 74221, 0, 0).open('GET', '/data/column.png');
    new DataRequest(74221, 77808, 0, 0).open('GET', '/data/column_faded.png');
    new DataRequest(77808, 123766, 0, 0).open('GET', '/data/end.png');
    new DataRequest(123766, 125708, 0, 0).open('GET', '/data/end_point.png');
    new DataRequest(125708, 130045, 0, 0).open('GET', '/data/exit_point.png');
    new DataRequest(130045, 186059, 0, 1).open('GET', '/data/Explosion16.wav');
    new DataRequest(186059, 250159, 0, 1).open('GET', '/data/Explosion2.wav');
    new DataRequest(250159, 258818, 0, 0).open('GET', '/data/fire.png');
    new DataRequest(258818, 262733, 0, 0).open('GET', '/data/floor.png');
    new DataRequest(262733, 266695, 0, 0).open('GET', '/data/floor_center.png');
    new DataRequest(266695, 270593, 0, 0).open('GET', '/data/floor_left.png');
    new DataRequest(270593, 274545, 0, 0).open('GET', '/data/floor_right.png');
    new DataRequest(274545, 280733, 0, 1).open('GET', '/data/Hit_Hurt10.wav');
    new DataRequest(280733, 296579, 0, 1).open('GET', '/data/Hit_Hurt16.wav');
    new DataRequest(296579, 301561, 0, 0).open('GET', '/data/hole_lava.png');
    new DataRequest(301561, 305229, 0, 0).open('GET', '/data/hole_spiked.png');
    new DataRequest(305229, 308688, 0, 0).open('GET', '/data/lamp.png');
    new DataRequest(308688, 320660, 0, 1).open('GET', '/data/Laser_Shoot2.wav');
    new DataRequest(320660, 322000, 0, 0).open('GET', '/data/level_00.txt');
    new DataRequest(322000, 323144, 0, 0).open('GET', '/data/level_01.txt');
    new DataRequest(323144, 324484, 0, 0).open('GET', '/data/level_02.txt');
    new DataRequest(324484, 325554, 0, 0).open('GET', '/data/level_03.txt');
    new DataRequest(325554, 327089, 0, 0).open('GET', '/data/level_04.txt');
    new DataRequest(327089, 328555, 0, 0).open('GET', '/data/level_05.txt');
    new DataRequest(328555, 328847, 0, 0).open('GET', '/data/level_06.txt');
    new DataRequest(328847, 369638, 0, 0).open('GET', '/data/logo.png');
    new DataRequest(369638, 373865, 0, 0).open('GET', '/data/player_broken.png');
    new DataRequest(373865, 378163, 0, 0).open('GET', '/data/player_down.png');
    new DataRequest(378163, 382654, 0, 0).open('GET', '/data/player_left.png');
    new DataRequest(382654, 387128, 0, 0).open('GET', '/data/player_right.png');
    new DataRequest(387128, 391201, 0, 0).open('GET', '/data/player_up.png');
    new DataRequest(391201, 448215, 0, 1).open('GET', '/data/Powerup10.wav');
    new DataRequest(448215, 475099, 0, 1).open('GET', '/data/Powerup30.wav');
    new DataRequest(475099, 477906, 0, 0).open('GET', '/data/rock.png');
    new DataRequest(477906, 480256, 0, 0).open('GET', '/data/save_point.png');
    new DataRequest(480256, 485902, 0, 0).open('GET', '/data/save_point_active.png');
    new DataRequest(485902, 487037, 0, 0).open('GET', '/data/textshadow.png');
    var PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    var PACKAGE_NAME = 'build-emscripten-release/game.data';
    var REMOTE_PACKAGE_NAME = 'game.data';
    var PACKAGE_UUID = '011aba0b-a5a1-4466-a269-30e5155d3281';
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/data/arrowshooter_down.png"].onload();
          DataRequest.prototype.requests["/data/arrowshooter_left.png"].onload();
          DataRequest.prototype.requests["/data/arrowshooter_right.png"].onload();
          DataRequest.prototype.requests["/data/arrowshooter_up.png"].onload();
          DataRequest.prototype.requests["/data/arrow_down.png"].onload();
          DataRequest.prototype.requests["/data/arrow_left.png"].onload();
          DataRequest.prototype.requests["/data/arrow_right.png"].onload();
          DataRequest.prototype.requests["/data/arrow_up.png"].onload();
          DataRequest.prototype.requests["/data/barrel.png"].onload();
          DataRequest.prototype.requests["/data/barrel2.png"].onload();
          DataRequest.prototype.requests["/data/coin.wav"].onload();
          DataRequest.prototype.requests["/data/column.png"].onload();
          DataRequest.prototype.requests["/data/column_faded.png"].onload();
          DataRequest.prototype.requests["/data/end.png"].onload();
          DataRequest.prototype.requests["/data/end_point.png"].onload();
          DataRequest.prototype.requests["/data/exit_point.png"].onload();
          DataRequest.prototype.requests["/data/Explosion16.wav"].onload();
          DataRequest.prototype.requests["/data/Explosion2.wav"].onload();
          DataRequest.prototype.requests["/data/fire.png"].onload();
          DataRequest.prototype.requests["/data/floor.png"].onload();
          DataRequest.prototype.requests["/data/floor_center.png"].onload();
          DataRequest.prototype.requests["/data/floor_left.png"].onload();
          DataRequest.prototype.requests["/data/floor_right.png"].onload();
          DataRequest.prototype.requests["/data/Hit_Hurt10.wav"].onload();
          DataRequest.prototype.requests["/data/Hit_Hurt16.wav"].onload();
          DataRequest.prototype.requests["/data/hole_lava.png"].onload();
          DataRequest.prototype.requests["/data/hole_spiked.png"].onload();
          DataRequest.prototype.requests["/data/lamp.png"].onload();
          DataRequest.prototype.requests["/data/Laser_Shoot2.wav"].onload();
          DataRequest.prototype.requests["/data/level_00.txt"].onload();
          DataRequest.prototype.requests["/data/level_01.txt"].onload();
          DataRequest.prototype.requests["/data/level_02.txt"].onload();
          DataRequest.prototype.requests["/data/level_03.txt"].onload();
          DataRequest.prototype.requests["/data/level_04.txt"].onload();
          DataRequest.prototype.requests["/data/level_05.txt"].onload();
          DataRequest.prototype.requests["/data/level_06.txt"].onload();
          DataRequest.prototype.requests["/data/logo.png"].onload();
          DataRequest.prototype.requests["/data/player_broken.png"].onload();
          DataRequest.prototype.requests["/data/player_down.png"].onload();
          DataRequest.prototype.requests["/data/player_left.png"].onload();
          DataRequest.prototype.requests["/data/player_right.png"].onload();
          DataRequest.prototype.requests["/data/player_up.png"].onload();
          DataRequest.prototype.requests["/data/Powerup10.wav"].onload();
          DataRequest.prototype.requests["/data/Powerup30.wav"].onload();
          DataRequest.prototype.requests["/data/rock.png"].onload();
          DataRequest.prototype.requests["/data/save_point.png"].onload();
          DataRequest.prototype.requests["/data/save_point_active.png"].onload();
          DataRequest.prototype.requests["/data/textshadow.png"].onload();
          Module['removeRunDependency']('datafile_build-emscripten-release/game.data');
    };
    Module['addRunDependency']('datafile_build-emscripten-release/game.data');
    if (!Module.preloadResults) Module.preloadResults = {};
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }
})();
// Note: For maximum-speed code, see "Optimizing Code" on the Emscripten wiki, https://github.com/kripken/emscripten/wiki/Optimizing-Code
// Note: Some Emscripten settings may limit the speed of the generated code.
// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}
// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };
  var nodeFS = require('fs');
  var nodePath = require('path');
  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };
  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };
  Module['load'] = function load(f) {
    globalEval(read(f));
  };
  Module['arguments'] = process['argv'].slice(2);
  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm
  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }
  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };
  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }
  this['Module'] = Module;
  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };
  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }
  if (typeof console !== 'undefined') {
    Module['print'] = function print(x) {
      console.log(x);
    };
    Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }
  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}
function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***
// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];
// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];
// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// === Auto-generated preamble library stuff ===
//========================================
// Runtime code shared with compiler
//========================================
var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (type == 'i64' || type == 'double' || vararg) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + Pointer_stringify(code) + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;
      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }
      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }
      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;
var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}
var globalScope = this;
// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;
// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}
// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}
// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;
// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;
// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;
// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === 'string' ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }
  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }
  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }
  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];
    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later
    setValue(ret+i, curr, type);
    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
Module['allocate'] = allocate;
function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;
  var ret = '';
  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;
// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;
  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;
// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr', 
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0
}
Module['stringToUTF16'] = stringToUTF16;
// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;
  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;
// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr', 
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0
}
Module['stringToUTF32'] = stringToUTF32;
function demangle(func) {
  try {
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    var i = 3;
    // params, etc.
    var basicTypes = {
      'v': 'void',
      'b': 'bool',
      'c': 'char',
      's': 'short',
      'i': 'int',
      'l': 'long',
      'f': 'float',
      'd': 'double',
      'w': 'wchar_t',
      'a': 'signed char',
      'h': 'unsigned char',
      't': 'unsigned short',
      'j': 'unsigned int',
      'm': 'unsigned long',
      'x': 'long long',
      'y': 'unsigned long long',
      'z': '...'
    };
    function dump(x) {
      //return;
      if (x) Module.print(x);
      Module.print(func);
      var pre = '';
      for (var a = 0; a < i; a++) pre += ' ';
      Module.print (pre + '^');
    }
    var subs = [];
    function parseNested() {
      i++;
      if (func[i] === 'K') i++; // ignore const
      var parts = [];
      while (func[i] !== 'E') {
        if (func[i] === 'S') { // substitution
          i++;
          var next = func.indexOf('_', i);
          var num = func.substring(i, next) || 0;
          parts.push(subs[num] || '?');
          i = next+1;
          continue;
        }
        if (func[i] === 'C') { // constructor
          parts.push(parts[parts.length-1]);
          i += 2;
          continue;
        }
        var size = parseInt(func.substr(i));
        var pre = size.toString().length;
        if (!size || !pre) { i--; break; } // counter i++ below us
        var curr = func.substr(i + pre, size);
        parts.push(curr);
        subs.push(curr);
        i += pre + size;
      }
      i++; // skip E
      return parts;
    }
    var first = true;
    function parse(rawList, limit, allowVoid) { // main parser
      limit = limit || Infinity;
      var ret = '', list = [];
      function flushList() {
        return '(' + list.join(', ') + ')';
      }
      var name;
      if (func[i] === 'N') {
        // namespaced N-E
        name = parseNested().join('::');
        limit--;
        if (limit === 0) return rawList ? [name] : name;
      } else {
        // not namespaced
        if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
        var size = parseInt(func.substr(i));
        if (size) {
          var pre = size.toString().length;
          name = func.substr(i + pre, size);
          i += pre + size;
        }
      }
      first = false;
      if (func[i] === 'I') {
        i++;
        var iList = parse(true);
        var iRet = parse(true, 1, true);
        ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
      } else {
        ret = name;
      }
      paramLoop: while (i < func.length && limit-- > 0) {
        //dump('paramLoop');
        var c = func[i++];
        if (c in basicTypes) {
          list.push(basicTypes[c]);
        } else {
          switch (c) {
            case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
            case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
            case 'L': { // literal
              i++; // skip basic type
              var end = func.indexOf('E', i);
              var size = end - i;
              list.push(func.substr(i, size));
              i += size + 2; // size + 'EE'
              break;
            }
            case 'A': { // array
              var size = parseInt(func.substr(i));
              i += size.toString().length;
              if (func[i] !== '_') throw '?';
              i++; // skip _
              list.push(parse(true, 1, true)[0] + ' [' + size + ']');
              break;
            }
            case 'E': break paramLoop;
            default: ret += '?' + c; break paramLoop;
          }
        }
      }
      if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
      return rawList ? list : ret + flushList();
    }
    return parse();
  } catch(e) {
    return func;
  }
}
function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}
function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}
// Memory management
var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}
var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk
function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', or (2) set Module.TOTAL_MEMORY before the program runs.');
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;
// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');
var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');
Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;
function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited
var runtimeInitialized = false;
function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}
function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}
function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;
function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;
function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;
function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;
// Tools
// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;
function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;
// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;
function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i)
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;
function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}
if (!Math['imul']) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];
var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;
Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
var memoryInitializer = null;
// === Body ===
STATIC_BASE = 8;
STATICTOP = STATIC_BASE + 12256;
/* global initializers */ __ATINIT__.push({ func: function() { runPostSets() } });
/* memory initializer */ allocate([65,117,100,105,111,95,76,111,97,100,83,111,117,110,100,58,32,68,65,84,65,32,98,108,111,99,107,32,110,111,116,32,102,111,117,110,100,0,0,0,65,117,100,105,111,95,76,111,97,100,83,111,117,110,100,58,32,78,111,116,32,80,67,77,32,102,111,114,109,97,116,46,0,0,0,0,0,0,0,0,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,0,0,0,0,0,0,0,65,117,100,105,111,95,76,111,97,100,83,111,117,110,100,58,32,70,105,108,101,32,116,111,111,32,115,104,111,114,116,46,0,0,0,0,0,0,0,0,42,42,42,32,68,114,97,119,32,73,110,102,111,0,0,0,65,117,100,105,111,95,76,111,97,100,83,111,117,110,100,58,32,70,105,108,101,32,105,115,32,110,111,116,32,87,65,86,69,46,0,0,0,0,0,0,10,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,0,0,0,0,0,0,65,117,100,105,111,95,76,111,97,100,83,111,117,110,100,58,32,70,105,108,101,32,105,115,32,110,111,116,32,82,73,70,70,46,0,0,0,0,0,0,68,114,97,119,95,73,110,105,116,58,32,70,97,105,108,117,114,101,32,105,110,105,116,105,97,108,105,122,105,110,103,32,118,105,100,101,111,32,109,111,100,101,46,0,0,0,0,0,65,117,100,105,111,95,76,111,97,100,83,111,117,110,100,58,32,70,97,105,108,117,114,101,32,111,112,101,110,105,110,103,32,102,105,108,101,46,0,0,80,114,111,102,105,108,105,110,103,58,58,58,58,58,58,58,58,58,0,0,0,0,0,0,65,117,100,105,111,95,73,110,105,116,58,32,70,97,105,108,117,114,101,32,111,112,101,110,105,110,103,32,97,117,100,105,111,46,32,40,52,52,46,49,75,104,122,47,49,54,98,47,50,99,41,46,0,0,0,0,65,117,100,105,111,95,73,110,105,116,58,32,70,97,105,108,117,114,101,32,105,110,105,116,105,97,108,105,122,105,110,103,32,83,68,76,32,65,117,100,105,111,46,0,0,0,0,0,68,101,98,117,103,32,77,111,100,101,32,65,99,116,105,118,97,116,101,100,33,0,0,0,65,117,100,105,111,95,73,110,105,116,58,32,70,97,105,108,117,114,101,32,111,112,101,110,105,110,103,32,97,117,100,105,111,46,0,0,0,0,0,0,68,114,97,119,95,73,110,105,116,58,32,70,97,105,108,117,114,101,32,105,110,105,116,105,97,108,105,122,105,110,103,32,83,68,76,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150,48,7,119,44,97,14,238,186,81,9,153,25,196,109,7,143,244,106,112,53,165,99,233,163,149,100,158,50,136,219,14,164,184,220,121,30,233,213,224,136,217,210,151,43,76,182,9,189,124,177,126,7,45,184,231,145,29,191,144,100,16,183,29,242,32,176,106,72,113,185,243,222,65,190,132,125,212,218,26,235,228,221,109,81,181,212,244,199,133,211,131,86,152,108,19,192,168,107,100,122,249,98,253,236,201,101,138,79,92,1,20,217,108,6,99,99,61,15,250,245,13,8,141,200,32,110,59,94,16,105,76,228,65,96,213,114,113,103,162,209,228,3,60,71,212,4,75,253,133,13,210,107,181,10,165,250,168,181,53,108,152,178,66,214,201,187,219,64,249,188,172,227,108,216,50,117,92,223,69,207,13,214,220,89,61,209,171,172,48,217,38,58,0,222,81,128,81,215,200,22,97,208,191,181,244,180,33,35,196,179,86,153,149,186,207,15,165,189,184,158,184,2,40,8,136,5,95,178,217,12,198,36,233,11,177,135,124,111,47,17,76,104,88,171,29,97,193,61,45,102,182,144,65,220,118,6,113,219,1,188,32,210,152,42,16,213,239,137,133,177,113,31,181,182,6,165,228,191,159,51,212,184,232,162,201,7,120,52,249,0,15,142,168,9,150,24,152,14,225,187,13,106,127,45,61,109,8,151,108,100,145,1,92,99,230,244,81,107,107,98,97,108,28,216,48,101,133,78,0,98,242,237,149,6,108,123,165,1,27,193,244,8,130,87,196,15,245,198,217,176,101,80,233,183,18,234,184,190,139,124,136,185,252,223,29,221,98,73,45,218,21,243,124,211,140,101,76,212,251,88,97,178,77,206,81,181,58,116,0,188,163,226,48,187,212,65,165,223,74,215,149,216,61,109,196,209,164,251,244,214,211,106,233,105,67,252,217,110,52,70,136,103,173,208,184,96,218,115,45,4,68,229,29,3,51,95,76,10,170,201,124,13,221,60,113,5,80,170,65,2,39,16,16,11,190,134,32,12,201,37,181,104,87,179,133,111,32,9,212,102,185,159,228,97,206,14,249,222,94,152,201,217,41,34,152,208,176,180,168,215,199,23,61,179,89,129,13,180,46,59,92,189,183,173,108,186,192,32,131,184,237,182,179,191,154,12,226,182,3,154,210,177,116,57,71,213,234,175,119,210,157,21,38,219,4,131,22,220,115,18,11,99,227,132,59,100,148,62,106,109,13,168,90,106,122,11,207,14,228,157,255,9,147,39,174,0,10,177,158,7,125,68,147,15,240,210,163,8,135,104,242,1,30,254,194,6,105,93,87,98,247,203,103,101,128,113,54,108,25,231,6,107,110,118,27,212,254,224,43,211,137,90,122,218,16,204,74,221,103,111,223,185,249,249,239,190,142,67,190,183,23,213,142,176,96,232,163,214,214,126,147,209,161,196,194,216,56,82,242,223,79,241,103,187,209,103,87,188,166,221,6,181,63,75,54,178,72,218,43,13,216,76,27,10,175,246,74,3,54,96,122,4,65,195,239,96,223,85,223,103,168,239,142,110,49,121,190,105,70,140,179,97,203,26,131,102,188,160,210,111,37,54,226,104,82,149,119,12,204,3,71,11,187,185,22,2,34,47,38,5,85,190,59,186,197,40,11,189,178,146,90,180,43,4,106,179,92,167,255,215,194,49,207,208,181,139,158,217,44,29,174,222,91,176,194,100,155,38,242,99,236,156,163,106,117,10,147,109,2,169,6,9,156,63,54,14,235,133,103,7,114,19,87,0,5,130,74,191,149,20,122,184,226,174,43,177,123,56,27,182,12,155,142,210,146,13,190,213,229,183,239,220,124,33,223,219,11,212,210,211,134,66,226,212,241,248,179,221,104,110,131,218,31,205,22,190,129,91,38,185,246,225,119,176,111,119,71,183,24,230,90,8,136,112,106,15,255,202,59,6,102,92,11,1,17,255,158,101,143,105,174,98,248,211,255,107,97,69,207,108,22,120,226,10,160,238,210,13,215,84,131,4,78,194,179,3,57,97,38,103,167,247,22,96,208,77,71,105,73,219,119,110,62,74,106,209,174,220,90,214,217,102,11,223,64,240,59,216,55,83,174,188,169,197,158,187,222,127,207,178,71,233,255,181,48,28,242,189,189,138,194,186,202,48,147,179,83,166,163,180,36,5,54,208,186,147,6,215,205,41,87,222,84,191,103,217,35,46,122,102,179,184,74,97,196,2,27,104,93,148,43,111,42,55,190,11,180,161,142,12,195,27,223,5,90,141,239,2,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,254,254,254,0,0,0,0,0,0,0,0,0,0,0,16,56,124,254,0,0,0,0,254,124,56,16,0,0,32,48,56,60,56,48,32,0,4,12,28,60,28,12,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,24,24,24,0,24,0,108,108,0,0,0,0,0,0,108,108,254,108,254,108,108,0,24,62,96,60,6,124,24,0,0,198,204,24,48,102,198,0,56,108,56,118,220,204,118,0,24,24,48,0,0,0,0,0,12,24,48,48,48,24,12,0,48,24,12,12,12,24,48,0,0,108,56,254,56,108,0,0,0,24,24,126,24,24,0,0,0,0,0,0,24,24,48,0,0,0,0,126,0,0,0,0,0,0,0,0,24,24,0,0,6,12,24,48,96,192,128,0,60,102,110,118,102,60,0,0,24,56,120,24,24,24,0,0,60,102,6,28,48,126,0,0,60,102,12,6,102,60,0,0,28,60,108,204,254,12,0,0,126,96,124,6,102,60,0,0,28,48,96,124,102,60,0,0,126,6,6,12,24,24,0,0,60,102,60,102,102,60,0,0,60,102,62,6,12,56,0,0,0,24,24,0,24,24,0,0,0,24,24,0,24,24,48,0,0,6,24,96,24,6,0,0,0,0,126,0,126,0,0,0,0,96,24,6,24,96,0,0,60,102,6,12,24,0,24,0,60,102,90,90,94,96,60,0,60,102,102,126,102,102,0,0,124,102,124,102,102,124,0,0,60,96,96,96,96,60,0,0,120,108,102,102,108,120,0,0,126,96,120,96,96,126,0,0,126,96,120,96,96,96,0,0,60,102,96,110,102,62,0,0,102,102,126,102,102,102,0,0,60,24,24,24,24,60,0,0,6,6,6,6,102,60,0,0,198,204,216,248,204,198,0,0,96,96,96,96,96,124,0,0,198,238,254,214,198,198,0,0,198,230,246,222,206,198,0,0,60,102,102,102,102,60,0,0,252,198,198,252,192,192,0,0,120,204,204,204,220,126,0,0,124,102,102,124,108,102,0,0,124,198,112,28,198,124,0,0,126,24,24,24,24,24,0,0,102,102,102,102,102,60,0,0,102,102,102,102,60,24,0,0,198,198,214,254,238,198,0,0,198,108,56,56,108,198,0,0,198,108,56,48,48,48,0,0,254,12,24,48,96,254,0,0,60,48,48,48,48,48,60,0,192,96,48,24,12,6,2,0,60,12,12,12,12,12,60,0,24,60,102,0,0,0,0,0,0,0,0,0,0,0,254,0,24,24,12,0,0,0,0,0,0,60,6,62,102,62,0,0,96,96,124,102,102,124,0,0,0,60,96,96,96,60,0,0,6,6,62,102,102,62,0,0,0,60,102,126,96,60,0,0,28,48,124,48,48,48,0,0,0,62,102,102,62,6,60,0,96,96,124,102,102,102,0,0,48,0,48,48,48,24,0,0,12,0,12,12,12,12,120,0,96,102,108,120,108,102,0,0,24,24,24,24,24,12,0,0,0,236,254,214,198,198,0,0,0,124,102,102,102,102,0,0,0,60,102,102,102,60,0,0,0,124,102,102,124,96,96,0,0,62,102,102,62,6,6,0,0,124,102,96,96,96,0,0,0,60,96,60,6,124,0,0,48,48,124,48,48,28,0,0,0,102,102,102,102,62,0,0,0,102,102,102,60,24,0,0,0,198,198,214,254,108,0,0,0,204,120,48,120,204,0,0,0,102,102,102,60,24,48,0,0,126,12,24,48,126,0,0,12,24,24,48,24,24,12,0,24,24,24,24,24,24,24,0,48,24,24,12,24,24,48,0,118,220,0,0,0,0,0,0,0,16,56,108,198,198,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,97,116,97,47,108,97,109,112,46,112,110,103,0,0,0,68,114,97,119,95,76,111,97,100,73,109,97,103,101,58,32,73,109,97,103,101,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,58,32,37,115,10,0,0,0,68,114,97,119,95,76,111,97,100,73,109,97,103,101,58,32,80,78,71,32,100,101,99,111,100,101,114,32,101,114,114,111,114,32,37,117,58,32,37,115,10,0,0,0,0,0,0,0,46,80,78,71,0,0,0,0,46,112,110,103,0,0,0,0,115,80,114,111,106,101,99,116,105,111,110,77,97,116,114,105,120,0,0,0,0,0,0,0,115,84,101,120,116,117,114,101,0,0,0,0,0,0,0,0,76,101,118,101,108,32,67,111,109,112,108,101,116,101,0,0,97,67,111,108,111,114,0,0,97,84,101,120,67,111,111,114,100,0,0,0,0,0,0,0,117,110,101,120,105,115,116,105,110,103,32,99,111,100,101,32,119,104,105,108,101,32,112,114,111,99,101,115,115,105,110,103,32,100,121,110,97,109,105,99,32,100,101,102,108,97,116,101,32,98,108,111,99,107,0,0,97,80,111,115,105,116,105,111,110,0,0,0,0,0,0,0,100,97,116,97,47,114,111,99,107,46,112,110,103,0,0,0,32,86,101,114,115,105,111,110,58,32,37,115,10,0,0,0,32,82,101,110,100,101,114,101,114,58,32,37,115,10,0,0,32,86,101,110,100,111,114,58,32,37,115,10,0,0,0,0,76,101,118,101,108,58,32,37,100,46,37,100,0,0,0,0,87,65,86,69,0,0,0,0,100,97,116,97,47,98,97,114,114,101,108,46,112,110,103,0,112,114,111,98,108,101,109,32,119,104,105,108,101,32,112,114,111,99,101,115,115,105,110,103,32,100,121,110,97,109,105,99,32,100,101,102,108,97,116,101,32,98,108,111,99,107,0,0,117,110,107,110,111,119,110,32,101,114,114,111,114,32,99,111,100,101,0,0,0,0,0,0,100,97,116,97,47,99,111,108,117,109,110,95,102,97,100,101,100,46,112,110,103,0,0,0,119,105,110,100,111,119,115,105,122,101,32,109,117,115,116,32,98,101,32,97,32,112,111,119,101,114,32,111,102,32,116,119,111,0,0,0,0,0,0,0,116,101,120,116,32,99,104,117,110,107,32,107,101,121,119,111,114,100,32,116,111,111,32,115,104,111,114,116,32,111,114,32,108,111,110,103,58,32,109,117,115,116,32,104,97,118,101,32,115,105,122,101,32,49,45,55,57,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,102,105,108,116,101,114,32,115,116,114,97,116,101,103,121,32,103,105,118,101,110,32,102,111,114,32,76,111,100,101,80,78,71,69,110,99,111,100,101,114,83,101,116,116,105,110,103,115,46,102,105,108,116,101,114,95,115,116,114,97,116,101,103,121,0,0,0,0,0,0,0,0,109,117,115,116,32,112,114,111,118,105,100,101,32,99,117,115,116,111,109,32,122,108,105,98,32,102,117,110,99,116,105,111,110,32,112,111,105,110,116,101,114,32,105,102,32,76,79,68,69,80,78,71,95,67,79,77,80,73,76,69,95,90,76,73,66,32,105,115,32,110,111,116,32,100,101,102,105,110,101,100,0,0,0,0,0,0,0,0,105,109,112,111,115,115,105,98,108,101,32,111,102,102,115,101,116,32,105,110,32,108,122,55,55,32,101,110,99,111,100,105,110,103,32,40,105,110,116,101,114,110,97,108,32,98,117,103,41,0,0,0,0,0,0,0,105,110,116,101,114,110,97,108,32,99,111,108,111,114,32,99,111,110,118,101,114,115,105,111,110,32,98,117,103,0,0,0,103,105,118,101,110,32,105,109,97,103,101,32,116,111,111,32,115,109,97,108,108,32,116,111,32,99,111,110,116,97,105,110,32,97,108,108,32,112,105,120,101,108,115,32,116,111,32,98,101,32,101,110,99,111,100,101,100,0,0,0,0,0,0,0,80,114,101,115,115,32,91,83,112,97,99,101,93,32,116,111,32,84,105,116,108,101,46,0,109,101,109,111,114,121,32,97,108,108,111,99,97,116,105,111,110,32,102,97,105,108,101,100,0,0,0,0,0,0,0,0,99,111,108,111,114,32,99,111,110,118,101,114,115,105,111,110,32,116,111,32,112,97,108,101,116,116,101,32,114,101,113,117,101,115,116,101,100,32,119,104,105,108,101,32,97,32,99,111,108,111,114,32,105,115,110,39,116,32,105,110,32,112,97,108,101,116,116,101,0,0,0,0,101,114,114,111,114,32,105,110,32,99,111,100,101,32,116,114,101,101,32,109,97,100,101,32,105,116,32,106,117,109,112,32,111,117,116,115,105,100,101,32,111,102,32,104,117,102,102,109,97,110,32,116,114,101,101,0,108,97,122,121,32,109,97,116,99,104,105,110,103,32,97,116,32,112,111,115,32,48,32,105,115,32,105,109,112,111,115,115,105,98,108,101,0,0,0,0,100,97,116,97,47,99,111,108,117,109,110,46,112,110,103,0,116,114,105,101,100,32,99,114,101,97,116,105,110,103,32,97,32,116,114,101,101,32,111,102,32,48,32,115,121,109,98,111,108,115,0,0,0,0,0,0,102,97,105,108,101,100,32,116,111,32,111,112,101,110,32,102,105,108,101,32,102,111,114,32,119,114,105,116,105,110,103,0,102,97,105,108,101,100,32,116,111,32,111,112,101,110,32,102,105,108,101,32,102,111,114,32,114,101,97,100,105,110,103,0,105,110,116,101,103,101,114,32,111,118,101,114,102,108,111,119,32,105,110,32,98,117,102,102,101,114,32,115,105,122,101,0,105,84,88,116,32,99,104,117,110,107,32,116,111,111,32,115,104,111,114,116,32,116,111,32,99,111,110,116,97,105,110,32,114,101,113,117,105,114,101,100,32,98,121,116,101,115,0,0,110,111,32,110,117,108,108,32,116,101,114,109,105,110,97,116,105,111,110,32,99,104,97,114,32,102,111,117,110,100,32,119,104,105,108,101,32,100,101,99,111,100,105,110,103,32,116,101,120,116,32,99,104,117,110,107,0,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,112,72,89,115,32,99,104,117,110,107,32,115,105,122,101,0,84,104,97,110,107,115,32,102,111,114,32,112,108,97,121,105,110,103,33,0,0,0,0,0,82,73,70,70,0,0,0,0,105,110,118,97,108,105,100,32,116,73,77,69,32,99,104,117,110,107,32,115,105,122,101,0,119,104,105,108,101,32,100,101,99,111,100,105,110,103,44,32,117,110,101,120,105,115,116,105,110,103,32,99,111,109,112,114,101,115,115,105,111,110,32,109,101,116,104,111,100,32,101,110,99,111,117,110,116,101,114,105,110,103,32,105,110,32,122,84,88,116,32,111,114,32,105,84,88,116,32,99,104,117,110,107,32,40,105,116,32,109,117,115,116,32,98,101,32,48,41,0,101,110,100,32,111,102,32,105,110,112,117,116,32,109,101,109,111,114,121,32,114,101,97,99,104,101,100,32,119,105,116,104,111,117,116,32,104,117,102,102,109,97,110,32,101,110,100,32,99,111,100,101,0,0,0,0,117,110,101,120,105,115,116,105,110,103,32,105,110,116,101,114,108,97,99,101,32,109,111,100,101,32,103,105,118,101,110,32,116,111,32,101,110,99,111,100,101,114,32,40,109,117,115,116,32,98,101,32,48,32,111,114,32,49,41,0,0,0,0,0,100,97,116,97,47,102,108,111,111,114,95,99,101,110,116,101,114,46,112,110,103,0,0,0,117,110,107,110,111,119,110,32,99,104,117,110,107,32,116,121,112,101,32,119,105,116,104,32,39,99,114,105,116,105,99,97,108,39,32,102,108,97,103,32,101,110,99,111,117,110,116,101,114,101,100,32,98,121,32,116,104,101,32,100,101,99,111,100,101,114,0,0,0,0,0,0,116,114,105,101,100,32,116,111,32,101,110,99,111,100,101,32,97,32,80,76,84,69,32,99,104,117,110,107,32,119,105,116,104,32,97,32,112,97,108,101,116,116,101,32,116,104,97,116,32,104,97,115,32,108,101,115,115,32,116,104,97,110,32,49,32,111,114,32,109,111,114,101,32,116,104,97,110,32,50,53,54,32,99,111,108,111,114,115,0,0,0,0,0,0,0,0,116,104,101,32,108,101,110,103,116,104,32,111,102,32,97,32,116,101,120,116,32,99,104,117,110,107,32,107,101,121,119,111,114,100,32,103,105,118,101,110,32,116,111,32,116,104,101,32,101,110,99,111,100,101,114,32,105,115,32,115,109,97,108,108,101,114,32,116,104,97,110,32,116,104,101,32,109,105,110,105,109,117,109,32,111,102,32,49,32,98,121,116,101,0,0,0,116,104,101,32,108,101,110,103,116,104,32,111,102,32,97,32,116,101,120,116,32,99,104,117,110,107,32,107,101,121,119,111,114,100,32,103,105,118,101,110,32,116,111,32,116,104,101,32,101,110,99,111,100,101,114,32,105,115,32,108,111,110,103,101,114,32,116,104,97,110,32,116,104,101,32,109,97,120,105,109,117,109,32,111,102,32,55,57,32,98,121,116,101,115,0,0,116,104,101,32,108,101,110,103,116,104,32,111,102,32,116,104,101,32,69,78,68,32,115,121,109,98,111,108,32,50,53,54,32,105,110,32,116,104,101,32,72,117,102,102,109,97,110,32,116,114,101,101,32,105,115,32,48,0,0,0,0,0,0,0,108,101,110,103,116,104,32,111,102,32,97,32,99,104,117,110,107,32,116,111,111,32,108,111,110,103,44,32,109,97,120,32,97,108,108,111,119,101,100,32,102,111,114,32,80,78,71,32,105,115,32,50,49,52,55,52,56,51,54,52,55,32,98,121,116,101,115,32,112,101,114,32,99,104,117,110,107,0,0,0,116,95,100,114,97,119,46,46,46,46,46,58,37,54,108,108,100,10,0,0,0,0,0,0,99,111,110,118,101,114,115,105,111,110,32,102,114,111,109,32,99,111,108,111,114,32,116,111,32,103,114,101,121,115,99,97,108,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,0,0,0,0,67,111,110,103,114,97,116,117,108,97,116,105,111,110,115,32,121,111,117,32,115,97,118,101,100,32,116,104,101,32,107,105,116,116,105,101,33,0,0,0,105,110,118,97,108,105,100,32,66,84,89,80,69,32,103,105,118,101,110,32,105,110,32,116,104,101,32,115,101,116,116,105,110,103,115,32,111,102,32,116,104,101,32,101,110,99,111,100,101,114,32,40,111,110,108,121,32,48,44,32,49,32,97,110,100,32,50,32,97,114,101,32,97,108,108,111,119,101,100,41,0,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,119,105,110,100,111,119,32,115,105,122,101,32,103,105,118,101,110,32,105,110,32,116,104,101,32,115,101,116,116,105,110,103,115,32,111,102,32,116,104,101,32,101,110,99,111,100,101,114,32,40,109,117,115,116,32,98,101,32,48,45,51,50,55,54,56,41,0,0,0,0,0,0,110,111,116,104,105,110,103,32,100,111,110,101,32,121,101,116,0,0,0,0,0,0,0,0,114,101,113,117,101,115,116,101,100,32,99,111,108,111,114,32,99,111,110,118,101,114,115,105,111,110,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,0,0,0,0,100,97,116,97,47,102,108,111,111,114,95,114,105,103,104,116,46,112,110,103,0,0,0,0,105,110,118,97,108,105,100,32,65,68,76,69,82,51,50,32,101,110,99,111,117,110,116,101,114,101,100,32,40,99,104,101,99,107,105,110,103,32,65,68,76,69,82,51,50,32,99,97,110,32,98,101,32,100,105,115,97,98,108,101,100,41,0,0,105,110,118,97,108,105,100,32,67,82,67,32,101,110,99,111,117,110,116,101,114,101,100,32,40,99,104,101,99,107,105,110,103,32,67,82,67,32,99,97,110,32,98,101,32,100,105,115,97,98,108,101,100,41,0,0,103,105,118,101,110,32,111,117,116,112,117,116,32,105,109,97,103,101,32,99,111,108,111,114,116,121,112,101,32,111,114,32,98,105,116,100,101,112,116,104,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,102,111,114,32,99,111,108,111,114,32,99,111,110,118,101,114,115,105,111,110,0,0,0,0,0,106,117,109,112,101,100,32,112,97,115,116,32,116,114,101,101,32,119,104,105,108,101,32,103,101,110,101,114,97,116,105,110,103,32,104,117,102,102,109,97,110,32,116,114,101,101,0,0,114,101,112,101,97,116,32,115,121,109,98,111,108,32,105,110,32,116,114,101,101,32,119,104,105,108,101,32,116,104,101,114,101,32,119,97,115,32,110,111,32,118,97,108,117,101,32,115,121,109,98,111,108,32,121,101,116,0,0,0,0,0,0,0,115,105,122,101,32,111,102,32,122,108,105,98,32,100,97,116,97,32,116,111,111,32,115,109,97,108,108,0,0,0,0,0,116,95,112,111,115,116,112,114,111,99,46,58,37,54,108,108,100,10,0,0,0,0,0,0,106,117,109,112,101,100,32,112,97,115,116,32,109,101,109,111,114,121,32,119,104,105,108,101,32,105,110,102,108,97,116,105,110,103,0,0,0,0,0,0,66,121,32,75,97,98,108,101,97,100,111,32,40,86,65,82,41,0,0,0,0,0,0,0,106,117,109,112,101,100,32,112,97,115,116,32,109,101,109,111,114,121,32,119,104,105,108,101,32,105,110,102,108,97,116,105,110,103,32,104,117,102,102,109,97,110,32,98,108,111,99,107,0,0,0,0,0,0,0,0,106,117,109,112,101,100,32,112,97,115,116,32,109,101,109,111,114,121,32,119,104,105,108,101,32,103,101,110,101,114,97,116,105,110,103,32,100,121,110,97,109,105,99,32,104,117,102,102,109,97,110,32,116,114,101,101,0,0,0,0,0,0,0,0,110,111,32,101,114,114,111,114,44,32,101,118,101,114,121,116,104,105,110,103,32,119,101,110,116,32,111,107,0,0,0,0,101,109,112,116,121,32,105,110,112,117,116,32,111,114,32,102,105,108,101,32,100,111,101,115,110,39,116,32,101,120,105,115,116,0,0,0,0,0,0,0,100,97,116,97,47,102,108,111,111,114,95,108,101,102,116,46,112,110,103,0,0,0,0,0,97,32,118,97,108,117,101,32,105,110,32,105,110,100,101,120,101,100,32,105,109,97,103,101,32,105,115,32,108,97,114,103,101,114,32,116,104,97,110,32,116,104,101,32,112,97,108,101,116,116,101,32,115,105,122,101,32,40,98,105,116,100,101,112,116,104,32,60,32,56,41,0,97,32,118,97,108,117,101,32,105,110,32,105,110,100,101,120,101,100,32,105,109,97,103,101,32,105,115,32,108,97,114,103,101,114,32,116,104,97,110,32,116,104,101,32,112,97,108,101,116,116,101,32,115,105,122,101,32,40,98,105,116,100,101,112,116,104,32,61,32,56,41,0,100,97,116,97,47,69,120,112,108,111,115,105,111,110,49,54,46,119,97,118,0,0,0,0,98,75,71,68,32,99,104,117,110,107,32,104,97,115,32,119,114,111,110,103,32,115,105,122,101,32,102,111,114,32,82,71,66,32,105,109,97,103,101,0,100,97,116,97,47,72,105,116,95,72,117,114,116,49,54,46,119,97,118,0,0,0,0,0,98,75,71,68,32,99,104,117,110,107,32,104,97,115,32,119,114,111,110,103,32,115,105,122,101,32,102,111,114,32,103,114,101,121,115,99,97,108,101,32,105,109,97,103,101,0,0,0,100,97,116,97,47,69,120,112,108,111,115,105,111,110,50,46,119,97,118,0,0,0,0,0,98,75,71,68,32,99,104,117,110,107,32,104,97,115,32,119,114,111,110,103,32,115,105,122,101,32,102,111,114,32,112,97,108,101,116,116,101,32,105,109,97,103,101,0,0,0,0,0,100,97,116,97,47,76,97,115,101,114,95,83,104,111,111,116,50,46,119,97,118,0,0,0,116,82,78,83,32,99,104,117,110,107,32,97,112,112,101,97,114,101,100,32,119,104,105,108,101,32,105,116,32,119,97,115,32,110,111,116,32,97,108,108,111,119,101,100,32,102,111,114,32,116,104,105,115,32,99,111,108,111,114,32,116,121,112,101,0,0,0,0,0,0,0,0,116,95,111,118,101,114,46,46,46,46,46,58,37,54,108,108,100,10,0,0,0,0,0,0,100,97,116,97,47,80,111,119,101,114,117,112,51,48,46,119,97,118,0,0,0,0,0,0,116,82,78,83,32,99,104,117,110,107,32,104,97,115,32,119,114,111,110,103,32,115,105,122,101,32,102,111,114,32,82,71,66,32,105,109,97,103,101,0,80,114,101,115,115,32,91,88,93,32,116,111,32,83,116,97,114,116,46,0,0,0,0,0,100,97,116,97,47,80,111,119,101,114,117,112,49,48,46,119,97,118,0,0,0,0,0,0,116,82,78,83,32,99,104,117,110,107,32,104,97,115,32,119,114,111,110,103,32,115,105,122,101,32,102,111,114,32,103,114,101,121,115,99,97,108,101,32,105,109,97,103,101,0,0,0,100,97,116,97,47,72,105,116,95,72,117,114,116,49,48,46,119,97,118,0,0,0,0,0,109,111,114,101,32,112,97,108,101,116,116,101,32,97,108,112,104,97,32,118,97,108,117,101,115,32,103,105,118,101,110,32,105,110,32,116,82,78,83,32,99,104,117,110,107,32,116,104,97,110,32,116,104,101,114,101,32,97,114,101,32,99,111,108,111,114,115,32,105,110,32,116,104,101,32,112,97,108,101,116,116,101,0,0,0,0,0,0,100,97,116,97,47,112,108,97,121,101,114,95,98,114,111,107,101,110,46,112,110,103,0,0,116,104,101,32,112,97,108,101,116,116,101,32,105,115,32,116,111,111,32,98,105,103,0,0,100,97,116,97,47,102,108,111,111,114,46,112,110,103,0,0,100,97,116,97,47,102,105,114,101,46,112,110,103,0,0,0,105,108,108,101,103,97,108,32,98,105,116,32,100,101,112,116,104,32,102,111,114,32,116,104,105,115,32,99,111,108,111,114,32,116,121,112,101,32,103,105,118,101,110,0,0,0,0,0,100,97,116,97,47,97,114,114,111,119,95,114,105,103,104,116,46,112,110,103,0,0,0,0,105,108,108,101,103,97,108,32,80,78,71,32,102,105,108,116,101,114,32,116,121,112,101,32,101,110,99,111,117,110,116,101,114,101,100,0,0,0,0,0,100,97,116,97,47,97,114,114,111,119,95,108,101,102,116,46,112,110,103,0,0,0,0,0,99,104,117,110,107,32,108,101,110,103,116,104,32,111,102,32,97,32,99,104,117,110,107,32,105,115,32,116,111,111,32,108,97,114,103,101,32,111,114,32,116,104,101,32,99,104,117,110,107,32,116,111,111,32,115,109,97,108,108,0,0,0,0,0,100,97,116,97,47,97,114,114,111,119,95,100,111,119,110,46,112,110,103,0,0,0,0,0,105,108,108,101,103,97,108,32,80,78,71,32,105,110,116,101,114,108,97,99,101,32,109,101,116,104,111,100,0,0,0,0,100,97,116,97,47,97,114,114,111,119,95,117,112,46,112,110,103,0,0,0,0,0,0,0,105,108,108,101,103,97,108,32,80,78,71,32,102,105,108,116,101,114,32,109,101,116,104,111,100,0,0,0,0,0,0,0,100,97,116,97,47,97,114,114,111,119,115,104,111,111,116,101,114,95,114,105,103,104,116,46,112,110,103,0,0,0,0,0,105,108,108,101,103,97,108,32,80,78,71,32,99,111,109,112,114,101,115,115,105,111,110,32,109,101,116,104,111,100,0,0,116,95,99,111,108,46,46,46,46,46,46,58,37,54,108,108,100,10,0,0,0,0,0,0,100,97,116,97,47,97,114,114,111,119,115,104,111,111,116,101,114,95,108,101,102,116,46,112,110,103,0,0,0,0,0,0,105,108,108,101,103,97,108,32,80,78,71,32,99,111,108,111,114,32,116,121,112,101,32,111,114,32,98,112,112,0,0,0,80,114,101,115,115,32,91,83,112,97,99,101,93,32,116,111,32,67,111,110,116,105,110,117,101,46,0,0,0,0,0,0,37,100,32,37,100,0,0,0,100,97,116,97,47,97,114,114,111,119,115,104,111,111,116,101,114,95,100,111,119,110,46,112,110,103,0,0,0,0,0,0,99,104,117,110,107,32,108,101,110,103,116,104,32,116,111,111,32,108,97,114,103,101,44,32,99,104,117,110,107,32,98,114,111,107,101,110,32,111,102,102,32,97,116,32,101,110,100,32,111,102,32,102,105,108,101,0,100,97,116,97,47,101,110,100,46,112,110,103,0,0,0,0,100,97,116,97,47,97,114,114,111,119,115,104,111,111,116,101,114,95,117,112,46,112,110,103,0,0,0,0,0,0,0,0,102,105,114,115,116,32,99,104,117,110,107,32,105,115,32,110,111,116,32,116,104,101,32,104,101,97,100,101,114,32,99,104,117,110,107,0,0,0,0,0,100,97,116,97,47,101,110,100,95,112,111,105,110,116,46,112,110,103,0,0,0,0,0,0,100,97,116,97,47,108,111,103,111,46,112,110,103,0,0,0,105,110,99,111,114,114,101,99,116,32,80,78,71,32,115,105,103,110,97,116,117,114,101,44,32,105,116,39,115,32,110,111,32,80,78,71,32,111,114,32,99,111,114,114,117,112,116,101,100,0,0,0,0,0,0,0,100,97,116,97,47,101,120,105,116,95,112,111,105,110,116,46,112,110,103,0,0,0,0,0,71,97,109,101,0,0,0,0,100,97,116,97,47,98,97,114,114,101,108,50,46,112,110,103,0,0,0,0,0,0,0,0,80,78,71,32,102,105,108,101,32,105,115,32,115,109,97,108,108,101,114,32,116,104,97,110,32,97,32,80,78,71,32,104,101,97,100,101,114,0,0,0,100,97,116,97,47,115,97,118,101,95,112,111,105,110,116,95,97,99,116,105,118,101,46,112,110,103,0,0,0,0,0,0,70,68,73,67,84,32,101,110,99,111,117,110,116,101,114,101,100,32,105,110,32,122,108,105,98,32,104,101,97,100,101,114,32,119,104,105,108,101,32,105,116,39,115,32,110,111,116,32,117,115,101,100,32,102,111,114,32,80,78,71,0,0,0,0,100,97,116,97,47,115,97,118,101,95,112,111,105,110,116,46,112,110,103,0,0,0,0,0,100,101,98,117,103,0,0,0,105,110,118,97,108,105,100,32,99,111,109,112,114,101,115,115,105,111,110,32,109,101,116,104,111,100,32,105,110,32,122,108,105,98,32,104,101,97,100,101,114,0,0,0,0,0,0,0,100,97,116,97,47,112,108,97,121,101,114,95,114,105,103,104,116,46,112,110,103,0,0,0,70,83,46,115,121,110,99,102,115,40,102,117,110,99,116,105,111,110,32,40,101,114,114,41,32,123,32,125,41,59,0,0,105,110,118,97,108,105,100,32,70,67,72,69,67,75,32,105,110,32,122,108,105,98,32,104,101,97,100,101,114,0,0,0,100,97,116,97,47,112,108,97,121,101,114,95,108,101,102,116,46,112,110,103,0,0,0,0,119,98,0,0,0,0,0,0,101,110,100,32,111,102,32,105,110,32,98,117,102,102,101,114,32,109,101,109,111,114,121,32,114,101,97,99,104,101,100,32,119,104,105,108,101,32,105,110,102,108,97,116,105,110,103,0,100,97,116,97,47,112,108,97,121,101,114,95,100,111,119,110,46,112,110,103,0,0,0,0,100,97,116,97,0,0,0,0,114,98,0,0,0,0,0,0,78,76,69,78,32,105,115,32,110,111,116,32,111,110,101,115,32,99,111,109,112,108,101,109,101,110,116,32,111,102,32,76,69,78,32,105,110,32,97,32,100,101,102,108,97,116,101,32,98,108,111,99,107,0,0,0,100,97,116,97,47,112,108,97,121,101,114,95,117,112,46,112,110,103,0,0,0,0,0,0,116,95,112,114,111,99,46,46,46,46,46,58,37,54,108,108,100,10,0,0,0,0,0,0,65,117,100,105,111,95,76,111,97,100,83,111,117,110,100,58,32,70,111,114,109,97,116,32,110,111,116,32,115,117,112,112,111,114,116,101,100,58,32,115,97,109,112,108,101,82,97,116,101,58,37,100,59,32,99,104,97,110,110,101,108,115,58,37,100,59,32,66,80,66,58,37,100,10,0,0,0,0,0,0,115,97,118,101,115,0,0,0,115,97,118,101,115,47,103,97,109,101,46,115,97,118,101,0,105,110,118,97,108,105,100,32,100,101,102,108,97,116,101,32,98,108,111,99,107,32,66,84,89,80,69,32,101,110,99,111,117,110,116,101,114,101,100,32,119,104,105,108,101,32,100,101,99,111,100,105,110,103,0,0,100,97,116,97,47,104,111,108,101,95,108,97,118,97,46,112,110,103,0,0,0,0,0,0,100,97,116,97,47,108,101,118,101,108,95,37,48,50,100,46,116,120,116,0,0,0,0,0,80,114,101,115,115,32,91,83,112,97,99,101,93,32,116,111,32,83,116,97,114,116,46,0,114,0,0,0,0,0,0,0,89,111,117,32,97,114,101,32,100,101,97,100,46,0,0,0,9,83,68,76,32,69,114,114,111,114,58,32,37,115,10,0,105,110,118,97,108,105,100,32,100,105,115,116,97,110,99,101,32,99,111,100,101,32,119,104,105,108,101,32,105,110,102,108,97,116,105,110,103,0,0,0,100,97,116,97,47,104,111,108,101,95,115,112,105,107,101,100,46,112,110,103,0,0,0,0,76,101,118,101,108,32,67,111,109,112,108,101,116,101,46,0,101,110,100,32,111,102,32,111,117,116,32,98,117,102,102,101,114,32,109,101,109,111,114,121,32,114,101,97,99,104,101,100,32,119,104,105,108,101,32,105,110,102,108,97,116,105,110,103,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,5,0,0,0,5,0,0,0,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,11,0,0,0,13,0,0,0,15,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,27,0,0,0,31,0,0,0,35,0,0,0,43,0,0,0,51,0,0,0,59,0,0,0,67,0,0,0,83,0,0,0,99,0,0,0,115,0,0,0,131,0,0,0,163,0,0,0,195,0,0,0,227,0,0,0,2,1,0,0,0,0,0,0,97,116,116,114,105,98,117,116,101,32,118,101,99,52,32,97,80,111,115,105,116,105,111,110,59,32,32,32,32,32,32,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,97,84,101,120,67,111,111,114,100,59,32,32,32,32,32,32,10,97,116,116,114,105,98,117,116,101,32,118,101,99,52,32,97,67,111,108,111,114,59,32,32,32,32,32,32,32,32,32,10,118,97,114,121,105,110,103,32,118,101,99,50,32,118,84,101,120,67,111,111,114,100,59,32,32,32,32,32,32,32,32,10,118,97,114,121,105,110,103,32,118,101,99,52,32,118,67,111,108,111,114,59,32,32,32,32,32,32,32,32,32,32,32,10,117,110,105,102,111,114,109,32,109,97,116,52,32,115,80,114,111,106,101,99,116,105,111,110,77,97,116,114,105,120,59,32,10,118,111,105,100,32,109,97,105,110,40,41,32,123,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,97,80,111,115,105,116,105,111,110,32,42,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,115,80,114,111,106,101,99,116,105,111,110,77,97,116,114,105,120,59,32,32,10,32,32,32,118,84,101,120,67,111,111,114,100,32,61,32,97,84,101,120,67,111,111,114,100,59,32,32,32,32,32,32,10,32,32,32,118,67,111,108,111,114,32,61,32,97,67].concat([111,108,111,114,59,32,32,32,32,32,32,32,32,32,32,32,32,10,125,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,0,0,0,0,0,0,112,114,101,99,105,115,105,111,110,32,109,101,100,105,117,109,112,32,102,108,111,97,116,59,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,118,97,114,121,105,110,103,32,118,101,99,50,32,118,84,101,120,67,111,111,114,100,59,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,118,97,114,121,105,110,103,32,118,101,99,52,32,118,67,111,108,111,114,59,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,117,110,105,102,111,114,109,32,115,97,109,112,108,101,114,50,68,32,115,84,101,120,116,117,114,101,59,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,118,111,105,100,32,109,97,105,110,40,41,32,123,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,116,101,120,116,117,114,101,50,68,40,115,84,101,120,116,117,114,101,44,32,118,84,101,120,67,111,111,114,100,41,42,118,67,111,108,111,114,59,32,10,125,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,3,0,0,0,4,0,0,0,4,0,0,0,5,0,0,0,5,0,0,0,6,0,0,0,6,0,0,0,7,0,0,0,7,0,0,0,8,0,0,0,8,0,0,0,9,0,0,0,9,0,0,0,10,0,0,0,10,0,0,0,11,0,0,0,11,0,0,0,12,0,0,0,12,0,0,0,13,0,0,0,13,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,7,0,0,0,9,0,0,0,13,0,0,0,17,0,0,0,25,0,0,0,33,0,0,0,49,0,0,0,65,0,0,0,97,0,0,0,129,0,0,0,193,0,0,0,1,1,0,0,129,1,0,0,1,2,0,0,1,3,0,0,1,4,0,0,1,6,0,0,1,8,0,0,1,12,0,0,1,16,0,0,1,24,0,0,1,32,0,0,1,48,0,0,1,64,0,0,1,96,0,0,16,0,0,0,17,0,0,0,18,0,0,0,0,0,0,0,8,0,0,0,7,0,0,0,9,0,0,0,6,0,0,0,10,0,0,0,5,0,0,0,11,0,0,0,4,0,0,0,12,0,0,0,3,0,0,0,13,0,0,0,2,0,0,0,14,0,0,0,1,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,8,0,0,0,8,0,0,0,4,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,8,0,0,0,8,0,0,0,4,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0])
, "i8", ALLOC_NONE, Runtime.GLOBAL_BASE)
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);
assert(tempDoublePtr % 8 == 0);
function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}
function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}
  function _gettimeofday(ptr) {
      var now = Date.now();
      HEAP32[((ptr)>>2)]=Math.floor(now/1000); // seconds
      HEAP32[(((ptr)+(4))>>2)]=Math.floor((now-1000*Math.floor(now/1000))*1000); // microseconds
      return 0;
    }
  var _sqrtf=Math_sqrt;
  Module["_strlen"] = _strlen;
  function _strncmp(px, py, n) {
      var i = 0;
      while (i < n) {
        var x = HEAPU8[(((px)+(i))|0)];
        var y = HEAPU8[(((py)+(i))|0)];
        if (x == y && x == 0) return 0;
        if (x == 0) return -1;
        if (y == 0) return 1;
        if (x == y) {
          i ++;
          continue;
        } else {
          return x > y ? 1 : -1;
        }
      }
      return 0;
    }
  var _fabsf=Math_abs;
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value
      return value;
    }
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 0777, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0777 | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },reconcile:function (src, dst, callback) {
        var total = 0;
        var create = {};
        for (var key in src.files) {
          if (!src.files.hasOwnProperty(key)) continue;
          var e = src.files[key];
          var e2 = dst.files[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create[key] = e;
            total++;
          }
        }
        var remove = {};
        for (var key in dst.files) {
          if (!dst.files.hasOwnProperty(key)) continue;
          var e = dst.files[key];
          var e2 = src.files[key];
          if (!e2) {
            remove[key] = e;
            total++;
          }
        }
        if (!total) {
          // early out
          return callback(null);
        }
        var completed = 0;
        function done(err) {
          if (err) return callback(err);
          if (++completed >= total) {
            return callback(null);
          }
        };
        // create a single transaction to handle and IDB reads / writes we'll need to do
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        transaction.onerror = function transaction_onerror() { callback(this.error); };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
        for (var path in create) {
          if (!create.hasOwnProperty(path)) continue;
          var entry = create[path];
          if (dst.type === 'local') {
            // save file to local
            try {
              if (FS.isDir(entry.mode)) {
                FS.mkdir(path, entry.mode);
              } else if (FS.isFile(entry.mode)) {
                var stream = FS.open(path, 'w+', 0666);
                FS.write(stream, entry.contents, 0, entry.contents.length, 0, true /* canOwn */);
                FS.close(stream);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // save file to IDB
            var req = store.put(entry, path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
        for (var path in remove) {
          if (!remove.hasOwnProperty(path)) continue;
          var entry = remove[path];
          if (dst.type === 'local') {
            // delete file from local
            try {
              if (FS.isDir(entry.mode)) {
                // TODO recursive delete?
                FS.rmdir(path);
              } else if (FS.isFile(entry.mode)) {
                FS.unlink(path);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // delete file from IDB
            var req = store.delete(path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
      },getLocalSet:function (mount, callback) {
        var files = {};
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
        var check = FS.readdir(mount.mountpoint)
          .filter(isRealDir)
          .map(toAbsolute(mount.mountpoint));
        while (check.length) {
          var path = check.pop();
          var stat, node;
          try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path)
              .filter(isRealDir)
              .map(toAbsolute(path)));
            files[path] = { mode: stat.mode, timestamp: stat.mtime };
          } else if (FS.isFile(stat.mode)) {
            files[path] = { contents: node.contents, mode: stat.mode, timestamp: stat.mtime };
          } else {
            return callback(new Error('node type not supported'));
          }
        }
        return callback(null, { type: 'local', files: files });
      },getDB:function (name, callback) {
        // look it up in the cache
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        req.onupgradeneeded = function req_onupgradeneeded() {
          db = req.result;
          db.createObjectStore(IDBFS.DB_STORE_NAME);
        };
        req.onsuccess = function req_onsuccess() {
          db = req.result;
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function req_onerror() {
          callback(this.error);
        };
      },getRemoteSet:function (mount, callback) {
        var files = {};
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function transaction_onerror() { callback(this.error); };
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          store.openCursor().onsuccess = function store_openCursor_onsuccess(event) {
            var cursor = event.target.result;
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, files: files });
            }
            files[cursor.key] = cursor.value;
            cursor.continue();
          };
        });
      }};
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.position = position;
          return position;
        }}};
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[null],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || { recurse_count: 0 };
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
        // start at the root
        var current = FS.root;
        var current_path = '/';
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            current = current.mount.root;
          }
          // follow symlinks
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
            this.parent = null;
            this.mount = null;
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            FS.hashAddNode(this);
          };
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
          FS.FSNode.prototype = {};
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
        return new FS.FSNode(parent, name, mode, rdev);
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 1;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
        var completed = 0;
        var total = FS.mounts.length;
        function done(err) {
          if (err) {
            return callback(err);
          }
          if (++completed >= total) {
            callback(null);
          }
        };
        // sync all mounts
        for (var i = 0; i < FS.mounts.length; i++) {
          var mount = FS.mounts[i];
          if (!mount.type.syncfs) {
            done(null);
            continue;
          }
          mount.type.syncfs(mount, populate, done);
        }
      },mount:function (type, opts, mountpoint) {
        var lookup;
        if (mountpoint) {
          lookup = FS.lookupPath(mountpoint, { follow: false });
          mountpoint = lookup.path;  // use the absolute path
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          root: null
        };
        // create a root node for the fs
        var root = type.mount(mount);
        root.mount = mount;
        mount.root = root;
        // assign the mount info to the mountpoint's node
        if (lookup) {
          lookup.node.mount = mount;
          lookup.node.mounted = true;
          // compatibility update FS.root if we mount to /
          if (mountpoint === '/') {
            FS.root = mount.root;
          }
        }
        // add to our cached list of mounts
        FS.mounts.push(mount);
        return root;
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 0666;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 0777;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 0666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path, { follow: false });
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 0666 : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.errnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0);
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=stdin.fd;
        assert(stdin.fd === 1, 'invalid handle for stdin (' + stdin.fd + ')');
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=stdout.fd;
        assert(stdout.fd === 2, 'invalid handle for stdout (' + stdout.fd + ')');
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=stderr.fd;
        assert(stderr.fd === 3, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
          this.stack = stackTrace();
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.root = FS.createNode(null, '/', 16384 | 0777, 0);
        FS.mount(MEMFS, {}, '/');
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
        FS.ensureErrnoError();
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
              if (!hasByteServing) chunkSize = datalength;
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var ret = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return (ret == -1) ? 0 : ret;
    }
  function _lseek(fildes, offset, whence) {
      // off_t lseek(int fildes, off_t offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/lseek.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        return FS.llseek(stream, offset, whence);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fseek(stream, offset, whence) {
      // int fseek(FILE *stream, long offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fseek.html
      var ret = _lseek(stream, offset, whence);
      if (ret == -1) {
        return -1;
      }
      stream = FS.getStream(stream);
      stream.eof = false;
      return 0;
    }
  function _ftell(stream) {
      // long ftell(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ftell.html
      stream = FS.getStream(stream);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      if (FS.isChrdev(stream.node.mode)) {
        ___setErrNo(ERRNO_CODES.ESPIPE);
        return -1;
      } else {
        return stream.position;
      }
    }
  function _rewind(stream) {
      // void rewind(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/rewind.html
      _fseek(stream, 0, 0);  // SEEK_SET.
      var streamObj = FS.getStream(stream);
      if (streamObj) streamObj.error = false;
    }
  var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 0777, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
          return res;
        }}};function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStream(stream);
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)|0)]=streamObj.ungotten.pop()
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(stream, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return Math.floor(bytesRead / size);
    }
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  function _fsync(fildes) {
      // int fsync(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fsync.html
      var stream = FS.getStream(fildes);
      if (stream) {
        // We write directly to the file system, so there's nothing to do here.
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      _fsync(stream);
      return _close(stream);
    }
  function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  function _strcmp(px, py) {
      return _strncmp(px, py, TOTAL_MEMORY);
    }
  var GL={counter:1,lastError:0,buffers:[],programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],clientBuffers:[],currArrayBuffer:0,currElementArrayBuffer:0,byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},packAlignment:4,unpackAlignment:4,init:function () {
        Browser.moduleContextCreatedCallbacks.push(GL.initExtensions);
      },recordError:function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },getNewId:function (table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },MINI_TEMP_BUFFER_SIZE:16,miniTempBuffer:null,miniTempBufferViews:[0],MAX_TEMP_BUFFER_SIZE:2097152,tempBufferIndexLookup:null,tempVertexBuffers:null,tempIndexBuffers:null,tempQuadIndexBuffer:null,generateTempBuffers:function (quads) {
        GL.tempBufferIndexLookup = new Uint8Array(GL.MAX_TEMP_BUFFER_SIZE+1);
        GL.tempVertexBuffers = [];
        GL.tempIndexBuffers = [];
        var last = -1, curr = -1;
        var size = 1;
        for (var i = 0; i <= GL.MAX_TEMP_BUFFER_SIZE; i++) {
          if (i > size) {
            size <<= 1;
          }
          if (size != last) {
            curr++;
            GL.tempVertexBuffers[curr] = Module.ctx.createBuffer();
            Module.ctx.bindBuffer(Module.ctx.ARRAY_BUFFER, GL.tempVertexBuffers[curr]);
            Module.ctx.bufferData(Module.ctx.ARRAY_BUFFER, size, Module.ctx.DYNAMIC_DRAW);
            Module.ctx.bindBuffer(Module.ctx.ARRAY_BUFFER, null);
            GL.tempIndexBuffers[curr] = Module.ctx.createBuffer();
            Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, GL.tempIndexBuffers[curr]);
            Module.ctx.bufferData(Module.ctx.ELEMENT_ARRAY_BUFFER, size, Module.ctx.DYNAMIC_DRAW);
            Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, null);
            last = size;
          }
          GL.tempBufferIndexLookup[i] = curr;
        }
        if (quads) {
          // GL_QUAD indexes can be precalculated
          GL.tempQuadIndexBuffer = Module.ctx.createBuffer();
          Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, GL.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          Module.ctx.bufferData(Module.ctx.ELEMENT_ARRAY_BUFFER, quadIndexes, Module.ctx.STATIC_DRAW);
          Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, null);
        }
      },findToken:function (source, token) {
        function isIdentChar(ch) {
          if (ch >= 48 && ch <= 57) // 0-9
            return true;
          if (ch >= 65 && ch <= 90) // A-Z
            return true;
          if (ch >= 97 && ch <= 122) // a-z
            return true;
          return false;
        }
        var i = -1;
        do {
          i = source.indexOf(token, i + 1);
          if (i < 0) {
            break;
          }
          if (i > 0 && isIdentChar(source[i - 1])) {
            continue;
          }
          i += token.length;
          if (i < source.length - 1 && isIdentChar(source[i + 1])) {
            continue;
          }
          return true;
        } while (true);
        return false;
      },getSource:function (shader, count, string, length) {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var frag;
          if (length) {
            var len = HEAP32[(((length)+(i*4))>>2)];
            if (len < 0) {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
            } else {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)], len);
            }
          } else {
            frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
          }
          source += frag;
        }
        // Let's see if we need to enable the standard derivatives extension
        type = Module.ctx.getShaderParameter(GL.shaders[shader], 0x8B4F /* GL_SHADER_TYPE */);
        if (type == 0x8B30 /* GL_FRAGMENT_SHADER */) {
          if (GL.findToken(source, "dFdx") ||
              GL.findToken(source, "dFdy") ||
              GL.findToken(source, "fwidth")) {
            source = "#extension GL_OES_standard_derivatives : enable\n" + source;
            var extension = Module.ctx.getExtension("OES_standard_derivatives");
          }
        }
        return source;
      },computeImageSize:function (width, height, sizePerPixel, alignment) {
        function roundedToNextMultipleOf(x, y) {
          return Math.floor((x + y - 1) / y) * y
        }
        var plainRowSize = width * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
        return (height <= 0) ? 0 :
                 ((height - 1) * alignedRowSize + plainRowSize);
      },getTexPixelData:function (type, format, width, height, pixels, internalFormat) {
        var sizePerPixel;
        switch (type) {
          case 0x1401 /* GL_UNSIGNED_BYTE */:
            switch (format) {
              case 0x1906 /* GL_ALPHA */:
              case 0x1909 /* GL_LUMINANCE */:
                sizePerPixel = 1;
                break;
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4;
                break;
              case 0x190A /* GL_LUMINANCE_ALPHA */:
                sizePerPixel = 2;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1403 /* GL_UNSIGNED_SHORT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 2;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1405 /* GL_UNSIGNED_INT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 4;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x84FA /* UNSIGNED_INT_24_8_WEBGL */:
            sizePerPixel = 4;
            break;
          case 0x8363 /* GL_UNSIGNED_SHORT_5_6_5 */:
          case 0x8033 /* GL_UNSIGNED_SHORT_4_4_4_4 */:
          case 0x8034 /* GL_UNSIGNED_SHORT_5_5_5_1 */:
            sizePerPixel = 2;
            break;
          case 0x1406 /* GL_FLOAT */:
            switch (format) {
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3*4;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4*4;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            internalFormat = Module.ctx.RGBA;
            break;
          default:
            throw 'Invalid type (' + type + ')';
        }
        var bytes = GL.computeImageSize(width, height, sizePerPixel, GL.unpackAlignment);
        if (type == 0x1401 /* GL_UNSIGNED_BYTE */) {
          pixels = HEAPU8.subarray((pixels),(pixels+bytes));
        } else if (type == 0x1406 /* GL_FLOAT */) {
          pixels = HEAPF32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else if (type == 0x1405 /* GL_UNSIGNED_INT */ || type == 0x84FA /* UNSIGNED_INT_24_8_WEBGL */) {
          pixels = HEAPU32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else {
          pixels = HEAPU16.subarray((pixels)>>1,(pixels+bytes)>>1);
        }
        return {
          pixels: pixels,
          internalFormat: internalFormat
        }
      },calcBufLength:function calcBufLength(size, type, stride, count) {
        if (stride > 0) {
          return count * stride;  // XXXvlad this is not exactly correct I don't think
        }
        var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        return size * typeSize * count;
      },usedTempBuffers:[],preDrawHandleClientVertexAttribBindings:function preDrawHandleClientVertexAttribBindings(count) {
        GL.resetBufferBinding = false;
        var used = GL.usedTempBuffers;
        used.length = 0;
        // TODO: initial pass to detect ranges we need to upload, might not need an upload per attrib
        for (var i = 0; i < GL.maxVertexAttribs; ++i) {
          var cb = GL.clientBuffers[i];
          if (!cb.clientside || !cb.enabled) continue;
          GL.resetBufferBinding = true;
          var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
          var index = GL.tempBufferIndexLookup[size];
          var buf;
          do {
            buf = GL.tempVertexBuffers[index++];
          } while (used.indexOf(buf) >= 0);
          used.push(buf);
          Module.ctx.bindBuffer(Module.ctx.ARRAY_BUFFER, buf);
          Module.ctx.bufferSubData(Module.ctx.ARRAY_BUFFER,
                                   0,
                                   HEAPU8.subarray(cb.ptr, cb.ptr + size));
          Module.ctx.vertexAttribPointer(i, cb.size, cb.type, cb.normalized, cb.stride, 0);
        }
      },postDrawHandleClientVertexAttribBindings:function postDrawHandleClientVertexAttribBindings() {
        if (GL.resetBufferBinding) {
          Module.ctx.bindBuffer(Module.ctx.ARRAY_BUFFER, GL.buffers[GL.currArrayBuffer]);
        }
      },initExtensions:function () {
        if (GL.initExtensions.done) return;
        GL.initExtensions.done = true;
        if (!Module.useWebGL) return; // an app might link both gl and 2d backends
        GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i+1);
        }
        GL.maxVertexAttribs = Module.ctx.getParameter(Module.ctx.MAX_VERTEX_ATTRIBS);
        for (var i = 0; i < GL.maxVertexAttribs; i++) {
          GL.clientBuffers[i] = { enabled: false, clientside: false, size: 0, type: 0, normalized: 0, stride: 0, ptr: 0 };
        }
        GL.generateTempBuffers();
        // Detect the presence of a few extensions manually, this GL interop layer itself will need to know if they exist. 
        GL.compressionExt = Module.ctx.getExtension('WEBGL_compressed_texture_s3tc') ||
                            Module.ctx.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
                            Module.ctx.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        GL.anisotropicExt = Module.ctx.getExtension('EXT_texture_filter_anisotropic') ||
                            Module.ctx.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
                            Module.ctx.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
        GL.floatExt = Module.ctx.getExtension('OES_texture_float');
        // These are the 'safe' feature-enabling extensions that don't add any performance impact related to e.g. debugging, and
        // should be enabled by default so that client GLES2/GL code will not need to go through extra hoops to get its stuff working.
        // As new extensions are ratified at http://www.khronos.org/registry/webgl/extensions/ , feel free to add your new extensions
        // here, as long as they don't produce a performance impact for users that might not be using those extensions.
        // E.g. debugging-related extensions should probably be off by default.
        var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives",
                                               "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture",
                                               "OES_element_index_uint", "EXT_texture_filter_anisotropic", "ANGLE_instanced_arrays",
                                               "OES_texture_float_linear", "OES_texture_half_float_linear", "WEBGL_compressed_texture_atc",
                                               "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float",
                                               "EXT_frag_depth", "EXT_sRGB", "WEBGL_draw_buffers", "WEBGL_shared_resources" ];
        function shouldEnableAutomatically(extension) {
          for(var i in automaticallyEnabledExtensions) {
            var include = automaticallyEnabledExtensions[i];
            if (ext.indexOf(include) != -1) {
              return true;
            }
          }
          return false;
        }
        var extensions = Module.ctx.getSupportedExtensions();
        for(var e in extensions) {
          var ext = extensions[e].replace('MOZ_', '').replace('WEBKIT_', '');
          if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
            Module.ctx.getExtension(ext); // Calling .getExtension enables that extension permanently, no need to store the return value to be enabled.
          }
        }
      },populateUniformTable:function (program) {
        var p = GL.programs[program];
        GL.programInfos[program] = {
          uniforms: {},
          maxUniformLength: 0, // This is eagerly computed below, since we already enumerate all uniforms anyway.
          maxAttributeLength: -1 // This is lazily computed and cached, computed when/if first asked, "-1" meaning not computed yet.
        };
        var ptable = GL.programInfos[program];
        var utable = ptable.uniforms;
        // A program's uniform table maps the string name of an uniform to an integer location of that uniform.
        // The global GL.uniforms map maps integer locations to WebGLUniformLocations.
        var numUniforms = Module.ctx.getProgramParameter(p, Module.ctx.ACTIVE_UNIFORMS);
        for (var i = 0; i < numUniforms; ++i) {
          var u = Module.ctx.getActiveUniform(p, i);
          var name = u.name;
          ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length+1);
          // Strip off any trailing array specifier we might have got, e.g. "[0]".
          if (name.indexOf(']', name.length-1) !== -1) {
            var ls = name.lastIndexOf('[');
            name = name.slice(0, ls);
          }
          // Optimize memory usage slightly: If we have an array of uniforms, e.g. 'vec3 colors[3];', then 
          // only store the string 'colors' in utable, and 'colors[0]', 'colors[1]' and 'colors[2]' will be parsed as 'colors'+i.
          // Note that for the GL.uniforms table, we still need to fetch the all WebGLUniformLocations for all the indices.
          var loc = Module.ctx.getUniformLocation(p, name);
          var id = GL.getNewId(GL.uniforms);
          utable[name] = [u.size, id];
          GL.uniforms[id] = loc;
          for (var j = 1; j < u.size; ++j) {
            var n = name + '['+j+']';
            loc = Module.ctx.getUniformLocation(p, n);
            id = GL.getNewId(GL.uniforms);
            GL.uniforms[id] = loc;
          }
        }
      }};function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = Module.ctx.createShader(shaderType);
      return id;
    }
  function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length);
      Module.ctx.shaderSource(GL.shaders[shader], source);
    }
  function _glCompileShader(shader) {
      Module.ctx.compileShader(GL.shaders[shader]);
    }
  function _glGetShaderiv(shader, pname, p) {
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        HEAP32[((p)>>2)]=Module.ctx.getShaderInfoLog(GL.shaders[shader]).length + 1;
      } else {
        HEAP32[((p)>>2)]=Module.ctx.getShaderParameter(GL.shaders[shader], pname);
      }
    }
  function _glDeleteShader(shader) {
      Module.ctx.deleteShader(GL.shaders[shader]);
      GL.shaders[shader] = null;
    }
  function _glCreateProgram() {
      var id = GL.getNewId(GL.programs);
      var program = Module.ctx.createProgram();
      program.name = id;
      GL.programs[id] = program;
      return id;
    }
  function _glAttachShader(program, shader) {
      Module.ctx.attachShader(GL.programs[program],
                              GL.shaders[shader]);
    }
  function _glLinkProgram(program) {
      Module.ctx.linkProgram(GL.programs[program]);
      GL.programInfos[program] = null; // uniforms no longer keep the same names after linking
      GL.populateUniformTable(program);
    }
  function _glGetProgramiv(program, pname, p) {
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        HEAP32[((p)>>2)]=Module.ctx.getProgramInfoLog(GL.programs[program]).length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        var ptable = GL.programInfos[program];
        if (ptable) {
          HEAP32[((p)>>2)]=ptable.maxUniformLength;
          return;
        } else if (program < GL.counter) {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        } else {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        }
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        var ptable = GL.programInfos[program];
        if (ptable) {
          if (ptable.maxAttributeLength == -1) {
            var program = GL.programs[program];
            var numAttribs = Module.ctx.getProgramParameter(program, Module.ctx.ACTIVE_ATTRIBUTES);
            ptable.maxAttributeLength = 0; // Spec says if there are no active attribs, 0 must be returned.
            for(var i = 0; i < numAttribs; ++i) {
              var activeAttrib = Module.ctx.getActiveAttrib(program, i);
              ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length+1);
            }
          }
          HEAP32[((p)>>2)]=ptable.maxAttributeLength;
          return;
        } else if (program < GL.counter) {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        } else {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        }
      } else {
        HEAP32[((p)>>2)]=Module.ctx.getProgramParameter(GL.programs[program], pname);
      }
    }
  function _glDeleteProgram(program) {
      var program = GL.programs[program];
      Module.ctx.deleteProgram(program);
      program.name = 0;
      GL.programs[program] = null;
      GL.programInfos[program] = null;
    }
  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
        // Canvas event setup
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
            ['experimental-webgl', 'webgl'].some(function(webglId) {
              return ctx = canvas.getContext(webglId, contextAttributes);
            });
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas - ' + e);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (window.scrollX + rect.left);
              y = t.pageY - (window.scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (window.scrollX + rect.left);
            y = event.pageY - (window.scrollY + rect.top);
          }
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};var SDL={defaults:{width:320,height:200,copyOnLock:true},version:null,surfaces:{},canvasPool:[],events:[],fonts:[null],audios:[null],rwops:[null],music:{audio:null,volume:1},mixerFrequency:22050,mixerFormat:32784,mixerNumChannels:2,mixerChunkSize:1024,channelMinimumNumber:0,GL:false,glAttributes:{0:3,1:3,2:2,3:0,4:0,5:1,6:16,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:1,16:0,17:0,18:0},keyboardState:null,keyboardMap:{},canRequestFullscreen:false,isRequestingFullscreen:false,textInput:false,startTime:null,initFlags:0,buttonState:0,modState:0,DOMButtons:[0,0,0],DOMEventToSDLEvent:{},keyCodes:{16:1249,17:1248,18:1250,33:1099,34:1102,37:1104,38:1106,39:1103,40:1105,46:127,96:1112,97:1113,98:1114,99:1115,100:1116,101:1117,102:1118,103:1119,104:1120,105:1121,112:1082,113:1083,114:1084,115:1085,116:1086,117:1087,118:1088,119:1089,120:1090,121:1091,122:1092,123:1093,173:45,188:44,190:46,191:47,192:96},scanCodes:{8:42,9:43,13:40,27:41,32:44,44:54,46:55,47:56,48:39,49:30,50:31,51:32,52:33,53:34,54:35,55:36,56:37,57:38,59:51,61:46,91:47,92:49,93:48,96:52,97:4,98:5,99:6,100:7,101:8,102:9,103:10,104:11,105:12,106:13,107:14,108:15,109:16,110:17,111:18,112:19,113:20,114:21,115:22,116:23,117:24,118:25,119:26,120:27,121:28,122:29,305:224,308:226},loadRect:function (rect) {
        return {
          x: HEAP32[((rect + 0)>>2)],
          y: HEAP32[((rect + 4)>>2)],
          w: HEAP32[((rect + 8)>>2)],
          h: HEAP32[((rect + 12)>>2)]
        };
      },loadColorToCSSRGB:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgb(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ')';
      },loadColorToCSSRGBA:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgba(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ',' + (((rgba >> 24)&255)/255) + ')';
      },translateColorToCSSRGBA:function (rgba) {
        return 'rgba(' + (rgba&0xff) + ',' + (rgba>>8 & 0xff) + ',' + (rgba>>16 & 0xff) + ',' + (rgba>>>24)/0xff + ')';
      },translateRGBAToCSSRGBA:function (r, g, b, a) {
        return 'rgba(' + (r&0xff) + ',' + (g&0xff) + ',' + (b&0xff) + ',' + (a&0xff)/255 + ')';
      },translateRGBAToColor:function (r, g, b, a) {
        return r | g << 8 | b << 16 | a << 24;
      },makeSurface:function (width, height, flags, usePageCanvas, source, rmask, gmask, bmask, amask) {
        flags = flags || 0;
        var surf = _malloc(60);  // SDL_Surface has 15 fields of quantum size
        var buffer = _malloc(width*height*4); // TODO: only allocate when locked the first time
        var pixelFormat = _malloc(44);
        flags |= 1; // SDL_HWSURFACE - this tells SDL_MUSTLOCK that this needs to be locked
        //surface with SDL_HWPALETTE flag is 8bpp surface (1 byte)
        var is_SDL_HWPALETTE = flags & 0x00200000;
        var bpp = is_SDL_HWPALETTE ? 1 : 4;
        HEAP32[((surf)>>2)]=flags         // SDL_Surface.flags
        HEAP32[(((surf)+(4))>>2)]=pixelFormat // SDL_Surface.format TODO
        HEAP32[(((surf)+(8))>>2)]=width         // SDL_Surface.w
        HEAP32[(((surf)+(12))>>2)]=height        // SDL_Surface.h
        HEAP32[(((surf)+(16))>>2)]=width * bpp       // SDL_Surface.pitch, assuming RGBA or indexed for now,
                                                                                 // since that is what ImageData gives us in browsers
        HEAP32[(((surf)+(20))>>2)]=buffer      // SDL_Surface.pixels
        HEAP32[(((surf)+(36))>>2)]=0      // SDL_Surface.offset
        HEAP32[(((surf)+(56))>>2)]=1
        HEAP32[((pixelFormat)>>2)]=0 /* XXX missing C define SDL_PIXELFORMAT_RGBA8888 */ // SDL_PIXELFORMAT_RGBA8888
        HEAP32[(((pixelFormat)+(4))>>2)]=0 // TODO
        HEAP8[(((pixelFormat)+(8))|0)]=bpp * 8
        HEAP8[(((pixelFormat)+(9))|0)]=bpp
        HEAP32[(((pixelFormat)+(12))>>2)]=rmask || 0x000000ff
        HEAP32[(((pixelFormat)+(16))>>2)]=gmask || 0x0000ff00
        HEAP32[(((pixelFormat)+(20))>>2)]=bmask || 0x00ff0000
        HEAP32[(((pixelFormat)+(24))>>2)]=amask || 0xff000000
        // Decide if we want to use WebGL or not
        var useWebGL = (flags & 0x04000000) != 0; // SDL_OPENGL
        SDL.GL = SDL.GL || useWebGL;
        var canvas;
        if (!usePageCanvas) {
          if (SDL.canvasPool.length > 0) {
            canvas = SDL.canvasPool.pop();
          } else {
            canvas = document.createElement('canvas');
          }
          canvas.width = width;
          canvas.height = height;
        } else {
          canvas = Module['canvas'];
        }
        var webGLContextAttributes = {
          antialias: ((SDL.glAttributes[13 /*SDL_GL_MULTISAMPLEBUFFERS*/] != 0) && (SDL.glAttributes[14 /*SDL_GL_MULTISAMPLESAMPLES*/] > 1)),
          depth: (SDL.glAttributes[6 /*SDL_GL_DEPTH_SIZE*/] > 0),
          stencil: (SDL.glAttributes[7 /*SDL_GL_STENCIL_SIZE*/] > 0)
        };
        var ctx = Browser.createContext(canvas, useWebGL, usePageCanvas, webGLContextAttributes);
        SDL.surfaces[surf] = {
          width: width,
          height: height,
          canvas: canvas,
          ctx: ctx,
          surf: surf,
          buffer: buffer,
          pixelFormat: pixelFormat,
          alpha: 255,
          flags: flags,
          locked: 0,
          usePageCanvas: usePageCanvas,
          source: source,
          isFlagSet: function(flag) {
            return flags & flag;
          }
        };
        return surf;
      },copyIndexedColorData:function (surfData, rX, rY, rW, rH) {
        // HWPALETTE works with palette
        // setted by SDL_SetColors
        if (!surfData.colors) {
          return;
        }
        var fullWidth  = Module['canvas'].width;
        var fullHeight = Module['canvas'].height;
        var startX  = rX || 0;
        var startY  = rY || 0;
        var endX    = (rW || (fullWidth - startX)) + startX;
        var endY    = (rH || (fullHeight - startY)) + startY;
        var buffer  = surfData.buffer;
        var data    = surfData.image.data;
        var colors  = surfData.colors;
        for (var y = startY; y < endY; ++y) {
          var indexBase = y * fullWidth;
          var colorBase = indexBase * 4;
          for (var x = startX; x < endX; ++x) {
            // HWPALETTE have only 256 colors (not rgba)
            var index = HEAPU8[((buffer + indexBase + x)|0)] * 3;
            var colorOffset = colorBase + x * 4;
            data[colorOffset   ] = colors[index   ];
            data[colorOffset +1] = colors[index +1];
            data[colorOffset +2] = colors[index +2];
            //unused: data[colorOffset +3] = color[index +3];
          }
        }
      },freeSurface:function (surf) {
        var refcountPointer = surf + 56;
        var refcount = HEAP32[((refcountPointer)>>2)];
        if (refcount > 1) {
          HEAP32[((refcountPointer)>>2)]=refcount - 1;
          return;
        }
        var info = SDL.surfaces[surf];
        if (!info.usePageCanvas && info.canvas) SDL.canvasPool.push(info.canvas);
        _free(info.buffer);
        _free(info.pixelFormat);
        _free(surf);
        SDL.surfaces[surf] = null;
      },touchX:0,touchY:0,savedKeydown:null,receiveEvent:function (event) {
        switch(event.type) {
          case 'touchstart':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            var event = {
              type: 'mousedown',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 1;
            SDL.events.push(event);
            break;
          case 'touchmove':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            event = {
              type: 'mousemove',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.events.push(event);
            break;
          case 'touchend':
            event.preventDefault();
            event = {
              type: 'mouseup',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 0;
            SDL.events.push(event);
            break;
          case 'mousemove':
            if (Browser.pointerLock) {
              // workaround for firefox bug 750111
              if ('mozMovementX' in event) {
                event['movementX'] = event['mozMovementX'];
                event['movementY'] = event['mozMovementY'];
              }
              // workaround for Firefox bug 782777
              if (event['movementX'] == 0 && event['movementY'] == 0) {
                // ignore a mousemove event if it doesn't contain any movement info
                // (without pointer lock, we infer movement from pageX/pageY, so this check is unnecessary)
                event.preventDefault();
                return;
              }
            }
            // fall through
          case 'keydown': case 'keyup': case 'keypress': case 'mousedown': case 'mouseup': case 'DOMMouseScroll': case 'mousewheel':
            // If we preventDefault on keydown events, the subsequent keypress events
            // won't fire. However, it's fine (and in some cases necessary) to
            // preventDefault for keys that don't generate a character. Otherwise,
            // preventDefault is the right thing to do in general.
            if (event.type !== 'keydown' || (event.keyCode === 8 /* backspace */ || event.keyCode === 9 /* tab */)) {
              event.preventDefault();
            }
            if (event.type == 'DOMMouseScroll' || event.type == 'mousewheel') {
              var button = (event.type == 'DOMMouseScroll' ? event.detail : -event.wheelDelta) > 0 ? 4 : 3;
              var event2 = {
                type: 'mousedown',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
              SDL.events.push(event2);
              event = {
                type: 'mouseup',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
            } else if (event.type == 'mousedown') {
              SDL.DOMButtons[event.button] = 1;
            } else if (event.type == 'mouseup') {
              // ignore extra ups, can happen if we leave the canvas while pressing down, then return,
              // since we add a mouseup in that case
              if (!SDL.DOMButtons[event.button]) {
                return;
              }
              SDL.DOMButtons[event.button] = 0;
            }
            // We can only request fullscreen as the result of user input.
            // Due to this limitation, we toggle a boolean on keydown which
            // SDL_WM_ToggleFullScreen will check and subsequently set another
            // flag indicating for us to request fullscreen on the following
            // keyup. This isn't perfect, but it enables SDL_WM_ToggleFullScreen
            // to work as the result of a keypress (which is an extremely
            // common use case).
            if (event.type === 'keydown') {
              SDL.canRequestFullscreen = true;
            } else if (event.type === 'keyup') {
              if (SDL.isRequestingFullscreen) {
                Module['requestFullScreen'](true, true);
                SDL.isRequestingFullscreen = false;
              }
              SDL.canRequestFullscreen = false;
            }
            // SDL expects a unicode character to be passed to its keydown events.
            // Unfortunately, the browser APIs only provide a charCode property on
            // keypress events, so we must backfill in keydown events with their
            // subsequent keypress event's charCode.
            if (event.type === 'keypress' && SDL.savedKeydown) {
              // charCode is read-only
              SDL.savedKeydown.keypressCharCode = event.charCode;
              SDL.savedKeydown = null;
            } else if (event.type === 'keydown') {
              SDL.savedKeydown = event;
            }
            // Don't push keypress events unless SDL_StartTextInput has been called.
            if (event.type !== 'keypress' || SDL.textInput) {
              SDL.events.push(event);
            }
            break;
          case 'mouseout':
            // Un-press all pressed mouse buttons, because we might miss the release outside of the canvas
            for (var i = 0; i < 3; i++) {
              if (SDL.DOMButtons[i]) {
                SDL.events.push({
                  type: 'mouseup',
                  button: i,
                  pageX: event.pageX,
                  pageY: event.pageY
                });
                SDL.DOMButtons[i] = 0;
              }
            }
            event.preventDefault();
            break;
          case 'blur':
          case 'visibilitychange': {
            // Un-press all pressed keys: TODO
            for (var code in SDL.keyboardMap) {
              SDL.events.push({
                type: 'keyup',
                keyCode: SDL.keyboardMap[code]
              });
            }
            event.preventDefault();
            break;
          }
          case 'unload':
            if (Browser.mainLoop.runner) {
              SDL.events.push(event);
              // Force-run a main event loop, since otherwise this event will never be caught!
              Browser.mainLoop.runner();
            }
            return;
          case 'resize':
            SDL.events.push(event);
            // manually triggered resize event doesn't have a preventDefault member
            if (event.preventDefault) {
              event.preventDefault();
            }
            break;
        }
        if (SDL.events.length >= 10000) {
          Module.printErr('SDL event queue full, dropping events');
          SDL.events = SDL.events.slice(0, 10000);
        }
        return;
      },handleEvent:function (event) {
        if (event.handled) return;
        event.handled = true;
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            var code = event.keyCode;
            if (code >= 65 && code <= 90) {
              code += 32; // make lowercase for SDL
            } else {
              code = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
            HEAP8[(((SDL.keyboardState)+(code))|0)]=down;
            // TODO: lmeta, rmeta, numlock, capslock, KMOD_MODE, KMOD_RESERVED
            SDL.modState = (HEAP8[(((SDL.keyboardState)+(1248))|0)] ? 0x0040 | 0x0080 : 0) | // KMOD_LCTRL & KMOD_RCTRL
              (HEAP8[(((SDL.keyboardState)+(1249))|0)] ? 0x0001 | 0x0002 : 0) | // KMOD_LSHIFT & KMOD_RSHIFT
              (HEAP8[(((SDL.keyboardState)+(1250))|0)] ? 0x0100 | 0x0200 : 0); // KMOD_LALT & KMOD_RALT
            if (down) {
              SDL.keyboardMap[code] = event.keyCode; // save the DOM input, which we can use to unpress it during blur
            } else {
              delete SDL.keyboardMap[code];
            }
            break;
          }
          case 'mousedown': case 'mouseup':
          case 'touchstart': case 'touchend':
            if (event.type == 'mousedown') {
              // SDL_BUTTON(x) is defined as (1 << ((x)-1)).  SDL buttons are 1-3,
              // and DOM buttons are 0-2, so this means that the below formula is
              // correct.
              SDL.buttonState |= 1 << event.button;
            } else if (event.type == 'mouseup') {
              SDL.buttonState &= ~(1 << event.button);
            }
            if (event.type == 'touchstart') {
              SDL.buttonState |= 1 ;
            } else if (event.type == 'touchend') {
              SDL.buttonState &= ~(1);
            }
            // fall through
          case 'mousemove': {
            Browser.calculateMouseEvent(event);
            break;
          }
        }
      },makeCEvent:function (event, ptr) {
        if (typeof event === 'number') {
          // This is a pointer to a native C event that was SDL_PushEvent'ed
          _memcpy(ptr, event, 28); // XXX
          return;
        }
        SDL.handleEvent(event);
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            //Module.print('Received key event: ' + event.keyCode);
            var key = event.keyCode;
            if (key >= 65 && key <= 90) {
              key += 32; // make lowercase for SDL
            } else {
              key = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
            var scan;
            if (key >= 1024) {
              scan = key - 1024;
            } else {
              scan = SDL.scanCodes[key] || key;
            }
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type]
            HEAP8[(((ptr)+(8))|0)]=down ? 1 : 0
            HEAP8[(((ptr)+(9))|0)]=0 // TODO
            HEAP32[(((ptr)+(12))>>2)]=scan
            HEAP32[(((ptr)+(16))>>2)]=key
            HEAP16[(((ptr)+(20))>>1)]=SDL.modState
            // some non-character keys (e.g. backspace and tab) won't have keypressCharCode set, fill in with the keyCode.
            HEAP32[(((ptr)+(24))>>2)]=event.keypressCharCode || key
            break;
          }
          case 'keypress': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type]
            // Not filling in windowID for now
            var cStr = intArrayFromString(String.fromCharCode(event.charCode));
            for (var i = 0; i < cStr.length; ++i) {
              HEAP8[(((ptr)+(8 + i))|0)]=cStr[i];
            }
            break;
          }
          case 'mousedown': case 'mouseup': case 'mousemove': {
            if (event.type != 'mousemove') {
              var down = event.type === 'mousedown';
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=event.button+1; // DOM buttons are 0-2, SDL 1-3
              HEAP8[(((ptr)+(9))|0)]=down ? 1 : 0;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
            } else {
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=SDL.buttonState;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
              HEAP32[(((ptr)+(20))>>2)]=Browser.mouseMovementX;
              HEAP32[(((ptr)+(24))>>2)]=Browser.mouseMovementY;
            }
            break;
          }
          case 'unload': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            break;
          }
          case 'resize': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP32[(((ptr)+(4))>>2)]=event.w;
            HEAP32[(((ptr)+(8))>>2)]=event.h;
            break;
          }
          case 'joystick_button_up': case 'joystick_button_down': {
            var state = event.type === 'joystick_button_up' ? 0 : 1;
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.button;
            HEAP8[(((ptr)+(6))|0)]=state;
            break;
          }
          case 'joystick_axis_motion': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.axis;
            HEAP32[(((ptr)+(8))>>2)]=SDL.joystickAxisValueConversion(event.value);
            break;
          }
          default: throw 'Unhandled SDL event: ' + event.type;
        }
      },estimateTextWidth:function (fontData, text) {
        var h = fontData.size;
        var fontString = h + 'px ' + fontData.name;
        var tempCtx = SDL.ttfContext;
        tempCtx.save();
        tempCtx.font = fontString;
        var ret = tempCtx.measureText(text).width | 0;
        tempCtx.restore();
        return ret;
      },allocateChannels:function (num) { // called from Mix_AllocateChannels and init
        if (SDL.numChannels && SDL.numChannels >= num && num != 0) return;
        SDL.numChannels = num;
        SDL.channels = [];
        for (var i = 0; i < num; i++) {
          SDL.channels[i] = {
            audio: null,
            volume: 1.0
          };
        }
      },setGetVolume:function (info, volume) {
        if (!info) return 0;
        var ret = info.volume * 128; // MIX_MAX_VOLUME
        if (volume != -1) {
          info.volume = volume / 128;
          if (info.audio) info.audio.volume = info.volume;
        }
        return ret;
      },debugSurface:function (surfData) {
        console.log('dumping surface ' + [surfData.surf, surfData.source, surfData.width, surfData.height]);
        var image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
        var data = image.data;
        var num = Math.min(surfData.width, surfData.height);
        for (var i = 0; i < num; i++) {
          console.log('   diagonal ' + i + ':' + [data[i*surfData.width*4 + i*4 + 0], data[i*surfData.width*4 + i*4 + 1], data[i*surfData.width*4 + i*4 + 2], data[i*surfData.width*4 + i*4 + 3]]);
        }
      },joystickEventState:0,lastJoystickState:{},joystickNamePool:{},recordJoystickState:function (joystick, state) {
        // Standardize button state.
        var buttons = new Array(state.buttons.length);
        for (var i = 0; i < state.buttons.length; i++) {
          buttons[i] = SDL.getJoystickButtonState(state.buttons[i]);
        }
        SDL.lastJoystickState[joystick] = {
          buttons: buttons,
          axes: state.axes.slice(0),
          timestamp: state.timestamp,
          index: state.index,
          id: state.id
        };
      },getJoystickButtonState:function (button) {
        if (typeof button === 'object') {
          // Current gamepad API editor's draft (Firefox Nightly)
          // https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html#idl-def-GamepadButton
          return button.pressed;
        } else {
          // Current gamepad API working draft (Firefox / Chrome Stable)
          // http://www.w3.org/TR/2012/WD-gamepad-20120529/#gamepad-interface
          return button > 0;
        }
      },queryJoysticks:function () {
        for (var joystick in SDL.lastJoystickState) {
          var state = SDL.getGamepad(joystick - 1);
          var prevState = SDL.lastJoystickState[joystick];
          // Check only if the timestamp has differed.
          // NOTE: Timestamp is not available in Firefox.
          if (typeof state.timestamp !== 'number' || state.timestamp !== prevState.timestamp) {
            var i;
            for (i = 0; i < state.buttons.length; i++) {
              var buttonState = SDL.getJoystickButtonState(state.buttons[i]);
              // NOTE: The previous state already has a boolean representation of
              //       its button, so no need to standardize its button state here.
              if (buttonState !== prevState.buttons[i]) {
                // Insert button-press event.
                SDL.events.push({
                  type: buttonState ? 'joystick_button_down' : 'joystick_button_up',
                  joystick: joystick,
                  index: joystick - 1,
                  button: i
                });
              }
            }
            for (i = 0; i < state.axes.length; i++) {
              if (state.axes[i] !== prevState.axes[i]) {
                // Insert axes-change event.
                SDL.events.push({
                  type: 'joystick_axis_motion',
                  joystick: joystick,
                  index: joystick - 1,
                  axis: i,
                  value: state.axes[i]
                });
              }
            }
            SDL.recordJoystickState(joystick, state);
          }
        }
      },joystickAxisValueConversion:function (value) {
        // Ensures that 0 is 0, 1 is 32767, and -1 is 32768.
        return Math.ceil(((value+1) * 32767.5) - 32768);
      },getGamepads:function () {
        var fcn = navigator.getGamepads || navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || navigator.webkitGetGamepads;
        if (fcn !== undefined) {
          // The function must be applied on the navigator object.
          return fcn.apply(navigator);
        } else {
          return [];
        }
      },getGamepad:function (deviceIndex) {
        var gamepads = SDL.getGamepads();
        if (gamepads.length > deviceIndex && deviceIndex >= 0) {
          return gamepads[deviceIndex];
        }
        return null;
      }};function _SDL_Init(initFlags) {
      SDL.startTime = Date.now();
      SDL.initFlags = initFlags;
      // capture all key events. we just keep down and up, but also capture press to prevent default actions
      if (!Module['doNotCaptureKeyboard']) {
        document.addEventListener("keydown", SDL.receiveEvent);
        document.addEventListener("keyup", SDL.receiveEvent);
        document.addEventListener("keypress", SDL.receiveEvent);
        window.addEventListener("blur", SDL.receiveEvent);
        document.addEventListener("visibilitychange", SDL.receiveEvent);
      }
      if (initFlags & 0x200) {
        // SDL_INIT_JOYSTICK
        // Firefox will not give us Joystick data unless we register this NOP
        // callback.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=936104
        addEventListener("gamepadconnected", function() {});
      }
      window.addEventListener("unload", SDL.receiveEvent);
      SDL.keyboardState = _malloc(0x10000); // Our SDL needs 512, but 64K is safe for older SDLs
      _memset(SDL.keyboardState, 0, 0x10000);
      // Initialize this structure carefully for closure
      SDL.DOMEventToSDLEvent['keydown'] = 0x300 /* SDL_KEYDOWN */;
      SDL.DOMEventToSDLEvent['keyup'] = 0x301 /* SDL_KEYUP */;
      SDL.DOMEventToSDLEvent['keypress'] = 0x303 /* SDL_TEXTINPUT */;
      SDL.DOMEventToSDLEvent['mousedown'] = 0x401 /* SDL_MOUSEBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['mouseup'] = 0x402 /* SDL_MOUSEBUTTONUP */;
      SDL.DOMEventToSDLEvent['mousemove'] = 0x400 /* SDL_MOUSEMOTION */;
      SDL.DOMEventToSDLEvent['unload'] = 0x100 /* SDL_QUIT */;
      SDL.DOMEventToSDLEvent['resize'] = 0x7001 /* SDL_VIDEORESIZE/SDL_EVENT_COMPAT2 */;
      // These are not technically DOM events; the HTML gamepad API is poll-based.
      // However, we define them here, as the rest of the SDL code assumes that
      // all SDL events originate as DOM events.
      SDL.DOMEventToSDLEvent['joystick_axis_motion'] = 0x600 /* SDL_JOYAXISMOTION */;
      SDL.DOMEventToSDLEvent['joystick_button_down'] = 0x603 /* SDL_JOYBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['joystick_button_up'] = 0x604 /* SDL_JOYBUTTONUP */;
      return 0; // success
    }
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
          // Handle precision.
          var precisionSet = false;
          if (next == 46) {
            var precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          } else {
            var precision = 6; // Standard default.
          }
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }
  function _SDL_GetError() {
      if (!SDL.errorMessage) {
        SDL.errorMessage = allocate(intArrayFromString("unknown SDL-emscripten error"), 'i8', ALLOC_NORMAL);
      }
      return SDL.errorMessage;
    }
  function _SDL_SetVideoMode(width, height, depth, flags) {
      ['mousedown', 'mouseup', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mouseout'].forEach(function(event) {
        Module['canvas'].addEventListener(event, SDL.receiveEvent, true);
      });
      // (0,0) means 'use fullscreen' in native; in Emscripten, use the current canvas size.
      if (width == 0 && height == 0) {
        var canvas = Module['canvas'];
        width = canvas.width;
        height = canvas.height;
      }
      Browser.setCanvasSize(width, height, true);
      // Free the old surface first.
      if (SDL.screen) {
        SDL.freeSurface(SDL.screen);
        SDL.screen = null;
      }
      SDL.screen = SDL.makeSurface(width, height, flags, true, 'screen');
      if (!SDL.addedResizeListener) {
        SDL.addedResizeListener = true;
        Browser.resizeListeners.push(function(w, h) {
          SDL.receiveEvent({
            type: 'resize',
            w: w,
            h: h
          });
        });
      }
      return SDL.screen;
    }
  function _SDL_WM_SetCaption(title, icon) {
      title = title && Pointer_stringify(title);
      icon = icon && Pointer_stringify(icon);
    }
  function _glGetString(name_) {
      if (GL.stringCache[name_]) return GL.stringCache[name_];
      var ret; 
      switch(name_) {
        case 0x1F00 /* GL_VENDOR */:
        case 0x1F01 /* GL_RENDERER */:
        case 0x1F02 /* GL_VERSION */:
          ret = allocate(intArrayFromString(Module.ctx.getParameter(name_)), 'i8', ALLOC_NORMAL);
          break;
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = Module.ctx.getSupportedExtensions();
          var gl_exts = [];
          for (i in exts) {
            gl_exts.push(exts[i]);
            gl_exts.push("GL_" + exts[i]);
          }
          ret = allocate(intArrayFromString(gl_exts.join(' ')), 'i8', ALLOC_NORMAL);
          break;
        case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
          ret = allocate(intArrayFromString('OpenGL ES GLSL 1.00 (WebGL)'), 'i8', ALLOC_NORMAL);
          break;
        default:
          GL.recordError(0x0500/*GL_INVALID_ENUM*/);
          return 0;
      }
      GL.stringCache[name_] = ret;
      return ret;
    }
  function _glUseProgram(program) {
      Module.ctx.useProgram(program ? GL.programs[program] : null);
    }
  function _glGetAttribLocation(program, name) {
      program = GL.programs[program];
      name = Pointer_stringify(name);
      return Module.ctx.getAttribLocation(program, name);
    }
  function _glGetUniformLocation(program, name) {
      name = Pointer_stringify(name);
      var arrayOffset = 0;
      // If user passed an array accessor "[index]", parse the array index off the accessor.
      if (name.indexOf(']', name.length-1) !== -1) {
        var ls = name.lastIndexOf('[');
        var arrayIndex = name.slice(ls+1, -1);
        if (arrayIndex.length > 0) {
          arrayOffset = parseInt(arrayIndex);
          if (arrayOffset < 0) {
            return -1;
          }
        }
        name = name.slice(0, ls);
      }
      var ptable = GL.programInfos[program];
      if (!ptable) {
        return -1;
      }
      var utable = ptable.uniforms;
      var uniformInfo = utable[name]; // returns pair [ dimension_of_uniform_array, uniform_location ]
      if (uniformInfo && arrayOffset < uniformInfo[0]) { // Check if user asked for an out-of-bounds element, i.e. for 'vec4 colors[3];' user could ask for 'colors[10]' which should return -1.
        return uniformInfo[1]+arrayOffset;
      } else {
        return -1;
      }
    }
  function _glGenBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = GL.getNewId(GL.buffers);
        var buffer = Module.ctx.createBuffer();
        buffer.name = id;
        GL.buffers[id] = buffer;
        HEAP32[(((buffers)+(i*4))>>2)]=id;
      }
    }
  function _glBindBuffer(target, buffer) {
      var bufferObj = buffer ? GL.buffers[buffer] : null;
      if (target == Module.ctx.ARRAY_BUFFER) {
        GL.currArrayBuffer = buffer;
      } else if (target == Module.ctx.ELEMENT_ARRAY_BUFFER) {
        GL.currElementArrayBuffer = buffer;
      }
      Module.ctx.bindBuffer(target, bufferObj);
    }
  function _glBufferData(target, size, data, usage) {
      switch (usage) { // fix usages, WebGL only has *_DRAW
        case 0x88E1: // GL_STREAM_READ
        case 0x88E2: // GL_STREAM_COPY
          usage = 0x88E0; // GL_STREAM_DRAW
          break;
        case 0x88E5: // GL_STATIC_READ
        case 0x88E6: // GL_STATIC_COPY
          usage = 0x88E4; // GL_STATIC_DRAW
          break;
        case 0x88E9: // GL_DYNAMIC_READ
        case 0x88EA: // GL_DYNAMIC_COPY
          usage = 0x88E8; // GL_DYNAMIC_DRAW
          break;
      }
      Module.ctx.bufferData(target, HEAPU8.subarray(data, data+size), usage);
    }
  function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      var cb = GL.clientBuffers[index];
      if (!GL.currArrayBuffer) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        return;
      }
      cb.clientside = false;
      Module.ctx.vertexAttribPointer(index, size, type, normalized, stride, ptr);
    }
  function _glEnableVertexAttribArray(index) {
      var cb = GL.clientBuffers[index];
      cb.enabled = true;
      Module.ctx.enableVertexAttribArray(index);
    }
  function _glUniform1i(location, v0) {
      location = GL.uniforms[location];
      Module.ctx.uniform1i(location, v0);
    }
  function _glUniformMatrix4fv(location, count, transpose, value) {
      location = GL.uniforms[location];
      var view;
      if (count == 1) {
        // avoid allocation for the common case of uploading one uniform matrix
        view = GL.miniTempBufferViews[15];
        for (var i = 0; i < 16; i++) {
          view[i] = HEAPF32[(((value)+(i*4))>>2)];
        }
      } else {
        view = HEAPF32.subarray((value)>>2,(value+count*64)>>2);
      }
      Module.ctx.uniformMatrix4fv(location, transpose, view);
    }
  function _glEnable(x0) { Module.ctx.enable(x0) }
  function _glBlendFunc(x0, x1) { Module.ctx.blendFunc(x0, x1) }
  function _glGenTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = GL.getNewId(GL.textures);
        var texture = Module.ctx.createTexture();
        texture.name = id;
        GL.textures[id] = texture;
        HEAP32[(((textures)+(i*4))>>2)]=id;
      }
    }
  function _glBindTexture(target, texture) {
      Module.ctx.bindTexture(target, texture ? GL.textures[texture] : null);
    }
  function _glTexParameteri(x0, x1, x2) { Module.ctx.texParameteri(x0, x1, x2) }
  function _glPixelStorei(pname, param) {
      if (pname == 0x0D05 /* GL_PACK_ALIGNMENT */) {
        GL.packAlignment = param;
      } else if (pname == 0x0cf5 /* GL_UNPACK_ALIGNMENT */) {
        GL.unpackAlignment = param;
      }
      Module.ctx.pixelStorei(pname, param);
    }
  function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      if (pixels) {
        var data = GL.getTexPixelData(type, format, width, height, pixels, internalFormat);
        pixels = data.pixels;
        internalFormat = data.internalFormat;
      } else {
        pixels = null;
      }
      Module.ctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
    }
  function _glBufferSubData(target, offset, size, data) {
      Module.ctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    }
  function _glDrawArrays(mode, first, count) {
      // bind any client-side buffers
      GL.preDrawHandleClientVertexAttribBindings(first + count);
      Module.ctx.drawArrays(mode, first, count);
      GL.postDrawHandleClientVertexAttribBindings();
    }
  function _SDL_GL_SwapBuffers() {}
  function _SDL_PollEvent(ptr) {
      if (SDL.initFlags & 0x200 && SDL.joystickEventState) {
        // If SDL_INIT_JOYSTICK was supplied AND the joystick system is configured
        // to automatically query for events, query for joystick events.
        SDL.queryJoysticks();
      }
      if (SDL.events.length === 0) return 0;
      if (ptr) {
        SDL.makeCEvent(SDL.events.shift(), ptr);
      }
      return 1;
    }
  function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
      Module['noExitRuntime'] = true;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from non-main loop sources
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
        if (Module['preMainLoop']) {
          Module['preMainLoop']();
        }
        try {
          Runtime.dynCall('v', func);
        } catch (e) {
          if (e instanceof ExitStatus) {
            return;
          } else {
            if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
            throw e;
          }
        }
        if (Module['postMainLoop']) {
          Module['postMainLoop']();
        }
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from the main loop itself
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
        Browser.mainLoop.scheduler();
      }
      if (fps && fps > 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          setTimeout(Browser.mainLoop.runner, 1000/fps); // doing this each time means that on exception, we stop
        }
      } else {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        }
      }
      Browser.mainLoop.scheduler();
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;
  function _llvm_uadd_with_overflow_i32(x, y) {
      x = x>>>0;
      y = y>>>0;
      return ((asm["setTempRet0"](x+y > 4294967295),(x+y)>>>0)|0);
    }
  function _llvm_lifetime_start() {}
  function _llvm_lifetime_end() {}
  var _llvm_memset_p0i8_i64=_memset;
  function _fputs(s, stream) {
      // int fputs(const char *restrict s, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
      return _write(stream, s, _strlen(s));
    }
  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)|0)]=chr
      var ret = _write(stream, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return -1;
      } else {
        return chr;
      }
    }function _puts(s) {
      // int puts(const char *s);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/puts.html
      // NOTE: puts() always writes an extra newline.
      var stdout = HEAP32[((_stdout)>>2)];
      var ret = _fputs(s, stdout);
      if (ret < 0) {
        return ret;
      } else {
        var newlineRet = _fputc(10, stdout);
        return (newlineRet < 0) ? -1 : ret + 1;
      }
    }
  function _SDL_InitSubSystem(flags) { return 0 }
  function _SDL_GetKeyboardState(numKeys) {
      if (numKeys) {
        HEAP32[((numKeys)>>2)]=65536;
      }
      return SDL.keyboardState;
    }function _SDL_GetKeyState() {
      return _SDL_GetKeyboardState();
    }
  function _SDL_GetMouseState(x, y) {
      if (x) HEAP32[((x)>>2)]=Browser.mouseX;
      if (y) HEAP32[((y)>>2)]=Browser.mouseY;
      return SDL.buttonState;
    }
  function _SDL_OpenAudio(desired, obtained) {
      try {
        SDL.audio = {
          freq: HEAPU32[((desired)>>2)],
          format: HEAPU16[(((desired)+(4))>>1)],
          channels: HEAPU8[(((desired)+(6))|0)],
          samples: HEAPU16[(((desired)+(8))>>1)], // Samples in the CB buffer per single sound channel.
          callback: HEAPU32[(((desired)+(16))>>2)],
          userdata: HEAPU32[(((desired)+(20))>>2)],
          paused: true,
          timer: null
        };
        // The .silence field tells the constant sample value that corresponds to the safe un-skewed silence value for the wave data.
        if (SDL.audio.format == 0x0008 /*AUDIO_U8*/) {
          SDL.audio.silence = 128; // Audio ranges in [0, 255], so silence is half-way in between.
        } else if (SDL.audio.format == 0x8010 /*AUDIO_S16LSB*/) {
          SDL.audio.silence = 0; // Signed data in range [-32768, 32767], silence is 0.
        } else {
          throw 'Invalid SDL audio format ' + SDL.audio.format + '!';
        }
        // Round the desired audio frequency up to the next 'common' frequency value.
        // Web Audio API spec states 'An implementation must support sample-rates in at least the range 22050 to 96000.'
        if (SDL.audio.freq <= 0) {
          throw 'Unsupported sound frequency ' + SDL.audio.freq + '!';
        } else if (SDL.audio.freq <= 22050) {
          SDL.audio.freq = 22050; // Take it safe and clamp everything lower than 22kHz to that.
        } else if (SDL.audio.freq <= 32000) {
          SDL.audio.freq = 32000;
        } else if (SDL.audio.freq <= 44100) {
          SDL.audio.freq = 44100;
        } else if (SDL.audio.freq <= 48000) {
          SDL.audio.freq = 48000;
        } else if (SDL.audio.freq <= 96000) {
          SDL.audio.freq = 96000;
        } else {
          throw 'Unsupported sound frequency ' + SDL.audio.freq + '!';
        }
        if (SDL.audio.channels == 0) {
          SDL.audio.channels = 1; // In SDL both 0 and 1 mean mono.
        } else if (SDL.audio.channels < 0 || SDL.audio.channels > 32) {
          throw 'Unsupported number of audio channels for SDL audio: ' + SDL.audio.channels + '!';
        } else if (SDL.audio.channels != 1 && SDL.audio.channels != 2) { // Unsure what SDL audio spec supports. Web Audio spec supports up to 32 channels.
          console.log('Warning: Using untested number of audio channels ' + SDL.audio.channels);
        }
        if (SDL.audio.samples < 128 || SDL.audio.samples > 524288 /* arbitrary cap */) {
          throw 'Unsupported audio callback buffer size ' + SDL.audio.samples + '!';
        } else if ((SDL.audio.samples & (SDL.audio.samples-1)) != 0) {
          throw 'Audio callback buffer size ' + SDL.audio.samples + ' must be a power-of-two!';
        }
        var totalSamples = SDL.audio.samples*SDL.audio.channels;
        SDL.audio.bytesPerSample = (SDL.audio.format == 0x0008 /*AUDIO_U8*/ || SDL.audio.format == 0x8008 /*AUDIO_S8*/) ? 1 : 2;
        SDL.audio.bufferSize = totalSamples*SDL.audio.bytesPerSample;
        SDL.audio.buffer = _malloc(SDL.audio.bufferSize);
        // To account for jittering in frametimes, always have multiple audio buffers queued up for the audio output device.
        // This helps that we won't starve that easily if a frame takes long to complete.
        SDL.audio.numSimultaneouslyQueuedBuffers = Module['SDL_numSimultaneouslyQueuedBuffers'] || 3;
        // Create a callback function that will be routinely called to ask more audio data from the user application.
        SDL.audio.caller = function SDL_audio_caller() {
          if (!SDL.audio) {
            return;
          }
          Runtime.dynCall('viii', SDL.audio.callback, [SDL.audio.userdata, SDL.audio.buffer, SDL.audio.bufferSize]);
          SDL.audio.pushAudio(SDL.audio.buffer, SDL.audio.bufferSize);
        };
        SDL.audio.audioOutput = new Audio();
        // As a workaround use Mozilla Audio Data API on Firefox until it ships with Web Audio and sound quality issues are fixed.
        if (typeof(SDL.audio.audioOutput['mozSetup'])==='function') {
          SDL.audio.audioOutput['mozSetup'](SDL.audio.channels, SDL.audio.freq); // use string attributes on mozOutput for closure compiler
          SDL.audio.mozBuffer = new Float32Array(totalSamples);
          SDL.audio.nextPlayTime = 0;
          SDL.audio.pushAudio = function SDL_audio_pushAudio(ptr, size) {
            --SDL.audio.numAudioTimersPending;
            var mozBuffer = SDL.audio.mozBuffer;
            // The input audio data for SDL audio is either 8-bit or 16-bit interleaved across channels, output for Mozilla Audio Data API
            // needs to be Float32 interleaved, so perform a sample conversion.
            if (SDL.audio.format == 0x8010 /*AUDIO_S16LSB*/) {
              for (var i = 0; i < totalSamples; i++) {
                mozBuffer[i] = (HEAP16[(((ptr)+(i*2))>>1)]) / 0x8000;
              }
            } else if (SDL.audio.format == 0x0008 /*AUDIO_U8*/) {
              for (var i = 0; i < totalSamples; i++) {
                var v = (HEAP8[(((ptr)+(i))|0)]);
                mozBuffer[i] = ((v >= 0) ? v-128 : v+128) /128;
              }
            }
            // Submit the audio data to audio device.
            SDL.audio.audioOutput['mozWriteAudio'](mozBuffer);
            // Compute when the next audio callback should be called.
            var curtime = Date.now() / 1000.0 - SDL.audio.startTime;
            var playtime = Math.max(curtime, SDL.audio.nextPlayTime);
            var buffer_duration = SDL.audio.samples / SDL.audio.freq;
            SDL.audio.nextPlayTime = playtime + buffer_duration;
            // Schedule the next audio callback call to occur when the current one finishes.
            SDL.audio.timer = Browser.safeSetTimeout(SDL.audio.caller, 1000.0 * (playtime-curtime));
            ++SDL.audio.numAudioTimersPending;
            // And also schedule extra buffers _now_ if we have too few in queue.
            if (SDL.audio.numAudioTimersPending < SDL.audio.numSimultaneouslyQueuedBuffers) {
              ++SDL.audio.numAudioTimersPending;
              Browser.safeSetTimeout(SDL.audio.caller, 1.0);
            }
          }
        } else {
          // Initialize Web Audio API if we haven't done so yet. Note: Only initialize Web Audio context ever once on the web page,
          // since initializing multiple times fails on Chrome saying 'audio resources have been exhausted'.
          if (!SDL.audioContext) {
            if (typeof(AudioContext) === 'function') {
              SDL.audioContext = new AudioContext();
            } else if (typeof(webkitAudioContext) === 'function') {
              SDL.audioContext = new webkitAudioContext();
            } else {
              throw 'Web Audio API is not available!';
            }
          }
          SDL.audio.soundSource = new Array(); // Use an array of sound sources as a ring buffer to queue blocks of synthesized audio to Web Audio API.
          SDL.audio.nextSoundSource = 0; // Index of the next sound buffer in the ring buffer queue to play.
          SDL.audio.nextPlayTime = 0; // Time in seconds when the next audio block is due to start.
          // The pushAudio function with a new audio buffer whenever there is new audio data to schedule to be played back on the device.
          SDL.audio.pushAudio=function(ptr,sizeBytes) {
            try {
              --SDL.audio.numAudioTimersPending;
              var sizeSamples = sizeBytes / SDL.audio.bytesPerSample; // How many samples fit in the callback buffer?
              var sizeSamplesPerChannel = sizeSamples / SDL.audio.channels; // How many samples per a single channel fit in the cb buffer?
              if (sizeSamplesPerChannel != SDL.audio.samples) {
                throw 'Received mismatching audio buffer size!';
              }
              // Allocate new sound buffer to be played.
              var source = SDL.audioContext['createBufferSource']();
              if (SDL.audio.soundSource[SDL.audio.nextSoundSource]) {
                SDL.audio.soundSource[SDL.audio.nextSoundSource]['disconnect'](); // Explicitly disconnect old source, since we know it shouldn't be running anymore.
              }
              SDL.audio.soundSource[SDL.audio.nextSoundSource] = source;
              var soundBuffer = SDL.audioContext['createBuffer'](SDL.audio.channels,sizeSamplesPerChannel,SDL.audio.freq);
              SDL.audio.soundSource[SDL.audio.nextSoundSource]['connect'](SDL.audioContext['destination']);
              // The input audio data is interleaved across the channels, i.e. [L, R, L, R, L, R, ...] and is either 8-bit or 16-bit as
              // supported by the SDL API. The output audio wave data for Web Audio API must be in planar buffers of [-1,1]-normalized Float32 data,
              // so perform a buffer conversion for the data.
              var numChannels = SDL.audio.channels;
              for(var i = 0; i < numChannels; ++i) {
                var channelData = soundBuffer['getChannelData'](i);
                if (channelData.length != sizeSamplesPerChannel) {
                  throw 'Web Audio output buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + sizeSamplesPerChannel + ' samples!';
                }
                if (SDL.audio.format == 0x8010 /*AUDIO_S16LSB*/) {
                  for(var j = 0; j < sizeSamplesPerChannel; ++j) {
                    channelData[j] = (HEAP16[(((ptr)+((j*numChannels + i)*2))>>1)]) / 0x8000;
                  }
                } else if (SDL.audio.format == 0x0008 /*AUDIO_U8*/) {
                  for(var j = 0; j < sizeSamplesPerChannel; ++j) {
                    var v = (HEAP8[(((ptr)+(j*numChannels + i))|0)]);
                    channelData[j] = ((v >= 0) ? v-128 : v+128) /128;
                  }
                }
              }
              // Workaround https://bugzilla.mozilla.org/show_bug.cgi?id=883675 by setting the buffer only after filling. The order is important here!
              source['buffer'] = soundBuffer;
              // Schedule the generated sample buffer to be played out at the correct time right after the previously scheduled
              // sample buffer has finished.
              var curtime = SDL.audioContext['currentTime'];
              var playtime = Math.max(curtime, SDL.audio.nextPlayTime);
              SDL.audio.soundSource[SDL.audio.nextSoundSource]['start'](playtime);
              var buffer_duration = sizeSamplesPerChannel / SDL.audio.freq;
              SDL.audio.nextPlayTime = playtime + buffer_duration;
              SDL.audio.nextSoundSource = (SDL.audio.nextSoundSource + 1) % 4;
              var secsUntilNextCall = playtime-curtime;
              // Queue the next audio frame push to be performed when the previously queued buffer has finished playing.
              if (SDL.audio.numAudioTimersPending == 0) {
                var preemptBufferFeedMSecs = buffer_duration/2.0;
                SDL.audio.timer = Browser.safeSetTimeout(SDL.audio.caller, Math.max(0.0, 1000.0*secsUntilNextCall-preemptBufferFeedMSecs));
                ++SDL.audio.numAudioTimersPending;
              }
              // If we are risking starving, immediately queue extra buffers.
              if (secsUntilNextCall <= buffer_duration && SDL.audio.numAudioTimersPending < SDL.audio.numSimultaneouslyQueuedBuffers) {
                ++SDL.audio.numAudioTimersPending;
                Browser.safeSetTimeout(SDL.audio.caller, 1.0);
              }
            } catch(e) {
              console.log('Web Audio API error playing back audio: ' + e.toString());
            }
          }
        }
        if (obtained) {
          // Report back the initialized audio parameters.
          HEAP32[((obtained)>>2)]=SDL.audio.freq;
          HEAP16[(((obtained)+(4))>>1)]=SDL.audio.format;
          HEAP8[(((obtained)+(6))|0)]=SDL.audio.channels;
          HEAP8[(((obtained)+(7))|0)]=SDL.audio.silence;
          HEAP16[(((obtained)+(8))>>1)]=SDL.audio.samples;
          HEAP32[(((obtained)+(16))>>2)]=SDL.audio.callback;
          HEAP32[(((obtained)+(20))>>2)]=SDL.audio.userdata;
        }
        SDL.allocateChannels(32);
      } catch(e) {
        console.log('Initializing SDL audio threw an exception: "' + e.toString() + '"! Continuing without audio.');
        SDL.audio = null;
        SDL.allocateChannels(0);
        if (obtained) {
          HEAP32[((obtained)>>2)]=0;
          HEAP16[(((obtained)+(4))>>1)]=0;
          HEAP8[(((obtained)+(6))|0)]=0;
          HEAP8[(((obtained)+(7))|0)]=0;
          HEAP16[(((obtained)+(8))>>1)]=0;
          HEAP32[(((obtained)+(16))>>2)]=0;
          HEAP32[(((obtained)+(20))>>2)]=0;
        }
      }
      if (!SDL.audio) {
        return -1;
      }
      return 0;
    }
  function _SDL_PauseAudio(pauseOn) {
      if (!SDL.audio) {
        return;
      }
      if (pauseOn) {
        if (SDL.audio.timer !== undefined) {
          clearTimeout(SDL.audio.timer);
          SDL.audio.numAudioTimersPending = 0;
          SDL.audio.timer = undefined;
        }
      } else if (!SDL.audio.timer) {
        // Start the audio playback timer callback loop.
        SDL.audio.numAudioTimersPending = 1;
        SDL.audio.timer = Browser.safeSetTimeout(SDL.audio.caller, 1);
        SDL.audio.startTime = Date.now() / 1000.0; // Only used for Mozilla Audio Data API. Not needed for Web Audio API.
      }
      SDL.audio.paused = pauseOn;
    }function _SDL_CloseAudio() {
      if (SDL.audio) {
        try{
          for(var i = 0; i < SDL.audio.soundSource.length; ++i) {
            if (!(typeof(SDL.audio.soundSource[i]==='undefined'))) {
              SDL.audio.soundSource[i].stop(0);
            }
          }
        } catch(e) {}
        SDL.audio.soundSource = null;
        _SDL_PauseAudio(1);
        _free(SDL.audio.buffer);
        SDL.audio = null;
        SDL.allocateChannels(0);
      }
    }
  function _rand() {
      return Math.floor(Math.random()*0x80000000);
    }
  function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      var streamObj = FS.getStream(stream);
      if (!streamObj) return -1;
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _fread(_fgetc.ret, 1, 1, stream);
      if (ret == 0) {
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }
  function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }
  function __getFloat(text) {
      return /^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(text);
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function get() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function unget() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
        if (format[formatIndex] === '%') {
          var nextC = format.indexOf('c', formatIndex+1);
          if (nextC > 0) {
            var maxx = 1;
            if (nextC > formatIndex+1) {
              var sub = format.substring(formatIndex+1, nextC);
              maxx = parseInt(sub);
              if (maxx != sub) maxx = 0;
            }
            if (maxx) {
              var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
              argIndex += Runtime.getAlignSize('void*', null, true);
              fields++;
              for (var i = 0; i < maxx; i++) {
                next = get();
                HEAP8[((argPtr++)|0)]=next;
              }
              formatIndex += nextC - formatIndex + 1;
              continue;
            }
          }
        }
        // handle %[...]
        if (format[formatIndex] === '%' && format.indexOf('[', formatIndex+1) > 0) {
          var match = /\%([0-9]*)\[(\^)?(\]?[^\]]*)\]/.exec(format.substring(formatIndex));
          if (match) {
            var maxNumCharacters = parseInt(match[1]) || Infinity;
            var negateScanList = (match[2] === '^');
            var scanList = match[3];
            // expand "middle" dashs into character sets
            var middleDashMatch;
            while ((middleDashMatch = /([^\-])\-([^\-])/.exec(scanList))) {
              var rangeStartCharCode = middleDashMatch[1].charCodeAt(0);
              var rangeEndCharCode = middleDashMatch[2].charCodeAt(0);
              for (var expanded = ''; rangeStartCharCode <= rangeEndCharCode; expanded += String.fromCharCode(rangeStartCharCode++));
              scanList = scanList.replace(middleDashMatch[1] + '-' + middleDashMatch[2], expanded);
            }
            var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
            argIndex += Runtime.getAlignSize('void*', null, true);
            fields++;
            for (var i = 0; i < maxNumCharacters; i++) {
              next = get();
              if (negateScanList) {
                if (scanList.indexOf(String.fromCharCode(next)) < 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              } else {
                if (scanList.indexOf(String.fromCharCode(next)) >= 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              }
            }
            // write out null-terminating character
            HEAP8[((argPtr++)|0)]=0;
            formatIndex += match[0].length;
            continue;
          }
        }      
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            next = get();
            while (next > 0 && (!(next in __scanString.whiteSpace)))  {
              buffer.push(String.fromCharCode(next));
              next = get();
            }
            var m = __getFloat(buffer.join(''));
            var last = m ? m[0].length : 0;
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            // Strip the optional 0x prefix for %x.
            if ((type == 'x' || type == 'X') && (next == 48)) {
              var peek = get();
              if (peek == 120 || peek == 88) {
                next = get();
              } else {
                unget();
              }
            }
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,(tempDouble=parseInt(text, 10),(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16)
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text)
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text)
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j]
              }
              break;
          }
          fields++;
        } else if (format[formatIndex].charCodeAt(0) in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }function _sscanf(s, format, varargs) {
      // int sscanf(const char *restrict s, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var index = 0;
      function get() { return HEAP8[(((s)+(index++))|0)]; };
      function unget() { index--; };
      return __scanString(format, get, unget, varargs);
    }
  function _mknod(path, mode, dev) {
      // int mknod(const char *path, mode_t mode, dev_t dev);
      // http://pubs.opengroup.org/onlinepubs/7908799/xsh/mknod.html
      path = Pointer_stringify(path);
      // we don't want this in the JS API as the JS API
      // uses mknod to create all nodes.
      switch (mode & 61440) {
        case 32768:
        case 8192:
        case 24576:
        case 4096:
        case 49152:
          break;
        default:
          ___setErrNo(ERRNO_CODES.EINVAL);
          return -1;
      }
      try {
        FS.mknod(path, mode, dev);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _mkdir(path, mode) {
      // int mkdir(const char *path, mode_t mode);
      // http://pubs.opengroup.org/onlinepubs/7908799/xsh/mkdir.html
      path = Pointer_stringify(path);
      try {
        FS.mkdir(path, mode, 0);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  function _emscripten_asm_const(code) {
      Runtime.getAsmConst(code, 0)();
    }
  function _srand(seed) {}
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  function _abort() {
      Module['abort']();
    }
  function ___errno_location() {
      return ___errno_state;
    }
  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }
  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }
  function _llvm_trap() {
      abort('trap!');
    }
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
GL.init()
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
_fputc.ret = allocate([0], "i8", ALLOC_STATIC);
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);
staticSealed = true; // seal the static portion of memory
STACK_MAX = STACK_BASE + 5242880;
DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);
assert(DYNAMIC_BASE < TOTAL_MEMORY); // Stack must fit in TOTAL_MEMORY; allocations from here on may enlarge TOTAL_MEMORY
 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);
var Math_min = Math.min;
function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vif(index,a1,a2) {
  try {
    Module["dynCall_vif"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vf(index,a1) {
  try {
    Module["dynCall_vf"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module["dynCall_iiiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viii(index,a1,a2,a3) {
  try {
    Module["dynCall_viii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiifi(index,a1,a2,a3,a4) {
  try {
    return Module["dynCall_iiifi"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=+env.NaN;var p=+env.Infinity;var q=0;var r=0;var s=0;var t=0;var u=0,v=0,w=0,x=0,y=0.0,z=0,A=0,B=0,C=0.0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=global.Math.floor;var O=global.Math.abs;var P=global.Math.sqrt;var Q=global.Math.pow;var R=global.Math.cos;var S=global.Math.sin;var T=global.Math.tan;var U=global.Math.acos;var V=global.Math.asin;var W=global.Math.atan;var X=global.Math.atan2;var Y=global.Math.exp;var Z=global.Math.log;var _=global.Math.ceil;var $=global.Math.imul;var aa=env.abort;var ab=env.assert;var ac=env.asmPrintInt;var ad=env.asmPrintFloat;var ae=env.min;var af=env.invoke_ii;var ag=env.invoke_vif;var ah=env.invoke_vf;var ai=env.invoke_vi;var aj=env.invoke_vii;var ak=env.invoke_iiiiii;var al=env.invoke_viii;var am=env.invoke_v;var an=env.invoke_iii;var ao=env.invoke_iiifi;var ap=env._llvm_lifetime_end;var aq=env._lseek;var ar=env.__scanString;var as=env._fclose;var at=env._glLinkProgram;var au=env._glBindTexture;var av=env._fflush;var aw=env._SDL_GetMouseState;var ax=env._fputc;var ay=env._glGetString;var az=env._fwrite;var aA=env._send;var aB=env._fputs;var aC=env._glCompileShader;var aD=env._read;var aE=env._fsync;var aF=env._glGenTextures;var aG=env._SDL_PauseAudio;var aH=env._glCreateShader;var aI=env._strcmp;var aJ=env._glUniform1i;var aK=env._strncmp;var aL=env._snprintf;var aM=env._fgetc;var aN=env._glGetProgramiv;var aO=env._glVertexAttribPointer;var aP=env.__getFloat;var aQ=env._mknod;var aR=env._SDL_GetKeyboardState;var aS=env._close;var aT=env.___setErrNo;var aU=env._glDrawArrays;var aV=env._ftell;var aW=env._glDeleteProgram;var aX=env._sprintf;var aY=env._glAttachShader;var aZ=env._llvm_uadd_with_overflow_i32;var a_=env._printf;var a$=env._recv;var a0=env._SDL_GL_SwapBuffers;var a1=env._glBufferSubData;var a2=env._puts;var a3=env._SDL_Init;var a4=env._glGetShaderiv;var a5=env._rand;var a6=env._fabsf;var a7=env._glShaderSource;var a8=env._pread;var a9=env._SDL_SetVideoMode;var ba=env._fopen;var bb=env._open;var bc=env._sqrtf;var bd=env._SDL_PollEvent;var be=env._mkdir;var bf=env._glEnableVertexAttribArray;var bg=env._glBindBuffer;var bh=env._SDL_InitSubSystem;var bi=env._SDL_GetError;var bj=env._srand;var bk=env._glBufferData;var bl=env.__formatString;var bm=env._gettimeofday;var bn=env._SDL_WM_SetCaption;var bo=env._sbrk;var bp=env.___errno_location;var bq=env._SDL_CloseAudio;var br=env._llvm_lifetime_start;var bs=env._SDL_GetKeyState;var bt=env._SDL_OpenAudio;var bu=env._glUseProgram;var bv=env._sscanf;var bw=env._glTexImage2D;var bx=env._sysconf;var by=env._fread;var bz=env._glGetUniformLocation;var bA=env._abort;var bB=env._fprintf;var bC=env._emscripten_asm_const;var bD=env._glEnable;var bE=env.__reallyNegative;var bF=env._fseek;var bG=env._write;var bH=env._glGenBuffers;var bI=env._glGetAttribLocation;var bJ=env._rewind;var bK=env._glDeleteShader;var bL=env._glBlendFunc;var bM=env._glCreateProgram;var bN=env._llvm_trap;var bO=env._emscripten_set_main_loop;var bP=env._glUniformMatrix4fv;var bQ=env._pwrite;var bR=env._glTexParameteri;var bS=env._glPixelStorei;var bT=env._time;var bU=0.0;
// EMSCRIPTEN_START_FUNCS
function b3(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function b4(){return i|0}function b5(a){a=a|0;i=a}function b6(a,b){a=a|0;b=b|0;if((q|0)==0){q=a;r=b}}function b7(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function b8(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function b9(a){a=a|0;D=a}function ca(a){a=a|0;E=a}function cb(a){a=a|0;F=a}function cc(a){a=a|0;G=a}function cd(a){a=a|0;H=a}function ce(a){a=a|0;I=a}function cf(a){a=a|0;J=a}function cg(a){a=a|0;K=a}function ch(a){a=a|0;L=a}function ci(a){a=a|0;M=a}function cj(){}function ck(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=f|0;var h=0.0,i=0,j=0.0,k=0,l=0.0,m=0,n=0.0,o=0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0;h=+g[a>>2];i=a+4|0;j=+g[i>>2];k=b+4|0;l=e*.5;e=+g[c>>2];m=c+4|0;n=+g[m>>2];o=d+4|0;p=e*+g[d>>2]+n*+g[o>>2];q=h*e+j*n-p;r=(h+ +g[b>>2])*e+(j+ +g[k>>2])*n-p;do{if(!(q<-9999999747378752.0e-20|r>9999999747378752.0e-20)){p=q/(q-r);g[f>>2]=p;n=+g[m>>2];j=-0.0-n;e=+g[c>>2];h=+g[d>>2];s=+g[o>>2];t=(p*+g[b>>2]+ +g[a>>2])*j+(p*+g[k>>2]+ +g[i>>2])*e;if((l*n+h)*j+e*(e*(-0.0-l)+s)-t>0.0){break}if(t-((l*j+h)*j+e*(l*e+s))>0.0){break}else{u=1}return u|0}}while(0);u=0;return u|0}function cl(a,b,d,e,f,h,i){a=a|0;b=+b;d=+d;e=+e;f=+f;h=+h;i=+i;var j=0.0,k=0.0,l=0.0,m=0.0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;j=+g[2416];k=+g[2414];l=+g[2412];m=+g[2410];n=a+8|0;o=c[n>>2]|0;p=a+4|0;q=c[p>>2]|0;if((o|0)>(q|0)){r=q;s=c[a>>2]|0}else{c[n>>2]=o<<1;t=db(o<<6)|0;o=t;u=a|0;v=c[u>>2]|0;w=q<<5;dg(t|0,v|0,w)|0;dc(v);c[u>>2]=o;r=c[p>>2]|0;s=o}o=r<<3;g[s+(o<<2)>>2]=b;g[s+((o|1)<<2)>>2]=d;g[s+((o|2)<<2)>>2]=e;g[s+((o|3)<<2)>>2]=0.0;g[s+((o|4)<<2)>>2]=j;g[s+((o|5)<<2)>>2]=k;g[s+((o|6)<<2)>>2]=l;g[s+((o|7)<<2)>>2]=m;o=(c[p>>2]|0)+1|0;c[p>>2]=o;s=c[n>>2]|0;if((s|0)>(o|0)){x=o;y=c[a>>2]|0}else{c[n>>2]=s<<1;r=db(s<<6)|0;s=r;u=a|0;v=c[u>>2]|0;w=o<<5;dg(r|0,v|0,w)|0;dc(v);c[u>>2]=s;x=c[p>>2]|0;y=s}s=x<<3;g[y+(s<<2)>>2]=f;g[y+((s|1)<<2)>>2]=d;g[y+((s|2)<<2)>>2]=i;g[y+((s|3)<<2)>>2]=0.0;g[y+((s|4)<<2)>>2]=j;g[y+((s|5)<<2)>>2]=k;g[y+((s|6)<<2)>>2]=l;g[y+((s|7)<<2)>>2]=m;s=(c[p>>2]|0)+1|0;c[p>>2]=s;y=c[n>>2]|0;if((y|0)>(s|0)){z=s;A=c[a>>2]|0}else{c[n>>2]=y<<1;x=db(y<<6)|0;y=x;u=a|0;v=c[u>>2]|0;w=s<<5;dg(x|0,v|0,w)|0;dc(v);c[u>>2]=y;z=c[p>>2]|0;A=y}y=z<<3;g[A+(y<<2)>>2]=f;g[A+((y|1)<<2)>>2]=h;g[A+((y|2)<<2)>>2]=i;g[A+((y|3)<<2)>>2]=1.0;g[A+((y|4)<<2)>>2]=j;g[A+((y|5)<<2)>>2]=k;g[A+((y|6)<<2)>>2]=l;g[A+((y|7)<<2)>>2]=m;y=(c[p>>2]|0)+1|0;c[p>>2]=y;A=c[n>>2]|0;if((A|0)>(y|0)){B=y;C=c[a>>2]|0}else{c[n>>2]=A<<1;z=db(A<<6)|0;A=z;u=a|0;v=c[u>>2]|0;w=y<<5;dg(z|0,v|0,w)|0;dc(v);c[u>>2]=A;B=c[p>>2]|0;C=A}A=B<<3;g[C+(A<<2)>>2]=f;g[C+((A|1)<<2)>>2]=h;g[C+((A|2)<<2)>>2]=i;g[C+((A|3)<<2)>>2]=1.0;g[C+((A|4)<<2)>>2]=j;g[C+((A|5)<<2)>>2]=k;g[C+((A|6)<<2)>>2]=l;g[C+((A|7)<<2)>>2]=m;A=(c[p>>2]|0)+1|0;c[p>>2]=A;C=c[n>>2]|0;if((C|0)>(A|0)){D=A;E=c[a>>2]|0}else{c[n>>2]=C<<1;B=db(C<<6)|0;C=B;u=a|0;v=c[u>>2]|0;w=A<<5;dg(B|0,v|0,w)|0;dc(v);c[u>>2]=C;D=c[p>>2]|0;E=C}C=D<<3;g[E+(C<<2)>>2]=b;g[E+((C|1)<<2)>>2]=h;g[E+((C|2)<<2)>>2]=e;g[E+((C|3)<<2)>>2]=1.0;g[E+((C|4)<<2)>>2]=j;g[E+((C|5)<<2)>>2]=k;g[E+((C|6)<<2)>>2]=l;g[E+((C|7)<<2)>>2]=m;C=(c[p>>2]|0)+1|0;c[p>>2]=C;E=c[n>>2]|0;if((E|0)>(C|0)){F=C;G=c[a>>2]|0;H=F<<3;I=G+(H<<2)|0;g[I>>2]=b;J=H|1;K=G+(J<<2)|0;g[K>>2]=d;L=H|2;M=G+(L<<2)|0;g[M>>2]=e;N=H|3;O=G+(N<<2)|0;g[O>>2]=0.0;P=H|4;Q=G+(P<<2)|0;g[Q>>2]=j;R=H|5;S=G+(R<<2)|0;g[S>>2]=k;T=H|6;U=G+(T<<2)|0;g[U>>2]=l;V=H|7;W=G+(V<<2)|0;g[W>>2]=m;X=c[p>>2]|0;Y=X+1|0;c[p>>2]=Y;return}else{c[n>>2]=E<<1;n=db(E<<6)|0;E=n;D=a|0;a=c[D>>2]|0;u=C<<5;dg(n|0,a|0,u)|0;dc(a);c[D>>2]=E;F=c[p>>2]|0;G=E;H=F<<3;I=G+(H<<2)|0;g[I>>2]=b;J=H|1;K=G+(J<<2)|0;g[K>>2]=d;L=H|2;M=G+(L<<2)|0;g[M>>2]=e;N=H|3;O=G+(N<<2)|0;g[O>>2]=0.0;P=H|4;Q=G+(P<<2)|0;g[Q>>2]=j;R=H|5;S=G+(R<<2)|0;g[S>>2]=k;T=H|6;U=G+(T<<2)|0;g[U>>2]=l;V=H|7;W=G+(V<<2)|0;g[W>>2]=m;X=c[p>>2]|0;Y=X+1|0;c[p>>2]=Y;return}}function cm(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0;j=i;i=i+72|0;k=j|0;l=j+24|0;m=j+48|0;if(g>>>0<2>>>0){n=53;i=j;return n|0}o=a[f]|0;p=o&255;q=d[f+1|0]|0;if((((p<<8|q)>>>0)%31|0|0)!=0){n=24;i=j;return n|0}if((p&15|0)!=8|o<<24>>24<0){n=25;i=j;return n|0}if((q&32|0)!=0){n=26;i=j;return n|0}q=g-2|0;o=c[h+8>>2]|0;if((o|0)==0){p=c[e>>2]|0;r=q<<3;s=l|0;t=l+4|0;u=l+8|0;v=m|0;w=m+4|0;x=m+8|0;y=l+16|0;z=m+16|0;A=m+12|0;B=g-4|0;C=k|0;D=k+4|0;E=k+8|0;F=k+16|0;G=k+12|0;H=l+12|0;I=g-6|0;J=0;K=0;L=c[b>>2]|0;M=p;N=p;L49:while(1){p=J+2|0;if(p>>>0>=r>>>0){O=52;P=L;Q=M;break}R=d[f+((J>>>3)+2)|0]|0;S=J&7;T=J+1|0;U=J+3|0;V=(d[f+((p>>>3)+2)|0]|0)>>>((p&7)>>>0)<<1&2|(d[f+((T>>>3)+2)|0]|0)>>>((T&7)>>>0)&1;if((V|0)==0){if((U&7|0)==0){W=U}else{T=U;while(1){p=T+1|0;if((p&7|0)==0){W=p;break}else{T=p}}}T=W>>>3;if(T>>>0>=I>>>0){O=52;P=L;Q=M;break}p=(d[f+(T+3)|0]|0)<<8|(d[f+(T+2)|0]|0);X=T+4|0;if((((d[f+(T+5)|0]|0)<<8|(d[f+X|0]|0))+p|0)!=65535){O=21;P=L;Q=M;break}Y=p+K|0;do{if(Y>>>0<M>>>0){Z=L;_=M;$=N}else{if(N>>>0>=Y>>>0){Z=L;_=Y;$=N;break}aa=Y<<1;ab=dd(L,aa)|0;if((ab|0)==0){O=83;P=L;Q=M;break L49}else{Z=ab;_=Y;$=aa}}}while(0);aa=p+X|0;if(aa>>>0>q>>>0){O=23;P=Z;Q=_;break}do{if((p|0)==0){ac=X;ad=K}else{ab=K+1|0;a[Z+K|0]=a[f+(T+6)|0]|0;if(p>>>0>1>>>0){ae=1;af=X;ag=ab}else{ac=aa;ad=ab;break}while(1){ab=ae+1|0;a[Z+ag|0]=a[f+(af+3)|0]|0;if(ab>>>0<p>>>0){ae=ab;af=af+1|0;ag=ag+1|0}else{ac=aa;ad=Y;break}}}}while(0);ah=ad;ai=ac<<3;aj=Z;ak=_;al=$}else if((V|0)==3){O=20;P=L;Q=M;break}else{c[s>>2]=0;c[t>>2]=0;c[u>>2]=0;c[v>>2]=0;c[w>>2]=0;c[x>>2]=0;do{if((V|0)==1){Y=db(1152)|0;aa=Y;if((Y|0)!=0){p=0;while(1){c[aa+(p<<2)>>2]=8;X=p+1|0;if(X>>>0<144>>>0){p=X}else{am=144;break}}do{c[aa+(am<<2)>>2]=9;am=am+1|0;}while(am>>>0<256>>>0);c[Y+1024>>2]=7;c[Y+1028>>2]=7;c[Y+1032>>2]=7;c[Y+1036>>2]=7;c[Y+1040>>2]=7;c[Y+1044>>2]=7;c[Y+1048>>2]=7;c[Y+1052>>2]=7;c[Y+1056>>2]=7;c[Y+1060>>2]=7;c[Y+1064>>2]=7;c[Y+1068>>2]=7;c[Y+1072>>2]=7;c[Y+1076>>2]=7;c[Y+1080>>2]=7;c[Y+1084>>2]=7;c[Y+1088>>2]=7;c[Y+1092>>2]=7;c[Y+1096>>2]=7;c[Y+1100>>2]=7;c[Y+1104>>2]=7;c[Y+1108>>2]=7;c[Y+1112>>2]=7;c[Y+1116>>2]=7;c[Y+1120>>2]=8;c[Y+1124>>2]=8;c[Y+1128>>2]=8;c[Y+1132>>2]=8;c[Y+1136>>2]=8;c[Y+1140>>2]=8;c[Y+1144>>2]=8;c[Y+1148>>2]=8;p=db(1152)|0;X=p;c[u>>2]=X;if((p|0)!=0){p=0;do{c[X+(p<<2)>>2]=c[aa+(p<<2)>>2];p=p+1|0;}while(p>>>0<288>>>0);c[y>>2]=288;c[H>>2]=15;cz(l)|0}dc(Y)}p=db(128)|0;aa=p;if((p|0)==0){an=U;ao=120;break}else{ap=0}do{c[aa+(ap<<2)>>2]=5;ap=ap+1|0;}while(ap>>>0<32>>>0);Y=db(128)|0;X=Y;c[x>>2]=X;if((Y|0)!=0){c[X>>2]=c[aa>>2];c[Y+4>>2]=c[p+4>>2];c[Y+8>>2]=c[p+8>>2];X=Y+12|0;Y=p+12|0;dg(X|0,Y|0,116)|0;c[z>>2]=32;c[A>>2]=15;cz(m)|0}dc(p);an=U;ao=120}else if((V|0)==2){Y=U>>>3;if(Y>>>0>=B>>>0){aq=49;ar=0;as=0;at=K;au=U;av=L;aw=M;ax=N;break}X=J+4|0;T=J+5|0;ab=J+6|0;ay=J+7|0;az=(d[f+((X>>>3)+2)|0]|0)>>>((X&7)>>>0)<<1&2|(d[f+(Y+2)|0]|0)>>>((U&7)>>>0)&1|(d[f+((T>>>3)+2)|0]|0)>>>((T&7)>>>0)<<2&4|(d[f+((ab>>>3)+2)|0]|0)>>>((ab&7)>>>0)<<3&8|(d[f+((ay>>>3)+2)|0]|0)>>>((ay&7)>>>0)<<4&16;ay=J+8|0;ab=az+257|0;T=J+9|0;Y=J+10|0;X=J+11|0;aA=J+12|0;aB=(d[f+((T>>>3)+2)|0]|0)>>>((T&7)>>>0)<<1&2|(d[f+((ay>>>3)+2)|0]|0)>>>((ay&7)>>>0)&1|(d[f+((Y>>>3)+2)|0]|0)>>>((Y&7)>>>0)<<2&4|(d[f+((X>>>3)+2)|0]|0)>>>((X&7)>>>0)<<3&8|(d[f+((aA>>>3)+2)|0]|0)>>>((aA&7)>>>0)<<4&16;aA=J+13|0;X=J+14|0;Y=J+15|0;ay=J+16|0;T=J+17|0;aC=((d[f+((X>>>3)+2)|0]|0)>>>((X&7)>>>0)<<1&2|(d[f+((aA>>>3)+2)|0]|0)>>>((aA&7)>>>0)&1|(d[f+((Y>>>3)+2)|0]|0)>>>((Y&7)>>>0)<<2&4|(d[f+((ay>>>3)+2)|0]|0)>>>((ay&7)>>>0)<<3&8)+4|0;c[C>>2]=0;c[D>>2]=0;c[E>>2]=0;ay=db(76)|0;Y=ay;L93:do{if((ay|0)==0){aD=0;aE=0;aF=83;aG=T}else{aA=0;X=T;while(1){if(aA>>>0<aC>>>0){aH=X+1|0;aI=X+2|0;c[Y+(c[10944+(aA<<2)>>2]<<2)>>2]=(d[f+((aH>>>3)+2)|0]|0)>>>((aH&7)>>>0)<<1&2|(d[f+((X>>>3)+2)|0]|0)>>>((X&7)>>>0)&1|(d[f+((aI>>>3)+2)|0]|0)>>>((aI&7)>>>0)<<2&4;aJ=X+3|0}else{c[Y+(c[10944+(aA<<2)>>2]<<2)>>2]=0;aJ=X}aI=aA+1|0;if(aI>>>0<19>>>0){aA=aI;X=aJ}else{break}}X=db(76)|0;aA=X;c[E>>2]=aA;if((X|0)==0){aD=0;aE=0;aF=83;aG=aJ;break}c[aA>>2]=c[Y>>2];aA=X+4|0;X=ay+4|0;dg(aA|0,X|0,72)|0;c[F>>2]=19;c[G>>2]=7;X=cz(k)|0;if((X|0)!=0){aD=0;aE=0;aF=X;aG=aJ;break}X=db(1152)|0;aA=X;aI=db(128)|0;aH=aI;if((X|0)==0|(aI|0)==0){aD=aH;aE=aA;aF=83;aG=aJ;break}dh(X|0,0,1152);dh(aI|0,0,128);aK=az+258|0;aL=aB+aK|0;if((aL|0)==0){aD=aH;aE=aA;aF=64;aG=aJ;break}aM=c[C>>2]|0;aN=c[F>>2]|0;aO=-258-az|0;aP=0;aQ=0;aR=aJ;L105:while(1){aS=aP;aT=aR;while(1){aU=0;aV=aT;while(1){if(aV>>>0>=r>>>0){aW=aV;ao=111;break L105}aX=c[aM+(((d[f+((aV>>>3)+2)|0]|0)>>>((aV&7)>>>0)&1|aU<<1)<<2)>>2]|0;aY=aV+1|0;if(aX>>>0<aN>>>0){break}aZ=aX-aN|0;if(aZ>>>0<aN>>>0){aU=aZ;aV=aY}else{aW=aY;ao=111;break L105}}if(aX>>>0>=16>>>0){break}if(aS>>>0<ab>>>0){c[aA+(aS<<2)>>2]=aX}else{c[aH+(aS-ab<<2)>>2]=aX}aU=aS+1|0;if(aU>>>0<aL>>>0){aS=aU;aT=aY}else{a_=aQ;a$=aY;break L105}}L120:do{if((aX|0)==16){if(aY>>>0>=r>>>0){aD=aH;aE=aA;aF=50;aG=aY;break L93}if((aS|0)==0){aD=aH;aE=aA;aF=54;aG=aY;break L93}aT=aV+2|0;aU=aV+3|0;aZ=((d[f+((aT>>>3)+2)|0]|0)>>>((aT&7)>>>0)<<1&2|(d[f+((aY>>>3)+2)|0]|0)>>>((aY&7)>>>0)&1)+3|0;if(aS>>>0<aK>>>0){a0=aA+(aS-1<<2)|0}else{a0=aH+(aO+aS<<2)|0}aT=c[a0>>2]|0;a1=0;a2=aS;while(1){if(a2>>>0>=aL>>>0){a3=13;a4=a2;a5=aU;break L120}if(a2>>>0<ab>>>0){c[aA+(a2<<2)>>2]=aT}else{c[aH+(a2-ab<<2)>>2]=aT}a6=a2+1|0;a7=a1+1|0;if(a7>>>0<aZ>>>0){a1=a7;a2=a6}else{a3=aQ;a4=a6;a5=aU;break}}}else if((aX|0)==17){if(aY>>>0>=r>>>0){aD=aH;aE=aA;aF=50;aG=aY;break L93}aU=aV+2|0;a2=aV+3|0;a1=aV+4|0;aZ=((d[f+((aU>>>3)+2)|0]|0)>>>((aU&7)>>>0)<<1&2|(d[f+((aY>>>3)+2)|0]|0)>>>((aY&7)>>>0)&1|(d[f+((a2>>>3)+2)|0]|0)>>>((a2&7)>>>0)<<2&4)+3|0;a2=0;aU=aS;while(1){if(aU>>>0>=aL>>>0){a3=14;a4=aU;a5=a1;break L120}if(aU>>>0<ab>>>0){c[aA+(aU<<2)>>2]=0}else{c[aH+(aU-ab<<2)>>2]=0}aT=aU+1|0;a6=a2+1|0;if(a6>>>0<aZ>>>0){a2=a6;aU=aT}else{a3=aQ;a4=aT;a5=a1;break}}}else if((aX|0)==18){if(aY>>>0>=r>>>0){aD=aH;aE=aA;aF=50;aG=aY;break L93}a1=aV+2|0;aU=aV+3|0;a2=aV+4|0;aZ=aV+5|0;aT=aV+6|0;a6=aV+7|0;a7=aV+8|0;a8=((d[f+((a1>>>3)+2)|0]|0)>>>((a1&7)>>>0)<<1&2|(d[f+((aY>>>3)+2)|0]|0)>>>((aY&7)>>>0)&1|(d[f+((aU>>>3)+2)|0]|0)>>>((aU&7)>>>0)<<2&4|(d[f+((a2>>>3)+2)|0]|0)>>>((a2&7)>>>0)<<3&8|(d[f+((aZ>>>3)+2)|0]|0)>>>((aZ&7)>>>0)<<4&16|(d[f+((aT>>>3)+2)|0]|0)>>>((aT&7)>>>0)<<5&32|(d[f+((a6>>>3)+2)|0]|0)>>>((a6&7)>>>0)<<6&64)+11|0;if((a8|0)==0){a3=aQ;a4=aS;a5=a7;break}else{a9=0;ba=aS}while(1){if(ba>>>0>=aL>>>0){a3=15;a4=ba;a5=a7;break L120}if(ba>>>0<ab>>>0){c[aA+(ba<<2)>>2]=0}else{c[aH+(ba-ab<<2)>>2]=0}a6=ba+1|0;aT=a9+1|0;if(aT>>>0<a8>>>0){a9=aT;ba=a6}else{a3=aQ;a4=a6;a5=a7;break}}}else if((aX|0)==(-1|0)){aW=aY;ao=111;break L105}else{aD=aH;aE=aA;aF=16;aG=aY;break L93}}while(0);if(a4>>>0<aL>>>0){aP=a4;aQ=a3;aR=a5}else{a_=a3;a$=a5;break}}if((ao|0)==111){ao=0;aD=aH;aE=aA;aF=aW>>>0>r>>>0?10:11;aG=aW;break}if((a_|0)!=0){aD=aH;aE=aA;aF=a_;aG=a$;break}if((c[X+1024>>2]|0)==0){aD=aH;aE=aA;aF=64;aG=a$;break}aR=db(1152)|0;aQ=aR;c[u>>2]=aQ;if((aR|0)==0){aD=aH;aE=aA;aF=83;aG=a$;break}c[aQ>>2]=c[aA>>2];c[aR+4>>2]=c[X+4>>2];aQ=aR+8|0;aR=X+8|0;dg(aQ|0,aR|0,1144)|0;c[y>>2]=288;c[H>>2]=15;aR=cz(l)|0;if((aR|0)!=0){aD=aH;aE=aA;aF=aR;aG=a$;break}aR=db(128)|0;aQ=aR;c[x>>2]=aQ;if((aR|0)==0){aD=aH;aE=aA;aF=83;aG=a$;break}c[aQ>>2]=c[aH>>2];c[aR+4>>2]=c[aI+4>>2];aQ=aR+8|0;aR=aI+8|0;dg(aQ|0,aR|0,120)|0;c[z>>2]=32;c[A>>2]=15;aD=aH;aE=aA;aF=cz(m)|0;aG=a$}}while(0);dc(ay);dc(aE);dc(aD);dc(c[C>>2]|0);dc(c[D>>2]|0);dc(c[E>>2]|0);if((aF|0)==0){an=aG;ao=120;break}aq=aF;ar=c[s>>2]|0;as=c[v>>2]|0;at=K;au=aG;av=L;aw=M;ax=N}else{an=U;ao=120}}while(0);L164:do{if((ao|0)==120){ao=0;U=c[s>>2]|0;V=c[y>>2]|0;ab=c[v>>2]|0;az=c[z>>2]|0;aB=K;Y=an;aC=L;T=M;p=N;L166:while(1){aa=Y;bb=aC;bc=T;bd=p;while(1){aR=0;aQ=aa;while(1){if(aQ>>>0>=r>>>0){be=aQ;break L166}bf=c[U+(((d[f+((aQ>>>3)+2)|0]|0)>>>((aQ&7)>>>0)&1|aR<<1)<<2)>>2]|0;bg=aQ+1|0;if(bf>>>0<V>>>0){break}aP=bf-V|0;if(aP>>>0<V>>>0){aR=aP;aQ=bg}else{be=bg;break L166}}if(bf>>>0<256>>>0){break}aQ=bf-257|0;if(aQ>>>0>=29>>>0){ao=156;break L166}if(bg>>>0>=r>>>0){aq=51;ar=U;as=ab;at=aB;au=bg;av=bb;aw=bc;ax=bd;break L164}aR=c[9672+(aQ<<2)>>2]|0;aP=c[9792+(aQ<<2)>>2]|0;if((bf-265|0)>>>0>19>>>0){bh=0;bi=bg}else{aQ=aR>>>0>1>>>0;aL=0;aO=0;aK=bg;while(1){bj=(((d[f+((aK>>>3)+2)|0]|0)>>>((aK&7)>>>0)&1)<<aO)+aL|0;aN=aO+1|0;if(aN>>>0<aR>>>0){aL=bj;aO=aN;aK=aK+1|0}else{break}}bh=bj;bi=(aQ?aR:1)+bg|0}bk=bh+aP|0;aK=0;aO=bi;while(1){if(aO>>>0>=r>>>0){bl=aO;ao=142;break L166}bm=c[ab+(((d[f+((aO>>>3)+2)|0]|0)>>>((aO&7)>>>0)&1|aK<<1)<<2)>>2]|0;bn=aO+1|0;if(bm>>>0<az>>>0){break}aL=bm-az|0;if(aL>>>0<az>>>0){aK=aL;aO=bn}else{bl=bn;ao=142;break L166}}if(bm>>>0>29>>>0){bl=bn;ao=142;break L166}if(bn>>>0>=r>>>0){aq=51;ar=U;as=ab;at=aB;au=bn;av=bb;aw=bc;ax=bd;break L164}aO=c[10704+(bm<<2)>>2]|0;aK=c[10824+(bm<<2)>>2]|0;if(bm>>>0<4>>>0){bo=0;bp=bn}else{aP=aO>>>0>1>>>0;aR=0;aQ=0;aL=bn;while(1){bq=(((d[f+((aL>>>3)+2)|0]|0)>>>((aL&7)>>>0)&1)<<aQ)+aR|0;aN=aQ+1|0;if(aN>>>0<aO>>>0){aR=bq;aQ=aN;aL=aL+1|0}else{break}}bo=bq;bp=(aP?aO:1)+bn|0}br=bo+aK|0;if(br>>>0>aB>>>0){aq=52;ar=U;as=ab;at=aB;au=bp;av=bb;aw=bc;ax=bd;break L164}bs=bk+aB|0;do{if(bs>>>0<bc>>>0){bt=bb;bu=bc;bv=bd}else{aL=bs<<1;if(bd>>>0>=aL>>>0){bt=bb;bu=aL;bv=bd;break}aQ=bs<<2;aR=dd(bb,aQ)|0;if((aR|0)==0){aq=83;ar=U;as=ab;at=aB;au=bp;av=bb;aw=bc;ax=bd;break L164}else{bt=aR;bu=aL;bv=aQ}}}while(0);if((bk|0)==0){aa=bp;bb=bt;bc=bu;bd=bv}else{ao=154;break}}if((ao|0)==154){ao=0;aa=aB-br|0;a[bt+aB|0]=a[bt+aa|0]|0;aA=aB+1|0;if(bk>>>0>1>>>0){bw=1;bx=aA;by=aa}else{aB=aA;Y=bp;aC=bt;T=bu;p=bv;continue}while(1){aA=by+1|0;aH=aA>>>0<aB>>>0?aA:aa;aA=bw+1|0;a[bt+bx|0]=a[bt+aH|0]|0;if(aA>>>0<bk>>>0){bw=aA;bx=bx+1|0;by=aH}else{aB=bs;Y=bp;aC=bt;T=bu;p=bv;continue L166}}}do{if(aB>>>0<bc>>>0){bz=bb;bA=bc;bB=bd}else{aa=(aB<<1)+2|0;if(bd>>>0>=aa>>>0){bz=bb;bA=aa;bB=bd;break}aH=aa<<1;aA=dd(bb,aH)|0;if((aA|0)==0){aq=83;ar=U;as=ab;at=aB;au=bg;av=bb;aw=bc;ax=bd;break L164}else{bz=aA;bA=aa;bB=aH}}}while(0);a[bz+aB|0]=bf&255;aB=aB+1|0;Y=bg;aC=bz;T=bA;p=bB}if((ao|0)==142){ao=0;if((bf|0)!=-1){aq=18;ar=U;as=ab;at=aB;au=bl;av=bb;aw=bc;ax=bd;break}aq=bl>>>0>r>>>0?10:11;ar=U;as=ab;at=aB;au=bl;av=bb;aw=bc;ax=bd;break}else if((ao|0)==156){ao=0;if((bf|0)==256){aq=0;ar=U;as=ab;at=aB;au=bg;av=bb;aw=bc;ax=bd;break}else{be=bg}}aq=be>>>0>r>>>0?10:11;ar=U;as=ab;at=aB;au=be;av=bb;aw=bc;ax=bd}}while(0);dc(ar);dc(c[t>>2]|0);dc(c[u>>2]|0);dc(as);dc(c[w>>2]|0);dc(c[x>>2]|0);if((aq|0)==0){ah=at;ai=au;aj=av;ak=aw;al=ax}else{O=aq;P=av;Q=aw;break}}if((R&1<<S|0)==0){J=ai;K=ah;L=aj;M=ak;N=al}else{ao=160;break}}do{if((ao|0)==160){if(al>>>0>=ah>>>0){O=0;P=aj;Q=ah;break}N=dd(aj,ah<<1)|0;M=(N|0)==0;O=M?83:0;P=M?aj:N;Q=M?ak:ah}}while(0);c[b>>2]=P;c[e>>2]=Q;bC=O}else{bC=b_[o&1](b,e,f+2|0,q,h)|0}if((bC|0)!=0){n=bC;i=j;return n|0}do{if((c[h>>2]|0)==0){bC=(d[f+(g-3)|0]|0)<<16|(d[f+(g-4)|0]|0)<<24|(d[f+q|0]|0)<<8|(d[f+(g-1)|0]|0);o=c[e>>2]|0;if((o|0)==0){bD=1;bE=0}else{O=c[b>>2]|0;Q=o;o=1;P=0;while(1){ah=Q>>>0>5550>>>0?5550:Q;ak=Q-ah|0;if((ah|0)==0){bF=O;bG=o;bH=P}else{aj=O;al=o;ao=P;M=ah;while(1){bI=(d[aj]|0)+al|0;bJ=bI+ao|0;N=M-1|0;if((N|0)==0){break}else{aj=aj+1|0;al=bI;ao=bJ;M=N}}bF=O+(Q>>>0<5550>>>0?Q:5550)|0;bG=bI;bH=bJ}bK=(bG>>>0)%65521|0;bL=(bH>>>0)%65521|0;if((Q|0)==(ah|0)){break}else{O=bF;Q=ak;o=bK;P=bL}}bD=bK;bE=bL<<16}if((bD|bE|0)==(bC|0)){break}else{n=58}i=j;return n|0}}while(0);n=0;i=j;return n|0}function cn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;f=b+64|0;g=b+60|0;h=dd(c[f>>2]|0,(c[g>>2]<<2)+4|0)|0;i=b+68|0;b=dd(c[i>>2]|0,(c[g>>2]<<2)+4|0)|0;if((h|0)==0|(b|0)==0){dc(h);dc(b);j=83;return j|0}k=h;h=c[g>>2]|0;c[g>>2]=h+1;c[f>>2]=k;c[i>>2]=b;b=k+(h<<2)|0;c[b>>2]=0;h=db(1)|0;if((h|0)!=0){a[h]=0;c[b>>2]=h}h=(c[f>>2]|0)+((c[g>>2]|0)-1<<2)|0;f=df(d|0)|0;b=dd(c[h>>2]|0,f+1|0)|0;do{if((b|0)!=0){a[b+f|0]=0;c[h>>2]=b;if((f|0)==0){break}a[b]=a[d]|0;if(f>>>0>1>>>0){l=1}else{break}do{a[(c[h>>2]|0)+l|0]=a[d+l|0]|0;l=l+1|0;}while(l>>>0<f>>>0)}}while(0);f=(c[i>>2]|0)+((c[g>>2]|0)-1<<2)|0;c[f>>2]=0;l=db(1)|0;if((l|0)!=0){a[l]=0;c[f>>2]=l}l=(c[i>>2]|0)+((c[g>>2]|0)-1<<2)|0;g=df(e|0)|0;i=dd(c[l>>2]|0,g+1|0)|0;if((i|0)==0){j=0;return j|0}a[i+g|0]=0;c[l>>2]=i;if((g|0)==0){j=0;return j|0}a[i]=a[e]|0;if(g>>>0>1>>>0){m=1}else{j=0;return j|0}while(1){a[(c[l>>2]|0)+m|0]=a[e+m|0]|0;i=m+1|0;if(i>>>0<g>>>0){m=i}else{j=0;break}}return j|0}function co(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;b=a+20|0;d=c[b>>2]|0;if((d|0)!=0){dc(d)}c[b>>2]=0;c[a+24>>2]=0;b=a+60|0;d=a+64|0;e=c[d>>2]|0;f=a+68|0;if((c[b>>2]|0)==0){g=e}else{h=0;i=e;while(1){e=i+(h<<2)|0;dc(c[e>>2]|0);c[e>>2]=0;e=(c[f>>2]|0)+(h<<2)|0;dc(c[e>>2]|0);c[e>>2]=0;e=h+1|0;j=c[d>>2]|0;if(e>>>0<(c[b>>2]|0)>>>0){h=e;i=j}else{g=j;break}}}dc(g);dc(c[f>>2]|0);f=a+72|0;g=a+76|0;i=c[g>>2]|0;h=a+80|0;b=a+84|0;d=a+88|0;if((c[f>>2]|0)==0){k=i}else{j=0;e=i;while(1){i=e+(j<<2)|0;dc(c[i>>2]|0);c[i>>2]=0;i=(c[h>>2]|0)+(j<<2)|0;dc(c[i>>2]|0);c[i>>2]=0;i=(c[b>>2]|0)+(j<<2)|0;dc(c[i>>2]|0);c[i>>2]=0;i=(c[d>>2]|0)+(j<<2)|0;dc(c[i>>2]|0);c[i>>2]=0;i=j+1|0;l=c[g>>2]|0;if(i>>>0<(c[f>>2]|0)>>>0){j=i;e=l}else{k=l;break}}}dc(k);dc(c[h>>2]|0);dc(c[b>>2]|0);dc(c[d>>2]|0);dc(c[a+136>>2]|0);dc(c[a+140>>2]|0);dc(c[a+144>>2]|0);return}function cp(b,e,f,g,h,i){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0;j=(f|0)!=0;f=j?4:3;switch(c[h>>2]|0){case 4:{k=(e|0)==0;if((c[h+4>>2]|0)==8){if(k){l=0;return l|0}else{m=0;n=b}while(1){o=m<<1;p=a[g+o|0]|0;a[n+2|0]=p;a[n+1|0]=p;a[n]=p;if(j){a[n+3|0]=a[g+(o|1)|0]|0}o=m+1|0;if(o>>>0<e>>>0){m=o;n=n+f|0}else{l=0;break}}return l|0}else{if(k){l=0;return l|0}else{q=0;r=b}while(1){k=q<<2;n=a[g+k|0]|0;a[r+2|0]=n;a[r+1|0]=n;a[r]=n;if(j){a[r+3|0]=a[g+(k|2)|0]|0}k=q+1|0;if(k>>>0<e>>>0){q=k;r=r+f|0}else{l=0;break}}return l|0}break};case 3:{if((e|0)==0){l=0;return l|0}r=h+4|0;q=h+12|0;k=h+8|0;n=(i|0)==0;i=0;m=0;o=b;L308:while(1){p=c[r>>2]|0;s=(p|0)==8;do{if(s){t=d[g+m|0]|0;u=i}else{v=aZ(p|0,-1|0)|0;if(!D){t=0;u=i;break}w=0;x=v;v=i;while(1){y=v+1|0;z=(((d[g+(v>>>3)|0]|0)>>>((v&7^7)>>>0)&1)<<x)+w|0;A=x-1|0;if(A>>>0<p>>>0){w=z;x=A;v=y}else{t=z;u=y;break}}}}while(0);do{if(t>>>0<(c[q>>2]|0)>>>0){p=t<<2;a[o]=a[(c[k>>2]|0)+p|0]|0;a[o+1|0]=a[(c[k>>2]|0)+(p|1)|0]|0;a[o+2|0]=a[(c[k>>2]|0)+(p|2)|0]|0;if(!j){break}a[o+3|0]=a[(c[k>>2]|0)+(p|3)|0]|0}else{if(n){break L308}a[o+2|0]=0;a[o+1|0]=0;a[o]=0;if(!j){break}a[o+3|0]=-1}}while(0);p=m+1|0;if(p>>>0<e>>>0){i=u;m=p;o=o+f|0}else{l=0;B=310;break}}if((B|0)==310){return l|0}l=s?46:47;return l|0};case 0:{s=h+4|0;B=c[s>>2]|0;if((B|0)==16){if((e|0)==0){l=0;return l|0}o=h+16|0;m=h+20|0;u=0;i=b;while(1){n=u<<1;k=g+n|0;t=a[k]|0;a[i+2|0]=t;a[i+1|0]=t;a[i]=t;if(j){if((c[o>>2]|0)==0){C=-1}else{C=(((d[k]|0)<<8|(d[g+(n|1)|0]|0)|0)!=(c[m>>2]|0))<<31>>31}a[i+3|0]=C}n=u+1|0;if(n>>>0<e>>>0){u=n;i=i+f|0}else{l=0;break}}return l|0}else if((B|0)==8){if((e|0)==0){l=0;return l|0}i=h+16|0;u=h+20|0;if(j){E=0;F=b}else{C=0;m=b;while(1){o=a[g+C|0]|0;a[m+2|0]=o;a[m+1|0]=o;a[m]=o;o=C+1|0;if(o>>>0<e>>>0){C=o;m=m+f|0}else{l=0;break}}return l|0}while(1){m=g+E|0;C=a[m]|0;a[F+2|0]=C;a[F+1|0]=C;a[F]=C;if((c[i>>2]|0)==0){G=-1}else{G=((d[m]|0|0)!=(c[u>>2]|0))<<31>>31}a[F+3|0]=G;m=E+1|0;if(m>>>0<e>>>0){E=m;F=F+f|0}else{l=0;break}}return l|0}else{F=(1<<B)-1|0;if((e|0)==0){l=0;return l|0}E=h+16|0;G=h+20|0;u=0;i=1;m=b;C=B;while(1){B=aZ(C|0,-1|0)|0;if(D){o=0;n=B;B=u;while(1){k=B+1|0;t=(((d[g+(B>>>3)|0]|0)>>>((B&7^7)>>>0)&1)<<n)+o|0;q=n-1|0;if(q>>>0<C>>>0){o=t;n=q;B=k}else{H=t;I=k;break}}}else{H=0;I=u}B=(((H*255|0)>>>0)/(F>>>0)|0)&255;a[m+2|0]=B;a[m+1|0]=B;a[m]=B;if(j){if((c[E>>2]|0)==0){J=-1}else{J=((H|0)!=(c[G>>2]|0))<<31>>31}a[m+3|0]=J}if(i>>>0>=e>>>0){l=0;break}u=I;i=i+1|0;m=m+f|0;C=c[s>>2]|0}return l|0}break};case 2:{s=(e|0)==0;if((c[h+4>>2]|0)==8){if(s){l=0;return l|0}C=h+16|0;m=h+20|0;i=h+24|0;I=h+28|0;u=0;J=b;while(1){G=u*3|0;H=a[g+G|0]|0;a[J]=H;E=a[g+(G+1)|0]|0;a[J+1|0]=E;F=a[g+(G+2)|0]|0;a[J+2|0]=F;if(j){do{if((c[C>>2]|0)==0){K=-1}else{if((H&255|0)!=(c[m>>2]|0)){K=-1;break}if((E&255|0)!=(c[i>>2]|0)){K=-1;break}K=((F&255|0)!=(c[I>>2]|0))<<31>>31}}while(0);a[J+3|0]=K}F=u+1|0;if(F>>>0<e>>>0){u=F;J=J+f|0}else{l=0;break}}return l|0}else{if(s){l=0;return l|0}s=h+16|0;J=h+20|0;u=h+24|0;K=h+28|0;I=0;i=b;while(1){m=I*6|0;C=g+m|0;a[i]=a[C]|0;F=g+(m+2)|0;a[i+1|0]=a[F]|0;E=g+(m+4)|0;a[i+2|0]=a[E]|0;if(j){do{if((c[s>>2]|0)==0){L=-1}else{if(((d[C]|0)<<8|(d[g+(m|1)|0]|0)|0)!=(c[J>>2]|0)){L=-1;break}if(((d[F]|0)<<8|(d[g+(m+3)|0]|0)|0)!=(c[u>>2]|0)){L=-1;break}L=(((d[E]|0)<<8|(d[g+(m+5)|0]|0)|0)!=(c[K>>2]|0))<<31>>31}}while(0);a[i+3|0]=L}m=I+1|0;if(m>>>0<e>>>0){I=m;i=i+f|0}else{l=0;break}}return l|0}break};case 6:{i=(e|0)==0;if((c[h+4>>2]|0)==8){if(i){l=0;return l|0}else{M=0;N=b}while(1){h=M<<2;a[N]=a[g+h|0]|0;a[N+1|0]=a[g+(h|1)|0]|0;a[N+2|0]=a[g+(h|2)|0]|0;if(j){a[N+3|0]=a[g+(h|3)|0]|0}h=M+1|0;if(h>>>0<e>>>0){M=h;N=N+f|0}else{l=0;break}}return l|0}else{if(i){l=0;return l|0}else{O=0;P=b}while(1){b=O<<3;a[P]=a[g+b|0]|0;a[P+1|0]=a[g+(b|2)|0]|0;a[P+2|0]=a[g+(b|4)|0]|0;if(j){a[P+3|0]=a[g+(b|6)|0]|0}b=O+1|0;if(b>>>0<e>>>0){O=b;P=P+f|0}else{l=0;break}}return l|0}break};default:{l=0;return l|0}}return 0}function cq(a){a=a|0;var b=0,d=0,e=0;b=0;do{d=a+(b<<2)|0;e=c[d>>2]|0;if((e|0)!=0){cq(e);dc(c[d>>2]|0)}b=b+1|0;}while((b|0)<16);return}function cr(b,e,f,g,h,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0,bM=0,bN=0,bO=0,bP=0,bQ=0,bR=0,bS=0,bT=0,bU=0,bV=0,bW=0,bX=0,bY=0,bZ=0,b$=0,b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,b7=0,b8=0,b9=0,ca=0,cb=0,cc=0,cd=0,ce=0,cf=0,cg=0,ch=0,ci=0,cj=0,ck=0,cl=0,cr=0,cs=0,ct=0,cu=0,cv=0,cw=0,cz=0,cA=0,cB=0,cC=0,cD=0,cE=0,cF=0,cG=0,cH=0,cI=0,cJ=0,cK=0,cL=0,cM=0,cN=0,cO=0,cP=0,cQ=0,cR=0,cS=0,cT=0,cU=0,cV=0,cW=0,cX=0,cY=0,cZ=0,c_=0,c$=0,c0=0,c1=0,c2=0,c3=0;k=i;i=i+440|0;l=k|0;m=k+72|0;n=k+88|0;o=k+104|0;p=k+136|0;q=k+168|0;r=k+200|0;s=k+232|0;t=k+264|0;u=k+296|0;v=k+328|0;w=k+360|0;x=k+392|0;y=k+424|0;c[b>>2]=0;z=g+132|0;L437:do{if((j|0)==0|(h|0)==0){c[g+292>>2]=48;A=48}else{if(j>>>0<29>>>0){c[g+292>>2]=27;A=27;break}co(z);B=g+160|0;C=g+144|0;dh(B|0,0,16);c[C>>2]=6;E=g+148|0;c[E>>2]=8;F=g+152|0;c[F>>2]=0;G=g+156|0;c[G>>2]=0;H=g+140|0;c[H>>2]=0;I=z|0;c[I>>2]=0;J=g+136|0;c[J>>2]=0;K=g+176|0;L=g+252|0;c[L>>2]=0;dh(g+268|0,0,24);dh(K|0,0,52);do{if((a[h]|0)==-119){if((a[h+1|0]|0)!=80){break}if((a[h+2|0]|0)!=78){break}if((a[h+3|0]|0)!=71){break}if((a[h+4|0]|0)!=13){break}if((a[h+5|0]|0)!=10){break}if((a[h+6|0]|0)!=26){break}if((a[h+7|0]|0)!=10){break}do{if((a[h+12|0]|0)==73){if((a[h+13|0]|0)!=72){break}if((a[h+14|0]|0)!=68){break}if((a[h+15|0]|0)!=82){break}c[e>>2]=d[h+17|0]<<16|d[h+16|0]<<24|d[h+18|0]<<8|d[h+19|0];c[f>>2]=d[h+21|0]<<16|d[h+20|0]<<24|d[h+22|0]<<8|d[h+23|0];M=a[h+24|0]|0;N=M&255;c[E>>2]=N;O=d[h+25|0]|0;c[C>>2]=O;P=a[h+26|0]|0;c[I>>2]=P&255;Q=a[h+27|0]|0;c[J>>2]=Q&255;R=a[h+28|0]|0;c[H>>2]=R&255;S=g+16|0;do{if((c[S>>2]|0)==0){T=d[h+29|0]|0;U=d[h+30|0]<<16;V=d[h+31|0]<<8;W=d[h+32|0]|0;X=-1;Y=0;do{X=c[632+((d[h+(Y+12)|0]^X&255)<<2)>>2]^X>>>8;Y=Y+1|0;}while(Y>>>0<17>>>0);if((U|T<<24|V|W|0)==(~X|0)){break}c[g+292>>2]=57;A=57;break L437}}while(0);if(P<<24>>24!=0){c[g+292>>2]=32;A=32;break L437}if(Q<<24>>24!=0){c[g+292>>2]=33;A=33;break L437}if((R&255)>>>0>1>>>0){c[g+292>>2]=34;A=34;break L437}switch(O|0){case 0:{if(!((N-1|0)>>>0<2>>>0|M<<24>>24==4|M<<24>>24==8|M<<24>>24==16)){Z=37;_=352}break};case 2:{if(!((N|0)==16|(N|0)==8)){Z=37;_=352}break};case 3:{if(!((N-1|0)>>>0<2>>>0|M<<24>>24==4|M<<24>>24==8)){Z=37;_=352}break};case 4:{if(!((N|0)==16|(N|0)==8)){Z=37;_=352}break};case 6:{if(!((N|0)==16|(N|0)==8)){Z=37;_=352}break};default:{Z=31;_=352}}if((_|0)==352){c[g+292>>2]=Z;aa=Z;i=k;return aa|0}Y=g+292|0;c[Y>>2]=0;ab=h;ac=g+172|0;ad=g+168|0;ae=g+164|0;af=g+188|0;ag=g+184|0;ah=g+180|0;ai=g+28|0;aj=g|0;ak=n|0;al=n+8|0;am=n+4|0;an=g+4|0;ao=m|0;ap=m+8|0;aq=m+4|0;ar=g+224|0;as=g+228|0;at=g+232|0;au=g+236|0;av=g+240|0;aw=g+244|0;ax=g+248|0;ay=g+256|0;az=g+260|0;aA=g+264|0;aB=g+32|0;aC=g+208|0;aD=g+204|0;aE=g+212|0;aF=g+216|0;aG=g+220|0;aH=h+33|0;aI=1;aJ=0;aK=0;aL=0;aM=0;L483:while(1){aN=aH-ab+12|0;aO=aN>>>0>j>>>0|aH>>>0<h>>>0;aP=aH+1|0;aQ=aH+2|0;aR=aH+3|0;aS=aH+8|0;aT=aH+4|0;aU=aH+5|0;aV=aH+6|0;aW=aH+7|0;aX=aH+9|0;aY=aH+10|0;a_=aH+11|0;a$=aH+12|0;a0=aH+13|0;a1=aH+14|0;a2=aH+15|0;a3=aH+16|0;a4=0;a5=aI;a6=aK;a7=aL;a8=aM;while(1){a9=c[Y>>2]|0;if(!(a4<<24>>24==0&(a9|0)==0)){ba=a6;bb=a7;bc=a9;break L483}if(aO){_=357;break L483}a9=d[aP]<<16|d[aH]<<24|d[aQ]<<8|d[aR];if((a9|0)<0){_=359;break L483}if((a9+aN|0)>>>0>j>>>0){_=362;break L483}bd=a9+12|0;if((aH+bd|0)>>>0<h>>>0){_=362;break L483}be=a[aT]|0;L492:do{if((be<<24>>24|0)==73){bf=a[aU]|0;if((bf<<24>>24|0)==69){if((a[aV]|0)!=78){bg=0;_=402;break}if((a[aW]|0)==68){bh=1;bi=a5;bj=a6;bk=a7;bl=a8;break}else{bg=0;_=402;break}}else if((bf<<24>>24|0)!=68){_=540;break L483}if((a[aV]|0)!=65){_=540;break L483}if((a[aW]|0)!=84){bg=0;_=402;break}bf=a9+a7|0;if(a8>>>0<bf>>>0){bm=bf<<1;bn=dd(a6,bm)|0;if((bn|0)==0){_=370;break L483}else{bo=bn;bp=bm}}else{bo=a6;bp=a8}if((a9|0)==0){bh=0;bi=3;bj=bo;bk=bf;bl=bp;break}else{bq=0}while(1){a[bo+(bq+a7)|0]=a[aH+(bq+8)|0]|0;bm=bq+1|0;if(bm>>>0<a9>>>0){bq=bm}else{bh=0;bi=3;bj=bo;bk=bf;bl=bp;break}}}else if((be<<24>>24|0)==80){if((a[aU]|0)!=76){_=540;break L483}do{if((a[aV]|0)==84){if((a[aW]|0)!=69){break}bf=c[F>>2]|0;if((bf|0)!=0){dc(bf)}bf=(a9>>>0)/3|0;c[G>>2]=bf;bm=db(bf<<2)|0;c[F>>2]=bm;L513:do{if((bm|0)==0){if(a9>>>0>=3>>>0){_=381;break L483}}else{if(a9>>>0>770>>>0){br=38;_=387;break L483}if(a9>>>0<3>>>0){break}else{bs=0;bt=0;bu=bm}while(1){bf=bt<<2;a[bu+bf|0]=a[aH+(bs+8)|0]|0;a[(c[F>>2]|0)+(bf|1)|0]=a[aH+(bs+9)|0]|0;a[(c[F>>2]|0)+(bf|2)|0]=a[aH+(bs+10)|0]|0;a[(c[F>>2]|0)+(bf|3)|0]=-1;bf=bt+1|0;if(bf>>>0>=(c[G>>2]|0)>>>0){break L513}bs=bs+3|0;bt=bf;bu=c[F>>2]|0}}}while(0);c[Y>>2]=0;bh=0;bi=2;bj=a6;bk=a7;bl=a8;break L492}}while(0);if(be<<24>>24==116){_=526}else{bg=0;_=402}}else if((be<<24>>24|0)==116){bm=a[aU]|0;if(bm<<24>>24!=82){bv=bm;_=417;break}if((a[aV]|0)!=78){bg=1;_=402;break}if((a[aW]|0)!=83){bg=1;_=402;break}bm=c[C>>2]|0;do{if((bm|0)==3){if((c[G>>2]|0)>>>0<a9>>>0){bw=38;_=401;break L483}if((a9|0)==0){break}else{bx=0}do{a[(c[F>>2]|0)+(bx<<2|3)|0]=a[aH+(bx+8)|0]|0;bx=bx+1|0;}while(bx>>>0<a9>>>0)}else if((bm|0)==0){if((a9|0)!=2){bw=30;_=401;break L483}c[B>>2]=1;bf=d[aS]<<8|d[aX];c[ac>>2]=bf;c[ad>>2]=bf;c[ae>>2]=bf}else if((bm|0)==2){if((a9|0)!=6){bw=41;_=401;break L483}c[B>>2]=1;c[ae>>2]=d[aS]<<8|d[aX];c[ad>>2]=d[aY]<<8|d[a_];c[ac>>2]=d[a$]<<8|d[a0]}else{bw=42;_=401;break L483}}while(0);c[Y>>2]=0;bh=0;bi=a5;bj=a6;bk=a7;bl=a8}else{bg=0;_=402}}while(0);L536:do{if((_|0)==402){_=0;do{if(be<<24>>24==98){if((a[aU]|0)!=75){break}if((a[aV]|0)!=71){break}if((a[aW]|0)!=68){break}switch(c[C>>2]|0){case 3:{if((a9|0)!=1){by=43;_=414;break L483}c[K>>2]=1;bm=d[aS]|0;c[af>>2]=bm;c[ag>>2]=bm;c[ah>>2]=bm;break};case 0:case 4:{if((a9|0)!=2){by=44;_=414;break L483}c[K>>2]=1;bm=d[aS]<<8|d[aX];c[af>>2]=bm;c[ag>>2]=bm;c[ah>>2]=bm;break};case 2:case 6:{if((a9|0)!=6){by=45;_=414;break L483}c[K>>2]=1;c[ah>>2]=d[aS]<<8|d[aX];c[ag>>2]=d[aY]<<8|d[a_];c[af>>2]=d[a$]<<8|d[a0];break};default:{}}c[Y>>2]=0;bh=0;bi=a5;bj=a6;bk=a7;bl=a8;break L536}}while(0);if(!bg){bz=0;_=430;break}bv=a[aU]|0;_=417}}while(0);do{if((_|0)==417){_=0;if(bv<<24>>24!=69){bz=1;_=430;break}if((a[aV]|0)!=88){bz=1;_=430;break}if((a[aW]|0)!=116){bz=1;_=430;break}if((c[ai>>2]|0)==0){bh=0;bi=a5;bj=a6;bk=a7;bl=a8;break}else{bA=0}while(1){if(bA>>>0>=a9>>>0){break}if((a[aH+(bA+8)|0]|0)==0){break}else{bA=bA+1|0}}do{if((bA|0)==0|bA>>>0>79>>>0){bB=89;bC=0;bD=0}else{bm=bA+1|0;bf=db(bm)|0;if((bf|0)==0){bB=83;bC=0;bD=0;break}a[bf+bA|0]=0;dg(bf|0,aS|0,bA)|0;bn=bm>>>0>a9>>>0?0:a9-bm|0;bE=db(bn+1|0)|0;if((bE|0)==0){bB=83;bC=0;bD=bf;break}a[bE+bn|0]=0;if((bn|0)!=0){bn=aH+(bA+9)|0;bF=(bm>>>0<a9>>>0?a9:bm)+~bA|0;dg(bE|0,bn|0,bF)|0}bB=cn(z,bf,bE)|0;bC=bE;bD=bf}}while(0);dc(bD);dc(bC);c[Y>>2]=bB;if((bB|0)==0){bh=0;bi=a5;bj=a6;bk=a7;bl=a8}else{ba=a6;bb=a7;bc=bB;break L483}}}while(0);L570:do{if((_|0)==430){_=0;do{if((be<<24>>24|0)==122){if((a[aU]|0)!=84){bG=bz;break}if((a[aV]|0)!=88){bG=bz;break}if((a[aW]|0)!=116){bG=bz;break}if((c[ai>>2]|0)==0){bh=0;bi=a5;bj=a6;bk=a7;bl=a8;break L570}c[ak>>2]=0;c[al>>2]=0;c[am>>2]=0;bf=0;while(1){if(bf>>>0>=a9>>>0){break}if((a[aH+(bf+8)|0]|0)==0){break}else{bf=bf+1|0}}bE=bf+2|0;do{if(bE>>>0<a9>>>0){if((bf|0)==0|bf>>>0>79>>>0){bH=0;bI=89;break}bF=db(bf+1|0)|0;if((bF|0)==0){bH=0;bI=83;break}a[bF+bf|0]=0;dg(bF|0,aS|0,bf)|0;if((a[aH+(bf+9)|0]|0)!=0){bH=bF;bI=72;break}if(bE>>>0>a9>>>0){bH=bF;bI=75;break}bn=a9-bE|0;bm=aH+(bf+10)|0;bJ=c[an>>2]|0;if((bJ|0)==0){bK=cm(ak,am,bm,bn,aj)|0}else{bK=b_[bJ&1](ak,am,bm,bn,aj)|0}if((bK|0)!=0){bH=bF;bI=bK;break}bn=c[am>>2]|0;bm=bn+1|0;do{if((c[al>>2]|0)>>>0<bm>>>0){bJ=bm<<1;bL=dd(c[ak>>2]|0,bJ)|0;if((bL|0)==0){break}c[al>>2]=bJ;c[ak>>2]=bL;bM=bL;_=451}else{bM=c[ak>>2]|0;_=451}}while(0);if((_|0)==451){_=0;c[am>>2]=bm;a[bM+bn|0]=0}bH=bF;bI=cn(z,bF,c[ak>>2]|0)|0}else{bH=0;bI=75}}while(0);dc(bH);c[al>>2]=0;c[am>>2]=0;dc(c[ak>>2]|0);c[Y>>2]=bI;if((bI|0)==0){bh=0;bi=a5;bj=a6;bk=a7;bl=a8;break L570}else{ba=a6;bb=a7;bc=bI;break L483}}else if((be<<24>>24|0)==105){if((a[aU]|0)!=84){bG=bz;break}if((a[aV]|0)!=88){bG=bz;break}if((a[aW]|0)!=116){bG=bz;break}if((c[ai>>2]|0)==0){bh=0;bi=a5;bj=a6;bk=a7;bl=a8;break L570}c[ao>>2]=0;c[ap>>2]=0;c[aq>>2]=0;L606:do{if(a9>>>0<5>>>0){bN=0;bO=0;bP=0;bQ=30}else{bf=0;while(1){if(bf>>>0>=a9>>>0){break}if((a[aH+(bf+8)|0]|0)==0){break}else{bf=bf+1|0}}bF=bf+3|0;if(bF>>>0>=a9>>>0){bN=0;bO=0;bP=0;bQ=75;break}if((bf|0)==0|bf>>>0>79>>>0){bN=0;bO=0;bP=0;bQ=89;break}bn=db(bf+1|0)|0;if((bn|0)==0){bN=0;bO=0;bP=0;bQ=83;break}a[bn+bf|0]=0;dg(bn|0,aS|0,bf)|0;bm=a[aH+(bf+9)|0]|0;if((a[aH+(bf+10)|0]|0)==0){bR=0;bS=bF}else{bN=0;bO=0;bP=bn;bQ=72;break}while(1){if(bS>>>0>=a9>>>0){_=466;break}bE=bR+1|0;if((a[aH+(bS+8)|0]|0)==0){bT=bE;break}else{bR=bE;bS=bS+1|0}}if((_|0)==466){_=0;bT=bR+1|0}bE=db(bT)|0;if((bE|0)==0){bN=0;bO=0;bP=bn;bQ=83;break}a[bE+bR|0]=0;if((bR|0)!=0){bL=aH+(bf+11)|0;dg(bE|0,bL|0,bR)|0}bL=bT+bF|0;bJ=0;bU=bL;while(1){if(bU>>>0>=a9>>>0){_=473;break}bV=bJ+1|0;if((a[aH+(bU+8)|0]|0)==0){bW=bV;break}else{bJ=bV;bU=bU+1|0}}if((_|0)==473){_=0;bW=bJ+1|0}bU=db(bW)|0;if((bU|0)==0){bN=0;bO=bE;bP=bn;bQ=83;break}a[bU+bJ|0]=0;if((bJ|0)!=0){bF=aH+(bf+11+bT)|0;dg(bU|0,bF|0,bJ)|0}bF=bW+bL|0;bV=bF>>>0>a9>>>0?0:a9-bF|0;L634:do{if(bm<<24>>24==0){bX=bV+1|0;if((bX|0)==0){bY=0}else{bZ=bX<<1;b$=db(bZ)|0;if((b$|0)==0){bN=bU;bO=bE;bP=bn;bQ=83;break L606}c[ap>>2]=bZ;c[ao>>2]=b$;bY=b$}c[aq>>2]=bX;a[bY+bV|0]=0;if((bV|0)==0){break}bX=bF+8|0;a[bY]=a[aH+bX|0]|0;if(bV>>>0<=1>>>0){break}a[bY+1|0]=a[aH+(bF+9)|0]|0;if(bV>>>0>2>>>0){b0=2;b1=bY}else{break}while(1){a[b1+b0|0]=a[aH+(b0+bX)|0]|0;b$=b0+1|0;if(b$>>>0>=bV>>>0){break L634}b0=b$;b1=c[ao>>2]|0}}else{bX=aH+(bF+8)|0;b$=c[an>>2]|0;if((b$|0)==0){b2=cm(ao,aq,bX,bV,aj)|0}else{b2=b_[b$&1](ao,aq,bX,bV,aj)|0}if((b2|0)!=0){bN=bU;bO=bE;bP=bn;bQ=b2;break L606}bX=c[ap>>2]|0;b$=c[aq>>2]|0;if(bX>>>0<b$>>>0){c[ap>>2]=b$;b3=b$}else{b3=bX}bX=b$+1|0;if(b3>>>0<bX>>>0){bZ=bX<<1;b4=dd(c[ao>>2]|0,bZ)|0;if((b4|0)==0){break}c[ap>>2]=bZ;c[ao>>2]=b4;b5=b4}else{b5=c[ao>>2]|0}c[aq>>2]=bX;a[b5+b$|0]=0}}while(0);bV=c[ao>>2]|0;bF=dd(c[aC>>2]|0,(c[aD>>2]<<2)+4|0)|0;bm=dd(c[aE>>2]|0,(c[aD>>2]<<2)+4|0)|0;bL=dd(c[aF>>2]|0,(c[aD>>2]<<2)+4|0)|0;bJ=dd(c[aG>>2]|0,(c[aD>>2]<<2)+4|0)|0;if((bF|0)==0|(bm|0)==0|(bL|0)==0|(bJ|0)==0){dc(bF);dc(bm);dc(bL);dc(bJ);bN=bU;bO=bE;bP=bn;bQ=83;break}bf=bF;bF=c[aD>>2]|0;c[aD>>2]=bF+1;c[aC>>2]=bf;c[aE>>2]=bm;c[aF>>2]=bL;c[aG>>2]=bJ;bJ=bf+(bF<<2)|0;c[bJ>>2]=0;bF=db(1)|0;if((bF|0)!=0){a[bF]=0;c[bJ>>2]=bF}bF=(c[aC>>2]|0)+((c[aD>>2]|0)-1<<2)|0;bJ=df(bn|0)|0;bf=dd(c[bF>>2]|0,bJ+1|0)|0;do{if((bf|0)!=0){a[bf+bJ|0]=0;c[bF>>2]=bf;if((bJ|0)==0){break}a[bf]=a[bn]|0;if(bJ>>>0>1>>>0){b6=1}else{break}do{a[(c[bF>>2]|0)+b6|0]=a[bn+b6|0]|0;b6=b6+1|0;}while(b6>>>0<bJ>>>0)}}while(0);bJ=(c[aE>>2]|0)+((c[aD>>2]|0)-1<<2)|0;c[bJ>>2]=0;bF=db(1)|0;if((bF|0)!=0){a[bF]=0;c[bJ>>2]=bF}bF=(c[aE>>2]|0)+((c[aD>>2]|0)-1<<2)|0;bJ=df(bE|0)|0;bf=dd(c[bF>>2]|0,bJ+1|0)|0;do{if((bf|0)!=0){a[bf+bJ|0]=0;c[bF>>2]=bf;if((bJ|0)==0){break}a[bf]=a[bE]|0;if(bJ>>>0>1>>>0){b7=1}else{break}do{a[(c[bF>>2]|0)+b7|0]=a[bE+b7|0]|0;b7=b7+1|0;}while(b7>>>0<bJ>>>0)}}while(0);bJ=(c[aF>>2]|0)+((c[aD>>2]|0)-1<<2)|0;c[bJ>>2]=0;bF=db(1)|0;if((bF|0)!=0){a[bF]=0;c[bJ>>2]=bF}bF=(c[aF>>2]|0)+((c[aD>>2]|0)-1<<2)|0;bJ=df(bU|0)|0;bf=dd(c[bF>>2]|0,bJ+1|0)|0;do{if((bf|0)!=0){a[bf+bJ|0]=0;c[bF>>2]=bf;if((bJ|0)==0){break}a[bf]=a[bU]|0;if(bJ>>>0>1>>>0){b8=1}else{break}do{a[(c[bF>>2]|0)+b8|0]=a[bU+b8|0]|0;b8=b8+1|0;}while(b8>>>0<bJ>>>0)}}while(0);bJ=(c[aG>>2]|0)+((c[aD>>2]|0)-1<<2)|0;c[bJ>>2]=0;bF=db(1)|0;if((bF|0)!=0){a[bF]=0;c[bJ>>2]=bF}bF=(c[aG>>2]|0)+((c[aD>>2]|0)-1<<2)|0;bJ=df(bV|0)|0;bf=dd(c[bF>>2]|0,bJ+1|0)|0;if((bf|0)==0){bN=bU;bO=bE;bP=bn;bQ=0;break}a[bf+bJ|0]=0;c[bF>>2]=bf;if((bJ|0)==0){bN=bU;bO=bE;bP=bn;bQ=0;break}a[bf]=a[bV]|0;if(bJ>>>0>1>>>0){b9=1}else{bN=bU;bO=bE;bP=bn;bQ=0;break}while(1){a[(c[bF>>2]|0)+b9|0]=a[bV+b9|0]|0;bf=b9+1|0;if(bf>>>0<bJ>>>0){b9=bf}else{bN=bU;bO=bE;bP=bn;bQ=0;break}}}}while(0);dc(bP);dc(bO);dc(bN);c[ap>>2]=0;c[aq>>2]=0;dc(c[ao>>2]|0);c[Y>>2]=bQ;if((bQ|0)==0){bh=0;bi=a5;bj=a6;bk=a7;bl=a8;break L570}else{ba=a6;bb=a7;bc=bQ;break L483}}else{bG=bz}}while(0);if(bG){_=526}else{_=532}}}while(0);do{if((_|0)==526){_=0;if((a[aU]|0)!=73){_=532;break}if((a[aV]|0)!=77){_=532;break}if((a[aW]|0)!=69){_=532;break}if((a9|0)!=7){_=530;break L483}c[ar>>2]=1;c[as>>2]=d[aS]<<8|d[aX];c[at>>2]=d[aY]|0;c[au>>2]=d[a_]|0;c[av>>2]=d[a$]|0;c[aw>>2]=d[a0]|0;c[ax>>2]=d[a1]|0;c[Y>>2]=0;bh=0;bi=a5;bj=a6;bk=a7;bl=a8}}while(0);if((_|0)==532){_=0;if(be<<24>>24!=112){_=539;break}if((a[aU]|0)!=72){_=541;break}if((a[aV]|0)!=89){_=541;break}if((a[aW]|0)!=115){_=541;break}if((a9|0)!=9){_=537;break L483}c[L>>2]=1;c[ay>>2]=d[aX]<<16|d[aS]<<24|d[aY]<<8|d[a_];c[az>>2]=d[a0]<<16|d[a$]<<24|d[a1]<<8|d[a2];c[aA>>2]=d[a3]|0;c[Y>>2]=0;bh=0;bi=a5;bj=a6;bk=a7;bl=a8}if((c[S>>2]|aJ|0)==0){bn=d[aP]<<16|d[aH]<<24|d[aQ]<<8|d[aR];bE=d[aH+(bn+9)|0]<<16|d[aH+(bn+8)|0]<<24|d[aH+(bn+10)|0]<<8|d[aH+(bn+11)|0];bU=bn+4|0;if((bU|0)==0){ca=0}else{bn=-1;bJ=0;do{bn=c[632+((d[aH+(bJ+4)|0]^bn&255)<<2)>>2]^bn>>>8;bJ=bJ+1|0;}while(bJ>>>0<bU>>>0);ca=~bn}if((bE|0)!=(ca|0)){_=553;break L483}}if(bh<<24>>24==0){cb=bi;cc=aJ;cd=bj;ce=bk;cf=bl;break}else{a4=bh;a5=bi;a6=bj;a7=bk;a8=bl}}if((_|0)==539){_=0;if((be&32)==0){_=540;break}else{_=541}}do{if((_|0)==541){_=0;if((c[aB>>2]|0)==0){cb=a5;cc=1;cd=a6;ce=a7;cf=a8;break}a4=a5-1|0;a3=g+268+(a4<<2)|0;a2=g+280+(a4<<2)|0;a4=c[a2>>2]|0;a1=aZ(a4|0,bd|0)|0;a$=a1;if(D|a$>>>0<a4>>>0){cg=77;_=547;break L483}a1=dd(c[a3>>2]|0,a$)|0;if((a1|0)==0){cg=83;_=547;break L483}c[a3>>2]=a1;c[a2>>2]=a$;if((bd|0)!=0){a$=0;do{a[a1+(a$+a4)|0]=a[aH+a$|0]|0;a$=a$+1|0;}while(a$>>>0<bd>>>0)}c[Y>>2]=0;cb=a5;cc=1;cd=a6;ce=a7;cf=a8}}while(0);aH=aH+((d[aP]<<16|d[aH]<<24|d[aQ]<<8|d[aR])+12)|0;aI=cb;aJ=cc;aK=cd;aL=ce;aM=cf}if((_|0)==530){c[Y>>2]=73;ba=a6;bb=a7;bc=73}else if((_|0)==537){c[Y>>2]=74;ba=a6;bb=a7;bc=74}else if((_|0)==540){c[Y>>2]=69;ba=a6;bb=a7;bc=69}else if((_|0)==547){c[Y>>2]=cg;ba=a6;bb=a7;bc=cg}else if((_|0)==553){c[Y>>2]=57;ba=bj;bb=bk;bc=57}else if((_|0)==357){c[Y>>2]=30;ba=a6;bb=a7;bc=30}else if((_|0)==359){c[Y>>2]=63;ba=a6;bb=a7;bc=63}else if((_|0)==362){c[Y>>2]=64;ba=a6;bb=a7;bc=64}else if((_|0)==370){c[Y>>2]=83;ba=a6;bb=a7;bc=83}else if((_|0)==381){c[G>>2]=0;br=83;_=387}else if((_|0)==401){c[Y>>2]=bw;ba=a6;bb=a7;bc=bw}else if((_|0)==414){c[Y>>2]=by;ba=a6;bb=a7;bc=by}if((_|0)==387){c[Y>>2]=br;ba=a6;bb=a7;bc=br}aM=y|0;c[aM>>2]=0;aL=y+8|0;c[aL>>2]=0;aK=y+4|0;c[aK>>2]=0;L749:do{if((bc|0)==0){aJ=c[f>>2]|0;switch(c[C>>2]|0){case 2:{ch=3;break};case 4:{ch=2;break};case 6:{ch=4;break};case 0:case 3:{ch=1;break};default:{ch=0}}aI=((($($($(aJ,c[e>>2]|0)|0,c[E>>2]|0)|0,ch)|0)+7|0)>>>3)+aJ|0;do{if((aI|0)==0){c[aK>>2]=0}else{aJ=aI<<1;aH=db(aJ)|0;if((aH|0)==0){c[Y>>2]=83;break L749}else{c[aL>>2]=aJ;c[aM>>2]=aH;aH=(c[Y>>2]|0)==0;c[aK>>2]=aI;if(aH){break}else{break L749}}}}while(0);aI=c[an>>2]|0;if((aI|0)==0){ci=cm(aM,aK,ba,bb,aj)|0}else{ci=b_[aI&1](aM,aK,ba,bb,aj)|0}c[Y>>2]=ci}}while(0);dc(ba);if((c[Y>>2]|0)==0){aj=c[e>>2]|0;an=c[f>>2]|0;aI=c[C>>2]|0;aR=c[E>>2]|0;switch(aI|0){case 2:{cj=3;break};case 4:{cj=2;break};case 6:{cj=4;break};case 0:case 3:{cj=1;break};default:{cj=0}}aQ=(($($($(an,aj)|0,aR)|0,cj)|0)+7|0)>>>3;do{if((aQ|0)==0){ck=0;cl=aj;cr=an;cs=aI;ct=aR;_=582}else{aP=db(aQ<<1)|0;if((aP|0)==0){c[Y>>2]=83;cu=0;break}dh(aP|0,0,aQ|0);if((c[Y>>2]|0)!=0){cu=aP;break}ck=aP;cl=c[e>>2]|0;cr=c[f>>2]|0;cs=c[C>>2]|0;ct=c[E>>2]|0;_=582}}while(0);if((_|0)==582){aQ=c[aM>>2]|0;switch(cs|0){case 2:{cv=3;break};case 4:{cv=2;break};case 6:{cv=4;break};case 0:case 3:{cv=1;break};default:{cv=0}}aR=$(cv,ct)|0;L791:do{if((aR|0)==0){cw=31}else{L793:do{if((c[H>>2]|0)==0){do{if(aR>>>0<8>>>0){aI=$(aR,cl)|0;an=aI+7&-8;if((aI|0)==(an|0)){break}aj=cy(aQ,aQ,cl,cr,aR)|0;if((aj|0)!=0){cw=aj;break L791}aj=an-aI|0;if((cr|0)==0){break L793}an=(aI|0)==0;aP=0;aH=0;aJ=0;while(1){if(an){cz=aP;cA=aH}else{aB=aP;S=aH;aA=0;while(1){az=1<<(S&7^7);if((1<<(aB&7^7)&d[aQ+(aB>>>3)|0]|0)==0){ay=ck+(S>>>3)|0;a[ay]=d[ay]&(az^255)&255}else{ay=ck+(S>>>3)|0;a[ay]=(d[ay]|az)&255}az=aA+1|0;if(az>>>0<aI>>>0){aB=aB+1|0;S=S+1|0;aA=az}else{break}}cz=aP+aI|0;cA=aH+aI|0}aA=aJ+1|0;if(aA>>>0<cr>>>0){aP=aj+cz|0;aH=cA;aJ=aA}else{break L793}}}}while(0);aJ=cy(ck,aQ,cl,cr,aR)|0;if((aJ|0)!=0){cw=aJ;break L791}}else{cx(t|0,u|0,v|0,w|0,x|0,cl,cr,aR);aJ=aR>>>0<8>>>0;aH=0;do{aj=c[w+(aH<<2)>>2]|0;aP=c[t+(aH<<2)>>2]|0;aI=c[u+(aH<<2)>>2]|0;an=cy(aQ+aj|0,aQ+(c[v+(aH<<2)>>2]|0)|0,aP,aI,aR)|0;if((an|0)!=0){cw=an;break L791}do{if(aJ){an=c[x+(aH<<2)>>2]|0;aA=$(aP,aR)|0;S=(aA+7&-8)-aA|0;if((aI|0)==0){break}aB=(aA|0)==0;az=0;ay=0;ax=0;while(1){if(aB){cB=az;cC=ay}else{aw=az;av=ay;au=0;while(1){at=1<<(av&7^7);if((1<<(aw&7^7)&d[aQ+((aw>>>3)+aj)|0]|0)==0){as=aQ+((av>>>3)+an)|0;a[as]=d[as]&(at^255)&255}else{as=aQ+((av>>>3)+an)|0;a[as]=(d[as]|at)&255}at=au+1|0;if(at>>>0<aA>>>0){aw=aw+1|0;av=av+1|0;au=at}else{break}}cB=az+aA|0;cC=ay+aA|0}au=ax+1|0;if(au>>>0<aI>>>0){az=S+cB|0;ay=cC;ax=au}else{break}}}}while(0);aH=aH+1|0;}while(aH>>>0<7>>>0);cx(o|0,p|0,q|0,r|0,s|0,cl,cr,aR);if(aR>>>0>7>>>0){aH=aR>>>3;aJ=(aH|0)==0;aI=0;while(1){aj=c[p+(aI<<2)>>2]|0;if((aj|0)!=0){aP=c[o+(aI<<2)>>2]|0;ax=(aP|0)==0;ay=s+(aI<<2)|0;S=11024+(aI<<2)|0;az=11088+(aI<<2)|0;aA=11056+(aI<<2)|0;an=11120+(aI<<2)|0;aB=0;do{if(!ax){au=c[ay>>2]|0;av=$(($(c[az>>2]|0,aB)|0)+(c[S>>2]|0)|0,cl)|0;aw=av+(c[aA>>2]|0)|0;av=c[an>>2]|0;at=$(aB,aP)|0;as=0;do{ar=($(as+at|0,aH)|0)+au|0;ao=$(aw+($(as,av)|0)|0,aH)|0;if(!aJ){aq=0;do{a[ck+(aq+ao)|0]=a[aQ+(ar+aq)|0]|0;aq=aq+1|0;}while(aq>>>0<aH>>>0)}as=as+1|0;}while(as>>>0<aP>>>0)}aB=aB+1|0;}while(aB>>>0<aj>>>0)}aI=aI+1|0;if(aI>>>0>=7>>>0){break L793}}}else{cD=0}do{aI=c[o+(cD<<2)>>2]|0;aH=c[p+(cD<<2)>>2]|0;if((aH|0)!=0){aJ=(aI|0)==0;aj=s+(cD<<2)|0;aB=11024+(cD<<2)|0;aP=11088+(cD<<2)|0;an=11056+(cD<<2)|0;aA=11120+(cD<<2)|0;S=0;do{if(!aJ){az=c[aj>>2]<<3;ay=$(S,aI)|0;ax=$(($(c[aP>>2]|0,S)|0)+(c[aB>>2]|0)|0,cl)|0;as=c[aA>>2]|0;av=ax+(c[an>>2]|0)|0;ax=0;do{aw=$(av+($(ax,as)|0)|0,aR)|0;au=($(ax+ay|0,aR)|0)+az|0;at=0;while(1){aq=(d[aQ+(au>>>3)|0]|0)>>>((au&7^7)>>>0)&1;if(aq<<24>>24!=0){ar=ck+(aw>>>3)|0;a[ar]=(d[ar]|(aq&255)<<(aw&7^7))&255}aq=at+1|0;if(aq>>>0<aR>>>0){aw=aw+1|0;au=au+1|0;at=aq}else{break}}ax=ax+1|0;}while(ax>>>0<aI>>>0)}S=S+1|0;}while(S>>>0<aH>>>0)}cD=cD+1|0;}while(cD>>>0<7>>>0)}}while(0);cw=0}}while(0);c[Y>>2]=cw;cu=ck}c[b>>2]=cu}c[aL>>2]=0;c[aK>>2]=0;dc(c[aM>>2]|0);c[aM>>2]=0;aR=c[Y>>2]|0;if((aR|0)!=0){aa=aR;i=k;return aa|0}aR=g+100|0;aQ=g+144|0;if((c[g+24>>2]|0)==0){aH=g+108|0;S=c[aH>>2]|0;if((S|0)!=0){dc(S)}S=aR;aI=aQ;dg(S|0,aI|0,32)|0;aI=c[F>>2]|0;L880:do{if((aI|0)!=0){S=db(1024)|0;c[aH>>2]=S;an=c[G>>2]|0;if((S|0)==0){aA=(an|0)==0?0:83;c[Y>>2]=aA;aa=aA;i=k;return aa|0}if((an&1073741823|0)==0){break}a[S]=a[aI]|0;if(an<<2>>>0>1>>>0){cE=1;cF=S;cG=aI}else{break}while(1){a[cF+cE|0]=a[cG+cE|0]|0;S=cE+1|0;if(S>>>0>=c[G>>2]<<2>>>0){break L880}cE=S;cF=c[aH>>2]|0;cG=c[F>>2]|0}}}while(0);c[Y>>2]=0;aa=0;i=k;return aa|0}aH=aR|0;aI=c[aH>>2]|0;aM=aQ|0;L893:do{if((aI|0)==(c[aM>>2]|0)){if((c[g+104>>2]|0)!=(c[E>>2]|0)){break}aK=c[g+116>>2]|0;if((aK|0)!=(c[B>>2]|0)){break}if((aK|0)!=0){if((c[g+120>>2]|0)!=(c[ae>>2]|0)){break}if((c[g+124>>2]|0)!=(c[ad>>2]|0)){break}if((c[g+128>>2]|0)!=(c[ac>>2]|0)){break}}aK=c[g+112>>2]|0;if((aK|0)!=(c[G>>2]|0)){break}aL=g+108|0;S=aK<<2;aK=0;while(1){if(aK>>>0>=S>>>0){aa=0;break}if((a[(c[aL>>2]|0)+aK|0]|0)==(a[(c[F>>2]|0)+aK|0]|0)){aK=aK+1|0}else{break L893}}i=k;return aa|0}}while(0);aR=c[b>>2]|0;do{if(!((aI|0)==2|(aI|0)==6)){if((c[g+104>>2]|0)==8){break}else{aa=56}i=k;return aa|0}}while(0);aK=g+104|0;switch(aI|0){case 2:{cH=3;break};case 4:{cH=2;break};case 6:{cH=4;break};case 0:case 3:{cH=1;break};default:{cH=0}}aL=db((($($($(c[f>>2]|0,c[e>>2]|0)|0,c[aK>>2]|0)|0,cH)|0)+7|0)>>>3)|0;c[b>>2]=aL;L918:do{if((aL|0)==0){cI=83}else{S=c[g+20>>2]|0;an=l;aA=$(c[f>>2]|0,c[e>>2]|0)|0;aB=c[aH>>2]|0;L920:do{if((aB|0)==(c[aM>>2]|0)){aP=c[aK>>2]|0;if((aP|0)!=(c[E>>2]|0)){break}aj=c[g+116>>2]|0;if((aj|0)!=(c[B>>2]|0)){break}if((aj|0)!=0){if((c[g+120>>2]|0)!=(c[ae>>2]|0)){break}if((c[g+124>>2]|0)!=(c[ad>>2]|0)){break}if((c[g+128>>2]|0)!=(c[ac>>2]|0)){break}}aj=c[g+112>>2]|0;if((aj|0)!=(c[G>>2]|0)){break}aJ=g+108|0;ax=aj<<2;aj=0;while(1){if(aj>>>0>=ax>>>0){break}if((a[(c[aJ>>2]|0)+aj|0]|0)==(a[(c[F>>2]|0)+aj|0]|0)){aj=aj+1|0}else{break L920}}switch(aB|0){case 2:{cJ=3;break};case 4:{cJ=2;break};case 6:{cJ=4;break};case 0:case 3:{cJ=1;break};default:{cJ=0}}aj=(($($(aP,aA)|0,cJ)|0)+7|0)>>>3;if((aj|0)==0){cI=0;break L918}else{cK=0}while(1){a[aL+cK|0]=a[aR+cK|0]|0;aJ=cK+1|0;if(aJ>>>0<aj>>>0){cK=aJ}else{cI=0;break L918}}}}while(0);do{if((aB|0)==3){aj=1<<c[aK>>2];aP=c[g+112>>2]|0;aJ=aP>>>0<aj>>>0?aP:aj;dh(an|0,0,64);c[l+64>>2]=-1;if((aJ|0)==0){break}aj=g+108|0;aP=0;do{ax=aP<<2;az=c[aj>>2]|0;ay=d[az+ax|0]|0;as=d[az+(ax|1)|0]|0;av=d[az+(ax|2)|0]|0;at=d[az+(ax|3)|0]|0;ax=0;az=l;while(1){au=az+((as>>>(ax>>>0)<<2&4|at>>>(ax>>>0)&1|ay>>>(ax>>>0)<<3&8|av>>>(ax>>>0)<<1&2)<<2)|0;aw=c[au>>2]|0;if((aw|0)==0){aq=db(68)|0;c[au>>2]=aq;dh(aq|0,0,64);c[aq+64>>2]=-1;cL=c[au>>2]|0}else{cL=aw}aw=ax+1|0;if((aw|0)<8){ax=aw;az=cL}else{break}}c[cL+64>>2]=aP;aP=aP+1|0;}while(aP>>>0<aJ>>>0)}}while(0);an=c[aK>>2]|0;L955:do{if((c[E>>2]|0)==16&(an|0)==16){if((aA|0)==0){cM=0;break}else{cN=0;cO=1}while(1){if(!cO){cM=85;break L955}aB=c[aM>>2]|0;L960:do{if((aB|0)==0){aJ=cN<<1;aP=a[aR+aJ|0]|0;aj=a[aR+(aJ|1)|0]|0;if((c[B>>2]|0)!=0){if(((aP&255)<<8|aj&255|0)==(c[ae>>2]|0)){cP=0;cQ=0;cR=aP;cS=aj;cT=aP;cU=aj;cV=aP;cW=aj;break}}cP=-1;cQ=-1;cR=aP;cS=aj;cT=aP;cU=aj;cV=aP;cW=aj}else if((aB|0)==2){aj=cN*6|0;aP=a[aR+aj|0]|0;aJ=a[aR+(aj|1)|0]|0;az=a[aR+(aj+2)|0]|0;ax=a[aR+(aj+3)|0]|0;av=a[aR+(aj+4)|0]|0;ay=a[aR+(aj+5)|0]|0;do{if((c[B>>2]|0)!=0){if(((aP&255)<<8|aJ&255|0)!=(c[ae>>2]|0)){break}if(((az&255)<<8|ax&255|0)!=(c[ad>>2]|0)){break}if(((av&255)<<8|ay&255|0)==(c[ac>>2]|0)){cP=0;cQ=0;cR=av;cS=ay;cT=az;cU=ax;cV=aP;cW=aJ;break L960}}}while(0);cP=-1;cQ=-1;cR=av;cS=ay;cT=az;cU=ax;cV=aP;cW=aJ}else if((aB|0)==4){aj=cN<<2;at=a[aR+aj|0]|0;as=a[aR+(aj|1)|0]|0;cP=a[aR+(aj|2)|0]|0;cQ=a[aR+(aj|3)|0]|0;cR=at;cS=as;cT=at;cU=as;cV=at;cW=as}else if((aB|0)==6){as=cN<<3;cP=a[aR+(as|6)|0]|0;cQ=a[aR+(as|7)|0]|0;cR=a[aR+(as|4)|0]|0;cS=a[aR+(as|5)|0]|0;cT=a[aR+(as|2)|0]|0;cU=a[aR+(as|3)|0]|0;cV=a[aR+as|0]|0;cW=a[aR+(as|1)|0]|0}else{cM=85;break L955}}while(0);if((c[aK>>2]|0)!=16){cM=85;break L955}aB=c[aH>>2]|0;if((aB|0)==0){as=cN<<1;a[aL+as|0]=cV;a[aL+(as|1)|0]=cW}else if((aB|0)==2){as=cN*6|0;a[aL+as|0]=cV;a[aL+(as|1)|0]=cW;a[aL+(as+2)|0]=cT;a[aL+(as+3)|0]=cU;a[aL+(as+4)|0]=cR;a[aL+(as+5)|0]=cS}else if((aB|0)==4){as=cN<<2;a[aL+as|0]=cV;a[aL+(as|1)|0]=cW;a[aL+(as|2)|0]=cP;a[aL+(as|3)|0]=cQ}else if((aB|0)==6){aB=cN<<3;a[aL+aB|0]=cV;a[aL+(aB|1)|0]=cW;a[aL+(aB|2)|0]=cT;a[aL+(aB|3)|0]=cU;a[aL+(aB|4)|0]=cR;a[aL+(aB|5)|0]=cS;a[aL+(aB|6)|0]=cP;a[aL+(aB|7)|0]=cQ}aB=cN+1|0;if(aB>>>0>=aA>>>0){cM=0;break L955}cN=aB;cO=(c[E>>2]|0)==16}}else{do{if((an|0)==8){aB=c[aH>>2]|0;if((aB|0)==6){cM=cp(aL,aA,1,aR,aQ,S)|0;break L955}else if((aB|0)==2){cM=cp(aL,aA,0,aR,aQ,S)|0;break L955}else{break}}}while(0);if((aA|0)==0){cM=0;break}aB=(S|0)==0;as=0;at=0;aj=0;aw=0;au=0;L990:while(1){L992:do{switch(c[aM>>2]|0){case 0:{aq=c[E>>2]|0;if((aq|0)==8){ar=a[aR+as|0]|0;if((c[B>>2]|0)!=0){if((ar&255|0)==(c[ae>>2]|0)){cX=0;cY=ar;cZ=ar;c_=ar;break L992}}cX=-1;cY=ar;cZ=ar;c_=ar;break L992}else if((aq|0)==16){ar=as<<1;ao=a[aR+ar|0]|0;if((c[B>>2]|0)!=0){if(((ao&255)<<8|d[aR+(ar|1)|0]|0)==(c[ae>>2]|0)){cX=0;cY=ao;cZ=ao;c_=ao;break L992}}cX=-1;cY=ao;cZ=ao;c_=ao;break L992}else{ao=(1<<aq)-1|0;ar=aZ(aq|0,-1|0)|0;if(D){ap=0;aD=ar;ar=$(aq,as)|0;while(1){aG=(((d[aR+(ar>>>3)|0]|0)>>>((ar&7^7)>>>0)&1)<<aD)+ap|0;aF=aD-1|0;if(aF>>>0<aq>>>0){ap=aG;aD=aF;ar=ar+1|0}else{c$=aG;break}}}else{c$=0}ar=(((c$*255|0)>>>0)/(ao>>>0)|0)&255;if((c[B>>2]|0)!=0){if((c$|0)==(c[ae>>2]|0)){cX=0;cY=ar;cZ=ar;c_=ar;break L992}}cX=-1;cY=ar;cZ=ar;c_=ar;break L992}break};case 2:{if((c[E>>2]|0)==8){ar=as*3|0;aD=a[aR+ar|0]|0;ap=a[aR+(ar+1)|0]|0;aq=a[aR+(ar+2)|0]|0;do{if((c[B>>2]|0)!=0){if((aD&255|0)!=(c[ae>>2]|0)){break}if((ap&255|0)!=(c[ad>>2]|0)){break}if((aq&255|0)==(c[ac>>2]|0)){cX=0;cY=aq;cZ=ap;c_=aD;break L992}}}while(0);cX=-1;cY=aq;cZ=ap;c_=aD;break L992}else{ao=as*6|0;ar=a[aR+ao|0]|0;aJ=a[aR+(ao+2)|0]|0;aP=a[aR+(ao+4)|0]|0;do{if((c[B>>2]|0)!=0){if(((ar&255)<<8|d[aR+(ao|1)|0]|0)!=(c[ae>>2]|0)){break}if(((aJ&255)<<8|d[aR+(ao+3)|0]|0)!=(c[ad>>2]|0)){break}if(((aP&255)<<8|d[aR+(ao+5)|0]|0)==(c[ac>>2]|0)){cX=0;cY=aP;cZ=aJ;c_=ar;break L992}}}while(0);cX=-1;cY=aP;cZ=aJ;c_=ar;break L992}break};case 3:{ao=c[E>>2]|0;c0=(ao|0)==8;do{if(c0){c1=d[aR+as|0]|0}else{aD=aZ(ao|0,-1|0)|0;if(!D){c1=0;break}ap=0;aq=aD;aD=$(ao,as)|0;while(1){ax=(((d[aR+(aD>>>3)|0]|0)>>>((aD&7^7)>>>0)&1)<<aq)+ap|0;az=aq-1|0;if(az>>>0<ao>>>0){ap=ax;aq=az;aD=aD+1|0}else{c1=ax;break}}}}while(0);if(c1>>>0<(c[G>>2]|0)>>>0){ao=c1<<2;ar=c[F>>2]|0;cX=a[ar+(ao|3)|0]|0;cY=a[ar+(ao|2)|0]|0;cZ=a[ar+(ao|1)|0]|0;c_=a[ar+ao|0]|0;break L992}else{if(aB){break L990}else{cX=-1;cY=0;cZ=0;c_=0;break L992}}break};case 4:{if((c[E>>2]|0)==8){ao=as<<1;ar=a[aR+ao|0]|0;cX=a[aR+(ao|1)|0]|0;cY=ar;cZ=ar;c_=ar;break L992}else{ar=as<<2;ao=a[aR+ar|0]|0;cX=a[aR+(ar|2)|0]|0;cY=ao;cZ=ao;c_=ao;break L992}break};case 6:{if((c[E>>2]|0)==8){ao=as<<2;cX=a[aR+(ao|3)|0]|0;cY=a[aR+(ao|2)|0]|0;cZ=a[aR+(ao|1)|0]|0;c_=a[aR+ao|0]|0;break L992}else{ao=as<<3;cX=a[aR+(ao|6)|0]|0;cY=a[aR+(ao|4)|0]|0;cZ=a[aR+(ao|2)|0]|0;c_=a[aR+ao|0]|0;break L992}break};default:{cX=at;cY=aj;cZ=aw;c_=au}}}while(0);L1046:do{switch(c[aH>>2]|0){case 0:{ao=c[aK>>2]|0;if((ao|0)==8){a[aL+as|0]=c_;break L1046}else if((ao|0)==16){ar=as<<1;a[aL+(ar|1)|0]=c_;a[aL+ar|0]=c_;break L1046}else{if((ao|0)==1){c2=7}else{c2=(ao|0)==2?3:1}ar=c2&as;aJ=((1<<ao)+255&255&(c_&255)>>>((8-ao|0)>>>0))<<($(c2-ar|0,ao)|0);if((ar|0)==0){a[aL+(($(ao,as)|0)>>>3)|0]=aJ&255;break L1046}else{ar=aL+(($(ao,as)|0)>>>3)|0;a[ar]=(d[ar]|aJ)&255;break L1046}}break};case 2:{if((c[aK>>2]|0)==8){aJ=as*3|0;a[aL+aJ|0]=c_;a[aL+(aJ+1)|0]=cZ;a[aL+(aJ+2)|0]=cY;break L1046}else{aJ=as*6|0;a[aL+(aJ|1)|0]=c_;a[aL+aJ|0]=c_;a[aL+(aJ+3)|0]=cZ;a[aL+(aJ+2)|0]=cZ;a[aL+(aJ+5)|0]=cY;a[aL+(aJ+4)|0]=cY;break L1046}break};case 3:{aJ=c_&255;ar=cZ&255;ao=cY&255;aP=cX&255;aD=0;aq=l;while(1){if((aD|0)>=8){break}ap=c[aq+((ar>>>(aD>>>0)<<2&4|aP>>>(aD>>>0)&1|aJ>>>(aD>>>0)<<3&8|ao>>>(aD>>>0)<<1&2)<<2)>>2]|0;if((ap|0)==0){cM=82;break L955}else{aD=aD+1|0;aq=ap}}if((aq|0)==0){cM=82;break L955}aD=c[aq+64>>2]|0;if((aD|0)<0){cM=82;break L955}ao=c[aK>>2]|0;if((ao|0)==8){a[aL+as|0]=aD&255;break L1046}else if((ao|0)==1){c3=7}else{c3=(ao|0)==2?3:1}aJ=c3&as;aP=((1<<ao)-1&aD)<<($(c3-aJ|0,ao)|0);if((aJ|0)==0){a[aL+(($(ao,as)|0)>>>3)|0]=aP&255;break L1046}else{aJ=aL+(($(ao,as)|0)>>>3)|0;a[aJ]=(d[aJ]|aP)&255;break L1046}break};case 4:{aP=c[aK>>2]|0;if((aP|0)==8){aJ=as<<1;a[aL+aJ|0]=c_;a[aL+(aJ|1)|0]=cX;break L1046}else if((aP|0)==16){aP=as<<2;a[aL+(aP|1)|0]=c_;a[aL+aP|0]=c_;a[aL+(aP|3)|0]=cX;a[aL+(aP|2)|0]=cX;break L1046}else{break L1046}break};case 6:{if((c[aK>>2]|0)==8){aP=as<<2;a[aL+aP|0]=c_;a[aL+(aP|1)|0]=cZ;a[aL+(aP|2)|0]=cY;a[aL+(aP|3)|0]=cX;break L1046}else{aP=as<<3;a[aL+(aP|1)|0]=c_;a[aL+aP|0]=c_;a[aL+(aP|3)|0]=cZ;a[aL+(aP|2)|0]=cZ;a[aL+(aP|5)|0]=cY;a[aL+(aP|4)|0]=cY;a[aL+(aP|7)|0]=cX;a[aL+(aP|6)|0]=cX;break L1046}break};default:{}}}while(0);aP=as+1|0;if(aP>>>0<aA>>>0){as=aP;at=cX;aj=cY;aw=cZ;au=c_}else{cM=0;break L955}}cM=c0?46:47}}while(0);if((c[aH>>2]|0)!=3){cI=cM;break}cq(l);cI=cM}}while(0);c[Y>>2]=cI;dc(aR);aa=c[Y>>2]|0;i=k;return aa|0}}while(0);c[g+292>>2]=29;A=29;break L437}}while(0);c[g+292>>2]=28;A=28}}while(0);c[g+292>>2]=A;aa=A;i=k;return aa|0}function cs(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0,j=0;a=i;i=i+8|0;b=a|0;d=c[3060]|0;if((d|0)==0){i=a;return}if((c[(c[2896]|0)+4>>2]|0)<1){i=a;return}e=c[d+20>>2]|0;if((e|0)==-1){f=c[d+12>>2]|0;g=c[d+16>>2]|0;h=c[d>>2]|0;aF(1,b|0);au(3553,c[b>>2]|0);bR(3553,10240,9729);bR(3553,10241,9729);bR(3553,10242,33071);bR(3553,10243,33071);au(3553,c[b>>2]|0);bS(3317,1);bw(3553,0,6408,f|0,g|0,0,6408,5121,h|0);h=c[b>>2]|0;c[(c[3060]|0)+20>>2]=h;j=h}else{j=e}au(3553,j|0);j=c[2896]|0;a1(34962,0,c[j+4>>2]<<5|0,c[j>>2]|0);aU(4,0,c[(c[2896]|0)+4>>2]|0);c[(c[2896]|0)+4>>2]=0;i=a;return}function ct(){var b=0,c=0,d=0.0,e=0.0;b=i;i=i+192|0;c=b|0;cs();dh(c|0,0,28);g[c+28>>2]=1.0;g[c+32>>2]=0.0;d=a[9592]|0?480.0:0.0;g[c+36>>2]=d;g[c+40>>2]=0.0;g[c+44>>2]=1.0;g[c+48>>2]=0.0;g[c+52>>2]=0.0;g[c+56>>2]=0.0;g[c+60>>2]=1.0;e=a[3728]|0?640.0:0.0;g[c+64>>2]=e;g[c+68>>2]=d;g[c+72>>2]=1.0;g[c+76>>2]=1.0;g[c+80>>2]=0.0;g[c+84>>2]=0.0;g[c+88>>2]=0.0;g[c+92>>2]=1.0;g[c+96>>2]=e;g[c+100>>2]=d;g[c+104>>2]=1.0;g[c+108>>2]=1.0;g[c+112>>2]=0.0;g[c+116>>2]=0.0;g[c+120>>2]=0.0;g[c+124>>2]=1.0;g[c+128>>2]=e;g[c+132>>2]=0.0;g[c+136>>2]=1.0;dh(c+140|0,0,16);g[c+156>>2]=1.0;dh(c+160|0,0,28);g[c+188>>2]=1.0;a1(34962,0,192,c|0);aU(4,0,6);i=b;return}function cu(){var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0;b=i;i=i+56|0;d=b|0;e=b+8|0;L1107:do{if((bd(e|0)|0)!=0){f=e|0;g=e+16|0;while(1){h=c[f>>2]|0;L1111:do{switch(h|0){case 768:{if((c[g>>2]|0)!=27){break L1111}c[2914]=(c[2914]|0)==0?1:2;switch(h|0){case 1026:case 1793:case 1796:{j=824;break};case 1025:case 1792:case 1795:{j=823;break};default:{}}break};case 1026:case 1793:case 1796:{j=824;break};case 256:{c[2914]=(c[2914]|0)==0?1:2;break};case 1025:case 1792:case 1795:{j=823;break};default:{}}}while(0);if((j|0)==823){j=0;a[9576]=1;if((h|0)==1026|(h|0)==1793|(h|0)==1796){j=824}}if((j|0)==824){j=0;a[9576]=0}if((bd(e|0)|0)==0){break L1107}}}}while(0);do{if((c[2898]|0)!=0){e=c[3064]|0;j=c[3065]|0;g=0;if((j|0)>(g|0)|(j|0)==(g|0)&e>>>0>1e5>>>0){c[3064]=1e5;c[3065]=0;k=0;l=1e5}else{k=j;l=e}e=a[624]|0;j=e?0:0;if(!((k|0)>=(j|0)&((k|0)>(j|0)|l>>>0>=(e?66666:33333)>>>0)&a[9632])){break}do{e=bs(0)|0;do{if((a[e+122|0]|0)==0){c[2906]=0}else{if((c[2906]|0)==0){c[2906]=1;break}else{c[2906]=2;break}}}while(0);do{if((a[e+120|0]|0)==0){c[2907]=0}else{if((c[2907]|0)==0){c[2907]=1;break}else{c[2907]=2;break}}}while(0);do{if((a[e+1106|0]|0)==0){c[2908]=0}else{if((c[2908]|0)==0){c[2908]=1;break}else{c[2908]=2;break}}}while(0);do{if((a[e+1105|0]|0)==0){c[2909]=0}else{if((c[2909]|0)==0){c[2909]=1;break}else{c[2909]=2;break}}}while(0);do{if((a[e+1104|0]|0)==0){c[2910]=0}else{if((c[2910]|0)==0){c[2910]=1;break}else{c[2910]=2;break}}}while(0);do{if((a[e+1103|0]|0)==0){c[2911]=0}else{if((c[2911]|0)==0){c[2911]=1;break}else{c[2911]=2;break}}}while(0);do{if((a[e+32|0]|0)==0){c[2912]=0}else{if((c[2912]|0)==0){c[2912]=1;break}else{c[2912]=2;break}}}while(0);do{if(((a[e+1112|0]|a[e+13|0])&255|a[9576]&1|0)==0){c[2913]=0}else{if((c[2913]|0)==0){c[2913]=1;break}else{c[2913]=2;break}}}while(0);do{if((a[e+112|0]|0)==0){c[2915]=0}else{if((c[2915]|0)==0){c[2915]=1;break}else{c[2915]=2;break}}}while(0);bY[c[2898]&15](0);e=a[624]|0;h=e?66666:33333;j=e?0:0;e=dj(c[3064]|0,c[3065]|0,h,j)|0;g=D;c[3064]=e;c[3065]=g;c[2914]=0;}while((g|0)>=(j|0)&((g|0)>(j|0)|e>>>0>=h>>>0)&a[9632])}}while(0);l=c[3058]|0;if((l|0)==0){m=d;n=bm(d|0,0)|0;o=d|0;p=c[o>>2]|0;q=p;r=(p|0)<0|0?-1:0;s=1e6;t=0;u=dt(q,r,s,t)|0;v=D;w=d+4|0;x=c[w>>2]|0;y=x;z=(x|0)<0|0?-1:0;A=di(u,v,y,z)|0;B=D;C=11600;E=c[C>>2]|0;F=11604;G=c[F>>2]|0;H=dj(A,B,E,G)|0;I=D;J=12256;K=c[J>>2]|0;L=12260;M=c[L>>2]|0;N=di(H,I,K,M)|0;O=D;P=12256;c[P>>2]=N;Q=12260;c[Q>>2]=O;R=11600;c[R>>2]=A;S=11604;c[S>>2]=B;i=b;return}bW[l&7](0,(+((c[3064]|0)>>>0)+ +(c[3065]|0)*4294967296.0)/(a[624]|0?66666.0:33333.0));cs();m=d;n=bm(d|0,0)|0;o=d|0;p=c[o>>2]|0;q=p;r=(p|0)<0|0?-1:0;s=1e6;t=0;u=dt(q,r,s,t)|0;v=D;w=d+4|0;x=c[w>>2]|0;y=x;z=(x|0)<0|0?-1:0;A=di(u,v,y,z)|0;B=D;C=11600;E=c[C>>2]|0;F=11604;G=c[F>>2]|0;H=dj(A,B,E,G)|0;I=D;J=12256;K=c[J>>2]|0;L=12260;M=c[L>>2]|0;N=di(H,I,K,M)|0;O=D;P=12256;c[P>>2]=N;Q=12260;c[Q>>2]=O;R=11600;c[R>>2]=A;S=11604;c[S>>2]=B;i=b;return}function cv(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;b=i;i=i+296|0;d=b|0;do{if((a|0)!=0){e=df(a|0)|0;if((e|0)<4){break}if((aK(a+(e-4)|0,3856,4)|0)!=0){if((aK(a+(e-4)|0,3848,4)|0)!=0){break}}e=db(24)|0;f=e+12|0;g=e+16|0;h=ba(a|0,9056)|0;L1203:do{if((h|0)==0){dc(0);j=78;k=961}else{bF(h|0,0,2)|0;l=aV(h|0)|0;bJ(h|0);m=db(l)|0;n=(l|0)==0;if(n|(m|0)==0){o=0}else{o=by(m|0,1,l|0,h|0)|0}as(h|0)|0;l=(m|0)!=0|n;n=l?0:83;if(l){c[d+24>>2]=1;c[d+28>>2]=1;c[d+32>>2]=0;dh(d|0,0,24);c[d+36>>2]=2;c[d+40>>2]=1;c[d+44>>2]=2048;c[d+48>>2]=3;c[d+52>>2]=128;c[d+56>>2]=1;c[d+60>>2]=0;c[d+64>>2]=0;c[d+68>>2]=0;c[d+76>>2]=1;c[d+80>>2]=1;c[d+72>>2]=2;c[d+88>>2]=0;c[d+84>>2]=0;c[d+92>>2]=0;c[d+96>>2]=1;l=d+108|0;dh(d+160|0,0,16);dh(l|0,0,24);c[d+144>>2]=6;c[d+148>>2]=8;c[d+152>>2]=0;c[d+156>>2]=0;c[d+140>>2]=0;c[d+132>>2]=0;c[d+136>>2]=0;c[d+252>>2]=0;dh(d+268|0,0,24);dh(d+176|0,0,52);c[d+292>>2]=1;c[d+100>>2]=6;c[d+104>>2]=8;p=cr(e,f,g,d,m,o)|0;q=c[l>>2]|0;if((q|0)!=0){dc(q)}c[l>>2]=0;c[d+112>>2]=0;co(d+132|0);r=p;s=m}else{r=n;s=0}dc(s);if((r|0)==0){c[e+4>>2]=(c[f>>2]|0)/-2|0;c[e+8>>2]=(c[g>>2]|0)/-2|0;c[e+20>>2]=-1;t=e;i=b;return t|0}else{u=r}switch(u|0){case 1:{v=6240;w=u;break L1203;break};case 10:{v=5304;w=u;break L1203;break};case 11:{v=4768;w=u;break L1203;break};case 13:{v=4120;w=u;break L1203;break};case 14:{v=4120;w=u;break L1203;break};case 15:{v=4120;w=u;break L1203;break};case 16:{v=3944;w=u;break L1203;break};case 17:{v=9520;w=u;break L1203;break};case 18:{v=9440;w=u;break L1203;break};case 19:{v=9520;w=u;break L1203;break};case 20:{v=9272;w=u;break L1203;break};case 21:{v=9064;w=u;break L1203;break};case 22:{v=9520;w=u;break L1203;break};case 23:{v=8976;w=u;break L1203;break};case 24:{v=8912;w=u;break L1203;break};case 25:{v=8808;w=u;break L1203;break};case 26:{v=8712;w=u;break L1203;break};case 27:{v=8640;w=u;break L1203;break};case 28:{v=8528;w=u;break L1203;break};case 29:{v=8448;w=u;break L1203;break};case 30:{v=8344;w=u;break L1203;break};case 31:{v=8240;w=u;break L1203;break};case 32:{v=8152;w=u;break L1203;break};case 33:{v=8088;w=u;break L1203;break};case 34:{v=8032;w=u;break L1203;break};case 35:{v=7944;w=u;break L1203;break};case 36:{v=7880;w=u;break L1203;break};case 37:{v=7808;w=u;break L1203;break};case 38:{v=7752;w=u;break L1203;break};case 39:{v=7640;w=u;break L1203;break};case 40:{v=7568;w=u;break L1203;break};case 41:{v=7480;w=u;break L1203;break};case 42:{v=7360;w=u;break L1203;break};case 43:{v=7288;w=u;break L1203;break};case 44:{v=7216;w=u;break L1203;break};case 45:{v=7152;w=u;break L1203;break};case 46:{v=7056;w=u;break L1203;break};case 47:{v=6984;w=u;break L1203;break};case 48:{v=6920;w=u;break L1203;break};case 49:{v=6824;w=u;break L1203;break};case 50:{v=6824;w=u;break L1203;break};case 51:{v=6768;w=u;break L1203;break};case 52:{v=6704;w=u;break L1203;break};case 53:{v=6648;w=u;break L1203;break};case 54:{v=6584;w=u;break L1203;break};case 55:{v=6536;w=u;break L1203;break};case 56:{v=6456;w=u;break L1203;break};case 57:{v=6400;w=u;break L1203;break};case 58:{v=6336;w=u;break L1203;break};case 59:{v=6264;w=u;break L1203;break};case 60:{v=6160;w=u;break L1203;break};case 61:{v=6072;w=u;break L1203;break};case 62:{v=5976;w=u;break L1203;break};case 63:{v=5872;w=u;break L1203;break};case 64:{v=5808;w=u;break L1203;break};case 66:{v=5712;w=u;break L1203;break};case 67:{v=5616;w=u;break L1203;break};case 68:{v=5520;w=u;break L1203;break};case 69:{v=5448;w=u;break L1203;break};case 71:{v=5360;w=u;break L1203;break};case 72:{v=5208;w=u;break L1203;break};case 73:{v=5184;w=u;break L1203;break};case 74:{v=5128;w=u;break L1203;break};case 75:{v=5064;w=u;break L1203;break};case 76:{v=5016;w=u;break L1203;break};case 77:{v=4984;w=u;break L1203;break};case 78:{j=u;k=961;break L1203;break};case 79:{v=4920;w=u;break L1203;break};case 80:{v=4880;w=u;break L1203;break};case 81:{v=4824;w=u;break L1203;break};case 82:{v=4696;w=u;break L1203;break};case 83:{v=4664;w=u;break L1203;break};case 84:{v=4576;w=u;break L1203;break};case 85:{v=4544;w=u;break L1203;break};case 86:{v=4488;w=u;break L1203;break};case 87:{v=4400;w=u;break L1203;break};case 88:{v=4320;w=u;break L1203;break};case 89:{v=4256;w=u;break L1203;break};case 90:{v=4216;w=u;break L1203;break};case 0:{v=6888;w=u;break L1203;break};default:{v=4168;w=u;break L1203}}}}while(0);if((k|0)==961){v=4952;w=j}a_(3800,(x=i,i=i+16|0,c[x>>2]=w,c[x+8>>2]=v,x)|0)|0;i=x;t=0;i=b;return t|0}}while(0);a_(3752,(x=i,i=i+8|0,c[x>>2]=a,x)|0)|0;i=x;t=0;i=b;return t|0}function cw(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0.0,s=0.0,t=0.0;g=a[d]|0;if(g<<24>>24==0){return}h=b+16|0;i=b;j=b+4|0;k=b+12|0;b=e;e=d;d=g;while(1){g=d<<24>>24;if((g|0)<(c[h>>2]|0)){l=c[i>>2]|0;m=c[j>>2]|0;n=(c[l+4>>2]|0)+b|0;o=a[9592]|0?480:0;p=(c[l+8>>2]|0)+f|0;q=o-(c[l+16>>2]|0)-p|0;r=1.0/+(c[l+12>>2]|0);s=+(m|0);t=s*+(g-(c[k>>2]|0)|0)*r;if((c[3060]|0)!=(l|0)){cs();c[3060]=l}cl(c[2896]|0,+(n|0),+(o-p|0),t,+(n+m|0),+(q|0),s*r+t)}q=e+1|0;m=a[q]|0;if(m<<24>>24==0){break}b=(c[j>>2]|0)+b|0;e=q;d=m}return}function cx(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0;j=g-1|0;g=h-1|0;h=0;do{k=c[11120+(h<<2)>>2]|0;l=a+(h<<2)|0;c[l>>2]=((j+k-(c[11056+(h<<2)>>2]|0)|0)>>>0)/(k>>>0)|0;k=c[11088+(h<<2)>>2]|0;m=((g+k-(c[11024+(h<<2)>>2]|0)|0)>>>0)/(k>>>0)|0;k=b+(h<<2)|0;c[k>>2]=m;if((c[l>>2]|0)==0){c[k>>2]=0;n=997}else{if((m|0)==0){n=997}}if((n|0)==997){n=0;c[l>>2]=0}h=h+1|0;}while(h>>>0<7>>>0);c[f>>2]=0;c[e>>2]=0;c[d>>2]=0;h=0;n=0;while(1){g=a+(h<<2)|0;j=c[g>>2]|0;l=b+(h<<2)|0;do{if((j|0)==0){o=0}else{m=c[l>>2]|0;if((m|0)==0){o=0;break}o=$(m,((($(j,i)|0)+7|0)>>>3)+1|0)|0}}while(0);j=h+1|0;m=d+(j<<2)|0;c[m>>2]=o+n;c[e+(j<<2)>>2]=($((($(c[g>>2]|0,i)|0)+7|0)>>>3,c[l>>2]|0)|0)+(c[e+(h<<2)>>2]|0);c[f+(j<<2)>>2]=((($($(c[l>>2]|0,i)|0,c[g>>2]|0)|0)+7|0)>>>3)+(c[f+(h<<2)>>2]|0);if(j>>>0>=7>>>0){break}h=j;n=c[m>>2]|0}return}function cy(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;h=(g+7|0)>>>3;i=(($(g,e)|0)+7|0)>>>3;if((f|0)==0){j=0;return j|0}e=i+1|0;g=(i|0)==0;k=(h|0)==0;l=h>>>0<i>>>0;m=0;n=0;L1341:while(1){o=$(n,i)|0;p=$(n,e)|0;q=b+o|0;r=p+1|0;L1343:do{switch(d[c+p|0]|0|0){case 1:{if(!k){s=0;do{a[b+(s+o)|0]=a[c+(s+r)|0]|0;s=s+1|0;}while(s>>>0<h>>>0)}if(!l){break L1343}s=o-h|0;t=h;do{a[b+(t+o)|0]=(a[b+(s+t)|0]|0)+(a[c+(t+r)|0]|0)&255;t=t+1|0;}while(t>>>0<i>>>0);break};case 0:{if(g){break L1343}else{u=0}do{a[b+(u+o)|0]=a[c+(u+r)|0]|0;u=u+1|0;}while(u>>>0<i>>>0);break};case 2:{if((m|0)==0){if(g){break L1343}else{v=0}do{a[b+(v+o)|0]=a[c+(v+r)|0]|0;v=v+1|0;}while(v>>>0<i>>>0)}else{if(g){break L1343}else{w=0}do{a[b+(w+o)|0]=(a[m+w|0]|0)+(a[c+(w+r)|0]|0)&255;w=w+1|0;}while(w>>>0<i>>>0)}break};case 3:{if((m|0)==0){if(!k){t=0;do{a[b+(t+o)|0]=a[c+(t+r)|0]|0;t=t+1|0;}while(t>>>0<h>>>0)}if(!l){break L1343}t=o-h|0;s=h;do{a[b+(s+o)|0]=((d[b+(t+s)|0]|0)>>>1)+(a[c+(s+r)|0]|0)&255;s=s+1|0;}while(s>>>0<i>>>0)}else{if(!k){s=0;do{a[b+(s+o)|0]=((d[m+s|0]|0)>>>1)+(a[c+(s+r)|0]|0)&255;s=s+1|0;}while(s>>>0<h>>>0)}if(!l){break L1343}s=o-h|0;t=h;do{a[b+(t+o)|0]=(((d[m+t|0]|0)+(d[b+(s+t)|0]|0)|0)>>>1)+(d[c+(t+r)|0]|0)&255;t=t+1|0;}while(t>>>0<i>>>0)}break};case 4:{if((m|0)==0){if(!k){t=0;do{a[b+(t+o)|0]=a[c+(t+r)|0]|0;t=t+1|0;}while(t>>>0<h>>>0)}if(!l){break L1343}t=o-h|0;s=h;while(1){a[b+(s+o)|0]=(a[b+(t+s)|0]|0)+(a[c+(s+r)|0]|0)&255;s=s+1|0;if(s>>>0>=i>>>0){break L1343}}}if(!k){s=0;do{a[b+(s+o)|0]=(a[m+s|0]|0)+(a[c+(s+r)|0]|0)&255;s=s+1|0;}while(s>>>0<h>>>0)}if(l){x=h}else{break L1343}do{s=x-h|0;t=a[b+(s+o)|0]|0;y=a[m+x|0]|0;z=a[m+s|0]|0;s=y&255;A=z&255;B=s-A|0;C=(B|0)>-1?B:-B|0;B=t&255;D=B-A|0;E=(D|0)>-1?D:-D|0;D=s+B+(A*-2|0)|0;A=((D|0)>-1?D:-D|0)<<16>>16;if((A|0)<(C|0)&(A|0)<(E|0)){F=z}else{F=(E|0)<(C|0)?y:t}a[b+(x+o)|0]=F+(a[c+(x+r)|0]|0)&255;x=x+1|0;}while(x>>>0<i>>>0);break};default:{j=36;G=1047;break L1341}}}while(0);r=n+1|0;if(r>>>0<f>>>0){m=q;n=r}else{j=0;G=1048;break}}if((G|0)==1047){return j|0}else if((G|0)==1048){return j|0}return 0}function cz(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;b=a+16|0;d=db(c[b>>2]<<2)|0;e=a+4|0;c[e>>2]=d;f=(d|0)==0;d=f?83:0;g=a+12|0;h=c[g>>2]|0;i=h+1|0;do{if((i&1073741823|0)==0){j=0;k=1052}else{l=db(i<<3)|0;if((l|0)==0){m=0;n=0;o=83;break}j=l;k=1052}}while(0);do{if((k|0)==1052){l=j;if((i|0)!=0){dh(l|0,0,(h<<2)+4|0)}p=c[g>>2]|0;q=p+1|0;if((q&1073741823|0)==0){r=0}else{s=db(q<<3)|0;if((s|0)==0){m=j;n=0;o=83;break}r=s}s=r;if((q|0)!=0){dh(s|0,0,(p<<2)+4|0)}if(f){m=j;n=r;o=d;break}p=c[b>>2]|0;if((p|0)==0){t=0}else{q=c[a+8>>2]|0;u=0;while(1){v=j+(c[q+(u<<2)>>2]<<2)|0;c[v>>2]=(c[v>>2]|0)+1;v=u+1|0;if(v>>>0<p>>>0){u=v}else{t=p;break}}}p=c[g>>2]|0;if((p|0)!=0){u=1;q=c[r>>2]|0;do{q=(c[j+(u-1<<2)>>2]|0)+q<<1;c[r+(u<<2)>>2]=q;u=u+1|0;}while(u>>>0<=p>>>0)}if((t|0)!=0){p=a+8|0;u=0;q=t;while(1){v=c[(c[p>>2]|0)+(u<<2)>>2]|0;if((v|0)==0){w=q}else{x=r+(v<<2)|0;v=c[x>>2]|0;c[x>>2]=v+1;c[(c[e>>2]|0)+(u<<2)>>2]=v;w=c[b>>2]|0}v=u+1|0;if(v>>>0<w>>>0){u=v;q=w}else{break}}}dc(l);dc(s);q=c[b>>2]|0;u=db(q<<3)|0;p=u;v=a|0;c[v>>2]=p;if((u|0)==0){y=83;return y|0}L1443:do{if((q&2147483647|0)==0){z=q}else{c[p>>2]=32767;if(q<<1>>>0>1>>>0){A=1;B=p}else{z=q;break}while(1){c[B+(A<<2)>>2]=32767;u=A+1|0;x=c[b>>2]|0;if(u>>>0>=x<<1>>>0){z=x;break L1443}A=u;B=c[v>>2]|0}}}while(0);if((z|0)==0){y=0;return y|0}q=a+8|0;p=0;s=0;l=0;u=c[q>>2]|0;x=z;L1452:while(1){C=c[u+(l<<2)>>2]|0;if((C|0)==0){D=p;E=s;F=u;G=x}else{H=p;I=s;J=0;K=C;C=x;while(1){if(I>>>0>(C-2|0)>>>0){y=55;k=1096;break L1452}L=(c[v>>2]|0)+(((c[(c[e>>2]|0)+(l<<2)>>2]|0)>>>((K+~J|0)>>>0)&1|I<<1)<<2)|0;M=c[L>>2]|0;do{if((M|0)==32767){N=J+1|0;if((N|0)==(K|0)){c[L>>2]=l;O=0;P=H;Q=K;break}else{R=H+1|0;c[L>>2]=R+C;O=R;P=R;Q=N;break}}else{O=M-C|0;P=H;Q=J+1|0}}while(0);M=c[q>>2]|0;L=c[M+(l<<2)>>2]|0;N=c[b>>2]|0;if(Q>>>0<L>>>0){H=P;I=O;J=Q;K=L;C=N}else{D=P;E=O;F=M;G=N;break}}}C=l+1|0;if(C>>>0<G>>>0){p=D;s=E;l=C;u=F;x=G}else{break}}if((k|0)==1096){return y|0}if((G&2147483647|0)==0){y=0;return y|0}else{S=0;T=G}while(1){x=(c[v>>2]|0)+(S<<2)|0;if((c[x>>2]|0)==32767){c[x>>2]=0;U=c[b>>2]|0}else{U=T}x=S+1|0;if(x>>>0<U<<1>>>0){S=x;T=U}else{y=0;break}}return y|0}}while(0);dc(m);dc(n);y=o;return y|0}function cA(a,e,f){a=a|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;a=(f|0)/4|0;dh(e|0,0,f|0);f=c[3062]|0;if((f|0)==0){return}g=e;e=f;f=0;L1483:while(1){h=f+12|0;L1485:do{if((f|0)==0){i=e|0;j=c[i>>2]|0;if((j|0)!=0){k=e;l=i;m=j;n=1106;break}j=e+12|0;i=c[j>>2]|0;c[j>>2]=c[3052];c[3052]=e;c[3062]=i;o=0;p=i}else{i=e;while(1){j=i|0;q=c[j>>2]|0;if((q|0)!=0){k=i;l=j;m=q;n=1106;break L1485}q=i+12|0;j=c[q>>2]|0;c[q>>2]=c[3052];c[3052]=i;c[h>>2]=j;if((j|0)==0){n=1126;break L1483}else{i=j}}}}while(0);if((n|0)==1106){n=0;h=k+4|0;i=c[h>>2]|0;j=(c[m+20>>2]|0)+(i<<1)|0;q=(c[m+16>>2]|0)-i|0;if((q|0)>(a|0)){r=a}else{c[l>>2]=0;r=q}if((r|0)>0){q=k+9|0;s=k+8|0;t=j;j=0;u=g;while(1){v=(($(d[q]|0,b[t>>1]|0)|0)>>8)+(b[u>>1]|0)|0;do{if((v|0)>16384){b[u>>1]=16384}else{if((v|0)<-16384){b[u>>1]=-16384;break}else{b[u>>1]=v&65535;break}}}while(0);v=u+2|0;w=(($(d[s]|0,b[t>>1]|0)|0)>>8)+(b[v>>1]|0)|0;do{if((w|0)>16384){b[v>>1]=16384}else{if((w|0)<-16384){b[v>>1]=-16384;break}else{b[v>>1]=w&65535;break}}}while(0);w=j+1|0;if((w|0)<(r|0)){t=t+2|0;j=w;u=u+4|0}else{break}}x=c[h>>2]|0}else{x=i}c[h>>2]=x+r;o=k;p=c[k+12>>2]|0}if((p|0)==0){n=1127;break}else{e=p;f=o}}if((n|0)==1126){return}else if((n|0)==1127){return}}function cB(a){a=a|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;d=i;i=i+56|0;e=d+8|0;f=d+16|0;g=d+24|0;h=d+32|0;j=d+40|0;k=d+48|0;l=d|0;dh(l|0,0,5);m=ba(a|0,9056)|0;if((m|0)==0){a2(352)|0;n=0;i=d;return n|0}by(l|0,4,1,m|0)|0;if((aI(l|0,5176)|0)!=0){a2(264)|0;as(m|0)|0;n=0;i=d;return n|0}bF(m|0,4,1)|0;by(l|0,4,1,m|0)|0;if((aI(l|0,4096)|0)!=0){a2(184)|0;as(m|0)|0;n=0;i=d;return n|0}by(l|0,1,4,m|0)|0;by(h|0,1,4,m|0)|0;a=c[h>>2]|0;if((a|0)<14){a2(128)|0;as(m|0)|0;n=0;i=d;return n|0}by(e|0,1,2,m|0)|0;if((b[e>>1]|0)!=1){a2(48)|0;as(m|0)|0;n=0;i=d;return n|0}by(f|0,1,2,m|0)|0;by(j|0,1,4,m|0)|0;bF(m|0,2,1)|0;bF(m|0,2,1)|0;by(g|0,1,2,m|0)|0;bF(m|0,a-14|0,1)|0;a=c[j>>2]|0;j=b[f>>1]|0;f=b[g>>1]|0;do{if((a|0)==44100&j<<16>>16==1){if(f<<16>>16!=2){o=1;p=f;break}L1545:do{if((by(l|0,1,4,m|0)|0)>=4){g=k;do{if((aI(l|0,9048)|0)==0){break L1545}by(g|0,1,4,m|0)|0;bF(m|0,c[k>>2]|0,1)|0;}while((by(l|0,1,4,m|0)|0)>=4)}}while(0);if((aI(l|0,9048)|0)==0){g=k;by(g|0,1,4,m|0)|0;g=c[k>>2]|0;e=db(g)|0;by(e|0,g|0,1,m|0)|0;as(m|0)|0;h=db(28)|0;c[h>>2]=44100;c[h+4>>2]=1;c[h+20>>2]=e;c[h+12>>2]=2;c[h+8>>2]=0;c[h+16>>2]=(g|0)/2|0;c[h+24>>2]=c[2890];c[2890]=h;n=h;i=d;return n|0}else{a2(8)|0;as(m|0)|0;n=0;i=d;return n|0}}else{o=j<<16>>16;p=f}}while(0);a_(9168,(f=i,i=i+24|0,c[f>>2]=a,c[f+8>>2]=o,c[f+16>>2]=p<<16>>16,f)|0)|0;i=f;as(m|0)|0;n=0;i=d;return n|0}function cC(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0.0,o=0.0,p=0.0;f=c[b>>2]|0;if((f|0)!=0){g=c[f>>2]|0;h=c[f+4>>2]|0;i=g;j=(c[g+4>>2]|0)+d|0;k=a[9592]|0?480:0;l=(c[g+8>>2]|0)+e|0;m=k-(c[g+16>>2]|0)-l|0;n=1.0/+(c[g+12>>2]|0);o=+(h|0);p=o*+(((c[b+12>>2]|0)/(c[f+16>>2]|0)|0|0)%(c[f+12>>2]|0)|0|0)*n;if((c[3060]|0)!=(i|0)){cs();c[3060]=i}cl(c[2896]|0,+(j|0),+(k-l|0),p,+(j+h|0),+(m|0),o*n+p);return}m=c[b+4>>2]|0;if((m|0)==0){return}b=m;h=(c[m+4>>2]|0)+d|0;d=(a[9592]|0?480:0)-((c[m+8>>2]|0)+e)|0;p=+((c[m+12>>2]|0)+h|0);n=+(d-(c[m+16>>2]|0)|0);if((c[3060]|0)!=(b|0)){cs();c[3060]=b}cl(c[2896]|0,+(h|0),+(d|0),0.0,p,n,1.0);return}function cD(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0.0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0,D=0.0,E=0.0;b=c[3048]|0;if((b|0)==0){d=db(216)|0}else{c[3048]=c[b+212>>2];d=b}b=d+4|0;c[b>>2]=0;e=d+32|0;dh(d+16|0,0,16);c[e>>2]=9;f=d+36|0;c[f>>2]=1;h=d+40|0;i=d+68|0;dh(h|0,0,20);g[i>>2]=1.0;j=d+72|0;g[j>>2]=1.0;k=d+76|0;g[k>>2]=1.0;l=d+80|0;g[l>>2]=1.0;m=d+84|0;n=d+116|0;c[n>>2]=0;o=d+132|0;dh(m|0,0,28);g[o>>2]=1.0;p=d+128|0;g[p>>2]=1.0;q=d+124|0;g[q>>2]=1.0;r=d+120|0;g[r>>2]=1.0;s=d+148|0;g[s>>2]=1.0;t=d+144|0;g[t>>2]=1.0;u=d+140|0;g[u>>2]=1.0;v=d+136|0;g[v>>2]=1.0;w=d+152|0;c[d+212>>2]=0;dh(w|0,0,44);c[d>>2]=a;c[b>>2]=c[a+4>>2];x=+g[a+24>>2];g[d+24>>2]=x;y=+g[a+28>>2];g[d+28>>2]=y;c[e>>2]=c[a+32>>2];c[f>>2]=c[a+36>>2];g[h>>2]=+g[a+40>>2];z=+g[a+52>>2];g[d+52>>2]=z;A=+g[a+56>>2];g[d+56>>2]=A;B=+g[a+68>>2];g[i>>2]=B;C=+g[a+72>>2];g[j>>2]=C;D=+g[a+76>>2];g[k>>2]=D;g[l>>2]=+g[a+80>>2];g[m>>2]=+g[a+84>>2];g[d+88>>2]=+g[a+88>>2];g[d+92>>2]=+g[a+92>>2];g[d+96>>2]=+g[a+96>>2];g[d+100>>2]=+g[a+100>>2];c[d+108>>2]=c[a+108>>2];c[d+104>>2]=c[a+104>>2];c[n>>2]=c[a+116>>2];g[r>>2]=+g[a+120>>2];g[q>>2]=+g[a+124>>2];g[p>>2]=+g[a+128>>2];g[o>>2]=+g[a+132>>2];g[v>>2]=+g[a+136>>2];g[u>>2]=+g[a+140>>2];g[t>>2]=+g[a+144>>2];g[s>>2]=+g[a+148>>2];s=c[a+152>>2]|0;c[w>>2]=s;c[d+156>>2]=c[a+156>>2];c[d+160>>2]=c[a+160>>2];c[d+164>>2]=c[a+164>>2];c[d+168>>2]=c[a+168>>2];c[d+172>>2]=c[a+172>>2];c[d+176>>2]=c[a+176>>2];c[d+180>>2]=c[a+180>>2];c[d+184>>2]=c[a+184>>2];c[d+188>>2]=c[a+188>>2];c[d+192>>2]=c[a+192>>2];E=(D>B?D:B)*.5+10.0;D=(C>B?C:B)*.5+10.0;B=z+x;if(z>0.0){g[d+196>>2]=B+D;g[d+200>>2]=x-D}else{g[d+200>>2]=B-D;g[d+196>>2]=x+D}D=A+y;if(A>0.0){g[d+204>>2]=E+D;g[d+208>>2]=y-E}else{g[d+208>>2]=D-E;g[d+204>>2]=E+y}if((s|0)==0){return d|0}bY[s&15](d);return d|0}function cE(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0.0,p=0.0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0.0,H=0,I=0,J=0,K=0,L=0,M=0.0,N=0.0,O=0.0,Q=0.0,R=0.0,S=0.0,T=0.0,U=0.0,V=0.0,W=0.0,X=0.0,Y=0,Z=0,_=0,$=0,aa=0;e=i;i=i+48|0;f=e|0;h=e+8|0;j=e+16|0;k=e+24|0;l=e+32|0;m=e+40|0;n=(c[b+32>>2]|c[a+32>>2])&6;if((n|0)==2){o=+g[a+80>>2];p=+g[b+80>>2];do{if(o<=0.0&p>0.0){q=a;r=b}else{if(p<=0.0&o>0.0){q=b;r=a;break}else{s=0}i=e;return s|0}}while(0);t=h|0;g[t>>2]=0.0;u=h+4|0;g[u>>2]=-1.0;o=(+g[r+76>>2]+ +g[q+76>>2])*.5;v=j|0;g[v>>2]=+g[q+24>>2]+o*0.0;g[j+4>>2]=+g[q+28>>2]+o*-1.0;if((ck(r+24|0,r+52|0,t,v,+g[q+72>>2]+ +g[r+72>>2],f)|0)==0){s=0;i=e;return s|0}o=+g[f>>2];if((d|0)==0){s=1;i=e;return s|0}v=c[d>>2]|0;j=c[3050]|0;if((j|0)==0){w=db(32)|0}else{c[3050]=c[j+28>>2];w=j}j=w+28|0;c[j>>2]=0;c[w>>2]=2;c[w+4>>2]=r;c[w+8>>2]=q;g[w+12>>2]=o;g[w+16>>2]=+g[t>>2];g[w+20>>2]=+g[u>>2];c[w+24>>2]=1;do{if((v|0)==0){x=0;y=1196}else{u=v;t=0;while(1){if(+g[u+12>>2]>=o){z=u;A=t;break}q=c[u+28>>2]|0;if((q|0)==0){z=0;A=u;break}else{t=u;u=q}}if((A|0)==0){x=z;y=1196;break}c[A+28>>2]=w;B=z}}while(0);if((y|0)==1196){c[d>>2]=w;B=x}c[j>>2]=B;s=1;i=e;return s|0}else if((n|0)==4){o=+g[a+80>>2];p=+g[b+80>>2];do{if(o<=0.0&p>0.0){C=a;D=b}else{if(p<=0.0&o>0.0){C=b;D=a;break}else{s=0}i=e;return s|0}}while(0);g[f>>2]=1.0;n=l|0;g[n>>2]=0.0;B=l+4|0;g[B>>2]=-1.0;l=D+76|0;j=C+76|0;o=(+g[l>>2]+ +g[j>>2])*.5;x=C+24|0;w=m|0;g[w>>2]=+g[x>>2]+o*0.0;z=C+28|0;A=m+4|0;g[A>>2]=+g[z>>2]+o*-1.0;m=C+72|0;v=D+72|0;u=D+24|0;t=D+52|0;do{if((ck(u,t,n,w,+g[m>>2]+ +g[v>>2],k)|0)!=0){o=+g[k>>2];if(o>=+g[f>>2]){break}g[h>>2]=+g[n>>2];g[h+4>>2]=+g[B>>2];g[f>>2]=o}}while(0);g[n>>2]=0.0;g[B>>2]=1.0;o=(+g[l>>2]+ +g[j>>2])*.5;g[w>>2]=+g[x>>2]+o*0.0;g[A>>2]=+g[z>>2]+o;do{if((ck(u,t,n,w,+g[m>>2]+ +g[v>>2],k)|0)!=0){o=+g[k>>2];if(o>=+g[f>>2]){break}g[h>>2]=+g[n>>2];g[h+4>>2]=+g[B>>2];g[f>>2]=o}}while(0);g[n>>2]=1.0;g[B>>2]=0.0;o=(+g[v>>2]+ +g[m>>2])*.5;g[w>>2]=+g[x>>2]+o;g[A>>2]=+g[z>>2]+o*0.0;do{if((ck(u,t,n,w,+g[j>>2]+ +g[l>>2],k)|0)==0){E=1}else{o=+g[k>>2];if(o>=+g[f>>2]){E=1;break}g[h>>2]=+g[n>>2];g[h+4>>2]=+g[B>>2];g[f>>2]=o;E=0}}while(0);g[n>>2]=-1.0;g[B>>2]=0.0;o=(+g[v>>2]+ +g[m>>2])*.5;g[w>>2]=+g[x>>2]+o*-1.0;g[A>>2]=+g[z>>2]+o*0.0;do{if((ck(u,t,n,w,+g[j>>2]+ +g[l>>2],k)|0)==0){F=E;G=+g[f>>2]}else{o=+g[k>>2];p=+g[f>>2];if(o>=p){F=E;G=p;break}g[h>>2]=+g[n>>2];g[h+4>>2]=+g[B>>2];g[f>>2]=o;F=0;G=o}}while(0);if(G>=1.0){s=0;i=e;return s|0}if((d|0)==0){s=1;i=e;return s|0}B=c[d>>2]|0;n=c[3050]|0;if((n|0)==0){H=db(32)|0}else{c[3050]=c[n+28>>2];H=n}n=H+28|0;c[n>>2]=0;c[H>>2]=2;c[H+4>>2]=D;c[H+8>>2]=C;g[H+12>>2]=G;g[H+16>>2]=+g[h>>2];g[H+20>>2]=+g[h+4>>2];c[H+24>>2]=F;do{if((B|0)==0){I=0;y=1223}else{F=B;C=0;while(1){if(+g[F+12>>2]>=G){J=F;K=C;break}D=c[F+28>>2]|0;if((D|0)==0){J=0;K=F;break}else{C=F;F=D}}if((K|0)==0){I=J;y=1223;break}c[K+28>>2]=H;L=J}}while(0);if((y|0)==1223){c[d>>2]=H;L=I}c[n>>2]=L;s=1;i=e;return s|0}else{G=+g[a+52>>2]- +g[b+52>>2];o=+g[a+56>>2]- +g[b+56>>2];L=h|0;p=+g[a+68>>2]+ +g[b+68>>2];M=+g[a+24>>2];N=M-p;O=p+M;if(G>0.0){Q=N;R=O+G}else{Q=N+G;R=O}O=+g[b+24>>2];if(O<Q|O>R){s=0;i=e;return s|0}R=+g[a+28>>2];Q=R-p;N=p+R;if(o>0.0){S=Q;T=N+o}else{S=Q+o;T=N}N=+g[b+28>>2];if(N<S|N>T){s=0;i=e;return s|0}T=1.0/p;p=T*G;S=T*o;Q=p*p+S*S;if(Q==0.0){s=0;i=e;return s|0}U=T*M-T*O;V=T*R-N*T;W=(S*V+p*U)*2.0;p=W*W-Q*4.0*(V*V+U*U+-1.0);if(p<0.0){s=0;i=e;return s|0}U=Q*2.0;if(U==0.0){s=0;i=e;return s|0}Q=+P(p);p=(-0.0-W-Q)/U;V=(Q-W)/U;if(p<-0.0){y=1239}else{if(p<V&p<=1.0){X=p}else{y=1239}}do{if((y|0)==1239){if(V<-0.0){s=0;i=e;return s|0}if(p>V&V<=1.0){X=V;break}else{s=0}i=e;return s|0}}while(0);g[f>>2]=X;V=T*(X*G+M-O);g[L>>2]=V;O=T*(X*o+R-N);g[h+4>>2]=O;if((d|0)==0){s=1;i=e;return s|0}h=c[d>>2]|0;L=c[3050]|0;if((L|0)==0){Y=db(32)|0}else{c[3050]=c[L+28>>2];Y=L}L=Y+28|0;c[L>>2]=0;c[Y>>2]=1;c[Y+4>>2]=a;c[Y+8>>2]=b;g[Y+12>>2]=X;g[Y+16>>2]=V;g[Y+20>>2]=O;c[Y+24>>2]=0;do{if((h|0)==0){Z=0;y=1249}else{b=h;a=0;while(1){if(+g[b+12>>2]>=X){_=b;$=a;break}f=c[b+28>>2]|0;if((f|0)==0){_=0;$=b;break}else{a=b;b=f}}if(($|0)==0){Z=_;y=1249;break}c[$+28>>2]=Y;aa=_}}while(0);if((y|0)==1249){c[d>>2]=Y;aa=Z}c[L>>2]=aa;s=1;i=e;return s|0}return 0}function cF(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;var e=0,f=0.0,h=0,i=0.0,j=0.0,k=0,l=0.0,m=0.0,n=0.0,o=0.0,p=0,q=0,r=0,s=0.0;c=+g[a+80>>2];do{if(c>0.0){e=b+80|0;f=+g[e>>2];if(f<=0.0){if(f>0.0){break}h=a+52|0;i=+g[h>>2];j=+g[d>>2];k=a+56|0;l=+g[k>>2];m=+g[d+4>>2];n=(+g[a+84>>2]+1.0)*(i*j+l*m);o=i-j*n;g[h>>2]=o;j=l-m*n;g[k>>2]=j;n=+g[a+76>>2];m=+g[a+68>>2];l=(n>m?n:m)*.5+10.0;n=+g[a+72>>2];i=(n>m?n:m)*.5+10.0;m=+g[a+24>>2];n=o+m;if(o>0.0){g[a+196>>2]=n+i;g[a+200>>2]=m-i}else{g[a+200>>2]=n-i;g[a+196>>2]=m+i}i=+g[a+28>>2];m=j+i;if(j>0.0){g[a+204>>2]=l+m;g[a+208>>2]=i-l;return}else{g[a+208>>2]=m-l;g[a+204>>2]=l+i;return}}i=c+f;k=a+52|0;l=+g[k>>2];m=+g[d>>2];h=a+56|0;j=+g[h>>2];p=d+4|0;n=+g[p>>2];o=+O(+(l*m+j*n));q=b+52|0;r=b+56|0;s=f*c*((c*+g[a+84>>2]+f*+g[b+84>>2])/i+1.0)*(o+ +O(+(m*+g[q>>2]+n*+g[r>>2])))/i;i=s/c;o=l-m*i;g[k>>2]=o;m=j-n*i;g[h>>2]=m;i=+g[a+76>>2];n=+g[a+68>>2];j=(i>n?i:n)*.5+10.0;i=+g[a+72>>2];l=(i>n?i:n)*.5+10.0;n=+g[a+24>>2];i=o+n;if(o>0.0){g[a+196>>2]=i+l;g[a+200>>2]=n-l}else{g[a+200>>2]=i-l;g[a+196>>2]=n+l}l=+g[a+28>>2];n=m+l;if(m>0.0){g[a+204>>2]=j+n;g[a+208>>2]=l-j}else{g[a+208>>2]=n-j;g[a+204>>2]=j+l}l=s/+g[e>>2];s=l*+g[p>>2];j=+g[d>>2]*l+ +g[q>>2];g[q>>2]=j;l=s+ +g[r>>2];g[r>>2]=l;s=+g[b+76>>2];n=+g[b+68>>2];m=(s>n?s:n)*.5+10.0;s=+g[b+72>>2];i=(s>n?s:n)*.5+10.0;n=+g[b+24>>2];s=j+n;if(j>0.0){g[b+196>>2]=s+i;g[b+200>>2]=n-i}else{g[b+200>>2]=s-i;g[b+196>>2]=n+i}i=+g[b+28>>2];n=l+i;if(l>0.0){g[b+204>>2]=m+n;g[b+208>>2]=i-m;return}else{g[b+208>>2]=n-m;g[b+204>>2]=m+i;return}}}while(0);do{if(c<=0.0){if(+g[b+80>>2]<=0.0){break}r=b+52|0;i=+g[r>>2];m=+g[d>>2];q=b+56|0;n=+g[q>>2];l=+g[d+4>>2];s=(+g[b+84>>2]+1.0)*(i*m+n*l);j=i+m*s;g[r>>2]=j;m=n+l*s;g[q>>2]=m;s=+g[b+76>>2];l=+g[b+68>>2];n=(s>l?s:l)*.5+10.0;s=+g[b+72>>2];i=(s>l?s:l)*.5+10.0;l=+g[b+24>>2];s=j+l;if(j>0.0){g[b+196>>2]=s+i;g[b+200>>2]=l-i}else{g[b+200>>2]=s-i;g[b+196>>2]=l+i}i=+g[b+28>>2];l=m+i;if(m>0.0){g[b+204>>2]=n+l;g[b+208>>2]=i-n;return}else{g[b+208>>2]=l-n;g[b+204>>2]=n+i;return}}}while(0);g[a+52>>2]=0.0;g[a+56>>2]=0.0;c=+g[a+76>>2];i=+g[a+68>>2];n=(c>i?c:i)*.5+10.0;c=+g[a+72>>2];l=(c>i?c:i)*.5+10.0;i=+g[a+24>>2];g[a+200>>2]=i+0.0-l;g[a+196>>2]=i+l;l=+g[a+28>>2];g[a+208>>2]=l+0.0-n;g[a+204>>2]=n+l;g[b+52>>2]=0.0;g[b+56>>2]=0.0;l=+g[b+76>>2];n=+g[b+68>>2];i=(l>n?l:n)*.5+10.0;l=+g[b+72>>2];c=(l>n?l:n)*.5+10.0;n=+g[b+24>>2];g[b+200>>2]=n+0.0-c;g[b+196>>2]=n+c;c=+g[b+28>>2];g[b+208>>2]=c+0.0-i;g[b+204>>2]=i+c;return}function cG(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0.0,f=0.0,h=0.0,i=0,j=0,k=0.0,l=0.0,m=0.0,n=0.0;e=+P(b*b+c*c);f=1.0/e;h=f*b;b=f*c;i=a+52|0;c=+g[i>>2];j=a+56|0;f=+g[j>>2];k=c*h+b*f;if(k<d){l=d-k;k=l>e?e:l;l=c+h*k;g[i>>2]=l;h=b*k+f;g[j>>2]=h;m=l;n=h}else{m=c;n=f}f=+g[a+76>>2];c=+g[a+68>>2];h=(f>c?f:c)*.5+10.0;f=+g[a+72>>2];l=(f>c?f:c)*.5+10.0;c=+g[a+24>>2];f=m+c;if(m>0.0){g[a+196>>2]=f+l;g[a+200>>2]=c-l}else{g[a+200>>2]=f-l;g[a+196>>2]=c+l}l=+g[a+28>>2];c=n+l;if(n>0.0){g[a+204>>2]=h+c;g[a+208>>2]=l-h;return}else{g[a+208>>2]=c-h;g[a+204>>2]=h+l;return}}function cH(a){a=a|0;var b=0,d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0;b=c[2904]|0;d=c[2902]|0;if((b|0)<(d|0)){e=b;f=c[3056]|0;h=b;i=c[3054]|0}else{j=(d|0)==0?32:d<<1;c[2902]=j;d=j<<2;j=db(d)|0;k=db(d)|0;d=c[3056]|0;do{if((b|0)>0){l=c[3054]|0;m=0;while(1){c[j+(m<<2)>>2]=c[d+(m<<2)>>2];c[k+(m<<2)>>2]=c[l+(m<<2)>>2];n=m+1|0;if((n|0)<(b|0)){m=n}else{o=1326;break}}}else{if((d|0)!=0){o=1326;break}p=b;q=c[2904]|0}}while(0);if((o|0)==1326){dc(d);dc(c[3054]|0);d=c[2904]|0;p=d;q=d}c[3056]=j;c[3054]=k;e=p;f=j;h=q;i=k}c[f+(e<<2)>>2]=a;c[i+(h<<2)>>2]=1;i=h+1|0;c[2904]=i;h=a+32|0;e=c[h>>2]|0;do{if((e&16|0)==0){c[h>>2]=e|32;r=a+24|0}else{k=a+24|0;s=+g[k>>2];t=+g[a+8>>2];q=s<t;u=+g[a+148>>2];v=(q?s:t)-u;w=u+(q?t:s);s=+g[a+28>>2];t=+g[a+12>>2];q=s<t;x=(q?s:t)-u;y=u+(q?t:s);if((i|0)>0){z=0}else{r=k;break}while(1){q=c[f+(z<<2)>>2]|0;s=+g[q+24>>2];do{if(!(v>s|w<s)){t=+g[q+28>>2];if(x>t|y<t){break}j=q+32|0;c[j>>2]=c[j>>2]|32}}while(0);q=z+1|0;if((q|0)<(i|0)){z=q}else{r=k;break}}}}while(0);y=+g[a+76>>2];x=+g[a+68>>2];w=(y>x?y:x)*.5+10.0;y=+g[a+72>>2];v=(y>x?y:x)*.5+10.0;x=+g[a+52>>2];y=+g[r>>2];s=x+y;if(x>0.0){g[a+196>>2]=s+v;g[a+200>>2]=y-v}else{g[a+200>>2]=s-v;g[a+196>>2]=v+y}y=+g[a+56>>2];v=+g[a+28>>2];s=y+v;if(y>0.0){g[a+204>>2]=w+s;g[a+208>>2]=v-w;return}else{g[a+208>>2]=s-w;g[a+204>>2]=w+v;return}}function cI(b){b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0.0,o=0.0,p=0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0,w=0;d=c[2904]|0;e=c[3056]|0;f=0;while(1){if((f|0)>=(d|0)){h=0;i=1364;break}j=e+(f<<2)|0;if((c[j>>2]|0)==(b|0)){break}else{f=f+1|0}}if((i|0)==1364){return h|0}i=a[9616]|0;if(i){k=c[3054]|0;c[k+(f<<2)>>2]=-2;l=k}else{c[j>>2]=0;k=c[3054]|0;c[k+(f<<2)>>2]=0;l=k}a[9624]=1;k=b+32|0;m=c[k>>2]|0;do{if((m&16|0)==0){c[k>>2]=m|32}else{n=+g[b+24>>2];o=+g[b+8>>2];p=n<o;q=+g[b+148>>2];r=(p?n:o)-q;s=q+(p?o:n);n=+g[b+28>>2];o=+g[b+12>>2];p=n<o;t=(p?n:o)-q;u=q+(p?o:n);if((d|0)>0){v=0}else{break}do{p=c[e+(v<<2)>>2]|0;n=+g[p+24>>2];do{if(!(r>n|s<n)){o=+g[p+28>>2];if(t>o|u<o){break}w=p+32|0;c[w>>2]=c[w>>2]|32}}while(0);v=v+1|0;}while((v|0)<(d|0))}}while(0);if((f|0)==-1){h=0;return h|0}if(i){c[j>>2]=b;c[l+(f<<2)>>2]=-1;h=1;return h|0}f=c[b+156>>2]|0;if((f|0)!=0){bY[f&15](b)}c[b+212>>2]=c[3048];c[3048]=b;h=1;return h|0}function cJ(b){b=b|0;var d=0,e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,Q=0,R=0,S=0,T=0.0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0.0,af=0.0,ag=0.0,ah=0.0,ai=0.0,aj=0.0,ak=0.0,al=0.0,am=0.0,an=0.0,ao=0.0,ap=0.0,aq=0.0,ar=0.0,as=0.0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0.0,aZ=0.0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0;b=i;i=i+88|0;d=b|0;e=b+8|0;f=b+16|0;h=b+24|0;j=b+32|0;k=b+40|0;l=b+48|0;m=b+56|0;n=b+64|0;o=b+72|0;p=b+80|0;c[3046]=c[3042];c[3044]=c[3040];bm(o|0,0)|0;q=c[o>>2]|0;r=dt(q,(q|0)<0|0?-1:0,1e6,0)|0;q=c[o+4>>2]|0;o=di(r,D,q,(q|0)<0|0?-1:0)|0;q=D;r=c[2904]|0;if(a[9624]|0){if((r|0)>0){s=0;t=0;u=r;while(1){v=c[3056]|0;w=c[v+(s<<2)>>2]|0;do{if((w|0)==0){x=t;y=u}else{z=c[3054]|0;A=z+(s<<2)|0;B=c[A>>2]|0;if((B|0)==(-1|0)){C=c[w+156>>2]|0;if((C|0)==0){E=u}else{bY[C&15](w);E=c[2904]|0}c[w+212>>2]=c[3048];c[3048]=w;x=t;y=E;break}else if((B|0)==(-2|0)){x=t;y=u;break}else{if((s|0)>(t|0)){c[v+(t<<2)>>2]=w;c[z+(t<<2)>>2]=c[A>>2]}x=t+1|0;y=u;break}}}while(0);w=s+1|0;if((w|0)<(y|0)){s=w;t=x;u=y}else{F=x;break}}}else{F=0}c[2904]=F;a[9624]=0;a[9616]=0;G=F}else{G=r}a[9616]=1;do{if((G|0)>0){r=0;F=G;while(1){x=c[(c[3056]|0)+(r<<2)>>2]|0;do{if((x|0)==0){H=F}else{y=a[9584]|0;u=x+32|0;c[u>>2]=c[u>>2]&-65;u=c[x+160>>2]|0;if((u|0)==0){H=F;break}bZ[u&31](x,y?66:0);H=c[2904]|0}}while(0);x=r+1|0;if((x|0)<(H|0)){r=x;F=H}else{break}}if(!(a[9624]|0)){break}if((H|0)>0){F=0;r=0;x=H;while(1){y=c[3056]|0;u=c[y+(F<<2)>>2]|0;do{if((u|0)==0){I=r;J=x}else{t=c[3054]|0;s=t+(F<<2)|0;E=c[s>>2]|0;if((E|0)==(-2|0)){I=r;J=x;break}else if((E|0)==(-1|0)){E=c[u+156>>2]|0;if((E|0)==0){K=x}else{bY[E&15](u);K=c[2904]|0}c[u+212>>2]=c[3048];c[3048]=u;I=r;J=K;break}else{if((F|0)>(r|0)){c[y+(r<<2)>>2]=u;c[t+(r<<2)>>2]=c[s>>2]}I=r+1|0;J=x;break}}}while(0);u=F+1|0;if((u|0)<(J|0)){F=u;r=I;x=J}else{L=I;break}}}else{L=0}c[2904]=L;a[9624]=0;a[9616]=0}}while(0);bm(n|0,0)|0;L=c[n>>2]|0;I=dt(L,(L|0)<0|0?-1:0,1e6,0)|0;L=c[n+4>>2]|0;n=di(I,D,L,(L|0)<0|0?-1:0)|0;L=dj(n,D,o,q)|0;q=di(L,D,c[2790]|0,c[2791]|0)|0;c[2790]=q;c[2791]=D;bm(m|0,0)|0;q=c[m>>2]|0;L=dt(q,(q|0)<0|0?-1:0,1e6,0)|0;q=c[m+4>>2]|0;m=di(L,D,q,(q|0)<0|0?-1:0)|0;q=D;if(a[9624]|0){L=c[2904]|0;if((L|0)>0){o=0;n=0;I=L;while(1){L=c[3056]|0;J=c[L+(o<<2)>>2]|0;do{if((J|0)==0){M=n;N=I}else{K=c[3054]|0;H=K+(o<<2)|0;G=c[H>>2]|0;if((G|0)==(-2|0)){M=n;N=I;break}else if((G|0)==(-1|0)){G=c[J+156>>2]|0;if((G|0)==0){Q=I}else{bY[G&15](J);Q=c[2904]|0}c[J+212>>2]=c[3048];c[3048]=J;M=n;N=Q;break}else{if((o|0)>(n|0)){c[L+(n<<2)>>2]=J;c[K+(n<<2)>>2]=c[H>>2]}M=n+1|0;N=I;break}}}while(0);J=o+1|0;if((J|0)<(N|0)){o=J;n=M;I=N}else{R=M;break}}}else{R=0}c[2904]=R;a[9624]=0;a[9616]=0}a[9616]=1;R=j|0;M=j+4|0;j=k|0;N=k+4|0;k=1;while(1){c[p>>2]=0;I=c[2904]|0;L1902:do{if((I|0)>0){n=0;o=I;while(1){Q=c[3056]|0;J=c[Q+(n<<2)>>2]|0;L1905:do{if((c[J+32>>2]&1|0)==0){S=o}else{if(+g[J+80>>2]<0.0){S=o;break}T=+g[J+52>>2];if(T>0.0|T<-0.0){if((o|0)>0){U=0;V=Q;W=o}else{S=o;break}}else{T=+g[J+56>>2];if((T>0.0|T<-0.0)&(o|0)>0){U=0;V=Q;W=o}else{S=o;break}}while(1){L=c[V+(U<<2)>>2]|0;L1913:do{if((c[L+32>>2]&1|0)==0){X=W}else{H=c[V+(n<<2)>>2]|0;if(+g[H+196>>2]<+g[L+200>>2]){X=W;break}if(+g[H+200>>2]>+g[L+196>>2]){X=W;break}if(+g[H+204>>2]<+g[L+208>>2]){X=W;break}if(+g[H+208>>2]>+g[L+204>>2]){X=W;break}K=c[p>>2]|0;if((K|0)!=0){G=K;do{K=c[G+4>>2]|0;if((K|0)==(H|0)){if((c[G+8>>2]|0)==(L|0)){X=W;break L1913}}if((K|0)==(L|0)){if((c[G+8>>2]|0)==(H|0)){X=W;break L1913}}G=c[G+28>>2]|0;}while((G|0)!=0)}cE(H,L,p)|0;X=c[2904]|0}}while(0);L=U+1|0;if((L|0)>=(X|0)){S=X;break L1905}U=L;V=c[3056]|0;W=X}}}while(0);Q=n+1|0;if((Q|0)<(S|0)){n=Q;o=S}else{break}}o=c[p>>2]|0;if((o|0)==0){Y=0;break}else{Z=o}while(1){_=Z+16|0;g[R>>2]=+g[_>>2];$=Z+20|0;g[M>>2]=+g[$>>2];g[j>>2]=+g[_>>2]*-1.0;g[N>>2]=+g[$>>2]*-1.0;aa=Z+4|0;o=c[aa>>2]|0;n=c[o+168>>2]|0;ab=Z+8|0;if((n|0)==0){ac=1}else{Q=b2[n&7](o,c[ab>>2]|0,+g[Z+12>>2],R)|0;ac=(Q|0)>1?2:(Q|0)!=0|0}Q=c[ab>>2]|0;o=c[Q+168>>2]|0;if((o|0)==0){ad=ac}else{n=b2[o&7](Q,c[aa>>2]|0,+g[Z+12>>2],j)|0;ad=(n|0)>1?2:(n|0)==0?0:ac}if((ad|0)==1){break}else if((ad|0)==2){Y=1;break L1902}n=c[Z+28>>2]|0;if((n|0)==0){Y=0;break L1902}else{Z=n}}n=c[Z>>2]|0;if((n|0)==1){Q=c[aa>>2]|0;T=+g[Q+52>>2];ae=+g[Q+56>>2];o=c[ab>>2]|0;af=+g[o+52>>2];ag=+g[o+56>>2];if(T*T+ae*ae>af*af+ag*ag){cF(Q,o,0.0,j);Y=1;break}else{cF(o,Q,0.0,R);Y=1;break}}else if((n|0)!=2){Y=1;break}n=c[aa>>2]|0;Q=c[ab>>2]|0;ag=+g[Z+12>>2];af=(+g[n+96>>2]+ +g[Q+96>>2])*.5;ae=(+g[n+100>>2]+ +g[Q+100>>2])*.5;Q=n+52|0;T=+g[Q>>2];ah=1.0-ag;o=n+56|0;ai=+g[o>>2];aj=+g[_>>2];ak=+g[$>>2];al=-0.0-(ah*T*aj+ah*ai*ak);ah=+g[n+24>>2];am=+g[n+28>>2];an=T+ah+aj*al;ao=ai+am+ak*al;al=T*ag+ah;T=ai*ag+am;do{if((c[Z+24>>2]|0)==0){ap=ao;aq=an}else{ag=an-al;ai=ao-T;ar=+P(ag*ag+ai*ai);if(ar<af){ap=T;aq=al;break}if(ar>0.0){as=1.0-(ae+af/ar);ap=T+ai*as;aq=al+ag*as;break}else{as=1.0-ae;ap=T+as*ai;aq=al+as*ag;break}}}while(0);al=aq+aj*.10000000149011612-ah;g[Q>>2]=al;T=ap+ak*.10000000149011612-am;g[o>>2]=T;ae=+g[n+76>>2];af=+g[n+68>>2];ao=(ae>af?ae:af)*.5+10.0;ae=+g[n+72>>2];an=(ae>af?ae:af)*.5+10.0;af=al+ah;if(al>0.0){g[n+196>>2]=af+an;g[n+200>>2]=ah-an}else{g[n+200>>2]=af-an;g[n+196>>2]=ah+an}an=T+am;if(T>0.0){g[n+204>>2]=ao+an;g[n+208>>2]=am-ao;Y=1;break}else{g[n+208>>2]=an-ao;g[n+204>>2]=ao+am;Y=1;break}}else{Y=0}}while(0);I=c[p>>2]|0;if((I|0)!=0){J=I;I=c[3050]|0;while(1){L=J+28|0;G=c[L>>2]|0;c[L>>2]=I;c[3050]=J;if((G|0)==0){break}else{I=J;J=G}}c[p>>2]=0}if(!(Y&(k|0)<50)){break}k=k+1|0}do{if((k|0)==10){Y=c[2904]|0;if((Y|0)>0){at=0;au=Y}else{break}while(1){Y=c[3056]|0;p=c[Y+(at<<2)>>2]|0;L1976:do{if((c[p+32>>2]&1|0)==0){av=au}else{if(+g[p+80>>2]>=0.0&(au|0)>0){aw=0;ax=Y}else{av=au;break}while(1){Z=c[ax+(aw<<2)>>2]|0;do{if(!((c[Z+32>>2]&1|0)==0|(at|0)==(aw|0))){if((cE(c[ax+(at<<2)>>2]|0,Z,0)|0)==0){break}$=c[3056]|0;_=$+(at<<2)|0;g[(c[_>>2]|0)+52>>2]=0.0;g[(c[_>>2]|0)+56>>2]=0.0;ab=c[_>>2]|0;ap=+g[ab+76>>2];aq=+g[ab+68>>2];ao=(ap>aq?ap:aq)*.5+10.0;ap=+g[ab+72>>2];an=(ap>aq?ap:aq)*.5+10.0;aq=+g[ab+52>>2];ap=+g[ab+24>>2];T=aq+ap;if(aq>0.0){g[ab+196>>2]=T+an;g[ab+200>>2]=ap-an}else{g[ab+200>>2]=T-an;g[ab+196>>2]=an+ap}ap=+g[ab+56>>2];an=+g[ab+28>>2];T=ap+an;if(ap>0.0){g[ab+204>>2]=ao+T;g[ab+208>>2]=an-ao}else{g[ab+208>>2]=T-ao;g[ab+204>>2]=ao+an}ab=$+(aw<<2)|0;g[(c[ab>>2]|0)+52>>2]=0.0;g[(c[ab>>2]|0)+56>>2]=0.0;$=c[ab>>2]|0;an=+g[$+76>>2];ao=+g[$+68>>2];T=(an>ao?an:ao)*.5+10.0;an=+g[$+72>>2];ap=(an>ao?an:ao)*.5+10.0;ao=+g[$+52>>2];an=+g[$+24>>2];aq=ao+an;if(ao>0.0){g[$+196>>2]=aq+ap;g[$+200>>2]=an-ap}else{g[$+200>>2]=aq-ap;g[$+196>>2]=ap+an}an=+g[$+56>>2];ap=+g[$+28>>2];aq=an+ap;if(an>0.0){g[$+204>>2]=T+aq;g[$+208>>2]=ap-T;break}else{g[$+208>>2]=aq-T;g[$+204>>2]=T+ap;break}}}while(0);Z=aw+1|0;$=c[2904]|0;if((Z|0)>=($|0)){av=$;break L1976}aw=Z;ax=c[3056]|0}}}while(0);Y=at+1|0;if((Y|0)<(av|0)){at=Y;au=av}else{break}}}}while(0);if(a[9624]|0){av=c[2904]|0;if((av|0)>0){au=0;at=0;ax=av;while(1){av=c[3056]|0;aw=c[av+(au<<2)>>2]|0;do{if((aw|0)==0){ay=at;az=ax}else{k=c[3054]|0;Y=k+(au<<2)|0;p=c[Y>>2]|0;if((p|0)==(-1|0)){n=c[aw+156>>2]|0;if((n|0)==0){aA=ax}else{bY[n&15](aw);aA=c[2904]|0}c[aw+212>>2]=c[3048];c[3048]=aw;ay=at;az=aA;break}else if((p|0)==(-2|0)){ay=at;az=ax;break}else{if((au|0)>(at|0)){c[av+(at<<2)>>2]=aw;c[k+(at<<2)>>2]=c[Y>>2]}ay=at+1|0;az=ax;break}}}while(0);aw=au+1|0;if((aw|0)<(az|0)){au=aw;at=ay;ax=az}else{aB=ay;break}}}else{aB=0}c[2904]=aB;a[9624]=0;a[9616]=0}bm(h|0,0)|0;aB=c[h>>2]|0;ay=dt(aB,(aB|0)<0|0?-1:0,1e6,0)|0;aB=c[h+4>>2]|0;h=di(ay,D,aB,(aB|0)<0|0?-1:0)|0;aB=dj(h,D,m,q)|0;q=di(aB,D,c[2798]|0,c[2799]|0)|0;c[2798]=q;c[2799]=D;bm(f|0,0)|0;q=c[f>>2]|0;aB=dt(q,(q|0)<0|0?-1:0,1e6,0)|0;q=c[f+4>>2]|0;f=di(aB,D,q,(q|0)<0|0?-1:0)|0;q=D;aB=c[2904]|0;if(a[9624]|0){if((aB|0)>0){m=0;h=0;ay=aB;while(1){az=c[3056]|0;ax=c[az+(m<<2)>>2]|0;do{if((ax|0)==0){aC=h;aD=ay}else{at=c[3054]|0;au=at+(m<<2)|0;aA=c[au>>2]|0;if((aA|0)==(-1|0)){aw=c[ax+156>>2]|0;if((aw|0)==0){aE=ay}else{bY[aw&15](ax);aE=c[2904]|0}c[ax+212>>2]=c[3048];c[3048]=ax;aC=h;aD=aE;break}else if((aA|0)==(-2|0)){aC=h;aD=ay;break}else{if((m|0)>(h|0)){c[az+(h<<2)>>2]=ax;c[at+(h<<2)>>2]=c[au>>2]}aC=h+1|0;aD=ay;break}}}while(0);ax=m+1|0;if((ax|0)<(aD|0)){m=ax;h=aC;ay=aD}else{aF=aC;break}}}else{aF=0}c[2904]=aF;a[9624]=0;a[9616]=0;aG=aF}else{aG=aB}a[9616]=1;do{if((aG|0)>0){aB=0;aF=aG;while(1){aC=c[3056]|0;aD=c[aC+(aB<<2)>>2]|0;L2043:do{if((c[aD+32>>2]&8|0)==0){aH=aF}else{if(+g[aD+80>>2]>=0.0&(aF|0)>0){aI=0;aJ=aF;aK=aC}else{aH=aF;break}while(1){ay=c[aK+(aI<<2)>>2]|0;if((c[ay+32>>2]&8|0)==0|(aB|0)==(aI|0)){aL=aJ}else{h=c[aK+(aB<<2)>>2]|0;am=+O(+(+g[h+24>>2]- +g[ay+24>>2]));ah=+O(+(+g[h+28>>2]- +g[ay+28>>2]));m=c[h+172>>2]|0;do{if((m|0)!=0){ak=+g[h+68>>2];if(am>ak|ah>ak){break}bZ[m&31](h,ay)}}while(0);m=c[ay+172>>2]|0;do{if((m|0)!=0){ak=+g[ay+68>>2];if(am>ak|ah>ak){break}bZ[m&31](ay,h)}}while(0);aL=c[2904]|0}h=aI+1|0;if((h|0)>=(aL|0)){aH=aL;break L2043}aI=h;aJ=aL;aK=c[3056]|0}}}while(0);aC=aB+1|0;if((aC|0)<(aH|0)){aB=aC;aF=aH}else{break}}if(!(a[9624]|0)){break}if((aH|0)>0){aF=0;aB=0;aC=aH;while(1){aD=c[3056]|0;h=c[aD+(aF<<2)>>2]|0;do{if((h|0)==0){aM=aB;aN=aC}else{ay=c[3054]|0;m=ay+(aF<<2)|0;aE=c[m>>2]|0;if((aE|0)==(-1|0)){ax=c[h+156>>2]|0;if((ax|0)==0){aO=aC}else{bY[ax&15](h);aO=c[2904]|0}c[h+212>>2]=c[3048];c[3048]=h;aM=aB;aN=aO;break}else if((aE|0)==(-2|0)){aM=aB;aN=aC;break}else{if((aF|0)>(aB|0)){c[aD+(aB<<2)>>2]=h;c[ay+(aB<<2)>>2]=c[m>>2]}aM=aB+1|0;aN=aC;break}}}while(0);h=aF+1|0;if((h|0)<(aN|0)){aF=h;aB=aM;aC=aN}else{aP=aM;break}}}else{aP=0}c[2904]=aP;a[9624]=0;a[9616]=0}}while(0);bm(e|0,0)|0;aP=c[e>>2]|0;aM=dt(aP,(aP|0)<0|0?-1:0,1e6,0)|0;aP=c[e+4>>2]|0;e=di(aM,D,aP,(aP|0)<0|0?-1:0)|0;aP=dj(e,D,f,q)|0;q=di(aP,D,c[2794]|0,c[2795]|0)|0;c[2794]=q;c[2795]=D;q=c[2904]|0;while(1){if((q|0)<=1){break}aP=c[3056]|0;f=0;e=1;aM=c[aP>>2]|0;while(1){aN=aP+(e-1<<2)|0;aO=aP+(e<<2)|0;aH=c[aO>>2]|0;aK=c[aM+36>>2]|0;aL=c[aH+36>>2]|0;do{if((aK|0)>(aL|0)){aQ=1536}else{if((aK|0)<(aL|0)){aR=f;aS=aH;break}if(+g[aM+28>>2]+ +g[aM+40>>2]>+g[aH+28>>2]+ +g[aH+40>>2]){aQ=1536}else{aR=f;aS=aH}}}while(0);if((aQ|0)==1536){aQ=0;c[aO>>2]=aM;c[aN>>2]=aH;aR=e;aS=aM}aL=e+1|0;if((aL|0)<(q|0)){f=aR;e=aL;aM=aS}else{break}}if((aR|0)>0){q=aR}else{break}}bm(d|0,0)|0;aR=c[d>>2]|0;q=dt(aR,(aR|0)<0|0?-1:0,1e6,0)|0;aR=c[d+4>>2]|0;d=di(q,D,aR,(aR|0)<0|0?-1:0)|0;aR=D;q=c[2904]|0;if(a[9624]|0){if((q|0)>0){aS=0;aQ=0;aM=q;while(1){e=c[3056]|0;f=c[e+(aS<<2)>>2]|0;do{if((f|0)==0){aT=aQ;aU=aM}else{aP=c[3054]|0;aL=aP+(aS<<2)|0;aK=c[aL>>2]|0;if((aK|0)==(-1|0)){aJ=c[f+156>>2]|0;if((aJ|0)==0){aV=aM}else{bY[aJ&15](f);aV=c[2904]|0}c[f+212>>2]=c[3048];c[3048]=f;aT=aQ;aU=aV;break}else if((aK|0)==(-2|0)){aT=aQ;aU=aM;break}else{if((aS|0)>(aQ|0)){c[e+(aQ<<2)>>2]=f;c[aP+(aQ<<2)>>2]=c[aL>>2]}aT=aQ+1|0;aU=aM;break}}}while(0);f=aS+1|0;if((f|0)<(aU|0)){aS=f;aQ=aT;aM=aU}else{aW=aT;break}}}else{aW=0}c[2904]=aW;a[9624]=0;a[9616]=0;aX=aW}else{aX=q}a[9616]=1;if((aX|0)>0){aX=0;q=c[3056]|0;do{aW=c[q+(aX<<2)>>2]|0;aT=a[9584]|0?66:0;aU=aW+24|0;ah=+g[aU>>2];g[aW+16>>2]=ah;aM=aW+28|0;am=+g[aM>>2];g[aW+20>>2]=am;aQ=aW+52|0;ak=+g[aQ>>2];aS=aW+56|0;aj=+g[aS>>2];ap=ak*ak+aj*aj;do{if(ap>0.0){T=ak+ah;g[aU>>2]=T;aq=am+aj;g[aM>>2]=aq;an=+P(ap);ao=+g[aW+88>>2];if(an<ao){g[aQ>>2]=0.0;aY=0.0;aZ=0.0}else{af=1.0-(+g[aW+92>>2]+ao/an);an=ak*af;g[aQ>>2]=an;aY=aj*af;aZ=an}g[aS>>2]=aY;g[aW+8>>2]=T;g[aW+12>>2]=aq;aV=aW+32|0;c[aV>>2]=c[aV>>2]|64;an=+g[aW+76>>2];af=+g[aW+68>>2];ao=(an>af?an:af)*.5+10.0;an=+g[aW+72>>2];al=(an>af?an:af)*.5+10.0;af=aZ+T;if(aZ>0.0){g[aW+196>>2]=af+al;g[aW+200>>2]=T-al}else{g[aW+200>>2]=af-al;g[aW+196>>2]=T+al}al=aY+aq;if(aY>0.0){g[aW+204>>2]=ao+al;g[aW+208>>2]=aq-ao;break}else{g[aW+208>>2]=al-ao;g[aW+204>>2]=ao+aq;break}}}while(0);aS=c[aW+164>>2]|0;if((aS|0)!=0){bZ[aS&31](aW,aT)}do{if((c[aW+104>>2]|0)!=0){if((c[aW+112>>2]|0)!=0){break}aS=aW+116|0;c[aS>>2]=(c[aS>>2]|0)+aT}}while(0);q=c[3056]|0;aT=c[q+(aX<<2)>>2]|0;aW=aT+32|0;aS=c[aW>>2]|0;aQ=c[2904]|0;do{if((aS&64|0)==0){a_=aQ}else{if((aS&16|0)==0){c[aW>>2]=aS|32;a_=aQ;break}aj=+g[aT+24>>2];ak=+g[aT+8>>2];aM=aj<ak;ap=+g[aT+148>>2];am=(aM?aj:ak)-ap;ah=ap+(aM?ak:aj);aj=+g[aT+28>>2];ak=+g[aT+12>>2];aM=aj<ak;aq=(aM?aj:ak)-ap;ao=ap+(aM?ak:aj);if((aQ|0)>0){a$=0}else{a_=aQ;break}while(1){aM=c[q+(a$<<2)>>2]|0;aj=+g[aM+24>>2];do{if(!(am>aj|ah<aj)){ak=+g[aM+28>>2];if(aq>ak|ao<ak){break}aU=aM+32|0;c[aU>>2]=c[aU>>2]|32}}while(0);aM=a$+1|0;if((aM|0)<(aQ|0)){a$=aM}else{a_=aQ;break}}}}while(0);aX=aX+1|0;}while((aX|0)<(a_|0))}if((c[3036]|0)!=0){c8()}if(!(a[9624]|0)){a0=l;a1=bm(l|0,0)|0;a2=l|0;a3=c[a2>>2]|0;a4=a3;a5=(a3|0)<0|0?-1:0;a6=1e6;a7=0;a8=dt(a4,a5,a6,a7)|0;a9=D;ba=l+4|0;bb=c[ba>>2]|0;bc=bb;bd=(bb|0)<0|0?-1:0;be=di(a8,a9,bc,bd)|0;bf=D;bg=dj(be,bf,d,aR)|0;bh=D;bi=11168;bj=c[bi>>2]|0;bk=11172;bl=c[bk>>2]|0;bn=di(bg,bh,bj,bl)|0;bo=D;bp=11168;c[bp>>2]=bn;bq=11172;c[bq>>2]=bo;br=c[2838]|0;bs=br+1|0;c[2838]=bs;i=b;return}a_=c[2904]|0;if((a_|0)>0){aX=0;a$=0;q=a_;while(1){a_=c[3056]|0;aQ=c[a_+(aX<<2)>>2]|0;do{if((aQ|0)==0){bt=a$;bu=q}else{aT=c[3054]|0;aS=aT+(aX<<2)|0;aW=c[aS>>2]|0;if((aW|0)==(-1|0)){aH=c[aQ+156>>2]|0;if((aH|0)==0){bv=q}else{bY[aH&15](aQ);bv=c[2904]|0}c[aQ+212>>2]=c[3048];c[3048]=aQ;bt=a$;bu=bv;break}else if((aW|0)==(-2|0)){bt=a$;bu=q;break}else{if((aX|0)>(a$|0)){c[a_+(a$<<2)>>2]=aQ;c[aT+(a$<<2)>>2]=c[aS>>2]}bt=a$+1|0;bu=q;break}}}while(0);aQ=aX+1|0;if((aQ|0)<(bu|0)){aX=aQ;a$=bt;q=bu}else{bw=bt;break}}}else{bw=0}c[2904]=bw;a[9624]=0;a[9616]=0;a0=l;a1=bm(l|0,0)|0;a2=l|0;a3=c[a2>>2]|0;a4=a3;a5=(a3|0)<0|0?-1:0;a6=1e6;a7=0;a8=dt(a4,a5,a6,a7)|0;a9=D;ba=l+4|0;bb=c[ba>>2]|0;bc=bb;bd=(bb|0)<0|0?-1:0;be=di(a8,a9,bc,bd)|0;bf=D;bg=dj(be,bf,d,aR)|0;bh=D;bi=11168;bj=c[bi>>2]|0;bk=11172;bl=c[bk>>2]|0;bn=di(bg,bh,bj,bl)|0;bo=D;bp=11168;c[bp>>2]=bn;bq=11172;c[bq>>2]=bo;br=c[2838]|0;bs=br+1|0;c[2838]=bs;i=b;return}function cK(b,d){b=b|0;d=+d;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0.0,B=0.0,C=0,E=0,F=0.0,G=0.0,H=0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0,N=0.0,O=0.0,P=0,Q=0,R=0.0,S=0.0,T=0.0,U=0.0,V=0.0,W=0.0,X=0,Y=0.0,Z=0.0,_=0.0,$=0.0,aa=0,ab=0,ac=0,ad=0,ae=0;b=i;i=i+16|0;e=b|0;f=b+8|0;h=c[3046]|0;j=~~(+(h|0)+ +((c[3042]|0)-h|0)*d);h=c[3044]|0;k=~~(+(h|0)+ +((c[3040]|0)-h|0)*d);bm(f|0,0)|0;h=c[f>>2]|0;l=dt(h,(h|0)<0|0?-1:0,1e6,0)|0;h=c[f+4>>2]|0;f=di(l,D,h,(h|0)<0|0?-1:0)|0;h=D;ct();l=c[2904]|0;if(a[9624]|0){if((l|0)>0){m=0;n=0;o=l;while(1){p=c[3056]|0;q=c[p+(m<<2)>>2]|0;do{if((q|0)==0){r=n;s=o}else{t=c[3054]|0;u=t+(m<<2)|0;v=c[u>>2]|0;if((v|0)==(-1|0)){w=c[q+156>>2]|0;if((w|0)==0){x=o}else{bY[w&15](q);x=c[2904]|0}c[q+212>>2]=c[3048];c[3048]=q;r=n;s=x;break}else if((v|0)==(-2|0)){r=n;s=o;break}else{if((m|0)>(n|0)){c[p+(n<<2)>>2]=q;c[t+(n<<2)>>2]=c[u>>2]}r=n+1|0;s=o;break}}}while(0);q=m+1|0;if((q|0)<(s|0)){m=q;n=r;o=s}else{y=r;break}}}else{y=0}c[2904]=y;a[9624]=0;a[9616]=0;z=y}else{z=l}a[9616]=1;if((z|0)>0){A=+(-j|0);B=+(-k|0);l=0;y=0;r=0;s=z;while(1){z=c[3056]|0;o=c[z+(l<<2)>>2]|0;n=a[9608]|0?640:0;m=a[9600]|0?480:0;x=c[o+104>>2]|0;do{if((x|0)==0){q=c[o+108>>2]|0;if((q|0)==0){C=y;E=r;break}C=c[q+12>>2]|0;E=c[q+16>>2]|0}else{C=c[x+4>>2]|0;E=c[(c[x>>2]|0)+16>>2]|0}}while(0);x=k-E|0;q=m+k+E|0;F=+g[o+24>>2];do{if(F>=+(j-C|0)){if(F>+(n+j+C|0)){break}G=+g[o+28>>2];if(G<+(x|0)){break}if(G>+(q|0)){break}p=o+32|0;u=c[p>>2]|0;if((u&32|0)==0){H=u;I=+g[o+120>>2];J=+g[o+124>>2];K=+g[o+128>>2];L=+g[o+132>>2]}else{do{if((u&16|0)==0){M=+g[o+136>>2];N=+g[o+140>>2];O=+g[o+144>>2];t=o+120|0;g[t>>2]=M;v=o+124|0;g[v>>2]=N;w=o+128|0;g[w>>2]=O;P=o+132|0;g[P>>2]=1.0;if((s|0)>0){Q=0;R=M;S=N;T=O}else{U=M;V=N;W=O;break}while(1){X=c[z+(Q<<2)>>2]|0;do{if((X|0)==(o|0)){Y=R;Z=S;_=T}else{if((c[X+32>>2]&16|0)==0){Y=R;Z=S;_=T;break}O=F- +g[X+24>>2];N=G- +g[X+28>>2];M=O*O+N*N;N=+g[X+148>>2];O=N*N;if(M>=O){Y=R;Z=S;_=T;break}N=1.0-M/O;O=N*+g[X+140>>2];M=N*+g[X+144>>2];$=N*+g[X+136>>2]+R;N=$>1.0?1.0:$;g[t>>2]=N;$=O+S;O=$>1.0?1.0:$;g[v>>2]=O;$=M+T;M=$>1.0?1.0:$;g[w>>2]=M;g[P>>2]=1.0;Y=N;Z=O;_=M}}while(0);X=Q+1|0;if((X|0)<(s|0)){Q=X;R=Y;S=Z;T=_}else{U=Y;V=Z;W=_;break}}}else{g[o+120>>2]=1.0;g[o+124>>2]=1.0;g[o+128>>2]=1.0;g[o+132>>2]=1.0;U=1.0;V=1.0;W=1.0}}while(0);P=u&-33;c[p>>2]=P;H=P;I=U;J=V;K=W;L=1.0}g[2416]=I;g[2414]=J;g[2412]=K;g[2410]=L;if((H&64|0)==0){cC(o+104|0,~~(A+F),~~(B+G));break}else{M=+g[o+16>>2];O=+g[o+20>>2];cC(o+104|0,~~(A+(M-(M-F)*d)),~~(B+(O-(O-G)*d)));break}}}while(0);o=l+1|0;z=c[2904]|0;if((o|0)<(z|0)){l=o;y=C;r=E;s=z}else{break}}}g[2416]=1.0;g[2414]=1.0;g[2412]=1.0;g[2410]=1.0;if((c[3038]|0)!=0){c3(d)}if(a[9624]|0){s=c[2904]|0;if((s|0)>0){E=0;r=0;C=s;while(1){s=c[3056]|0;y=c[s+(E<<2)>>2]|0;do{if((y|0)==0){aa=r;ab=C}else{l=c[3054]|0;H=l+(E<<2)|0;Q=c[H>>2]|0;if((Q|0)==(-1|0)){j=c[y+156>>2]|0;if((j|0)==0){ac=C}else{bY[j&15](y);ac=c[2904]|0}c[y+212>>2]=c[3048];c[3048]=y;aa=r;ab=ac;break}else if((Q|0)==(-2|0)){aa=r;ab=C;break}else{if((E|0)>(r|0)){c[s+(r<<2)>>2]=y;c[l+(r<<2)>>2]=c[H>>2]}aa=r+1|0;ab=C;break}}}while(0);y=E+1|0;if((y|0)<(ab|0)){E=y;r=aa;C=ab}else{ad=aa;break}}}else{ad=0}c[2904]=ad;a[9624]=0;a[9616]=0}bm(e|0,0)|0;ad=c[e>>2]|0;aa=dt(ad,(ad|0)<0|0?-1:0,1e6,0)|0;ad=c[e+4>>2]|0;e=di(aa,D,ad,(ad|0)<0|0?-1:0)|0;ad=dj(e,D,f,h)|0;h=di(ad,D,c[2796]|0,c[2797]|0)|0;c[2796]=h;c[2797]=D;c[2842]=(c[2842]|0)+1;if((c[2915]|0)!=1){i=b;return}a2(392)|0;h=c[2838]|0;if((h|0)>0){ad=dr(c[2790]|0,c[2791]|0,h,(h|0)<0|0?-1:0)|0;h=D;f=9144;a_(f|0,(ae=i,i=i+16|0,c[ae>>2]=ad,c[ae+8>>2]=h,ae)|0)|0;i=ae;h=c[2838]|0;ad=dr(c[2798]|0,c[2799]|0,h,(h|0)<0|0?-1:0)|0;h=D;f=8184;a_(f|0,(ae=i,i=i+16|0,c[ae>>2]=ad,c[ae+8>>2]=h,ae)|0)|0;i=ae;h=c[2838]|0;ad=dr(c[2794]|0,c[2795]|0,h,(h|0)<0|0?-1:0)|0;h=D;f=7432;a_(f|0,(ae=i,i=i+16|0,c[ae>>2]=ad,c[ae+8>>2]=h,ae)|0)|0;i=ae;h=c[2838]|0;ad=dr(c[2792]|0,c[2793]|0,h,(h|0)<0|0?-1:0)|0;h=D;f=6680;a_(f|0,(ae=i,i=i+16|0,c[ae>>2]=ad,c[ae+8>>2]=h,ae)|0)|0;i=ae}h=c[2842]|0;if((h|0)>0){ad=dr(c[2796]|0,c[2797]|0,h,(h|0)<0|0?-1:0)|0;h=D;f=5952;a_(f|0,(ae=i,i=i+16|0,c[ae>>2]=ad,c[ae+8>>2]=h,ae)|0)|0;i=ae}c[2790]=0;c[2791]=0;c[2798]=0;c[2799]=0;c[2794]=0;c[2795]=0;c[2792]=0;c[2793]=0;c[2796]=0;c[2797]=0;c[2838]=0;c[2842]=0;i=b;return}function cL(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0.0,i=0,j=0,k=0.0,l=0.0,m=0.0,n=0.0,o=0;f=a[9608]|0;g=a[9600]|0?240:0;h=f?384.0:+(~~(+(g|0)*1.2000000476837158)|0);i=~~(h/10.0);j=d-((f?320:0)+(c[3042]|0))|0;k=+(j-i|0);l=+(e-(c[3040]|0)-g|0);m=l*l;l=1.0- +P(m+k*k)/h;k=+(j+i|0);n=1.0- +P(m+k*k)/h;h=n<0.0?0.0:n;n=l<0.0?0.0:l;if((h>0.0|n>0.0)^1|(b|0)==0){return}i=c[3052]|0;if((i|0)==0){j=db(16)|0;c[j+12>>2]=0;o=j}else{j=i+12|0;c[3052]=c[j>>2];c[j>>2]=0;o=i}c[o>>2]=b;c[o+4>>2]=0;a[o+8|0]=~~(n*255.0);a[o+9|0]=~~(h*255.0);c[o+12>>2]=c[3062];c[3062]=o;return}function cM(a,b,d,e,f){a=a|0;b=+b;d=+d;e=+e;f=+f;var h=0,i=0,j=0,k=0,l=0.0,m=0.0,n=0,o=0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0,v=0,w=0,x=0;h=a+32|0;i=c[h>>2]|0;if((i&16|0)==0){g[a+136>>2]=b;g[a+140>>2]=d;g[a+144>>2]=e;g[a+148>>2]=f;c[h>>2]=i|32;return}j=c[3056]|0;k=c[2904]|0;l=+g[a+24>>2];m=+g[a+8>>2];n=l<m;o=a+148|0;p=+g[o>>2];q=(n?l:m)-p;r=p+(n?m:l);l=+g[a+28>>2];m=+g[a+12>>2];n=l<m;s=(n?l:m)-p;t=p+(n?m:l);if((k|0)>0){n=0;do{u=c[j+(n<<2)>>2]|0;l=+g[u+24>>2];do{if(!(q>l|r<l)){m=+g[u+28>>2];if(s>m|t<m){break}v=u+32|0;c[v>>2]=c[v>>2]|32}}while(0);n=n+1|0;}while((n|0)<(k|0));w=c[h>>2]|0}else{w=i}g[a+136>>2]=b;g[a+140>>2]=d;g[a+144>>2]=e;g[o>>2]=f;if((w&16|0)==0){c[h>>2]=w|32;return}e=+g[a+24>>2];d=+g[a+8>>2];w=e<d;b=(w?e:d)-f;t=(w?d:e)+f;e=+g[a+28>>2];d=+g[a+12>>2];a=e<d;s=(a?e:d)-f;r=(a?d:e)+f;if((k|0)>0){x=0}else{return}do{a=c[j+(x<<2)>>2]|0;f=+g[a+24>>2];do{if(!(b>f|t<f)){e=+g[a+28>>2];if(s>e|r<e){break}w=a+32|0;c[w>>2]=c[w>>2]|32}}while(0);x=x+1|0;}while((x|0)<(k|0));return}function cN(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0,r=0.0;d=i;i=i+16|0;e=d|0;f=d+8|0;do{if(a[1656]&(c[2912]|0)==1){h=b+32|0;j=c[h>>2]|0;if((j&1|0)==0){c[h>>2]=j|9;cM(b,.4000000059604645,.4000000059604645,.4000000059604645,160.0);break}else{c[h>>2]=j&-10;cM(b,.699999988079071,.699999988079071,.699999988079071,640.0);break}}}while(0);do{if((aw(e|0,f|0)|0)<<24>>24==0){k=(c[2908]|0)==0?0.0:-1.0;if((c[2909]|0)==0){l=k}else{l=k+1.0}k=(c[2910]|0)==0?0.0:-1.0;if((c[2911]|0)==0){m=k}else{m=k+1.0}k=m*m+l*l;if(k<=0.0){break}n=1.0/+P(k);o=m*n;p=n*l;q=1694}else{n=+((c[e>>2]|0)-(a[3728]|0?320:0)|0);k=+(c[f>>2]|0)-(a[9592]|0?240.0:0.0);r=1.0/+P(n*n+k*k);o=n*r;p=r*k;q=1694}}while(0);if((q|0)==1694){l=o*0.0+p*-1.0;m=o+p*0.0;do{if(+O(+l)<+O(+m)){q=b+104|0;if(m>0.0){f=c[2824]|0;c[q>>2]=0;c[b+108>>2]=f;c[b+116>>2]=0;break}else{f=c[2826]|0;c[q>>2]=0;c[b+108>>2]=f;c[b+116>>2]=0;break}}else{f=b+104|0;if(l>0.0){q=c[2822]|0;c[f>>2]=0;c[b+108>>2]=q;c[b+116>>2]=0;break}else{q=c[2828]|0;c[f>>2]=0;c[b+108>>2]=q;c[b+116>>2]=0;break}}}while(0);cG(b,o*7.0,p*7.0,15.0)}p=+(c[3042]|0);c[3042]=~~(p+(+g[b+24>>2]-(p+(a[9608]|0?320.0:0.0)))*.30000001192092896);p=+(c[3040]|0);c[3040]=~~(p+(+g[b+28>>2]-(p+(a[9600]|0?240.0:0.0)))*.30000001192092896);i=d;return}function cO(a,b,d,e){a=a|0;b=b|0;d=+d;e=e|0;var f=0,h=0.0,i=0.0,j=0.0,k=0.0,l=0,m=0.0;if((c[b+4>>2]|0)!=1){f=1;return f|0}h=+g[a+52>>2];i=+g[a+56>>2];j=+P(h*h+i*i);if(j<=0.0){f=1;return f|0}k=1.0/j;j=+g[e>>2];l=e+4|0;m=+g[l>>2];if(h*k*j+i*k*m>=-.8999999761581421){f=1;return f|0}do{if(+O(+j)>+O(+m)){if(j<0.0){g[e>>2]=-1.0;g[l>>2]=0.0;break}else{g[e>>2]=1.0;g[l>>2]=0.0;break}}else{if(m<0.0){g[l>>2]=-1.0;g[e>>2]=0.0;break}else{g[l>>2]=1.0;g[e>>2]=0.0;break}}}while(0);cF(b,a,d,e);f=2;return f|0}function cP(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,h=0,j=0;b=i;i=i+8|0;d=b|0;e=+g[a+52>>2];f=+g[a+56>>2];if(e*e+f*f<=0.0){i=b;return}bm(d|0,0)|0;h=c[d>>2]|0;j=dt(h,(h|0)<0|0?-1:0,1e6,0)|0;h=c[d+4>>2]|0;d=di(j,D,h,(h|0)<0|0?-1:0)|0;h=dr(d,D,1e3,0)|0;d=h;h=a+176|0;if((d-250|0)<=(c[h>>2]|0)){i=b;return}cL(c[2808]|0,~~+g[a+24>>2],~~+g[a+28>>2]);c[h>>2]=d;i=b;return}function cQ(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0;d=b+4|0;e=c[d>>2]|0;if((e|0)==1){c[a+172>>2]=0;f=cD(c[2858]|0)|0;g[f+24>>2]=+g[a+24>>2];g[f+28>>2]=+g[a+28>>2];cH(f);cL(c[2804]|0,~~+g[b+24>>2],~~+g[b+28>>2]);f=a;cI(f)|0;f=b;cI(f)|0;h=c[d>>2]|0}else{h=e}if((h|0)!=0){return}h=cD(c[2848]|0)|0;e=b+24|0;g[h+24>>2]=+g[e>>2];d=b+28|0;g[h+28>>2]=+g[d>>2];cH(h);cL(c[2810]|0,~~+g[e>>2],~~+g[d>>2]);cI(b)|0;c[2834]=1;return}function cR(a){a=a|0;var b=0,d=0;b=(a5()|0)%1e3|0;if((c[a+104>>2]|0)==0){return}if((c[a+112>>2]|0)!=0){return}d=a+116|0;c[d>>2]=(c[d>>2]|0)+b;return}function cS(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0;a=b+4|0;d=c[a>>2]|0;if((d|0)==1){e=cD(c[2868]|0)|0;f=b+24|0;g[e+24>>2]=+g[f>>2];h=b+28|0;g[e+28>>2]=+g[h>>2];cH(e);cL(c[2810]|0,~~+g[f>>2],~~+g[h>>2]);h=b;cI(h)|0;i=c[a>>2]|0}else{i=d}if((i|0)!=0){return}i=cD(c[2868]|0)|0;d=b+24|0;g[i+24>>2]=+g[d>>2];a=b+28|0;g[i+28>>2]=+g[a>>2];cH(i);i=cD(c[2848]|0)|0;g[i+24>>2]=+g[d>>2];g[i+28>>2]=+g[a>>2];cH(i);cL(c[2810]|0,~~+g[d>>2],~~+g[a>>2]);cI(b)|0;c[2834]=1;return}function cT(a,b,d,e){a=a|0;b=b|0;d=+d;e=e|0;var f=0,h=0,i=0;if((c[a+164>>2]|0)!=0){return 0}e=c[b+4>>2]|0;if((e|0)==0){f=cD(c[2848]|0)|0;h=b+24|0;g[f+24>>2]=+g[h>>2];i=b+28|0;g[f+28>>2]=+g[i>>2];cH(f);f=b;cI(f)|0;cL(c[2810]|0,~~+g[h>>2],~~+g[i>>2]);c[2834]=1}else if((e|0)==7|(e|0)==8){return 0}cI(a)|0;cL(c[2812]|0,~~+g[a+24>>2],~~+g[a+28>>2]);return 0}function cU(a){a=a|0;c[a+176>>2]=(a5()|0)%15|0;return}function cV(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0;b=a+176|0;d=c[b>>2]|0;if((d|0)==0){e=cD(c[a+192>>2]|0)|0;f=a+24|0;g[e+24>>2]=+g[f>>2];h=a+28|0;g[e+28>>2]=+g[h>>2];cH(e);cL(c[2800]|0,~~+g[f>>2],~~+g[h>>2]);i=15;c[b>>2]=i;return}else{i=d-1|0;c[b>>2]=i;return}}function cW(a){a=a|0;if((c[2894]|0)!=(a|0)){return}c[2894]=0;return}function cX(a,b){a=a|0;b=b|0;var d=0,e=0;if((c[b+4>>2]|0)!=0){return}b=c[a+176>>2]|0;if((c[418]|0)!=(b|0)){c[418]=b;cL(c[2802]|0,~~+g[a+24>>2],~~+g[a+28>>2]);c9()}b=c[2894]|0;if((b|0)==(a|0)){return}d=c[2888]|0;c[a+112>>2]=0;e=a+104|0;if((c[e>>2]|0)!=(d|0)){c[e>>2]=d;c[a+108>>2]=0;c[a+116>>2]=0}cM(a,0.0,0.0,.5,128.0);if((b|0)!=0){d=c[2820]|0;c[b+104>>2]=0;c[b+108>>2]=d;c[b+116>>2]=0;cM(b,0.0,0.0,.5,64.0)}c[2894]=a;return}function cY(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)!=0){return}c[2836]=(c[2836]|0)+1;c[418]=1;c[2834]=2;cI(b)|0;cL(c[2806]|0,~~+g[a+24>>2],~~+g[a+28>>2]);c9();return}function cZ(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)!=0){return}c[2834]=3;cI(b)|0;cL(c[2806]|0,~~+g[a+24>>2],~~+g[a+28>>2]);c9();return}function c_(a,b){a=a|0;b=b|0;var d=0,e=0;b=a+176|0;d=c[b>>2]|0;if((d|0)==0){e=a;cI(e)|0;return}else{c[b>>2]=d-1;return}}function c$(a,b){a=a|0;b=b|0;var d=0;if((c[a+4>>2]|0)!=12){d=0;return d|0}d=(c[a+176>>2]|0)==(c[b>>2]|0)|0;return d|0}function c0(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0;d=a+176|0;a=c[2904]|0;if((a|0)<=0){return}e=c[3056]|0;f=0;while(1){h=c[e+(f<<2)>>2]|0;if((h|0)!=0){if((c$(h,d)|0)!=0){break}}i=f+1|0;if((i|0)<(a|0)){f=i}else{j=1809;break}}if((j|0)==1809){return}g[b+24>>2]=+g[h+24>>2];g[b+28>>2]=+g[h+28>>2];return}function c1(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0.0,w=0,x=0,y=0,z=0,A=0,B=0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0,H=0;e=i;i=i+1168|0;f=e+128|0;h=e+1152|0;j=e+1160|0;k=e|0;aX(k|0,9352,(l=i,i=i+8|0,c[l>>2]=b,l)|0)|0;i=l;b=ba(k|0,9400)|0;if((b|0)==0){m=0;i=e;return m|0}k=c[2904]|0;if((k|0)>0){n=0;o=k;while(1){k=c[(c[3056]|0)+(n<<2)>>2]|0;if((k|0)==0){p=o}else{q=c[k+156>>2]|0;if((q|0)==0){r=o}else{bY[q&15](k);r=c[2904]|0}c[k+212>>2]=c[3048];c[3048]=k;p=r}k=n+1|0;if((k|0)<(p|0)){n=k;o=p}else{break}}}c[2904]=0;p=f|0;dh(p|0,0,1024);o=0;L2463:while(1){while(1){s=aM(b|0)|0;if((s|0)==(-1|0)){t=1821;break L2463}else if((s|0)==10){t=1822;break L2463}else if((s|0)!=13){break}}a[f+o|0]=s&255;n=o+1|0;if((n|0)<1024){o=n}else{break}}if((t|0)==1821){a[f+o|0]=0}else if((t|0)==1822){a[f+o|0]=0}bv(p|0,8304,(l=i,i=i+16|0,c[l>>2]=h,c[l+8>>2]=j,l)|0)|0;i=l;if((c[j>>2]|0)>0){l=0;do{dh(p|0,0,1024);o=0;L2475:while(1){while(1){u=aM(b|0)|0;if((u|0)==(-1|0)){t=1828;break L2475}else if((u|0)==10){t=1829;break L2475}else if((u|0)!=13){break}}a[f+o|0]=u&255;s=o+1|0;if((s|0)<1024){o=s}else{break}}if((t|0)==1828){t=0;a[f+o|0]=0}else if((t|0)==1829){t=0;a[f+o|0]=0}s=c[h>>2]|0;L2484:do{if((s|0)>0){v=+(l<<5|16|0);n=0;r=s;while(1){k=n<<1;L2488:do{if((n|0)>0){switch(a[f+(k-2)|0]|0){case 46:case 35:case 109:case 66:case 83:case 69:case 70:case 65:case 86:case 60:case 62:case 114:case 84:case 68:case 108:{w=4;break L2488;break};default:{}}w=0}else{w=0}}while(0);if((n|0)<(r-1|0)){switch(a[f+(k+2)|0]|0){case 46:case 35:case 109:case 66:case 83:case 69:case 70:case 65:case 86:case 60:case 62:case 114:case 84:case 68:case 108:{x=0;break};default:{x=1}}y=(x|w)^1}else{y=w}q=a[f+k|0]|0;switch(q<<24>>24){case 46:case 35:case 109:case 66:case 83:case 69:case 70:case 65:case 86:case 60:case 62:case 114:case 84:case 68:case 108:{z=0;break};default:{z=1}}A=z?y:y|2;if((A|0)==7){B=cD(c[2866]|0)|0;C=+(n<<5|16|0);g[B+24>>2]=C;g[B+28>>2]=v;D=+g[B+76>>2];E=+g[B+68>>2];F=(D>E?D:E)*.5+10.0;D=+g[B+72>>2];G=(D>E?D:E)*.5+10.0;E=+g[B+52>>2];D=E+C;if(E>0.0){g[B+196>>2]=D+G;g[B+200>>2]=C-G}else{g[B+200>>2]=D-G;g[B+196>>2]=G+C}C=+g[B+56>>2];G=C+v;if(C>0.0){g[B+204>>2]=F+G;g[B+208>>2]=v-F}else{g[B+208>>2]=G-F;g[B+204>>2]=F+v}cH(B)}else if((A|0)==6){B=cD(c[2860]|0)|0;F=+(n<<5|16|0);g[B+24>>2]=F;g[B+28>>2]=v;G=+g[B+76>>2];C=+g[B+68>>2];D=(G>C?G:C)*.5+10.0;G=+g[B+72>>2];E=(G>C?G:C)*.5+10.0;C=+g[B+52>>2];G=C+F;if(C>0.0){g[B+196>>2]=G+E;g[B+200>>2]=F-E}else{g[B+200>>2]=G-E;g[B+196>>2]=E+F}F=+g[B+56>>2];E=F+v;if(F>0.0){g[B+204>>2]=D+E;g[B+208>>2]=v-D}else{g[B+208>>2]=E-D;g[B+204>>2]=D+v}cH(B)}else if((A|0)==3){B=cD(c[2862]|0)|0;D=+(n<<5|16|0);g[B+24>>2]=D;g[B+28>>2]=v;E=+g[B+76>>2];F=+g[B+68>>2];G=(E>F?E:F)*.5+10.0;E=+g[B+72>>2];C=(E>F?E:F)*.5+10.0;F=+g[B+52>>2];E=F+D;if(F>0.0){g[B+196>>2]=E+C;g[B+200>>2]=D-C}else{g[B+200>>2]=E-C;g[B+196>>2]=C+D}D=+g[B+56>>2];C=D+v;if(D>0.0){g[B+204>>2]=G+C;g[B+208>>2]=v-G}else{g[B+208>>2]=C-G;g[B+204>>2]=G+v}cH(B)}else if((A|0)==2){A=cD(c[2864]|0)|0;G=+(n<<5|16|0);g[A+24>>2]=G;g[A+28>>2]=v;C=+g[A+76>>2];D=+g[A+68>>2];E=(C>D?C:D)*.5+10.0;C=+g[A+72>>2];F=(C>D?C:D)*.5+10.0;D=+g[A+52>>2];C=D+G;if(D>0.0){g[A+196>>2]=C+F;g[A+200>>2]=G-F}else{g[A+200>>2]=C-F;g[A+196>>2]=F+G}G=+g[A+56>>2];F=G+v;if(G>0.0){g[A+204>>2]=E+F;g[A+208>>2]=v-E}else{g[A+208>>2]=F-E;g[A+204>>2]=E+v}cH(A)}switch(q<<24>>24){case 35:{q=cD(c[2876]|0)|0;E=+(n<<5|16|0);g[q+24>>2]=E;g[q+28>>2]=v;F=+g[q+76>>2];G=+g[q+68>>2];C=(F>G?F:G)*.5+10.0;F=+g[q+72>>2];D=(F>G?F:G)*.5+10.0;G=+g[q+52>>2];F=G+E;if(G>0.0){g[q+196>>2]=F+D;g[q+200>>2]=E-D}else{g[q+200>>2]=F-D;g[q+196>>2]=D+E}E=+g[q+56>>2];D=E+v;if(E>0.0){g[q+204>>2]=C+D;g[q+208>>2]=v-C}else{g[q+208>>2]=D-C;g[q+204>>2]=C+v}cH(q);break};case 109:{q=cD(c[2874]|0)|0;C=+(n<<5|16|0);g[q+24>>2]=C;g[q+28>>2]=v;D=+g[q+76>>2];E=+g[q+68>>2];F=(D>E?D:E)*.5+10.0;D=+g[q+72>>2];G=(D>E?D:E)*.5+10.0;E=+g[q+52>>2];D=E+C;if(E>0.0){g[q+196>>2]=D+G;g[q+200>>2]=C-G}else{g[q+200>>2]=D-G;g[q+196>>2]=G+C}C=+g[q+56>>2];G=C+v;if(C>0.0){g[q+204>>2]=F+G;g[q+208>>2]=v-F}else{g[q+208>>2]=G-F;g[q+204>>2]=F+v}cH(q);break};case 114:{q=cD(c[2846]|0)|0;F=+(n<<5|16|0);g[q+24>>2]=F;g[q+28>>2]=v;G=+g[q+76>>2];C=+g[q+68>>2];D=(G>C?G:C)*.5+10.0;G=+g[q+72>>2];E=(G>C?G:C)*.5+10.0;C=+g[q+52>>2];G=C+F;if(C>0.0){g[q+196>>2]=G+E;g[q+200>>2]=F-E}else{g[q+200>>2]=G-E;g[q+196>>2]=E+F}F=+g[q+56>>2];E=F+v;if(F>0.0){g[q+204>>2]=D+E;g[q+208>>2]=v-D}else{g[q+208>>2]=E-D;g[q+204>>2]=D+v}cH(q);break};case 108:{q=cD(c[2852]|0)|0;D=+(n<<5|16|0);g[q+24>>2]=D;g[q+28>>2]=v;E=+g[q+76>>2];F=+g[q+68>>2];G=(E>F?E:F)*.5+10.0;E=+g[q+72>>2];C=(E>F?E:F)*.5+10.0;F=+g[q+52>>2];E=F+D;if(F>0.0){g[q+196>>2]=E+C;g[q+200>>2]=D-C}else{g[q+200>>2]=E-C;g[q+196>>2]=C+D}D=+g[q+56>>2];C=D+v;if(D>0.0){g[q+204>>2]=G+C;g[q+208>>2]=v-G}else{g[q+208>>2]=C-G;g[q+204>>2]=G+v}cH(q);break};case 66:{q=cD(c[2878]|0)|0;G=+(n<<5|16|0);g[q+24>>2]=G;g[q+28>>2]=v;C=+g[q+76>>2];D=+g[q+68>>2];E=(C>D?C:D)*.5+10.0;C=+g[q+72>>2];F=(C>D?C:D)*.5+10.0;D=+g[q+52>>2];C=D+G;if(D>0.0){g[q+196>>2]=C+F;g[q+200>>2]=G-F}else{g[q+200>>2]=C-F;g[q+196>>2]=F+G}G=+g[q+56>>2];F=G+v;if(G>0.0){g[q+204>>2]=E+F;g[q+208>>2]=v-E}else{g[q+208>>2]=F-E;g[q+204>>2]=E+v}cH(q);break};case 124:{q=cD(c[2854]|0)|0;E=+(n<<5|16|0);g[q+24>>2]=E;g[q+28>>2]=v;F=+g[q+76>>2];G=+g[q+68>>2];C=(F>G?F:G)*.5+10.0;F=+g[q+72>>2];D=(F>G?F:G)*.5+10.0;G=+g[q+52>>2];F=G+E;if(G>0.0){g[q+196>>2]=F+D;g[q+200>>2]=E-D}else{g[q+200>>2]=F-D;g[q+196>>2]=D+E}E=+g[q+56>>2];D=E+v;if(E>0.0){g[q+204>>2]=C+D;g[q+208>>2]=v-C}else{g[q+208>>2]=D-C;g[q+204>>2]=C+v}cH(q);break};case 76:{q=cD(c[2856]|0)|0;C=+(n<<5|16|0);g[q+24>>2]=C;g[q+28>>2]=v;D=+g[q+76>>2];E=+g[q+68>>2];F=(D>E?D:E)*.5+10.0;D=+g[q+72>>2];G=(D>E?D:E)*.5+10.0;E=+g[q+52>>2];D=E+C;if(E>0.0){g[q+196>>2]=D+G;g[q+200>>2]=C-G}else{g[q+200>>2]=D-G;g[q+196>>2]=G+C}C=+g[q+56>>2];G=C+v;if(C>0.0){g[q+204>>2]=F+G;g[q+208>>2]=v-F}else{g[q+208>>2]=G-F;g[q+204>>2]=F+v}cH(q);break};case 83:{q=cD(c[2844]|0)|0;F=+(n<<5|16|0);g[q+24>>2]=F;g[q+28>>2]=v;G=+g[q+76>>2];C=+g[q+68>>2];D=(G>C?G:C)*.5+10.0;G=+g[q+72>>2];E=(G>C?G:C)*.5+10.0;C=+g[q+52>>2];G=C+F;if(C>0.0){g[q+196>>2]=G+E;g[q+200>>2]=F-E}else{g[q+200>>2]=G-E;g[q+196>>2]=E+F}F=+g[q+56>>2];E=F+v;if(F>0.0){g[q+204>>2]=D+E;g[q+208>>2]=v-D}else{g[q+208>>2]=E-D;g[q+204>>2]=D+v}cH(q);c[q+176>>2]=(a[f+(k|1)|0]|0)-48;break};case 69:{q=cD(c[2870]|0)|0;D=+(n<<5|16|0);g[q+24>>2]=D;g[q+28>>2]=v;E=+g[q+76>>2];F=+g[q+68>>2];G=(E>F?E:F)*.5+10.0;E=+g[q+72>>2];C=(E>F?E:F)*.5+10.0;F=+g[q+52>>2];E=F+D;if(F>0.0){g[q+196>>2]=E+C;g[q+200>>2]=D-C}else{g[q+200>>2]=E-C;g[q+196>>2]=C+D}D=+g[q+56>>2];C=D+v;if(D>0.0){g[q+204>>2]=G+C;g[q+208>>2]=v-G}else{g[q+208>>2]=C-G;g[q+204>>2]=G+v}cH(q);break};case 70:{q=cD(c[2872]|0)|0;G=+(n<<5|16|0);g[q+24>>2]=G;g[q+28>>2]=v;C=+g[q+76>>2];D=+g[q+68>>2];E=(C>D?C:D)*.5+10.0;C=+g[q+72>>2];F=(C>D?C:D)*.5+10.0;D=+g[q+52>>2];C=D+G;if(D>0.0){g[q+196>>2]=C+F;g[q+200>>2]=G-F}else{g[q+200>>2]=C-F;g[q+196>>2]=F+G}G=+g[q+56>>2];F=G+v;if(G>0.0){g[q+204>>2]=E+F;g[q+208>>2]=v-E}else{g[q+208>>2]=F-E;g[q+204>>2]=E+v}cH(q);break};case 62:{q=cD(c[2882]|0)|0;E=+(n<<5|16|0);g[q+24>>2]=E;g[q+28>>2]=v;F=+g[q+76>>2];G=+g[q+68>>2];C=(F>G?F:G)*.5+10.0;F=+g[q+72>>2];D=(F>G?F:G)*.5+10.0;G=+g[q+52>>2];F=G+E;if(G>0.0){g[q+196>>2]=F+D;g[q+200>>2]=E-D}else{g[q+200>>2]=F-D;g[q+196>>2]=D+E}E=+g[q+56>>2];D=E+v;if(E>0.0){g[q+204>>2]=C+D;g[q+208>>2]=v-C}else{g[q+208>>2]=D-C;g[q+204>>2]=C+v}cH(q);break};case 60:{q=cD(c[2884]|0)|0;C=+(n<<5|16|0);g[q+24>>2]=C;g[q+28>>2]=v;D=+g[q+76>>2];E=+g[q+68>>2];F=(D>E?D:E)*.5+10.0;D=+g[q+72>>2];G=(D>E?D:E)*.5+10.0;E=+g[q+52>>2];D=E+C;if(E>0.0){g[q+196>>2]=D+G;g[q+200>>2]=C-G}else{g[q+200>>2]=D-G;g[q+196>>2]=G+C}C=+g[q+56>>2];G=C+v;if(C>0.0){g[q+204>>2]=F+G;g[q+208>>2]=v-F}else{g[q+208>>2]=G-F;g[q+204>>2]=F+v}cH(q);break};case 86:{q=cD(c[2886]|0)|0;F=+(n<<5|16|0);g[q+24>>2]=F;g[q+28>>2]=v;G=+g[q+76>>2];C=+g[q+68>>2];D=(G>C?G:C)*.5+10.0;G=+g[q+72>>2];E=(G>C?G:C)*.5+10.0;C=+g[q+52>>2];G=C+F;if(C>0.0){g[q+196>>2]=G+E;g[q+200>>2]=F-E}else{g[q+200>>2]=G-E;g[q+196>>2]=E+F}F=+g[q+56>>2];E=F+v;if(F>0.0){g[q+204>>2]=D+E;g[q+208>>2]=v-D}else{g[q+208>>2]=E-D;g[q+204>>2]=D+v}cH(q);break};case 65:{q=cD(c[2880]|0)|0;D=+(n<<5|16|0);g[q+24>>2]=D;g[q+28>>2]=v;E=+g[q+76>>2];F=+g[q+68>>2];G=(E>F?E:F)*.5+10.0;E=+g[q+72>>2];C=(E>F?E:F)*.5+10.0;F=+g[q+52>>2];E=F+D;if(F>0.0){g[q+196>>2]=E+C;g[q+200>>2]=D-C}else{g[q+200>>2]=E-C;g[q+196>>2]=C+D}D=+g[q+56>>2];C=D+v;if(D>0.0){g[q+204>>2]=G+C;g[q+208>>2]=v-G}else{g[q+208>>2]=C-G;g[q+204>>2]=G+v}cH(q);break};default:{}}n=n+1|0;r=c[h>>2]|0;if((n|0)>=(r|0)){break L2484}}}}while(0);l=l+1|0;}while((l|0)<(c[j>>2]|0))}as(b|0)|0;c[2892]=d;b=c[2904]|0;if((b|0)<=0){m=1;i=e;return m|0}j=c[3056]|0;l=0;L2672:while(1){H=c[j+(l<<2)>>2]|0;do{if((H|0)!=0){if((c[H+4>>2]|0)!=9){break}if((c[H+176>>2]|0)==(d|0)){break L2672}}}while(0);h=l+1|0;if((h|0)<(b|0)){l=h}else{m=1;t=1983;break}}if((t|0)==1983){i=e;return m|0}t=cD(c[2850]|0)|0;g[t+24>>2]=+g[H+24>>2];g[t+28>>2]=+g[H+28>>2];cH(t);m=1;i=e;return m|0}function c2(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;b=i;i=i+8|0;d=b|0;e=(c[2912]|0)==1|(c[2913]|0)==1?1:0;if((c[2906]|0)==1){if(a[1664]|0){f=1987}else{g=0;f=1988}}else{h=a[1664]|0;if((c[2907]|0)==1&h){f=1987}else{g=h&1;f=1988}}do{if((f|0)==1988){if((e|0)==0){i=b;return}else{if((g|0)==0){f=1990;break}else{break}}}else if((f|0)==1987){a[1664]=0;f=1990}}while(0);if((f|0)==1990){c[3046]=0;c[3044]=0;c[3042]=0;c[3040]=0;c[2836]=0;c[418]=1;c[2834]=0;c1(0,1)|0;a[1664]=1}c[3034]=2;c[3036]=4;c[3038]=2;c[2790]=0;c[2791]=0;c[2798]=0;c[2799]=0;c[2794]=0;c[2795]=0;c[2792]=0;c[2793]=0;c[2796]=0;c[2797]=0;c[2838]=0;c[2842]=0;c[2898]=8;c[3058]=2;if(a[9632]|0){i=b;return}a[9632]=1;f=a[624]|0;c[3064]=f?66666:33333;c[3065]=f?0:0;bm(d|0,0)|0;f=c[d>>2]|0;g=dt(f,(f|0)<0|0?-1:0,1e6,0)|0;f=c[d+4>>2]|0;d=di(g,D,f,(f|0)<0|0?-1:0)|0;c[2900]=d;c[2901]=D;bO(6,0,1);i=b;return}function c3(b){b=+b;var d=0,e=0,f=0,h=0,j=0;d=i;i=i+1032|0;e=d|0;g[2416]=1.0;g[2414]=1.0;g[2412]=1.0;g[2410]=1.0;f=d+8|0;h=c[418]|0;aX(f|0,4080,(j=i,i=i+16|0,c[j>>2]=(c[2836]|0)+1,c[j+8>>2]=h,j)|0)|0;i=j;g[2416]=0.0;g[2414]=0.0;g[2412]=0.0;g[2410]=.5;cw(c[2840]|0,f,17,17);g[2416]=1.0;g[2414]=1.0;g[2412]=1.0;g[2410]=1.0;cw(c[2840]|0,f,16,16);f=c[2834]|0;if((f|0)==3){c[2898]=6;c[3058]=6;if(a[9632]|0){i=d;return}a[9632]=1;j=a[624]|0;c[3064]=j?66666:33333;c[3065]=j?0:0;bm(e|0,0)|0;j=c[e>>2]|0;h=dt(j,(j|0)<0|0?-1:0,1e6,0)|0;j=c[e+4>>2]|0;e=di(h,D,j,(j|0)<0|0?-1:0)|0;c[2900]=e;c[2901]=D;bO(6,0,1);i=d;return}else if((f|0)==1){g[2416]=0.0;g[2414]=0.0;g[2412]=0.0;g[2410]=.5;cw(c[2840]|0,9408,301,301);g[2416]=1.0;g[2414]=0.0;g[2412]=0.0;g[2410]=1.0;cw(c[2840]|0,9408,300,300);i=d;return}else if((f|0)==2){g[2416]=0.0;g[2414]=0.0;g[2412]=0.0;g[2410]=.5;cw(c[2840]|0,3904,301,301);g[2416]=1.0;g[2414]=1.0;g[2412]=0.0;g[2410]=1.0;cw(c[2840]|0,9504,300,300);i=d;return}else{i=d;return}}function c4(b,d){b=b|0;d=+d;var e=0,f=0,h=0,i=0.0,j=0;ct();g[2416]=1.0;g[2414]=1.0;g[2412]=1.0;g[2410]=1.0;b=c[2830]|0;e=b;f=(c[b+4>>2]|0)+320|0;h=(a[9592]|0?480:0)-((c[b+8>>2]|0)+150)|0;d=+((c[b+12>>2]|0)+f|0);i=+(h-(c[b+16>>2]|0)|0);if((c[3060]|0)!=(e|0)){cs();c[3060]=e}cl(c[2896]|0,+(f|0),+(h|0),0.0,d,i,1.0);h=c[2840]|0;if(a[1664]|0){cw(h,8272,300,300);cw(c[2840]|0,7520,300,316);j=c[2840]|0;cw(j,6744,200,440);return}else{cw(h,9376,300,300);j=c[2840]|0;cw(j,6744,200,440);return}}function c5(b){b=b|0;var d=0,e=0,f=0;b=i;i=i+8|0;d=b|0;if(!((c[2912]|0)==1|(c[2913]|0)==1|(c[2914]|0)==1)){i=b;return}a[1664]=0;c[2836]=0;c[418]=1;c[2834]=0;c[2898]=12;c[3058]=4;if(a[9632]|0){i=b;return}a[9632]=1;e=a[624]|0;c[3064]=e?66666:33333;c[3065]=e?0:0;bm(d|0,0)|0;e=c[d>>2]|0;f=dt(e,(e|0)<0|0?-1:0,1e6,0)|0;e=c[d+4>>2]|0;d=di(f,D,e,(e|0)<0|0?-1:0)|0;c[2900]=d;c[2901]=D;bO(6,0,1);i=b;return}function c6(b,d){b=b|0;d=+d;var e=0,f=0,h=0,i=0.0;ct();g[2416]=1.0;g[2414]=1.0;g[2412]=1.0;g[2410]=1.0;b=c[2832]|0;e=b;f=(c[b+4>>2]|0)+320|0;h=(a[9592]|0?480:0)-((c[b+8>>2]|0)+150)|0;d=+((c[b+12>>2]|0)+f|0);i=+(h-(c[b+16>>2]|0)|0);if((c[3060]|0)!=(e|0)){cs();c[3060]=e}cl(c[2896]|0,+(f|0),+(h|0),0.0,d,i,1.0);cw(c[2840]|0,6032,250,320);cw(c[2840]|0,5152,250,350);cw(c[2840]|0,4640,300,400);return}function c7(){return}function c8(){var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+16|0;d=b|0;e=b+8|0;L2734:do{if((c[2834]|0)!=0){f=0;while(1){if((f|0)>=10){break L2734}if((c[11624+(f<<2)>>2]|0)==1){break}else{f=f+1|0}}if((c1(c[2836]|0,c[418]|0)|0)==0){c[2898]=6;c[3058]=6;if(a[9632]|0){break}a[9632]=1;f=a[624]|0;c[3064]=f?66666:33333;c[3065]=f?0:0;bm(d|0,0)|0;f=c[d>>2]|0;g=dt(f,(f|0)<0|0?-1:0,1e6,0)|0;f=c[d+4>>2]|0;h=di(g,D,f,(f|0)<0|0?-1:0)|0;c[2900]=h;c[2901]=D;bO(6,0,1);break}if((c[2834]|0)==2){c[3046]=0;c[3044]=0;c[3042]=0;c[3040]=0}c[2834]=0}}while(0);if((c[2914]|0)!=1){i=b;return}c[2898]=12;c[3058]=4;if(a[9632]|0){i=b;return}a[9632]=1;d=a[624]|0;c[3064]=d?66666:33333;c[3065]=d?0:0;bm(e|0,0)|0;d=c[e>>2]|0;h=dt(d,(d|0)<0|0?-1:0,1e6,0)|0;d=c[e+4>>2]|0;e=di(h,D,d,(d|0)<0|0?-1:0)|0;c[2900]=e;c[2901]=D;bO(6,0,1);i=b;return}function c9(){var a=0;be(9248)|0;a=ba(9256,8968)|0;if((a|0)==0){return}az(11344,1,4,a|0)|0;az(1672,1,4,a|0)|0;as(a|0)|0;bC(8880);return}function da(e,f){e=e|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0;h=i;i=i+160|0;j=h|0;k=h+8|0;l=h+32|0;m=h+56|0;n=h+64|0;o=h+72|0;p=h+80|0;q=h+88|0;r=h+96|0;bj(bT(0)|0);do{if((e|0)>1){if((aI(c[f+4>>2]|0,8800)|0)!=0){break}a[1656]=1;a2(520)|0}}while(0);a[624]=1;a[3728]=1;a[9592]=1;do{if((a3(32)|0)<0){a2(584)|0;f=bi()|0;a_(9424,(s=i,i=i+8|0,c[s>>2]=f,s)|0)|0;i=s}else{if((a9(640,480,32,201326593)|0)==0){a2(304)|0;f=bi()|0;a_(9424,(s=i,i=i+8|0,c[s>>2]=f,s)|0)|0;i=s;break}bn(8608,0);a2(224)|0;a2(168)|0;f=ay(7936)|0;a_(4064,(s=i,i=i+8|0,c[s>>2]=f,s)|0)|0;i=s;f=ay(7937)|0;a_(4048,(s=i,i=i+8|0,c[s>>2]=f,s)|0)|0;i=s;f=ay(7938)|0;a_(4032,(s=i,i=i+8|0,c[s>>2]=f,s)|0)|0;i=s;a2(88)|0;c[o>>2]=9912;f=aH(35633)|0;do{if((f|0)==0){t=0}else{a7(f|0,1,o|0,0);aC(f|0);a4(f|0,35713,p|0);if((c[p>>2]|0)!=0){t=f;break}bK(f|0);t=0}}while(0);c[m>>2]=10304;f=aH(35632)|0;do{if((f|0)==0){u=0}else{a7(f|0,1,m|0,0);aC(f|0);a4(f|0,35713,n|0);if((c[n>>2]|0)!=0){u=f;break}bK(f|0);u=0}}while(0);do{if((t|0)==0|(u|0)==0){v=0}else{f=bM()|0;aY(f|0,t|0);aY(f|0,u|0);at(f|0);aN(f|0,35714,q|0);if((c[q>>2]|0)!=0){v=f;break}aW(f|0);v=0}}while(0);bu(v|0);f=bI(v|0,4e3)|0;e=bI(v|0,3928)|0;w=bI(v|0,3920)|0;x=bz(v|0,3888)|0;y=bz(v|0,3864)|0;bH(1,11152);bg(34962,c[2788]|0);bk(34962,192e3,0,35048);bg(34962,c[2788]|0);aO(f|0,2,5126,0,32,0);aO(e|0,2,5126,0,32,8);aO(w|0,4,5126,0,32,16);bf(f|0);bf(e|0);bf(w|0);aJ(x|0,0);x=r|0;g[x>>2]=2.0/(a[3728]|0?640.0:0.0);g[r+4>>2]=0.0;g[r+8>>2]=0.0;g[r+12>>2]=-1.0;g[r+16>>2]=0.0;g[r+20>>2]=2.0/(a[9592]|0?480.0:0.0);g[r+24>>2]=0.0;g[r+28>>2]=-1.0;g[r+32>>2]=0.0;g[r+36>>2]=0.0;g[r+40>>2]=1.0;dh(r+44|0,0,16);g[r+60>>2]=1.0;bP(y|0,1,0,x|0);bD(3042);bL(770,771);x=db(12)|0;c[x>>2]=db(12800)|0;c[x+4>>2]=0;c[x+8>>2]=400;c[2896]=x;g[2416]=1.0;g[2414]=1.0;g[2412]=1.0;g[2410]=1.0;bh(512)|0;dh(11624,0,40);L2781:do{if((bh(16)|0)<0){a2(472)|0;x=bi()|0;a_(9424,(s=i,i=i+8|0,c[s>>2]=x,s)|0)|0;i=s}else{c[k>>2]=44100;b[k+4>>1]=-32752;a[k+6|0]=2;b[k+8>>1]=2048;c[k+16>>2]=2;if((bt(k|0,l|0)|0)<0){a2(544)|0;x=bi()|0;a_(9424,(s=i,i=i+8|0,c[s>>2]=x,s)|0)|0;i=s;break}do{if((b[l+4>>1]|0)==-32752){if((c[l>>2]|0)!=44100){break}if((a[l+6|0]|0)!=2){break}aG(0);break L2781}}while(0);a2(416)|0;bq()}}while(0);a[9608]=1;a[9600]=1;c[3046]=0;c[3044]=0;c[3042]=0;c[3040]=0;a[9584]=1}}while(0);c[2830]=cv(8512)|0;c[2832]=cv(8400)|0;l=db(20)|0;s=db(24)|0;k=db(65536)|0;c[s>>2]=k;c[s+4>>2]=0;c[s+8>>2]=0;c[s+12>>2]=2048;c[s+16>>2]=8;c[s+20>>2]=-1;r=0;do{v=r<<3;q=0;do{u=(q<<11)+v|0;t=d[1680+(q+v)|0]|0;n=0;do{m=u+n<<2;a[k+m|0]=-1;a[k+(m|1)|0]=-1;a[k+(m|2)|0]=-1;a[k+(m|3)|0]=((1<<7-n&t|0)!=0)<<31>>31;n=n+1|0;}while((n|0)<8);q=q+1|0;}while((q|0)<8);r=r+1|0;}while((r|0)<256);c[l>>2]=s;c[l+4>>2]=8;c[l+8>>2]=8;c[l+12>>2]=0;c[l+16>>2]=256;c[2840]=l;l=cv(4104)|0;c[l+4>>2]=-16;c[l+8>>2]=-32;s=cv(8616)|0;c[s+4>>2]=-16;c[s+8>>2]=-16;r=cv(7776)|0;c[r+4>>2]=-16;c[r+8>>2]=-16;k=cv(6960)|0;c[k+4>>2]=-16;c[k+8>>2]=-16;q=cv(6312)|0;c[q+4>>2]=-16;c[q+8>>2]=-16;v=cv(5424)|0;c[v+4>>2]=-16;c[v+8>>2]=-16;n=cv(4864)|0;c[n+4>>2]=-16;c[n+8>>2]=-80;t=cv(4192)|0;c[t+4>>2]=-16;c[t+8>>2]=-80;u=cv(4016)|0;c[u+4>>2]=-16;c[u+8>>2]=-32;m=cv(3736)|0;c[m+4>>2]=-16;c[m+8>>2]=-48;p=cv(9480)|0;c[p+4>>2]=-16;c[p+8>>2]=-16;o=cv(9328)|0;if((o|0)==0){bN();return 0}x=db(24)|0;c[x>>2]=o;c[x+4>>2]=32;g[x+8>>2]=5.0;c[x+12>>2]=2;c[x+16>>2]=200;c[x+20>>2]=400;c[o+4>>2]=-16;c[o+8>>2]=-16;o=cv(9120)|0;c[2822]=o;c[o+4>>2]=-16;c[o+8>>2]=-48;o=cv(9024)|0;c[2828]=o;c[o+4>>2]=-16;c[o+8>>2]=-48;o=cv(8944)|0;c[2826]=o;c[o+4>>2]=-16;c[o+8>>2]=-48;o=cv(8856)|0;c[2824]=o;c[o+4>>2]=-16;c[o+8>>2]=-48;o=cv(8776)|0;c[2820]=o;c[o+4>>2]=-16;c[o+8>>2]=-16;o=cv(8680)|0;if((o|0)==0){bN();return 0}y=db(24)|0;c[y>>2]=o;c[y+4>>2]=32;g[y+8>>2]=5.0;c[y+12>>2]=2;c[y+16>>2]=200;c[y+20>>2]=400;c[2888]=y;c[o+4>>2]=-16;c[o+8>>2]=-16;o=cv(8584)|0;if((o|0)==0){bN();return 0}y=db(24)|0;c[y>>2]=o;c[y+4>>2]=32;g[y+8>>2]=10.0;c[y+12>>2]=2;c[y+16>>2]=100;c[y+20>>2]=200;c[o+4>>2]=-16;c[o+8>>2]=-48;o=cv(8488)|0;c[o+4>>2]=-16;c[o+8>>2]=-32;w=cv(8416)|0;c[w+4>>2]=-16;c[w+8>>2]=-16;e=cv(8312)|0;c[e+4>>2]=-16;c[e+8>>2]=-16;f=cv(8208)|0;c[f+4>>2]=-16;c[f+8>>2]=-16;z=cv(8120)|0;c[z+4>>2]=-16;c[z+8>>2]=-16;A=cv(8064)|0;c[A+4>>2]=-16;c[A+8>>2]=-16;B=cv(8008)|0;c[B+4>>2]=-16;c[B+8>>2]=-16;C=cv(7920)|0;c[C+4>>2]=-16;c[C+8>>2]=-16;E=cv(7856)|0;c[E+4>>2]=-16;c[E+8>>2]=-16;F=cv(7792)|0;if((F|0)==0){bN();return 0}G=db(24)|0;c[G>>2]=F;c[G+4>>2]=32;g[G+8>>2]=5.0;c[G+12>>2]=3;c[G+16>>2]=200;c[G+20>>2]=600;c[F+4>>2]=-16;c[F+8>>2]=-48;F=cv(7728)|0;c[F+4>>2]=-16;c[F+8>>2]=-48;c[2812]=cB(7616)|0;c[2806]=cB(7544)|0;c[2802]=cB(7456)|0;c[2800]=cB(7336)|0;c[2810]=cB(7264)|0;c[2804]=cB(7192)|0;c[2808]=cB(7128)|0;H=c[3048]|0;if((H|0)==0){I=db(216)|0}else{c[3048]=c[H+212>>2];I=H}c[I>>2]=0;c[I+4>>2]=0;dh(I+16|0,0,16);c[I+36>>2]=1;dh(I+40|0,0,20);g[I+68>>2]=1.0;g[I+72>>2]=1.0;g[I+76>>2]=1.0;c[I+116>>2]=0;dh(I+84|0,0,28);g[I+132>>2]=1.0;g[I+128>>2]=1.0;g[I+124>>2]=1.0;g[I+120>>2]=1.0;c[I+212>>2]=0;dh(I+152|0,0,44);g[I+80>>2]=-1.0;c[I+32>>2]=0;g[I+136>>2]=0.0;g[I+140>>2]=0.0;g[I+144>>2]=0.0;g[I+148>>2]=1.0;H=cD(I)|0;c[2850]=H;c[H+4>>2]=0;g[H+68>>2]=16.0;g[H+72>>2]=24.0;g[H+76>>2]=24.0;g[H+80>>2]=30.0;g[H+88>>2]=2.5;g[H+92>>2]=.30000001192092896;c[H+32>>2]=25;g[H+136>>2]=.4000000059604645;g[H+140>>2]=.4000000059604645;g[H+144>>2]=.4000000059604645;g[H+148>>2]=96.0;J=c[2828]|0;c[H+104>>2]=0;c[H+108>>2]=J;c[H+116>>2]=0;c[H+160>>2]=12;c[H+168>>2]=2;H=cD(I)|0;c[2878]=H;c[H+4>>2]=1;c[H+32>>2]=9;g[H+68>>2]=16.0;g[H+72>>2]=24.0;g[H+76>>2]=24.0;g[H+80>>2]=25.0;g[H+88>>2]=2.0;g[H+92>>2]=.5;c[H+160>>2]=20;c[H+104>>2]=0;c[H+108>>2]=l;c[H+116>>2]=0;H=cD(I)|0;c[2876]=H;c[H+4>>2]=2;c[H+32>>2]=1;g[H+68>>2]=12.0;g[H+72>>2]=24.0;g[H+76>>2]=24.0;c[H+104>>2]=0;c[H+108>>2]=n;c[H+116>>2]=0;n=cD(H)|0;c[2874]=n;c[n+104>>2]=0;c[n+108>>2]=t;c[n+116>>2]=0;n=cD(c[2876]|0)|0;c[2846]=n;c[n+104>>2]=0;c[n+108>>2]=u;c[n+116>>2]=0;c[n+32>>2]=1;u=cD(n)|0;c[2852]=u;c[u+104>>2]=0;c[u+108>>2]=m;c[u+116>>2]=0;c[u+32>>2]=17;g[u+136>>2]=.4000000059604645;g[u+140>>2]=.4000000059604645;g[u+144>>2]=.4000000059604645;g[u+148>>2]=160.0;u=cD(I)|0;c[2866]=u;c[u+4>>2]=3;c[u+36>>2]=-1;c[u+32>>2]=0;c[u+104>>2]=0;c[u+108>>2]=r;c[u+116>>2]=0;r=cD(u)|0;c[2862]=r;c[r+104>>2]=0;c[r+108>>2]=k;c[r+116>>2]=0;r=cD(c[2866]|0)|0;c[2860]=r;c[r+104>>2]=0;c[r+108>>2]=q;c[r+116>>2]=0;r=cD(c[2866]|0)|0;c[2864]=r;c[r+104>>2]=0;c[r+108>>2]=v;c[r+116>>2]=0;r=cD(I)|0;c[2854]=r;c[r+4>>2]=4;c[r+36>>2]=-1;c[r+32>>2]=8;g[r+68>>2]=18.0;c[r+104>>2]=0;c[r+108>>2]=p;c[r+116>>2]=0;c[r+172>>2]=6;r=cD(I)|0;c[2858]=r;c[r+4>>2]=5;c[r+36>>2]=-1;c[r+32>>2]=0;c[r+104>>2]=0;c[r+108>>2]=s;c[r+116>>2]=0;r=cD(I)|0;c[2856]=r;c[r+4>>2]=6;c[r+36>>2]=-1;c[r+32>>2]=24;g[r+68>>2]=18.0;c[r+112>>2]=0;s=r+104|0;if((c[s>>2]|0)!=(x|0)){c[s>>2]=x;c[r+108>>2]=0;c[r+116>>2]=0}g[r+136>>2]=1.0;g[r+140>>2]=0.0;g[r+144>>2]=0.0;g[r+148>>2]=128.0;c[r+152>>2]=10;c[r+172>>2]=2;r=cD(I)|0;c[r+4>>2]=8;c[r+32>>2]=17;g[r+136>>2]=.20000000298023224;g[r+140>>2]=.20000000298023224;g[r+144>>2]=.20000000298023224;g[r+148>>2]=64.0;g[r+68>>2]=4.0;g[r+80>>2]=.10000000149011612;c[r+168>>2]=4;c[r+160>>2]=16;c[r+176>>2]=120;c[r+104>>2]=0;c[r+108>>2]=A;c[r+116>>2]=0;g[r+52>>2]=0.0;g[r+56>>2]=-16.0;A=cD(r)|0;c[A+104>>2]=0;c[A+108>>2]=B;c[A+116>>2]=0;g[A+52>>2]=0.0;g[A+56>>2]=16.0;B=cD(r)|0;c[B+104>>2]=0;c[B+108>>2]=C;c[B+116>>2]=0;g[B+52>>2]=-16.0;g[B+56>>2]=0.0;C=cD(r)|0;c[C+104>>2]=0;c[C+108>>2]=E;c[C+116>>2]=0;g[C+52>>2]=16.0;g[C+56>>2]=0.0;E=cD(I)|0;c[2880]=E;c[E+4>>2]=7;c[E+32>>2]=1;g[E+68>>2]=15.0;c[E+152>>2]=4;c[E+160>>2]=8;c[E+104>>2]=0;c[E+108>>2]=w;c[E+116>>2]=0;c[E+192>>2]=r;r=cD(E)|0;c[2886]=r;c[r+104>>2]=0;c[r+108>>2]=e;c[r+116>>2]=0;c[r+192>>2]=A;A=cD(c[2880]|0)|0;c[2884]=A;c[A+104>>2]=0;c[A+108>>2]=f;c[A+116>>2]=0;c[A+192>>2]=B;B=cD(c[2880]|0)|0;c[2882]=B;c[B+104>>2]=0;c[B+108>>2]=z;c[B+116>>2]=0;c[B+192>>2]=C;C=cD(I)|0;c[2844]=C;c[C+4>>2]=9;g[C+40>>2]=-5.0;c[C+32>>2]=24;g[C+68>>2]=20.0;g[C+136>>2]=0.0;g[C+140>>2]=0.0;g[C+144>>2]=.5;g[C+148>>2]=64.0;B=c[2820]|0;c[C+104>>2]=0;c[C+108>>2]=B;c[C+116>>2]=0;c[C+172>>2]=4;c[C+156>>2]=2;C=cD(I)|0;c[2870]=C;c[C+4>>2]=10;c[C+32>>2]=24;g[C+136>>2]=.5;g[C+140>>2]=.5;g[C+144>>2]=.5;g[C+148>>2]=160.0;g[C+68>>2]=20.0;c[C+112>>2]=0;B=C+104|0;if((c[B>>2]|0)!=(y|0)){c[B>>2]=y;c[C+108>>2]=0;c[C+116>>2]=0}c[C+172>>2]=14;y=cD(C)|0;c[2872]=y;c[y+104>>2]=0;c[y+108>>2]=o;c[y+116>>2]=0;c[y+172>>2]=10;y=cD(I)|0;c[y+36>>2]=0;c[y+4>>2]=11;c[y+32>>2]=24;g[y+136>>2]=.5;g[y+140>>2]=.5;g[y+144>>2]=.5;g[y+148>>2]=160.0;g[y+68>>2]=20.0;o=c[2820]|0;c[y+104>>2]=0;c[y+108>>2]=o;c[y+116>>2]=0;c[y+172>>2]=18;y=cD(I)|0;c[y+36>>2]=0;c[y+4>>2]=12;c[y+32>>2]=0;o=c[2820]|0;c[y+104>>2]=0;c[y+108>>2]=o;c[y+116>>2]=0;y=cD(I)|0;c[2868]=y;c[y+4>>2]=13;c[y+32>>2]=16;g[y+136>>2]=1.0;g[y+140>>2]=0.0;g[y+144>>2]=0.0;g[y+148>>2]=96.0;c[y+112>>2]=0;o=y+104|0;if((c[o>>2]|0)!=(G|0)){c[o>>2]=G;c[y+108>>2]=0;c[y+116>>2]=0}c[y+160>>2]=16;c[y+176>>2]=15;g[y+40>>2]=1.0;y=cD(I)|0;c[2848]=y;c[y+4>>2]=13;c[y+32>>2]=0;c[y+104>>2]=0;c[y+108>>2]=F;c[y+116>>2]=0;be(9248)|0;y=ba(9256,9056)|0;do{if((y|0)!=0){by(11344,1,4,y|0)|0;by(1672,1,4,y|0)|0;F=c[2836]|0;I=c[418]|0;if((F|0)==0&(I|0)==1){a[1664]=0;break}else{c1(F,I)|0;a[1664]=1;as(y|0)|0;break}}}while(0);c[2898]=12;c[3058]=4;if(a[9632]|0){i=h;return 0}a[9632]=1;y=a[624]|0;c[3064]=y?66666:33333;c[3065]=y?0:0;bm(j|0,0)|0;y=c[j>>2]|0;I=dt(y,(y|0)<0|0?-1:0,1e6,0)|0;y=c[j+4>>2]|0;j=di(I,D,y,(y|0)<0|0?-1:0)|0;c[2900]=j;c[2901]=D;bO(6,0,1);i=h;return 0}function db(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0;do{if(a>>>0<245>>>0){if(a>>>0<11>>>0){b=16}else{b=a+11&-8}d=b>>>3;e=c[2916]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=11704+(h<<2)|0;j=11704+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[2916]=e&~(1<<g)}else{if(l>>>0<(c[2920]|0)>>>0){bA();return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{bA();return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[2918]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=11704+(p<<2)|0;m=11704+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[2916]=e&~(1<<r)}else{if(l>>>0<(c[2920]|0)>>>0){bA();return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{bA();return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[2918]|0;if((l|0)!=0){q=c[2921]|0;d=l>>>3;l=d<<1;f=11704+(l<<2)|0;k=c[2916]|0;h=1<<d;do{if((k&h|0)==0){c[2916]=k|h;s=f;t=11704+(l+2<<2)|0}else{d=11704+(l+2<<2)|0;g=c[d>>2]|0;if(g>>>0>=(c[2920]|0)>>>0){s=g;t=d;break}bA();return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[2918]=m;c[2921]=e;n=i;return n|0}l=c[2917]|0;if((l|0)==0){o=b;break}h=(l&-l)-1|0;l=h>>>12&16;k=h>>>(l>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;d=r>>>(p>>>0);r=d>>>1&1;g=c[11968+((h|l|k|p|r)+(d>>>(r>>>0))<<2)>>2]|0;r=g;d=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;d=k?u:d;p=k?g:p}r=d;i=c[2920]|0;if(r>>>0<i>>>0){bA();return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){bA();return 0}e=c[d+24>>2]|0;f=c[d+12>>2]|0;do{if((f|0)==(d|0)){q=d+20|0;g=c[q>>2]|0;if((g|0)==0){k=d+16|0;l=c[k>>2]|0;if((l|0)==0){v=0;break}else{w=l;x=k}}else{w=g;x=q}while(1){q=w+20|0;g=c[q>>2]|0;if((g|0)!=0){w=g;x=q;continue}q=w+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=g;x=q}}if(x>>>0<i>>>0){bA();return 0}else{c[x>>2]=0;v=w;break}}else{q=c[d+8>>2]|0;if(q>>>0<i>>>0){bA();return 0}g=q+12|0;if((c[g>>2]|0)!=(d|0)){bA();return 0}k=f+8|0;if((c[k>>2]|0)==(d|0)){c[g>>2]=f;c[k>>2]=q;v=f;break}else{bA();return 0}}}while(0);L2917:do{if((e|0)!=0){f=d+28|0;i=11968+(c[f>>2]<<2)|0;do{if((d|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[2917]=c[2917]&~(1<<c[f>>2]);break L2917}else{if(e>>>0<(c[2920]|0)>>>0){bA();return 0}q=e+16|0;if((c[q>>2]|0)==(d|0)){c[q>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break L2917}}}while(0);if(v>>>0<(c[2920]|0)>>>0){bA();return 0}c[v+24>>2]=e;f=c[d+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[d+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16>>>0){e=p+b|0;c[d+4>>2]=e|3;f=r+(e+4)|0;c[f>>2]=c[f>>2]|1}else{c[d+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b)>>2]=p;f=c[2918]|0;if((f|0)!=0){e=c[2921]|0;i=f>>>3;f=i<<1;q=11704+(f<<2)|0;k=c[2916]|0;g=1<<i;do{if((k&g|0)==0){c[2916]=k|g;y=q;z=11704+(f+2<<2)|0}else{i=11704+(f+2<<2)|0;l=c[i>>2]|0;if(l>>>0>=(c[2920]|0)>>>0){y=l;z=i;break}bA();return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=q}c[2918]=p;c[2921]=m}f=d+8|0;if((f|0)==0){o=b;break}else{n=f}return n|0}else{if(a>>>0>4294967231>>>0){o=-1;break}f=a+11|0;g=f&-8;k=c[2917]|0;if((k|0)==0){o=g;break}r=-g|0;i=f>>>8;do{if((i|0)==0){A=0}else{if(g>>>0>16777215>>>0){A=31;break}f=(i+1048320|0)>>>16&8;l=i<<f;h=(l+520192|0)>>>16&4;j=l<<h;l=(j+245760|0)>>>16&2;B=14-(h|f|l)+(j<<l>>>15)|0;A=g>>>((B+7|0)>>>0)&1|B<<1}}while(0);i=c[11968+(A<<2)>>2]|0;L2965:do{if((i|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}d=0;m=r;p=i;q=g<<F;e=0;while(1){B=c[p+4>>2]&-8;l=B-g|0;if(l>>>0<m>>>0){if((B|0)==(g|0)){C=p;D=l;E=p;break L2965}else{G=p;H=l}}else{G=d;H=m}l=c[p+20>>2]|0;B=c[p+16+(q>>>31<<2)>>2]|0;j=(l|0)==0|(l|0)==(B|0)?e:l;if((B|0)==0){C=G;D=H;E=j;break}else{d=G;m=H;p=B;q=q<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){i=2<<A;r=k&(i|-i);if((r|0)==0){o=g;break}i=(r&-r)-1|0;r=i>>>12&16;e=i>>>(r>>>0);i=e>>>5&8;q=e>>>(i>>>0);e=q>>>2&4;p=q>>>(e>>>0);q=p>>>1&2;m=p>>>(q>>>0);p=m>>>1&1;I=c[11968+((i|r|e|q|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}if((I|0)==0){J=D;K=C}else{p=I;m=D;q=C;while(1){e=(c[p+4>>2]&-8)-g|0;r=e>>>0<m>>>0;i=r?e:m;e=r?p:q;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=i;q=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=i;K=e;break}else{p=r;m=i;q=e}}}if((K|0)==0){o=g;break}if(J>>>0>=((c[2918]|0)-g|0)>>>0){o=g;break}q=K;m=c[2920]|0;if(q>>>0<m>>>0){bA();return 0}p=q+g|0;k=p;if(q>>>0>=p>>>0){bA();return 0}e=c[K+24>>2]|0;i=c[K+12>>2]|0;do{if((i|0)==(K|0)){r=K+20|0;d=c[r>>2]|0;if((d|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break}else{M=B;N=j}}else{M=d;N=r}while(1){r=M+20|0;d=c[r>>2]|0;if((d|0)!=0){M=d;N=r;continue}r=M+16|0;d=c[r>>2]|0;if((d|0)==0){break}else{M=d;N=r}}if(N>>>0<m>>>0){bA();return 0}else{c[N>>2]=0;L=M;break}}else{r=c[K+8>>2]|0;if(r>>>0<m>>>0){bA();return 0}d=r+12|0;if((c[d>>2]|0)!=(K|0)){bA();return 0}j=i+8|0;if((c[j>>2]|0)==(K|0)){c[d>>2]=i;c[j>>2]=r;L=i;break}else{bA();return 0}}}while(0);L3015:do{if((e|0)!=0){i=K+28|0;m=11968+(c[i>>2]<<2)|0;do{if((K|0)==(c[m>>2]|0)){c[m>>2]=L;if((L|0)!=0){break}c[2917]=c[2917]&~(1<<c[i>>2]);break L3015}else{if(e>>>0<(c[2920]|0)>>>0){bA();return 0}r=e+16|0;if((c[r>>2]|0)==(K|0)){c[r>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break L3015}}}while(0);if(L>>>0<(c[2920]|0)>>>0){bA();return 0}c[L+24>>2]=e;i=c[K+16>>2]|0;do{if((i|0)!=0){if(i>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[L+16>>2]=i;c[i+24>>2]=L;break}}}while(0);i=c[K+20>>2]|0;if((i|0)==0){break}if(i>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[L+20>>2]=i;c[i+24>>2]=L;break}}}while(0);do{if(J>>>0<16>>>0){e=J+g|0;c[K+4>>2]=e|3;i=q+(e+4)|0;c[i>>2]=c[i>>2]|1}else{c[K+4>>2]=g|3;c[q+(g|4)>>2]=J|1;c[q+(J+g)>>2]=J;i=J>>>3;if(J>>>0<256>>>0){e=i<<1;m=11704+(e<<2)|0;r=c[2916]|0;j=1<<i;do{if((r&j|0)==0){c[2916]=r|j;O=m;P=11704+(e+2<<2)|0}else{i=11704+(e+2<<2)|0;d=c[i>>2]|0;if(d>>>0>=(c[2920]|0)>>>0){O=d;P=i;break}bA();return 0}}while(0);c[P>>2]=k;c[O+12>>2]=k;c[q+(g+8)>>2]=O;c[q+(g+12)>>2]=m;break}e=p;j=J>>>8;do{if((j|0)==0){Q=0}else{if(J>>>0>16777215>>>0){Q=31;break}r=(j+1048320|0)>>>16&8;i=j<<r;d=(i+520192|0)>>>16&4;B=i<<d;i=(B+245760|0)>>>16&2;l=14-(d|r|i)+(B<<i>>>15)|0;Q=J>>>((l+7|0)>>>0)&1|l<<1}}while(0);j=11968+(Q<<2)|0;c[q+(g+28)>>2]=Q;c[q+(g+20)>>2]=0;c[q+(g+16)>>2]=0;m=c[2917]|0;l=1<<Q;if((m&l|0)==0){c[2917]=m|l;c[j>>2]=e;c[q+(g+24)>>2]=j;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}l=J<<R;m=c[j>>2]|0;while(1){if((c[m+4>>2]&-8|0)==(J|0)){break}S=m+16+(l>>>31<<2)|0;j=c[S>>2]|0;if((j|0)==0){T=2256;break}else{l=l<<1;m=j}}if((T|0)==2256){if(S>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[S>>2]=e;c[q+(g+24)>>2]=m;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}}l=m+8|0;j=c[l>>2]|0;i=c[2920]|0;if(m>>>0<i>>>0){bA();return 0}if(j>>>0<i>>>0){bA();return 0}else{c[j+12>>2]=e;c[l>>2]=e;c[q+(g+8)>>2]=j;c[q+(g+12)>>2]=m;c[q+(g+24)>>2]=0;break}}}while(0);q=K+8|0;if((q|0)==0){o=g;break}else{n=q}return n|0}}while(0);K=c[2918]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[2921]|0;if(S>>>0>15>>>0){R=J;c[2921]=R+o;c[2918]=S;c[R+(o+4)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[2918]=0;c[2921]=0;c[J+4>>2]=K|3;S=J+(K+4)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[2919]|0;if(o>>>0<J>>>0){S=J-o|0;c[2919]=S;J=c[2922]|0;K=J;c[2922]=K+o;c[K+(o+4)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[2814]|0)==0){J=bx(30)|0;if((J-1&J|0)==0){c[2816]=J;c[2815]=J;c[2817]=-1;c[2818]=-1;c[2819]=0;c[3027]=0;c[2814]=(bT(0)|0)&-16^1431655768;break}else{bA();return 0}}}while(0);J=o+48|0;S=c[2816]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[3026]|0;do{if((O|0)!=0){P=c[3024]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);L3107:do{if((c[3027]&4|0)==0){O=c[2922]|0;L3109:do{if((O|0)==0){T=2286}else{L=O;P=12112;while(1){U=P|0;M=c[U>>2]|0;if(M>>>0<=L>>>0){V=P+4|0;if((M+(c[V>>2]|0)|0)>>>0>L>>>0){break}}M=c[P+8>>2]|0;if((M|0)==0){T=2286;break L3109}else{P=M}}if((P|0)==0){T=2286;break}L=R-(c[2919]|0)&Q;if(L>>>0>=2147483647>>>0){W=0;break}m=bo(L|0)|0;e=(m|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=e?m:-1;Y=e?L:0;Z=m;_=L;T=2295}}while(0);do{if((T|0)==2286){O=bo(0)|0;if((O|0)==-1){W=0;break}g=O;L=c[2815]|0;m=L-1|0;if((m&g|0)==0){$=S}else{$=S-g+(m+g&-L)|0}L=c[3024]|0;g=L+$|0;if(!($>>>0>o>>>0&$>>>0<2147483647>>>0)){W=0;break}m=c[3026]|0;if((m|0)!=0){if(g>>>0<=L>>>0|g>>>0>m>>>0){W=0;break}}m=bo($|0)|0;g=(m|0)==(O|0);X=g?O:-1;Y=g?$:0;Z=m;_=$;T=2295}}while(0);L3129:do{if((T|0)==2295){m=-_|0;if((X|0)!=-1){aa=Y;ab=X;T=2306;break L3107}do{if((Z|0)!=-1&_>>>0<2147483647>>>0&_>>>0<J>>>0){g=c[2816]|0;O=K-_+g&-g;if(O>>>0>=2147483647>>>0){ac=_;break}if((bo(O|0)|0)==-1){bo(m|0)|0;W=Y;break L3129}else{ac=O+_|0;break}}else{ac=_}}while(0);if((Z|0)==-1){W=Y}else{aa=ac;ab=Z;T=2306;break L3107}}}while(0);c[3027]=c[3027]|4;ad=W;T=2303}else{ad=0;T=2303}}while(0);do{if((T|0)==2303){if(S>>>0>=2147483647>>>0){break}W=bo(S|0)|0;Z=bo(0)|0;if(!((Z|0)!=-1&(W|0)!=-1&W>>>0<Z>>>0)){break}ac=Z-W|0;Z=ac>>>0>(o+40|0)>>>0;Y=Z?W:-1;if((Y|0)!=-1){aa=Z?ac:ad;ab=Y;T=2306}}}while(0);do{if((T|0)==2306){ad=(c[3024]|0)+aa|0;c[3024]=ad;if(ad>>>0>(c[3025]|0)>>>0){c[3025]=ad}ad=c[2922]|0;L3149:do{if((ad|0)==0){S=c[2920]|0;if((S|0)==0|ab>>>0<S>>>0){c[2920]=ab}c[3028]=ab;c[3029]=aa;c[3031]=0;c[2925]=c[2814];c[2924]=-1;S=0;do{Y=S<<1;ac=11704+(Y<<2)|0;c[11704+(Y+3<<2)>>2]=ac;c[11704+(Y+2<<2)>>2]=ac;S=S+1|0;}while(S>>>0<32>>>0);S=ab+8|0;if((S&7|0)==0){ae=0}else{ae=-S&7}S=aa-40-ae|0;c[2922]=ab+ae;c[2919]=S;c[ab+(ae+4)>>2]=S|1;c[ab+(aa-36)>>2]=40;c[2923]=c[2818]}else{S=12112;while(1){af=c[S>>2]|0;ag=S+4|0;ah=c[ag>>2]|0;if((ab|0)==(af+ah|0)){T=2318;break}ac=c[S+8>>2]|0;if((ac|0)==0){break}else{S=ac}}do{if((T|0)==2318){if((c[S+12>>2]&8|0)!=0){break}ac=ad;if(!(ac>>>0>=af>>>0&ac>>>0<ab>>>0)){break}c[ag>>2]=ah+aa;ac=c[2922]|0;Y=(c[2919]|0)+aa|0;Z=ac;W=ac+8|0;if((W&7|0)==0){ai=0}else{ai=-W&7}W=Y-ai|0;c[2922]=Z+ai;c[2919]=W;c[Z+(ai+4)>>2]=W|1;c[Z+(Y+4)>>2]=40;c[2923]=c[2818];break L3149}}while(0);if(ab>>>0<(c[2920]|0)>>>0){c[2920]=ab}S=ab+aa|0;Y=12112;while(1){aj=Y|0;if((c[aj>>2]|0)==(S|0)){T=2328;break}Z=c[Y+8>>2]|0;if((Z|0)==0){break}else{Y=Z}}do{if((T|0)==2328){if((c[Y+12>>2]&8|0)!=0){break}c[aj>>2]=ab;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+aa;S=ab+8|0;if((S&7|0)==0){ak=0}else{ak=-S&7}S=ab+(aa+8)|0;if((S&7|0)==0){al=0}else{al=-S&7}S=ab+(al+aa)|0;Z=S;W=ak+o|0;ac=ab+W|0;_=ac;K=S-(ab+ak)-o|0;c[ab+(ak+4)>>2]=o|3;do{if((Z|0)==(c[2922]|0)){J=(c[2919]|0)+K|0;c[2919]=J;c[2922]=_;c[ab+(W+4)>>2]=J|1}else{if((Z|0)==(c[2921]|0)){J=(c[2918]|0)+K|0;c[2918]=J;c[2921]=_;c[ab+(W+4)>>2]=J|1;c[ab+(J+W)>>2]=J;break}J=aa+4|0;X=c[ab+(J+al)>>2]|0;if((X&3|0)==1){$=X&-8;V=X>>>3;L3184:do{if(X>>>0<256>>>0){U=c[ab+((al|8)+aa)>>2]|0;Q=c[ab+(aa+12+al)>>2]|0;R=11704+(V<<1<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[2920]|0)>>>0){bA();return 0}if((c[U+12>>2]|0)==(Z|0)){break}bA();return 0}}while(0);if((Q|0)==(U|0)){c[2916]=c[2916]&~(1<<V);break}do{if((Q|0)==(R|0)){am=Q+8|0}else{if(Q>>>0<(c[2920]|0)>>>0){bA();return 0}m=Q+8|0;if((c[m>>2]|0)==(Z|0)){am=m;break}bA();return 0}}while(0);c[U+12>>2]=Q;c[am>>2]=U}else{R=S;m=c[ab+((al|24)+aa)>>2]|0;P=c[ab+(aa+12+al)>>2]|0;do{if((P|0)==(R|0)){O=al|16;g=ab+(J+O)|0;L=c[g>>2]|0;if((L|0)==0){e=ab+(O+aa)|0;O=c[e>>2]|0;if((O|0)==0){an=0;break}else{ao=O;ap=e}}else{ao=L;ap=g}while(1){g=ao+20|0;L=c[g>>2]|0;if((L|0)!=0){ao=L;ap=g;continue}g=ao+16|0;L=c[g>>2]|0;if((L|0)==0){break}else{ao=L;ap=g}}if(ap>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[ap>>2]=0;an=ao;break}}else{g=c[ab+((al|8)+aa)>>2]|0;if(g>>>0<(c[2920]|0)>>>0){bA();return 0}L=g+12|0;if((c[L>>2]|0)!=(R|0)){bA();return 0}e=P+8|0;if((c[e>>2]|0)==(R|0)){c[L>>2]=P;c[e>>2]=g;an=P;break}else{bA();return 0}}}while(0);if((m|0)==0){break}P=ab+(aa+28+al)|0;U=11968+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=an;if((an|0)!=0){break}c[2917]=c[2917]&~(1<<c[P>>2]);break L3184}else{if(m>>>0<(c[2920]|0)>>>0){bA();return 0}Q=m+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=an}else{c[m+20>>2]=an}if((an|0)==0){break L3184}}}while(0);if(an>>>0<(c[2920]|0)>>>0){bA();return 0}c[an+24>>2]=m;R=al|16;P=c[ab+(R+aa)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[an+16>>2]=P;c[P+24>>2]=an;break}}}while(0);P=c[ab+(J+R)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[an+20>>2]=P;c[P+24>>2]=an;break}}}while(0);aq=ab+(($|al)+aa)|0;ar=$+K|0}else{aq=Z;ar=K}J=aq+4|0;c[J>>2]=c[J>>2]&-2;c[ab+(W+4)>>2]=ar|1;c[ab+(ar+W)>>2]=ar;J=ar>>>3;if(ar>>>0<256>>>0){V=J<<1;X=11704+(V<<2)|0;P=c[2916]|0;m=1<<J;do{if((P&m|0)==0){c[2916]=P|m;as=X;at=11704+(V+2<<2)|0}else{J=11704+(V+2<<2)|0;U=c[J>>2]|0;if(U>>>0>=(c[2920]|0)>>>0){as=U;at=J;break}bA();return 0}}while(0);c[at>>2]=_;c[as+12>>2]=_;c[ab+(W+8)>>2]=as;c[ab+(W+12)>>2]=X;break}V=ac;m=ar>>>8;do{if((m|0)==0){au=0}else{if(ar>>>0>16777215>>>0){au=31;break}P=(m+1048320|0)>>>16&8;$=m<<P;J=($+520192|0)>>>16&4;U=$<<J;$=(U+245760|0)>>>16&2;Q=14-(J|P|$)+(U<<$>>>15)|0;au=ar>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=11968+(au<<2)|0;c[ab+(W+28)>>2]=au;c[ab+(W+20)>>2]=0;c[ab+(W+16)>>2]=0;X=c[2917]|0;Q=1<<au;if((X&Q|0)==0){c[2917]=X|Q;c[m>>2]=V;c[ab+(W+24)>>2]=m;c[ab+(W+12)>>2]=V;c[ab+(W+8)>>2]=V;break}if((au|0)==31){av=0}else{av=25-(au>>>1)|0}Q=ar<<av;X=c[m>>2]|0;while(1){if((c[X+4>>2]&-8|0)==(ar|0)){break}aw=X+16+(Q>>>31<<2)|0;m=c[aw>>2]|0;if((m|0)==0){T=2401;break}else{Q=Q<<1;X=m}}if((T|0)==2401){if(aw>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[aw>>2]=V;c[ab+(W+24)>>2]=X;c[ab+(W+12)>>2]=V;c[ab+(W+8)>>2]=V;break}}Q=X+8|0;m=c[Q>>2]|0;$=c[2920]|0;if(X>>>0<$>>>0){bA();return 0}if(m>>>0<$>>>0){bA();return 0}else{c[m+12>>2]=V;c[Q>>2]=V;c[ab+(W+8)>>2]=m;c[ab+(W+12)>>2]=X;c[ab+(W+24)>>2]=0;break}}}while(0);n=ab+(ak|8)|0;return n|0}}while(0);Y=ad;W=12112;while(1){ax=c[W>>2]|0;if(ax>>>0<=Y>>>0){ay=c[W+4>>2]|0;az=ax+ay|0;if(az>>>0>Y>>>0){break}}W=c[W+8>>2]|0}W=ax+(ay-39)|0;if((W&7|0)==0){aA=0}else{aA=-W&7}W=ax+(ay-47+aA)|0;ac=W>>>0<(ad+16|0)>>>0?Y:W;W=ac+8|0;_=ab+8|0;if((_&7|0)==0){aB=0}else{aB=-_&7}_=aa-40-aB|0;c[2922]=ab+aB;c[2919]=_;c[ab+(aB+4)>>2]=_|1;c[ab+(aa-36)>>2]=40;c[2923]=c[2818];c[ac+4>>2]=27;c[W>>2]=c[3028];c[W+4>>2]=c[3029];c[W+8>>2]=c[3030];c[W+12>>2]=c[3031];c[3028]=ab;c[3029]=aa;c[3031]=0;c[3030]=W;W=ac+28|0;c[W>>2]=7;if((ac+32|0)>>>0<az>>>0){_=W;while(1){W=_+4|0;c[W>>2]=7;if((_+8|0)>>>0<az>>>0){_=W}else{break}}}if((ac|0)==(Y|0)){break}_=ac-ad|0;W=Y+(_+4)|0;c[W>>2]=c[W>>2]&-2;c[ad+4>>2]=_|1;c[Y+_>>2]=_;W=_>>>3;if(_>>>0<256>>>0){K=W<<1;Z=11704+(K<<2)|0;S=c[2916]|0;m=1<<W;do{if((S&m|0)==0){c[2916]=S|m;aC=Z;aD=11704+(K+2<<2)|0}else{W=11704+(K+2<<2)|0;Q=c[W>>2]|0;if(Q>>>0>=(c[2920]|0)>>>0){aC=Q;aD=W;break}bA();return 0}}while(0);c[aD>>2]=ad;c[aC+12>>2]=ad;c[ad+8>>2]=aC;c[ad+12>>2]=Z;break}K=ad;m=_>>>8;do{if((m|0)==0){aE=0}else{if(_>>>0>16777215>>>0){aE=31;break}S=(m+1048320|0)>>>16&8;Y=m<<S;ac=(Y+520192|0)>>>16&4;W=Y<<ac;Y=(W+245760|0)>>>16&2;Q=14-(ac|S|Y)+(W<<Y>>>15)|0;aE=_>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=11968+(aE<<2)|0;c[ad+28>>2]=aE;c[ad+20>>2]=0;c[ad+16>>2]=0;Z=c[2917]|0;Q=1<<aE;if((Z&Q|0)==0){c[2917]=Z|Q;c[m>>2]=K;c[ad+24>>2]=m;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}if((aE|0)==31){aF=0}else{aF=25-(aE>>>1)|0}Q=_<<aF;Z=c[m>>2]|0;while(1){if((c[Z+4>>2]&-8|0)==(_|0)){break}aG=Z+16+(Q>>>31<<2)|0;m=c[aG>>2]|0;if((m|0)==0){T=2436;break}else{Q=Q<<1;Z=m}}if((T|0)==2436){if(aG>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[aG>>2]=K;c[ad+24>>2]=Z;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}}Q=Z+8|0;_=c[Q>>2]|0;m=c[2920]|0;if(Z>>>0<m>>>0){bA();return 0}if(_>>>0<m>>>0){bA();return 0}else{c[_+12>>2]=K;c[Q>>2]=K;c[ad+8>>2]=_;c[ad+12>>2]=Z;c[ad+24>>2]=0;break}}}while(0);ad=c[2919]|0;if(ad>>>0<=o>>>0){break}_=ad-o|0;c[2919]=_;ad=c[2922]|0;Q=ad;c[2922]=Q+o;c[Q+(o+4)>>2]=_|1;c[ad+4>>2]=o|3;n=ad+8|0;return n|0}}while(0);c[(bp()|0)>>2]=12;n=0;return n|0}function dc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[2920]|0;if(b>>>0<e>>>0){bA()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){bA()}h=f&-8;i=a+(h-8)|0;j=i;L3366:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){bA()}if((n|0)==(c[2921]|0)){p=a+(h-4)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[2918]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256>>>0){k=c[a+(l+8)>>2]|0;s=c[a+(l+12)>>2]|0;t=11704+(p<<1<<2)|0;do{if((k|0)!=(t|0)){if(k>>>0<e>>>0){bA()}if((c[k+12>>2]|0)==(n|0)){break}bA()}}while(0);if((s|0)==(k|0)){c[2916]=c[2916]&~(1<<p);q=n;r=o;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<e>>>0){bA()}v=s+8|0;if((c[v>>2]|0)==(n|0)){u=v;break}bA()}}while(0);c[k+12>>2]=s;c[u>>2]=k;q=n;r=o;break}t=m;p=c[a+(l+24)>>2]|0;v=c[a+(l+12)>>2]|0;do{if((v|0)==(t|0)){w=a+(l+20)|0;x=c[w>>2]|0;if((x|0)==0){y=a+(l+16)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break}else{B=z;C=y}}else{B=x;C=w}while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){B=x;C=w;continue}w=B+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=x;C=w}}if(C>>>0<e>>>0){bA()}else{c[C>>2]=0;A=B;break}}else{w=c[a+(l+8)>>2]|0;if(w>>>0<e>>>0){bA()}x=w+12|0;if((c[x>>2]|0)!=(t|0)){bA()}y=v+8|0;if((c[y>>2]|0)==(t|0)){c[x>>2]=v;c[y>>2]=w;A=v;break}else{bA()}}}while(0);if((p|0)==0){q=n;r=o;break}v=a+(l+28)|0;m=11968+(c[v>>2]<<2)|0;do{if((t|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[2917]=c[2917]&~(1<<c[v>>2]);q=n;r=o;break L3366}else{if(p>>>0<(c[2920]|0)>>>0){bA()}k=p+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break L3366}}}while(0);if(A>>>0<(c[2920]|0)>>>0){bA()}c[A+24>>2]=p;t=c[a+(l+16)>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[2920]|0)>>>0){bA()}else{c[A+16>>2]=t;c[t+24>>2]=A;break}}}while(0);t=c[a+(l+20)>>2]|0;if((t|0)==0){q=n;r=o;break}if(t>>>0<(c[2920]|0)>>>0){bA()}else{c[A+20>>2]=t;c[t+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){bA()}A=a+(h-4)|0;e=c[A>>2]|0;if((e&1|0)==0){bA()}do{if((e&2|0)==0){if((j|0)==(c[2922]|0)){B=(c[2919]|0)+r|0;c[2919]=B;c[2922]=q;c[q+4>>2]=B|1;if((q|0)!=(c[2921]|0)){return}c[2921]=0;c[2918]=0;return}if((j|0)==(c[2921]|0)){B=(c[2918]|0)+r|0;c[2918]=B;c[2921]=q;c[q+4>>2]=B|1;c[d+B>>2]=B;return}B=(e&-8)+r|0;C=e>>>3;L3469:do{if(e>>>0<256>>>0){u=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=11704+(C<<1<<2)|0;do{if((u|0)!=(b|0)){if(u>>>0<(c[2920]|0)>>>0){bA()}if((c[u+12>>2]|0)==(j|0)){break}bA()}}while(0);if((g|0)==(u|0)){c[2916]=c[2916]&~(1<<C);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[2920]|0)>>>0){bA()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}bA()}}while(0);c[u+12>>2]=g;c[D>>2]=u}else{b=i;f=c[a+(h+16)>>2]|0;t=c[a+(h|4)>>2]|0;do{if((t|0)==(b|0)){p=a+(h+12)|0;v=c[p>>2]|0;if((v|0)==0){m=a+(h+8)|0;k=c[m>>2]|0;if((k|0)==0){E=0;break}else{F=k;G=m}}else{F=v;G=p}while(1){p=F+20|0;v=c[p>>2]|0;if((v|0)!=0){F=v;G=p;continue}p=F+16|0;v=c[p>>2]|0;if((v|0)==0){break}else{F=v;G=p}}if(G>>>0<(c[2920]|0)>>>0){bA()}else{c[G>>2]=0;E=F;break}}else{p=c[a+h>>2]|0;if(p>>>0<(c[2920]|0)>>>0){bA()}v=p+12|0;if((c[v>>2]|0)!=(b|0)){bA()}m=t+8|0;if((c[m>>2]|0)==(b|0)){c[v>>2]=t;c[m>>2]=p;E=t;break}else{bA()}}}while(0);if((f|0)==0){break}t=a+(h+20)|0;u=11968+(c[t>>2]<<2)|0;do{if((b|0)==(c[u>>2]|0)){c[u>>2]=E;if((E|0)!=0){break}c[2917]=c[2917]&~(1<<c[t>>2]);break L3469}else{if(f>>>0<(c[2920]|0)>>>0){bA()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break L3469}}}while(0);if(E>>>0<(c[2920]|0)>>>0){bA()}c[E+24>>2]=f;b=c[a+(h+8)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[2920]|0)>>>0){bA()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[2920]|0)>>>0){bA()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=B|1;c[d+B>>2]=B;if((q|0)!=(c[2921]|0)){H=B;break}c[2918]=B;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);r=H>>>3;if(H>>>0<256>>>0){d=r<<1;e=11704+(d<<2)|0;A=c[2916]|0;E=1<<r;do{if((A&E|0)==0){c[2916]=A|E;I=e;J=11704+(d+2<<2)|0}else{r=11704+(d+2<<2)|0;h=c[r>>2]|0;if(h>>>0>=(c[2920]|0)>>>0){I=h;J=r;break}bA()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=e;return}e=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215>>>0){K=31;break}J=(I+1048320|0)>>>16&8;d=I<<J;E=(d+520192|0)>>>16&4;A=d<<E;d=(A+245760|0)>>>16&2;r=14-(E|J|d)+(A<<d>>>15)|0;K=H>>>((r+7|0)>>>0)&1|r<<1}}while(0);I=11968+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;r=c[2917]|0;d=1<<K;do{if((r&d|0)==0){c[2917]=r|d;c[I>>2]=e;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}A=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(A>>>31<<2)|0;E=c[M>>2]|0;if((E|0)==0){N=2613;break}else{A=A<<1;J=E}}if((N|0)==2613){if(M>>>0<(c[2920]|0)>>>0){bA()}else{c[M>>2]=e;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}A=J+8|0;B=c[A>>2]|0;E=c[2920]|0;if(J>>>0<E>>>0){bA()}if(B>>>0<E>>>0){bA()}else{c[B+12>>2]=e;c[A>>2]=e;c[q+8>>2]=B;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[2924]|0)-1|0;c[2924]=q;if((q|0)==0){O=12120}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[2924]=-1;return}function dd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;if((a|0)==0){d=db(b)|0;return d|0}if(b>>>0>4294967231>>>0){c[(bp()|0)>>2]=12;d=0;return d|0}if(b>>>0<11>>>0){e=16}else{e=b+11&-8}f=a-8|0;g=a-4|0;h=c[g>>2]|0;i=h&-8;j=i-8|0;k=a+j|0;l=k;m=c[2920]|0;if(f>>>0<m>>>0){bA();return 0}n=h&3;if(!((n|0)!=1&(j|0)>-8)){bA();return 0}j=i|4;o=a+(j-8)|0;p=c[o>>2]|0;if((p&1|0)==0){bA();return 0}L3604:do{if((n|0)==0){if(e>>>0<256>>>0|i>>>0<(e|4)>>>0){break}if((i-e|0)>>>0>c[2816]<<1>>>0|(f|0)==0){break}else{d=a}return d|0}else{do{if(i>>>0<e>>>0){if((l|0)==(c[2922]|0)){q=(c[2919]|0)+i|0;if(q>>>0<=e>>>0){break L3604}r=q-e|0;c[g>>2]=h&1|e|2;c[a+((e|4)-8)>>2]=r|1;c[2922]=a+(e-8);c[2919]=r;break}if((l|0)==(c[2921]|0)){r=(c[2918]|0)+i|0;if(r>>>0<e>>>0){break L3604}q=r-e|0;if(q>>>0>15>>>0){c[g>>2]=h&1|e|2;c[a+((e|4)-8)>>2]=q|1;c[a+(r-8)>>2]=q;s=a+(r-4)|0;c[s>>2]=c[s>>2]&-2;t=a+(e-8)|0;u=q}else{c[g>>2]=h&1|r|2;q=a+(r-4)|0;c[q>>2]=c[q>>2]|1;t=0;u=0}c[2918]=u;c[2921]=t;break}if((p&2|0)!=0){break L3604}q=(p&-8)+i|0;if(q>>>0<e>>>0){break L3604}r=q-e|0;s=p>>>3;L3625:do{if(p>>>0<256>>>0){v=c[a+i>>2]|0;w=c[a+j>>2]|0;x=11704+(s<<1<<2)|0;do{if((v|0)!=(x|0)){if(v>>>0<m>>>0){bA();return 0}if((c[v+12>>2]|0)==(l|0)){break}bA();return 0}}while(0);if((w|0)==(v|0)){c[2916]=c[2916]&~(1<<s);break}do{if((w|0)==(x|0)){y=w+8|0}else{if(w>>>0<m>>>0){bA();return 0}z=w+8|0;if((c[z>>2]|0)==(l|0)){y=z;break}bA();return 0}}while(0);c[v+12>>2]=w;c[y>>2]=v}else{x=k;z=c[a+(i+16)>>2]|0;A=c[a+j>>2]|0;do{if((A|0)==(x|0)){B=a+(i+12)|0;C=c[B>>2]|0;if((C|0)==0){D=a+(i+8)|0;E=c[D>>2]|0;if((E|0)==0){F=0;break}else{G=E;H=D}}else{G=C;H=B}while(1){B=G+20|0;C=c[B>>2]|0;if((C|0)!=0){G=C;H=B;continue}B=G+16|0;C=c[B>>2]|0;if((C|0)==0){break}else{G=C;H=B}}if(H>>>0<m>>>0){bA();return 0}else{c[H>>2]=0;F=G;break}}else{B=c[a+i>>2]|0;if(B>>>0<m>>>0){bA();return 0}C=B+12|0;if((c[C>>2]|0)!=(x|0)){bA();return 0}D=A+8|0;if((c[D>>2]|0)==(x|0)){c[C>>2]=A;c[D>>2]=B;F=A;break}else{bA();return 0}}}while(0);if((z|0)==0){break}A=a+(i+20)|0;v=11968+(c[A>>2]<<2)|0;do{if((x|0)==(c[v>>2]|0)){c[v>>2]=F;if((F|0)!=0){break}c[2917]=c[2917]&~(1<<c[A>>2]);break L3625}else{if(z>>>0<(c[2920]|0)>>>0){bA();return 0}w=z+16|0;if((c[w>>2]|0)==(x|0)){c[w>>2]=F}else{c[z+20>>2]=F}if((F|0)==0){break L3625}}}while(0);if(F>>>0<(c[2920]|0)>>>0){bA();return 0}c[F+24>>2]=z;x=c[a+(i+8)>>2]|0;do{if((x|0)!=0){if(x>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[F+16>>2]=x;c[x+24>>2]=F;break}}}while(0);x=c[a+(i+12)>>2]|0;if((x|0)==0){break}if(x>>>0<(c[2920]|0)>>>0){bA();return 0}else{c[F+20>>2]=x;c[x+24>>2]=F;break}}}while(0);if(r>>>0>=16>>>0){c[g>>2]=c[g>>2]&1|e|2;c[a+((e|4)-8)>>2]=r|3;s=a+((q|4)-8)|0;c[s>>2]=c[s>>2]|1;de(a+(e-8)|0,r);break}c[g>>2]=q|c[g>>2]&1|2;s=a+((q|4)-8)|0;c[s>>2]=c[s>>2]|1;d=a;return d|0}else{s=i-e|0;if(s>>>0<=15>>>0){break}c[g>>2]=h&1|e|2;c[a+((e|4)-8)>>2]=s|3;c[o>>2]=c[o>>2]|1;de(a+(e-8)|0,s);d=a;return d|0}}while(0);if((f|0)==0){break}else{d=a}return d|0}}while(0);f=db(b)|0;if((f|0)==0){d=0;return d|0}e=c[g>>2]|0;g=(e&-8)-((e&3|0)==0?8:4)|0;e=g>>>0<b>>>0?g:b;dg(f|0,a|0,e)|0;dc(a);d=f;return d|0}function de(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;d=a;e=d+b|0;f=e;g=c[a+4>>2]|0;L1:do{if((g&1|0)==0){h=c[a>>2]|0;if((g&3|0)==0){return}i=d+(-h|0)|0;j=i;k=h+b|0;l=c[2920]|0;if(i>>>0<l>>>0){bA()}if((j|0)==(c[2921]|0)){m=d+(b+4)|0;if((c[m>>2]&3|0)!=3){n=j;o=k;break}c[2918]=k;c[m>>2]=c[m>>2]&-2;c[d+(4-h)>>2]=k|1;c[e>>2]=k;return}m=h>>>3;if(h>>>0<256>>>0){p=c[d+(8-h)>>2]|0;q=c[d+(12-h)>>2]|0;r=11704+(m<<1<<2)|0;do{if((p|0)!=(r|0)){if(p>>>0<l>>>0){bA()}if((c[p+12>>2]|0)==(j|0)){break}bA()}}while(0);if((q|0)==(p|0)){c[2916]=c[2916]&~(1<<m);n=j;o=k;break}do{if((q|0)==(r|0)){s=q+8|0}else{if(q>>>0<l>>>0){bA()}t=q+8|0;if((c[t>>2]|0)==(j|0)){s=t;break}bA()}}while(0);c[p+12>>2]=q;c[s>>2]=p;n=j;o=k;break}r=i;m=c[d+(24-h)>>2]|0;t=c[d+(12-h)>>2]|0;do{if((t|0)==(r|0)){u=16-h|0;v=d+(u+4)|0;w=c[v>>2]|0;if((w|0)==0){x=d+u|0;u=c[x>>2]|0;if((u|0)==0){y=0;break}else{z=u;A=x}}else{z=w;A=v}while(1){v=z+20|0;w=c[v>>2]|0;if((w|0)!=0){z=w;A=v;continue}v=z+16|0;w=c[v>>2]|0;if((w|0)==0){break}else{z=w;A=v}}if(A>>>0<l>>>0){bA()}else{c[A>>2]=0;y=z;break}}else{v=c[d+(8-h)>>2]|0;if(v>>>0<l>>>0){bA()}w=v+12|0;if((c[w>>2]|0)!=(r|0)){bA()}x=t+8|0;if((c[x>>2]|0)==(r|0)){c[w>>2]=t;c[x>>2]=v;y=t;break}else{bA()}}}while(0);if((m|0)==0){n=j;o=k;break}t=d+(28-h)|0;l=11968+(c[t>>2]<<2)|0;do{if((r|0)==(c[l>>2]|0)){c[l>>2]=y;if((y|0)!=0){break}c[2917]=c[2917]&~(1<<c[t>>2]);n=j;o=k;break L1}else{if(m>>>0<(c[2920]|0)>>>0){bA()}i=m+16|0;if((c[i>>2]|0)==(r|0)){c[i>>2]=y}else{c[m+20>>2]=y}if((y|0)==0){n=j;o=k;break L1}}}while(0);if(y>>>0<(c[2920]|0)>>>0){bA()}c[y+24>>2]=m;r=16-h|0;t=c[d+r>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[2920]|0)>>>0){bA()}else{c[y+16>>2]=t;c[t+24>>2]=y;break}}}while(0);t=c[d+(r+4)>>2]|0;if((t|0)==0){n=j;o=k;break}if(t>>>0<(c[2920]|0)>>>0){bA()}else{c[y+20>>2]=t;c[t+24>>2]=y;n=j;o=k;break}}else{n=a;o=b}}while(0);a=c[2920]|0;if(e>>>0<a>>>0){bA()}y=d+(b+4)|0;z=c[y>>2]|0;do{if((z&2|0)==0){if((f|0)==(c[2922]|0)){A=(c[2919]|0)+o|0;c[2919]=A;c[2922]=n;c[n+4>>2]=A|1;if((n|0)!=(c[2921]|0)){return}c[2921]=0;c[2918]=0;return}if((f|0)==(c[2921]|0)){A=(c[2918]|0)+o|0;c[2918]=A;c[2921]=n;c[n+4>>2]=A|1;c[n+A>>2]=A;return}A=(z&-8)+o|0;s=z>>>3;L100:do{if(z>>>0<256>>>0){g=c[d+(b+8)>>2]|0;t=c[d+(b+12)>>2]|0;h=11704+(s<<1<<2)|0;do{if((g|0)!=(h|0)){if(g>>>0<a>>>0){bA()}if((c[g+12>>2]|0)==(f|0)){break}bA()}}while(0);if((t|0)==(g|0)){c[2916]=c[2916]&~(1<<s);break}do{if((t|0)==(h|0)){B=t+8|0}else{if(t>>>0<a>>>0){bA()}m=t+8|0;if((c[m>>2]|0)==(f|0)){B=m;break}bA()}}while(0);c[g+12>>2]=t;c[B>>2]=g}else{h=e;m=c[d+(b+24)>>2]|0;l=c[d+(b+12)>>2]|0;do{if((l|0)==(h|0)){i=d+(b+20)|0;p=c[i>>2]|0;if((p|0)==0){q=d+(b+16)|0;v=c[q>>2]|0;if((v|0)==0){C=0;break}else{D=v;E=q}}else{D=p;E=i}while(1){i=D+20|0;p=c[i>>2]|0;if((p|0)!=0){D=p;E=i;continue}i=D+16|0;p=c[i>>2]|0;if((p|0)==0){break}else{D=p;E=i}}if(E>>>0<a>>>0){bA()}else{c[E>>2]=0;C=D;break}}else{i=c[d+(b+8)>>2]|0;if(i>>>0<a>>>0){bA()}p=i+12|0;if((c[p>>2]|0)!=(h|0)){bA()}q=l+8|0;if((c[q>>2]|0)==(h|0)){c[p>>2]=l;c[q>>2]=i;C=l;break}else{bA()}}}while(0);if((m|0)==0){break}l=d+(b+28)|0;g=11968+(c[l>>2]<<2)|0;do{if((h|0)==(c[g>>2]|0)){c[g>>2]=C;if((C|0)!=0){break}c[2917]=c[2917]&~(1<<c[l>>2]);break L100}else{if(m>>>0<(c[2920]|0)>>>0){bA()}t=m+16|0;if((c[t>>2]|0)==(h|0)){c[t>>2]=C}else{c[m+20>>2]=C}if((C|0)==0){break L100}}}while(0);if(C>>>0<(c[2920]|0)>>>0){bA()}c[C+24>>2]=m;h=c[d+(b+16)>>2]|0;do{if((h|0)!=0){if(h>>>0<(c[2920]|0)>>>0){bA()}else{c[C+16>>2]=h;c[h+24>>2]=C;break}}}while(0);h=c[d+(b+20)>>2]|0;if((h|0)==0){break}if(h>>>0<(c[2920]|0)>>>0){bA()}else{c[C+20>>2]=h;c[h+24>>2]=C;break}}}while(0);c[n+4>>2]=A|1;c[n+A>>2]=A;if((n|0)!=(c[2921]|0)){F=A;break}c[2918]=A;return}else{c[y>>2]=z&-2;c[n+4>>2]=o|1;c[n+o>>2]=o;F=o}}while(0);o=F>>>3;if(F>>>0<256>>>0){z=o<<1;y=11704+(z<<2)|0;C=c[2916]|0;b=1<<o;do{if((C&b|0)==0){c[2916]=C|b;G=y;H=11704+(z+2<<2)|0}else{o=11704+(z+2<<2)|0;d=c[o>>2]|0;if(d>>>0>=(c[2920]|0)>>>0){G=d;H=o;break}bA()}}while(0);c[H>>2]=n;c[G+12>>2]=n;c[n+8>>2]=G;c[n+12>>2]=y;return}y=n;G=F>>>8;do{if((G|0)==0){I=0}else{if(F>>>0>16777215>>>0){I=31;break}H=(G+1048320|0)>>>16&8;z=G<<H;b=(z+520192|0)>>>16&4;C=z<<b;z=(C+245760|0)>>>16&2;o=14-(b|H|z)+(C<<z>>>15)|0;I=F>>>((o+7|0)>>>0)&1|o<<1}}while(0);G=11968+(I<<2)|0;c[n+28>>2]=I;c[n+20>>2]=0;c[n+16>>2]=0;o=c[2917]|0;z=1<<I;if((o&z|0)==0){c[2917]=o|z;c[G>>2]=y;c[n+24>>2]=G;c[n+12>>2]=n;c[n+8>>2]=n;return}if((I|0)==31){J=0}else{J=25-(I>>>1)|0}I=F<<J;J=c[G>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(F|0)){break}K=J+16+(I>>>31<<2)|0;G=c[K>>2]|0;if((G|0)==0){L=126;break}else{I=I<<1;J=G}}if((L|0)==126){if(K>>>0<(c[2920]|0)>>>0){bA()}c[K>>2]=y;c[n+24>>2]=J;c[n+12>>2]=n;c[n+8>>2]=n;return}K=J+8|0;L=c[K>>2]|0;I=c[2920]|0;if(J>>>0<I>>>0){bA()}if(L>>>0<I>>>0){bA()}c[L+12>>2]=y;c[K>>2]=y;c[n+8>>2]=L;c[n+12>>2]=J;c[n+24>>2]=0;return}function df(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function dg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function dh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;e=b&3;g=d|d<<8|d<<16|d<<24;h=f&~3;if(e){e=b+4-e|0;while((b|0)<(e|0)){a[b]=d;b=b+1|0}}while((b|0)<(h|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}}function di(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return(D=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function dj(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return(D=e,a-c>>>0|0)|0}function dk(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}D=a<<c-32;return 0}function dl(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}D=0;return b>>>c-32|0}function dm(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}D=(b|0)<0?-1:0;return b>>c-32|0}function dn(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function dp(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function dq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=$(d,c)|0;f=a>>>16;a=(e>>>16)+($(d,f)|0)|0;d=b>>>16;b=$(d,c)|0;return(D=(a>>>16)+($(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function dr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=dj(e^a,f^b,e,f)|0;b=D;a=g^e;e=h^f;f=dj((dw(i,b,dj(g^c,h^d,g,h)|0,D,0)|0)^a,D^e,a,e)|0;return(D=D,f)|0}function ds(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=dj(h^a,j^b,h,j)|0;b=D;a=dj(k^d,l^e,k,l)|0;dw(m,b,a,D,g)|0;a=dj(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=D;i=f;return(D=j,a)|0}function dt(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=dq(e,a)|0;f=D;return(D=($(b,a)|0)+($(d,e)|0)+f|f&0,c|0|0)|0}function du(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=dw(a,b,c,d,0)|0;return(D=D,e)|0}function dv(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;dw(a,b,d,e,g)|0;i=f;return(D=c[g+4>>2]|0,c[g>>2]|0)|0}function dw(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(D=n,o)|0}else{if(!m){n=0;o=0;return(D=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;o=0;return(D=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(D=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(D=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=a|0;c[f+4>>2]=p&i|b&0}n=0;o=i>>>((dp(l|0)|0)>>>0);return(D=n,o)|0}p=(dn(l|0)|0)-(dn(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(D=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(D=n,o)|0}else{if(!m){r=(dn(l|0)|0)-(dn(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(D=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(D=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=(dn(j|0)|0)+33-(dn(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=a|0|0;return(D=n,o)|0}else{p=dp(j|0)|0;n=i>>>(p>>>0)|0;o=i<<32-p|g>>>(p>>>0)|0;return(D=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;E=u;F=t;G=0;H=0}else{g=d|0|0;d=k|e&0;e=di(g,d,-1,-1)|0;k=D;i=w;w=v;v=u;u=t;t=s;s=0;while(1){I=w>>>31|i<<1;J=s|w<<1;j=u<<1|i>>>31|0;a=u>>>31|v<<1|0;dj(e,k,j,a)|0;b=D;h=b>>31|((b|0)<0?-1:0)<<1;K=h&1;L=dj(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d)|0;M=D;b=t-1|0;if((b|0)==0){break}else{i=I;w=J;v=M;u=L;t=b;s=K}}B=I;C=J;E=M;F=L;G=0;H=K}K=C;C=0;if((f|0)!=0){c[f>>2]=F;c[f+4>>2]=E}n=(K|0)>>>31|(B|C)<<1|(C<<1|K>>>31)&0|G;o=(K<<1|0>>>31)&-2|H;return(D=n,o)|0}function dx(a,b){a=a|0;b=b|0;return bV[a&1](b|0)|0}function dy(a,b,c){a=a|0;b=b|0;c=+c;bW[a&7](b|0,+c)}function dz(a,b){a=a|0;b=+b;bX[a&3](+b)}function dA(a,b){a=a|0;b=b|0;bY[a&15](b|0)}function dB(a,b,c){a=a|0;b=b|0;c=c|0;bZ[a&31](b|0,c|0)}function dC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return b_[a&1](b|0,c|0,d|0,e|0,f|0)|0}function dD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;b$[a&3](b|0,c|0,d|0)}function dE(a){a=a|0;b0[a&7]()}function dF(a,b,c){a=a|0;b=b|0;c=c|0;return b1[a&1](b|0,c|0)|0}function dG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;return b2[a&7](b|0,c|0,+d,e|0)|0}function dH(a){a=a|0;aa(0);return 0}function dI(a,b){a=a|0;b=+b;aa(1)}function dJ(a){a=+a;aa(2)}function dK(a){a=a|0;aa(3)}function dL(a,b){a=a|0;b=b|0;aa(4)}function dM(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;aa(5);return 0}function dN(a,b,c){a=a|0;b=b|0;c=c|0;aa(6)}function dO(){aa(7)}function dP(a,b){a=a|0;b=b|0;aa(8);return 0}function dQ(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;aa(9);return 0}
// EMSCRIPTEN_END_FUNCS
var bV=[dH,dH];var bW=[dI,dI,cK,dI,c4,dI,c6,dI];var bX=[dJ,dJ,c3,dJ];var bY=[dK,dK,cW,dK,cU,dK,c5,dK,cJ,dK,cR,dK,c2,dK,dK,dK];var bZ=[dL,dL,cS,dL,cX,dL,cQ,dL,cV,dL,cZ,dL,cN,dL,cY,dL,c_,dL,c0,dL,cP,dL,dL,dL,dL,dL,dL,dL,dL,dL,dL,dL];var b_=[dM,dM];var b$=[dN,dN,cA,dN];var b0=[dO,dO,c7,dO,c8,dO,cu,dO];var b1=[dP,dP];var b2=[dQ,dQ,cO,dQ,cT,dQ,dQ,dQ];return{_strlen:df,_free:dc,_main:da,_realloc:dd,_memset:dh,_malloc:db,_memcpy:dg,runPostSets:cj,stackAlloc:b3,stackSave:b4,stackRestore:b5,setThrew:b6,setTempRet0:b9,setTempRet1:ca,setTempRet2:cb,setTempRet3:cc,setTempRet4:cd,setTempRet5:ce,setTempRet6:cf,setTempRet7:cg,setTempRet8:ch,setTempRet9:ci,dynCall_ii:dx,dynCall_vif:dy,dynCall_vf:dz,dynCall_vi:dA,dynCall_vii:dB,dynCall_iiiiii:dC,dynCall_viii:dD,dynCall_v:dE,dynCall_iii:dF,dynCall_iiifi:dG}})
// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_ii": invoke_ii, "invoke_vif": invoke_vif, "invoke_vf": invoke_vf, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_iiiiii": invoke_iiiiii, "invoke_viii": invoke_viii, "invoke_v": invoke_v, "invoke_iii": invoke_iii, "invoke_iiifi": invoke_iiifi, "_llvm_lifetime_end": _llvm_lifetime_end, "_lseek": _lseek, "__scanString": __scanString, "_fclose": _fclose, "_glLinkProgram": _glLinkProgram, "_glBindTexture": _glBindTexture, "_fflush": _fflush, "_SDL_GetMouseState": _SDL_GetMouseState, "_fputc": _fputc, "_glGetString": _glGetString, "_fwrite": _fwrite, "_send": _send, "_fputs": _fputs, "_glCompileShader": _glCompileShader, "_read": _read, "_fsync": _fsync, "_glGenTextures": _glGenTextures, "_SDL_PauseAudio": _SDL_PauseAudio, "_glCreateShader": _glCreateShader, "_strcmp": _strcmp, "_glUniform1i": _glUniform1i, "_strncmp": _strncmp, "_snprintf": _snprintf, "_fgetc": _fgetc, "_glGetProgramiv": _glGetProgramiv, "_glVertexAttribPointer": _glVertexAttribPointer, "__getFloat": __getFloat, "_mknod": _mknod, "_SDL_GetKeyboardState": _SDL_GetKeyboardState, "_close": _close, "___setErrNo": ___setErrNo, "_glDrawArrays": _glDrawArrays, "_ftell": _ftell, "_glDeleteProgram": _glDeleteProgram, "_sprintf": _sprintf, "_glAttachShader": _glAttachShader, "_llvm_uadd_with_overflow_i32": _llvm_uadd_with_overflow_i32, "_printf": _printf, "_recv": _recv, "_SDL_GL_SwapBuffers": _SDL_GL_SwapBuffers, "_glBufferSubData": _glBufferSubData, "_puts": _puts, "_SDL_Init": _SDL_Init, "_glGetShaderiv": _glGetShaderiv, "_rand": _rand, "_fabsf": _fabsf, "_glShaderSource": _glShaderSource, "_pread": _pread, "_SDL_SetVideoMode": _SDL_SetVideoMode, "_fopen": _fopen, "_open": _open, "_sqrtf": _sqrtf, "_SDL_PollEvent": _SDL_PollEvent, "_mkdir": _mkdir, "_glEnableVertexAttribArray": _glEnableVertexAttribArray, "_glBindBuffer": _glBindBuffer, "_SDL_InitSubSystem": _SDL_InitSubSystem, "_SDL_GetError": _SDL_GetError, "_srand": _srand, "_glBufferData": _glBufferData, "__formatString": __formatString, "_gettimeofday": _gettimeofday, "_SDL_WM_SetCaption": _SDL_WM_SetCaption, "_sbrk": _sbrk, "___errno_location": ___errno_location, "_SDL_CloseAudio": _SDL_CloseAudio, "_llvm_lifetime_start": _llvm_lifetime_start, "_SDL_GetKeyState": _SDL_GetKeyState, "_SDL_OpenAudio": _SDL_OpenAudio, "_glUseProgram": _glUseProgram, "_sscanf": _sscanf, "_glTexImage2D": _glTexImage2D, "_sysconf": _sysconf, "_fread": _fread, "_glGetUniformLocation": _glGetUniformLocation, "_abort": _abort, "_fprintf": _fprintf, "_emscripten_asm_const": _emscripten_asm_const, "_glEnable": _glEnable, "__reallyNegative": __reallyNegative, "_fseek": _fseek, "_write": _write, "_glGenBuffers": _glGenBuffers, "_glGetAttribLocation": _glGetAttribLocation, "_rewind": _rewind, "_glDeleteShader": _glDeleteShader, "_glBlendFunc": _glBlendFunc, "_glCreateProgram": _glCreateProgram, "_llvm_trap": _llvm_trap, "_emscripten_set_main_loop": _emscripten_set_main_loop, "_glUniformMatrix4fv": _glUniformMatrix4fv, "_pwrite": _pwrite, "_glTexParameteri": _glTexParameteri, "_glPixelStorei": _glPixelStorei, "_time": _time, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "NaN": NaN, "Infinity": Infinity }, buffer);
var _strlen = Module["_strlen"] = asm["_strlen"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _realloc = Module["_realloc"] = asm["_realloc"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_vif = Module["dynCall_vif"] = asm["dynCall_vif"];
var dynCall_vf = Module["dynCall_vf"] = asm["dynCall_vf"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_iiifi = Module["dynCall_iiifi"] = asm["dynCall_iiifi"];
Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };
// TODO: strip out parts of this we do not need
//======= begin closure i64 code =======
// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */
var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };
  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.
    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };
  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.
  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};
  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }
    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };
  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };
  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };
  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }
    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));
    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };
  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.
  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;
  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);
  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);
  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);
  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);
  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);
  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);
  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };
  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };
  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (this.isZero()) {
      return '0';
    }
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }
    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));
    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);
      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };
  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };
  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };
  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };
  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };
  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };
  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };
  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };
  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }
    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }
    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };
  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };
  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };
  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }
    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }
    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }
    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));
      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);
      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }
      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }
      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };
  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };
  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };
  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };
  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };
  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };
  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };
  //======= begin jsbn =======
  var navigator = { appName: 'Modern Browser' }; // polyfill a little
  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/
  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */
  // Basic JavaScript BN library - subset useful for RSA encryption.
  // Bits per digit
  var dbits;
  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);
  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }
  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }
  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;
  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }
  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }
  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }
  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }
  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }
  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }
  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }
  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }
  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }
  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }
  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }
  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }
  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }
  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }
  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }
  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }
  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }
  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }
  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }
  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }
  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }
  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }
  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;
  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }
  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }
  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;
  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;
  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);
  // jsbn2 stuff
  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }
  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }
  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }
  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }
  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }
  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }
  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;
  //======= end jsbn =======
  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();
//======= end closure i64 code =======
// === Auto-generated postamble setup entry stuff ===
if (memoryInitializer) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    applyData(Module['readBinary'](memoryInitializer));
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      applyData(data);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;
var initialStackTop;
var preloadStartTime = null;
var calledMain = false;
dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}
Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');
  args = args || [];
  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }
  ensureInitRuntime();
  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);
  initialStackTop = STACKTOP;
  try {
    var ret = Module['_main'](argc, argv, 0);
    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}
function run(args) {
  args = args || Module['arguments'];
  if (preloadStartTime === null) preloadStartTime = Date.now();
  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }
  preRun();
  if (runDependencies > 0) {
    // a preRun added a dependency, run will be called later
    return;
  }
  function doRun() {
    ensureInitRuntime();
    preMain();
    Module['calledRun'] = true;
    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }
    postRun();
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;
function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;
  // exit the runtime
  exitRuntime();
  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371
  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;
function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }
  ABORT = true;
  EXITSTATUS = 1;
  throw 'abort() at ' + stackTrace();
}
Module['abort'] = Module.abort = abort;
// {{PRE_RUN_ADDITIONS}}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}
// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}
run();
// {{POST_RUN_ADDITIONS}}
// {{MODULE_ADDITIONS}}
