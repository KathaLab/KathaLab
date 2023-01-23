"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateprojet_kathara"]("splash",{

/***/ "./src/model/Device.tsx":
/*!******************************!*\
  !*** ./src/model/Device.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar _a;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.devices = exports.deviceToImage = exports.deviceSize = exports.DeviceType = void 0;\nvar DeviceSvg_1 = __webpack_require__(/*! ./DeviceSvg */ \"./src/model/DeviceSvg.tsx\");\nvar DeviceType;\n(function (DeviceType) {\n    DeviceType[\"PC\"] = \"PC\";\n    DeviceType[\"Router\"] = \"R\";\n})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));\nexports.deviceSize = { width: 100, height: 100 };\nexports.deviceToImage = (_a = {},\n    _a[DeviceType.PC] = DeviceSvg_1.laptop,\n    _a[DeviceType.Router] = DeviceSvg_1.router,\n    _a);\nexports.devices = [\n    {\n        deviceName: \"\",\n        type: DeviceType.PC,\n    },\n    {\n        deviceName: \"\",\n        type: DeviceType.Router,\n        optional_parameters: { sysctl: 'net.ipv4.ip_forward=1' }\n    },\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWwvRGV2aWNlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0ZBQTJDO0FBYTNDLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQix1QkFBUztJQUNULDBCQUFZO0FBQ2QsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCO0FBbUJZLGtCQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUV6QyxxQkFBYTtJQUN4QixHQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUcsa0JBQU07SUFDdkIsR0FBQyxVQUFVLENBQUMsTUFBTSxJQUFHLGtCQUFNO1FBQzNCO0FBRVcsZUFBTyxHQUFhO0lBQy9CO1FBQ0UsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7S0FDcEI7SUFDRDtRQUNFLFVBQVUsRUFBRSxFQUFFO1FBQ2QsSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1FBQ3ZCLG1CQUFtQixFQUFHLEVBQUMsTUFBTSxFQUFFLHVCQUF1QixFQUFDO0tBQ3hEO0NBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2pldC1rYXRoYXJhLy4vc3JjL21vZGVsL0RldmljZS50c3g/ODk1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2xhcHRvcCwgcm91dGVyfSBmcm9tIFwiLi9EZXZpY2VTdmdcIjtcbmltcG9ydCB7SW50ZXJmYWNlc30gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgdHlwZSBEZXZpY2UgPSB7XG4gIGRldmljZU5hbWU6IHN0cmluZ1xuICB0eXBlOiBEZXZpY2VUeXBlXG4gIHBvc2l0aW9uPzogUG9zaXRpb25cbiAgaW50ZXJmYWNlcz86IEludGVyZmFjZXNbXVxuICBzdGFydHVwc19jb21tYW5kcz86IHN0cmluZ1tdXG4gIHNodXRkb3duX2NvbW1hbmRzPzogc3RyaW5nW11cbiAgb3B0aW9uYWxfcGFyYW1ldGVycz86IE9wdGlvbmFsUGFyYW1ldGVyc1xufTtcblxuZXhwb3J0IGVudW0gRGV2aWNlVHlwZSB7XG4gIFBDID0gXCJQQ1wiLFxuICBSb3V0ZXIgPSBcIlJcIixcbn1cblxuZXhwb3J0IHR5cGUgT3B0aW9uYWxQYXJhbWV0ZXJzID0ge1xuICBpbWFnZT86IHN0cmluZyxcbiAgbWVtb3J5Pzogc3RyaW5nLFxuICBjcHVzPzogc3RyaW5nLFxuICBwb3J0Pzogc3RyaW5nLFxuICBicmlkZ2VkPzogYm9vbGVhbixcbiAgaXB2Nj86IGJvb2xlYW4sXG4gIGV4ZWM/OiBzdHJpbmcsXG4gIHN5c2N0bD86IHN0cmluZyxcbiAgZW52Pzogc3RyaW5nLFxuICBzaGVsbD86IHN0cmluZyxcbiAgbnVtX3Rlcm1zPzogbnVtYmVyLFxufVxuXG5leHBvcnQgdHlwZSBJbnRlcmZhY2UgPSBzdHJpbmc7XG5leHBvcnQgdHlwZSBQb3NpdGlvbiA9IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcblxuZXhwb3J0IGNvbnN0IGRldmljZVNpemUgPSB7IHdpZHRoOiAxMDAsIGhlaWdodDogMTAwIH07XG5cbmV4cG9ydCBjb25zdCBkZXZpY2VUb0ltYWdlOiBSZWNvcmQ8RGV2aWNlVHlwZSwgc3RyaW5nPiA9IHtcbiAgW0RldmljZVR5cGUuUENdOiBsYXB0b3AsXG4gIFtEZXZpY2VUeXBlLlJvdXRlcl06IHJvdXRlcixcbn07XG5cbmV4cG9ydCBjb25zdCBkZXZpY2VzOiBEZXZpY2VbXSA9IFtcbiAge1xuICAgIGRldmljZU5hbWU6IFwiXCIsXG4gICAgdHlwZTogRGV2aWNlVHlwZS5QQyxcbiAgfSxcbiAge1xuICAgIGRldmljZU5hbWU6IFwiXCIsXG4gICAgdHlwZTogRGV2aWNlVHlwZS5Sb3V0ZXIsXG4gICAgb3B0aW9uYWxfcGFyYW1ldGVycyA6IHtzeXNjdGw6ICduZXQuaXB2NC5pcF9mb3J3YXJkPTEnfVxuICB9LFxuXTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/model/Device.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b4af5facedb23e415f5c")
/******/ })();
/******/ 
/******/ }
);