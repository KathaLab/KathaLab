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

/***/ "./src/lib/ExportConf.ts":
/*!*******************************!*\
  !*** ./src/lib/ExportConf.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar ModelToKatharaConf_1 = __webpack_require__(/*! ./ModelToKatharaConf */ \"./src/lib/ModelToKatharaConf.ts\");\nvar RegexConst = __importStar(__webpack_require__(/*! ./RegexConst */ \"./src/lib/RegexConst.ts\"));\nvar Device_1 = __webpack_require__(/*! ../model/Device */ \"./src/model/Device.tsx\");\nvar ExportConf = /** @class */ (function () {\n    function ExportConf() {\n    }\n    ExportConf.prototype.exportLabConf = function (lab) {\n        var conf = \"\";\n        for (var key in lab) {\n            if (key == 'labName' || key == 'description' || key == 'author' || key == 'email' || key == 'version') {\n                conf += ModelToKatharaConf_1.ModelToKatharaConf[key] + \"\\\"\".concat(lab[key], \"\\\"\") + \"\\n\";\n            }\n        }\n        if (lab.devices) {\n            lab.devices.forEach(function (device) {\n                if (device.type == Device_1.DeviceType.Router) {\n                    if (device.optional_parameters && device.optional_parameters.ipv6 == true) {\n                        conf += '%deviceName%[sysctl]=net.ipv6.conf.all.forwarding=1 \\n';\n                    }\n                }\n                if (device.optional_parameters) {\n                    for (var key in device.optional_parameters) {\n                        if (key == 'image' || key == 'memory' || key == 'cpus' || key == 'port' || key == 'bridged' || key == 'ipv6' || key == 'ipv6' || key == 'exec' || key == 'sysctl' || key == 'env' || key == 'shell' || key == 'num_terms') {\n                            conf += ModelToKatharaConf_1.ModelToKatharaConf[key] + \"\".concat(device.optional_parameters[key]) + '\\n';\n                        }\n                    }\n                }\n                if (device.interfaces) {\n                    device.interfaces.forEach(function (itf) {\n                        if (itf.collision_domain) {\n                            conf += ModelToKatharaConf_1.ModelToKatharaConf['collision_domain'] + itf.collision_domain + \"\\n\";\n                            conf = conf.replace(\"%interfaceName%\", itf.interfaceName);\n                        }\n                    });\n                }\n                var deviceName = device.deviceName.toLowerCase();\n                while (conf.indexOf('%deviceName%') !== -1) {\n                    conf = conf.replace('%deviceName%', deviceName);\n                }\n            });\n        }\n        return conf;\n    };\n    ExportConf.prototype.exportStartupConf = function (lab) {\n        var devicesStartupConf = {};\n        lab.devices.forEach(function (device) {\n            var conf = \"\";\n            if (device.interfaces) {\n                device.interfaces.forEach(function (itf) {\n                    if (itf.is_up == true && itf.interfaceName) {\n                        conf += ModelToKatharaConf_1.ModelToKatharaConf.IP_UP + '\\n';\n                        conf = conf.replace(\"%interfaceName%\", itf.interfaceName);\n                    }\n                    if (itf.interfaceName && itf.ip && itf.cidr) {\n                        conf += ModelToKatharaConf_1.ModelToKatharaConf.IP_ADDRESS_ADD + '\\n';\n                        for (var key in itf) {\n                            if (key == 'interfaceName' || key == 'ip' || key == 'cidr') {\n                                conf = conf.replace(\"%\".concat(key, \"%\"), itf[key]);\n                            }\n                        }\n                    }\n                    if (device.optional_parameters && device.optional_parameters.bridged && device.optional_parameters.bridged == true) {\n                        if (itf.ip.match(RegexConst.IP_REGEX)) {\n                            conf += ModelToKatharaConf_1.ModelToKatharaConf.IPV4_FORWARD + \"\\n\";\n                        }\n                        else {\n                            conf += ModelToKatharaConf_1.ModelToKatharaConf.IPV6_FORWARD + \"\\n\";\n                        }\n                    }\n                });\n            }\n            if (device.startups_commands) {\n                device.startups_commands.forEach(function (startupCmd) {\n                    conf += startupCmd + \"\\n\";\n                });\n            }\n            devicesStartupConf[device.deviceName.toLowerCase()] = conf;\n        });\n        return devicesStartupConf;\n    };\n    ExportConf.prototype.exportShutdownConf = function (lab) {\n        var devicesShutdownConf = {};\n        lab.devices.forEach(function (device) {\n            var conf = '';\n            if (device.shutdown_commands) {\n                device.shutdown_commands.forEach(function (shutdownCmd) {\n                    conf += shutdownCmd + \"\\n\";\n                });\n            }\n            devicesShutdownConf[device.deviceName.toLowerCase()] = conf;\n        });\n        return devicesShutdownConf;\n    };\n    return ExportConf;\n}());\nexports[\"default\"] = ExportConf;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TDtZQUVELElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQixNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLG9CQUFVO29CQUN2QyxJQUFJLElBQUksVUFBVSxHQUFJLElBQUksQ0FBQztnQkFDL0IsQ0FBQyxDQUFDO2FBQ0w7WUFDRCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSTtRQUM5RCxDQUFDLENBQUM7UUFDRixPQUFPLGtCQUFrQixDQUFDO0lBQzlCLENBQUM7SUFFTSx1Q0FBa0IsR0FBekIsVUFBMEIsR0FBUTtRQUM5QixJQUFNLG1CQUFtQixHQUFxQyxFQUFFO1FBRWhFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFNO1lBQ3RCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVkLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQixNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLHFCQUFXO29CQUN4QyxJQUFJLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDL0IsQ0FBQyxDQUFDO2FBQ0w7WUFDRCxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSTtRQUMvRCxDQUFDLENBQUM7UUFDRixPQUFPLG1CQUFtQixDQUFDO0lBQy9CLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZXQta2F0aGFyYS8uL3NyYy9saWIvRXhwb3J0Q29uZi50cz9kMGZkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGFifSBmcm9tIFwiLi4vbW9kZWwvTGFiXCI7XG5pbXBvcnQge01vZGVsVG9LYXRoYXJhQ29uZn0gZnJvbSBcIi4vTW9kZWxUb0thdGhhcmFDb25mXCI7XG5pbXBvcnQgKiBhcyBSZWdleENvbnN0IGZyb20gXCIuL1JlZ2V4Q29uc3RcIjtcbmltcG9ydCB7RGV2aWNlVHlwZX0gZnJvbSBcIi4uL21vZGVsL0RldmljZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBvcnRDb25mIHtcblxuXG4gICAgcHVibGljIGV4cG9ydExhYkNvbmYobGFiOiBMYWIpIHtcbiAgICAgICAgbGV0IGNvbmYgPSBcIlwiXG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbGFiKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09ICdsYWJOYW1lJyB8fCBrZXkgPT0gJ2Rlc2NyaXB0aW9uJyB8fCBrZXkgPT0gJ2F1dGhvcicgfHwga2V5ID09ICdlbWFpbCcgfHwga2V5ID09ICd2ZXJzaW9uJykge1xuICAgICAgICAgICAgICAgIGNvbmYgKz0gTW9kZWxUb0thdGhhcmFDb25mW2tleV0gKyBgXCIke2xhYltrZXldfVwiYCArIFwiXFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFiLmRldmljZXMpIHtcbiAgICAgICAgICAgIGxhYi5kZXZpY2VzLmZvckVhY2goZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLnR5cGUgPT0gRGV2aWNlVHlwZS5Sb3V0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRldmljZS5vcHRpb25hbF9wYXJhbWV0ZXJzICYmIGRldmljZS5vcHRpb25hbF9wYXJhbWV0ZXJzLmlwdjYgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mICs9ICclZGV2aWNlTmFtZSVbc3lzY3RsXT1uZXQuaXB2Ni5jb25mLmFsbC5mb3J3YXJkaW5nPTEgXFxuJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLm9wdGlvbmFsX3BhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGV2aWNlLm9wdGlvbmFsX3BhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ2ltYWdlJyB8fCBrZXkgPT0gJ21lbW9yeScgfHwga2V5ID09ICdjcHVzJyB8fCBrZXkgPT0gJ3BvcnQnIHx8IGtleSA9PSAnYnJpZGdlZCcgfHwga2V5ID09ICdpcHY2JyB8fCBrZXkgPT0gJ2lwdjYnIHx8IGtleSA9PSAnZXhlYycgfHwga2V5ID09ICdzeXNjdGwnIHx8IGtleSA9PSAnZW52JyB8fCBrZXkgPT0gJ3NoZWxsJyB8fCBrZXkgPT0gJ251bV90ZXJtcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25mICs9IE1vZGVsVG9LYXRoYXJhQ29uZltrZXldICsgYCR7ZGV2aWNlLm9wdGlvbmFsX3BhcmFtZXRlcnNba2V5XX1gICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmludGVyZmFjZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlLmludGVyZmFjZXMuZm9yRWFjaChpdGYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0Zi5jb2xsaXNpb25fZG9tYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZiArPSBNb2RlbFRvS2F0aGFyYUNvbmZbJ2NvbGxpc2lvbl9kb21haW4nXSArIGl0Zi5jb2xsaXNpb25fZG9tYWluICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25mID0gY29uZi5yZXBsYWNlKGAlaW50ZXJmYWNlTmFtZSVgLCBpdGYuaW50ZXJmYWNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZU5hbWUgPSBkZXZpY2UuZGV2aWNlTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbmYuaW5kZXhPZignJWRldmljZU5hbWUlJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmYgPSBjb25mLnJlcGxhY2UoJyVkZXZpY2VOYW1lJScsIGRldmljZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbmZcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwb3J0U3RhcnR1cENvbmYobGFiOiBMYWIpIHtcbiAgICAgICAgY29uc3QgZGV2aWNlc1N0YXJ0dXBDb25mOiB7IFtkZXZpY2VOYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9XG5cbiAgICAgICAgbGFiLmRldmljZXMuZm9yRWFjaChkZXZpY2UgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbmYgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAoZGV2aWNlLmludGVyZmFjZXMpIHtcbiAgICAgICAgICAgICAgICBkZXZpY2UuaW50ZXJmYWNlcy5mb3JFYWNoKGl0ZiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGYuaXNfdXAgPT0gdHJ1ZSAmJiBpdGYuaW50ZXJmYWNlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZiArPSBNb2RlbFRvS2F0aGFyYUNvbmYuSVBfVVAgKyAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYgPSBjb25mLnJlcGxhY2UoYCVpbnRlcmZhY2VOYW1lJWAsaXRmLmludGVyZmFjZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGYuaW50ZXJmYWNlTmFtZSAmJiBpdGYuaXAgJiYgaXRmLmNpZHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYgKz0gTW9kZWxUb0thdGhhcmFDb25mLklQX0FERFJFU1NfQUREICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBpdGYpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ2ludGVyZmFjZU5hbWUnIHx8IGtleSA9PSAnaXAnIHx8a2V5ID09ICdjaWRyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYgPSBjb25mLnJlcGxhY2UoYCUke2tleX0lYCw8c3RyaW5nPml0ZltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRldmljZS5vcHRpb25hbF9wYXJhbWV0ZXJzICYmIGRldmljZS5vcHRpb25hbF9wYXJhbWV0ZXJzLmJyaWRnZWQgJiYgZGV2aWNlLm9wdGlvbmFsX3BhcmFtZXRlcnMuYnJpZGdlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRmLmlwLm1hdGNoKFJlZ2V4Q29uc3QuSVBfUkVHRVgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZiArPSBNb2RlbFRvS2F0aGFyYUNvbmYuSVBWNF9GT1JXQVJEICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZiArPSBNb2RlbFRvS2F0aGFyYUNvbmYuSVBWNl9GT1JXQVJEICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkZXZpY2Uuc3RhcnR1cHNfY29tbWFuZHMpIHtcbiAgICAgICAgICAgICAgICBkZXZpY2Uuc3RhcnR1cHNfY29tbWFuZHMuZm9yRWFjaChzdGFydHVwQ21kID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uZiArPSBzdGFydHVwQ21kICArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRldmljZXNTdGFydHVwQ29uZltkZXZpY2UuZGV2aWNlTmFtZS50b0xvd2VyQ2FzZSgpXSA9IGNvbmZcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGRldmljZXNTdGFydHVwQ29uZjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwb3J0U2h1dGRvd25Db25mKGxhYjogTGFiKSB7XG4gICAgICAgIGNvbnN0IGRldmljZXNTaHV0ZG93bkNvbmY6IHsgW2RldmljZU5hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge31cblxuICAgICAgICBsYWIuZGV2aWNlcy5mb3JFYWNoKGRldmljZSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZiA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoZGV2aWNlLnNodXRkb3duX2NvbW1hbmRzKSB7XG4gICAgICAgICAgICAgICAgZGV2aWNlLnNodXRkb3duX2NvbW1hbmRzLmZvckVhY2goc2h1dGRvd25DbWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25mICs9IHNodXRkb3duQ21kICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGV2aWNlc1NodXRkb3duQ29uZltkZXZpY2UuZGV2aWNlTmFtZS50b0xvd2VyQ2FzZSgpXSA9IGNvbmZcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGRldmljZXNTaHV0ZG93bkNvbmY7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/lib/ExportConf.ts\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("27435f47ea8876bd8c0e")
/******/ })();
/******/ 
/******/ }
);