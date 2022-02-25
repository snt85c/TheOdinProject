/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/APIFunctions.js":
/*!*****************************!*\
  !*** ./src/APIFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCoords\": () => (/* binding */ getCoords)\n/* harmony export */ });\nconst APIKEY = 'f01e320c417dd9583e7ed5e57fb13e71'\n\n// function geolocation() {\n//     const getUserGeolocation = () => {\n//         return new Promise((resolve, reject) => {\n//             navigator.geolocation.getCurrentPosition(resolve, reject);\n//         });\n//     }\n\n//     getUserGeolocation()\n//         .then((position) => {\n//             let lat = position.coords.latitude\n//             let lon = position.coords.longitude\n\n//             fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKEY}`, { mode: \"cors\" })\n//                 .then((response) => { return response.json() })\n//                 .then((response) => {\n//                     console.log(response);\n//                     userGeolocation(response)\n//                 })\n//                 .catch((err) => { console.log(err.message) });\n//         }).catch((error) => console.log(error))\n// }\n\n//creates the url for OneCallAPI on openweathermap with custom latitude and longitude\nfunction urlOneCall(lat, lon) {\n    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=standard&exclude=minutely&appid=${APIKEY}`\n}\n\n//gets JSON data from operweathermap, \n//the first is the geolocation API which feeds information on the timezone and latitude\n//the second is OneCallAPI which gives us current weather as well as more data(needs lat and lon from geolocation API) \nasync function getCoords(url) {\n    const response1 = await fetch(url);\n    const geoData = await response1.json();\n\n    const name = geoData[0].name;\n    const country = geoData[0].country;\n    const lat = geoData[0].lat\n    const lon = geoData[0].lon\n\n    const response2 = await fetch(urlOneCall(lat, lon))\n    const weatherData = await response2.json();\n\n    return [name, country, weatherData];\n}\n\n\n\n\n//# sourceURL=webpack://weather_app/./src/APIFunctions.js?");

/***/ }),

/***/ "./src/DOMFunctions.js":
/*!*****************************!*\
  !*** ./src/DOMFunctions.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"search\": () => (/* binding */ search)\n/* harmony export */ });\n/* harmony import */ var _APIFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIFunctions */ \"./src/APIFunctions.js\");\n\n\nconst input = document.getElementById(\"input\")\nconst city = document.getElementById(\"city\")\nconst flag = document.getElementById(\"flag\")\nconst country = document.getElementById(\"country\")\nconst temp = document.getElementById(\"temperature\")\nconst description1 = document.getElementById(\"description1\")\nconst description2 = document.getElementById(\"description2\")\nconst icon = document.getElementById(\"icon\")\nconst time = document.getElementById(\"time\")\n\nlet data = await _APIFunctions__WEBPACK_IMPORTED_MODULE_0__.getCoords(url(input.value));\nconsole.log(data)\ncurrentTemp()\n\n//basic url for search. set for a city if local geolocation is off\nfunction url(value) {\n    value = value == undefined ? \"Aci Castello\" : value == \"\" ? \"Aci Castello\" : value;\n    return `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=f01e320c417dd9583e7ed5e57fb13e71`;\n}\n\n//fetch a new set of data given the search value and populate the screen\nasync function search(value) {\n    data = await _APIFunctions__WEBPACK_IMPORTED_MODULE_0__.getCoords(url(value));\n    console.log(data)\n    currentTemp();\n}\n\n///populate the screen with information\nfunction currentTemp() {\n    city.textContent = data[0]\n    country.textContent = `(${data[1]})`\n    flag.src = 'https://flagcdn.com/w20/' + data[1].toLowerCase() + '.png';\n    temp.textContent = (data[2].current.temp - 273.15).toFixed(1) + '°';\n    description1.textContent = data[2].current.weather[0].main;\n    description2.textContent = data[2].current.weather[0].description;\n    icon.src = 'http://openweathermap.org/img/wn/' + data[2].current.weather[0].icon + '@2x.png'\n    getTime();\n}\n\n//get time for the area selected\nfunction getTime() {\n    let timer = new Date()\n    time.textContent = timer.toLocaleString(\"en-GB\", { timeZone: data[2].timezone });\n    setTimeout(getTime, 1000);\n}\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://weather_app/./src/DOMFunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _APIFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIFunctions */ \"./src/APIFunctions.js\");\n/* harmony import */ var _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMFunctions */ \"./src/DOMFunctions.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__]);\n_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst search = document.getElementById(\"submit\");\nconst input = document.getElementById(\"input\")\nsearch.addEventListener(\"click\", () => {\n    _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.search(input.value)\n})\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://weather_app/./src/index.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackThen = typeof Symbol === "function" ? Symbol("webpack then") : "__webpack_then__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var completeQueue = (queue) => {
/******/ 			if(queue) {
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var completeFunction = (fn) => (!--fn.r && fn());
/******/ 		var queueFunction = (queue, fn) => (queue ? queue.push(fn) : completeFunction(fn));
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackThen]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						completeQueue(queue);
/******/ 						queue = 0;
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						completeQueue(queue);
/******/ 						queue = 0;
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackThen] = (fn, reject) => (queueFunction(queue, fn), dep['catch'](reject));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackThen] = (fn) => (completeFunction(fn));
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue = hasAwait && [];
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var isEvaluating = true;
/******/ 			var nested = false;
/******/ 			var whenAll = (deps, onResolve, onReject) => {
/******/ 				if (nested) return;
/******/ 				nested = true;
/******/ 				onResolve.r += deps.length;
/******/ 				deps.map((dep, i) => (dep[webpackThen](onResolve, onReject)));
/******/ 				nested = false;
/******/ 			};
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = () => (resolve(exports), completeQueue(queue), queue = 0);
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackThen] = (fn, rejectFn) => {
/******/ 				if (isEvaluating) { return completeFunction(fn); }
/******/ 				if (currentDeps) whenAll(currentDeps, fn, rejectFn);
/******/ 				queueFunction(queue, fn);
/******/ 				promise['catch'](rejectFn);
/******/ 			};
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve, reject) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					whenAll(currentDeps, fn, reject);
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => (err && reject(promise[webpackError] = err), outerResolve()));
/******/ 			isEvaluating = false;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;