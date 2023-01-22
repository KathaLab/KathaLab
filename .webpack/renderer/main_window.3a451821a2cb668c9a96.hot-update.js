"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateprojet_kathara"]("main_window",{

/***/ "./src/model/Device.tsx":
/*!******************************!*\
  !*** ./src/model/Device.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar _a;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.setDefaultCommand = exports.devices = exports.deviceToImage = exports.deviceSize = exports.DeviceType = void 0;\nvar DeviceSvg_1 = __webpack_require__(/*! ./DeviceSvg */ \"./src/model/DeviceSvg.tsx\");\nvar DeviceType;\n(function (DeviceType) {\n    DeviceType[\"PC\"] = \"PC\";\n    DeviceType[\"Router\"] = \"R\";\n})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));\nexports.deviceSize = { width: 100, height: 100 };\nexports.deviceToImage = (_a = {},\n    _a[DeviceType.PC] = DeviceSvg_1.laptop,\n    _a[DeviceType.Router] = DeviceSvg_1.router,\n    _a);\nexports.devices = [\n    {\n        deviceName: \"\",\n        type: DeviceType.PC,\n    },\n    {\n        deviceName: \"\",\n        type: DeviceType.Router,\n        default_command: [\n            \"%deviceName%[sysctl]=/proc/sys/net/ipv4/ip_forward=1 \\n\",\n            \"%deviceName%[sysctl]=/proc/sys/net/ipv6/conf/all/forwarding=1 \\n\",\n        ]\n    },\n];\nfunction setDefaultCommand(devices) {\n    return \"\";\n}\nexports.setDefaultCommand = setDefaultCommand;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWwvRGV2aWNlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0ZBQTJDO0FBYzNDLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQix1QkFBUztJQUNULDBCQUFZO0FBQ2QsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCO0FBbUJZLGtCQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUV6QyxxQkFBYTtJQUN4QixHQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUcsa0JBQU07SUFDdkIsR0FBQyxVQUFVLENBQUMsTUFBTSxJQUFHLGtCQUFNO1FBQzNCO0FBRVcsZUFBTyxHQUFhO0lBQy9CO1FBQ0UsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7S0FDcEI7SUFDRDtRQUNFLFVBQVUsRUFBRSxFQUFFO1FBQ2QsSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1FBQ3ZCLGVBQWUsRUFBRTtZQUNmLHlEQUF5RDtZQUN6RCxrRUFBa0U7U0FDbkU7S0FDRjtDQUNGLENBQUM7QUFDRixTQUFnQixpQkFBaUIsQ0FBQyxPQUFrQjtJQUNsRCxPQUFPLEVBQUU7QUFDWCxDQUFDO0FBRkQsOENBRUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZXQta2F0aGFyYS8uL3NyYy9tb2RlbC9EZXZpY2UudHN4Pzg5NTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtsYXB0b3AsIHJvdXRlcn0gZnJvbSBcIi4vRGV2aWNlU3ZnXCI7XG5pbXBvcnQge0ludGVyZmFjZXN9IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IHR5cGUgRGV2aWNlID0ge1xuICBkZXZpY2VOYW1lOiBzdHJpbmdcbiAgdHlwZTogRGV2aWNlVHlwZVxuICBwb3NpdGlvbj86IFBvc2l0aW9uXG4gIGludGVyZmFjZXM/OiBJbnRlcmZhY2VzW11cbiAgZGVmYXVsdF9jb21tYW5kPzogc3RyaW5nW11cbiAgc3RhcnR1cHNfY29tbWFuZHM/OiBzdHJpbmdbXVxuICBzaHV0ZG93bl9jb21tYW5kcz86IHN0cmluZ1tdXG4gIG9wdGlvbmFsX3BhcmFtZXRlcnM/OiBPcHRpb25hbFBhcmFtZXRlcnNcbn07XG5cbmV4cG9ydCBlbnVtIERldmljZVR5cGUge1xuICBQQyA9IFwiUENcIixcbiAgUm91dGVyID0gXCJSXCIsXG59XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsUGFyYW1ldGVycyA9IHtcbiAgaW1hZ2U/OiBzdHJpbmcsXG4gIG1lbW9yeT86IHN0cmluZyxcbiAgY3B1cz86IHN0cmluZyxcbiAgcG9ydD86IHN0cmluZyxcbiAgYnJpZGdlZD86IGJvb2xlYW4sXG4gIGlwdjY/OiBib29sZWFuLFxuICBleGVjPzogc3RyaW5nLFxuICBzeXNjdGw/OiBzdHJpbmcsXG4gIGVudj86IHN0cmluZyxcbiAgc2hlbGw/OiBzdHJpbmcsXG4gIG51bV90ZXJtcz86IG51bWJlcixcbn1cblxuZXhwb3J0IHR5cGUgSW50ZXJmYWNlID0gc3RyaW5nO1xuZXhwb3J0IHR5cGUgUG9zaXRpb24gPSB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XG5cbmV4cG9ydCBjb25zdCBkZXZpY2VTaXplID0geyB3aWR0aDogMTAwLCBoZWlnaHQ6IDEwMCB9O1xuXG5leHBvcnQgY29uc3QgZGV2aWNlVG9JbWFnZTogUmVjb3JkPERldmljZVR5cGUsIHN0cmluZz4gPSB7XG4gIFtEZXZpY2VUeXBlLlBDXTogbGFwdG9wLFxuICBbRGV2aWNlVHlwZS5Sb3V0ZXJdOiByb3V0ZXIsXG59O1xuXG5leHBvcnQgY29uc3QgZGV2aWNlczogRGV2aWNlW10gPSBbXG4gIHtcbiAgICBkZXZpY2VOYW1lOiBcIlwiLFxuICAgIHR5cGU6IERldmljZVR5cGUuUEMsXG4gIH0sXG4gIHtcbiAgICBkZXZpY2VOYW1lOiBcIlwiLFxuICAgIHR5cGU6IERldmljZVR5cGUuUm91dGVyLFxuICAgIGRlZmF1bHRfY29tbWFuZDogW1xuICAgICAgXCIlZGV2aWNlTmFtZSVbc3lzY3RsXT0vcHJvYy9zeXMvbmV0L2lwdjQvaXBfZm9yd2FyZD0xIFxcblwiLFxuICAgICAgXCIlZGV2aWNlTmFtZSVbc3lzY3RsXT0vcHJvYy9zeXMvbmV0L2lwdjYvY29uZi9hbGwvZm9yd2FyZGluZz0xIFxcblwiLFxuICAgIF1cbiAgfSxcbl07XG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdENvbW1hbmQoZGV2aWNlcyA6IERldmljZVtdKXtcbiAgcmV0dXJuIFwiXCJcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/model/Device.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("521da47750ce34f43aa9")
/******/ })();
/******/ 
/******/ }
);