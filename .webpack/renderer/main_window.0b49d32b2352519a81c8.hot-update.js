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

/***/ "./src/pages/Settings/Settings.tsx":
/*!*****************************************!*\
  !*** ./src/pages/Settings/Settings.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Settings = void 0;\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nvar LocalizationContext_1 = __importDefault(__webpack_require__(/*! ../../context/LocalizationContext */ \"./src/context/LocalizationContext.ts\"));\r\nvar ThemeContext_1 = __importDefault(__webpack_require__(/*! ../../context/ThemeContext */ \"./src/context/ThemeContext.ts\"));\r\nvar _theme_scss_1 = __importDefault(__webpack_require__(/*! ../../theme/_theme.scss */ \"./src/theme/_theme.scss\"));\r\nvar Settings_module_scss_1 = __importDefault(__webpack_require__(/*! ./Settings.module.scss */ \"./src/pages/Settings/Settings.module.scss\"));\r\nvar localization_1 = __webpack_require__(/*! ../../localization */ \"./src/localization/index.ts\");\r\nvar Settings = function () {\r\n    var _a, _b, _c;\r\n    var _d = (0, react_1.useContext)(LocalizationContext_1.default), updateLocalization = _d.updateContext, languageDico = _d.languageDico, language = _d.language;\r\n    var _e = (0, react_1.useContext)(ThemeContext_1.default), updateTheme = _e.updateContext, theme = _e.theme;\r\n    var _f = (0, react_1.useState)(null), path = _f[0], setPath = _f[1];\r\n    (0, react_1.useEffect)(function () {\r\n        (function () { return __awaiter(void 0, void 0, void 0, function () { var _a, _b, _c; var _d; return __generator(this, function (_e) {\r\n            switch (_e.label) {\r\n                case 0:\r\n                    _a = setPath;\r\n                    if (!((_d = appParam.path) !== null && _d !== void 0)) return [3 /*break*/, 1];\r\n                    _b = _d;\r\n                    return [3 /*break*/, 3];\r\n                case 1:\r\n                    _c = \"\".concat;\r\n                    return [4 /*yield*/, homeDirectory()];\r\n                case 2:\r\n                    _b = _c.apply(\"\", [_e.sent(), \"\\\\Kathalab\"]);\r\n                    _e.label = 3;\r\n                case 3: return [2 /*return*/, _a.apply(void 0, [_b])];\r\n            }\r\n        }); }); })();\r\n        (function () { return __awaiter(void 0, void 0, void 0, function () {\r\n            var _a, _b, _c;\r\n            var _d;\r\n            var _e, _f, _g;\r\n            return __generator(this, function (_h) {\r\n                switch (_h.label) {\r\n                    case 0:\r\n                        _a = setAppParam;\r\n                        _d = {\r\n                            language: (_e = localStorage.getItem('language')) !== null && _e !== void 0 ? _e : language,\r\n                            theme: (_f = localStorage.getItem('theme')) !== null && _f !== void 0 ? _f : theme\r\n                        };\r\n                        if (!((_g = localStorage.getItem('path')) !== null && _g !== void 0)) return [3 /*break*/, 1];\r\n                        _b = _g;\r\n                        return [3 /*break*/, 3];\r\n                    case 1:\r\n                        _c = \"\".concat;\r\n                        return [4 /*yield*/, homeDirectory()];\r\n                    case 2:\r\n                        _b = _c.apply(\"\", [_h.sent(), \"\\\\Kathalab\"]);\r\n                        _h.label = 3;\r\n                    case 3: return [2 /*return*/, _a.apply(void 0, [(_d.path = _b,\r\n                                _d)])];\r\n                }\r\n            });\r\n        }); })();\r\n    }, []);\r\n    var _g = (0, react_1.useState)({\r\n        'language': (_a = localStorage.getItem('language')) !== null && _a !== void 0 ? _a : language,\r\n        'theme': (_b = localStorage.getItem('theme')) !== null && _b !== void 0 ? _b : theme,\r\n        'path': (_c = localStorage.getItem('path')) !== null && _c !== void 0 ? _c : path\r\n    }), appParam = _g[0], setAppParam = _g[1];\r\n    var openDirectory = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n        var path;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    path = \"\";\r\n                    return [4 /*yield*/, window.electronAPI.chooseDirectory()];\r\n                case 1:\r\n                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment\r\n                    // @ts-ignore\r\n                    path = _a.sent();\r\n                    appParam.path = path;\r\n                    setPath(path);\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    }); };\r\n    // eslint-disable-next-line @typescript-eslint/ban-ts-comment\r\n    // @ts-ignore\r\n    var homeDirectory = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0: return [4 /*yield*/, window.electronAPI.getHomeDirectory()];\r\n            case 1: return [2 /*return*/, _a.sent()];\r\n        }\r\n    }); }); };\r\n    var saveSettings = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, localStorage.setItem('language', appParam.language)];\r\n                case 1:\r\n                    _a.sent();\r\n                    return [4 /*yield*/, localStorage.setItem('theme', appParam.theme)];\r\n                case 2:\r\n                    _a.sent();\r\n                    return [4 /*yield*/, localStorage.setItem('path', appParam.path)];\r\n                case 3:\r\n                    _a.sent();\r\n                    updateLocalization(appParam.language);\r\n                    updateTheme(appParam.theme);\r\n                    setPath(appParam.path);\r\n                    window.location.reload();\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    }); };\r\n    var ifParamNotChange = function () {\r\n        return localStorage.getItem('language') == appParam.language &&\r\n            localStorage.getItem('theme') == appParam.theme &&\r\n            localStorage.getItem('path') == appParam.path;\r\n    };\r\n    return react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.page },\r\n        react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.settingsContainer },\r\n            react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.settingsMenu },\r\n                react_1.default.createElement(\"h1\", null,\r\n                    react_1.default.createElement(\"a\", { className: Settings_module_scss_1.default.settingsMenuTitle, href: \"#settingsGlobal\" }, languageDico[localization_1.LocalizationName.globalSettings]))),\r\n            react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.settingsGrid },\r\n                react_1.default.createElement(\"h1\", { className: Settings_module_scss_1.default.gridItemTitle, id: \"settingsGlobal\" }, languageDico[localization_1.LocalizationName.globalSettings]),\r\n                react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.gridItemLeft },\r\n                    react_1.default.createElement(\"label\", { htmlFor: \"language\", className: Settings_module_scss_1.default.label },\r\n                        languageDico[localization_1.LocalizationName.languageParameterLabel],\r\n                        \" : \")),\r\n                react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.gridItemRight },\r\n                    react_1.default.createElement(\"select\", { id: \"language\", name: \"language\", value: appParam.language, className: Settings_module_scss_1.default.select, onChange: function (e) { return __awaiter(void 0, void 0, void 0, function () {\r\n                            return __generator(this, function (_a) {\r\n                                setAppParam({\r\n                                    language: e.target.value,\r\n                                    theme: appParam.theme,\r\n                                    path: appParam.path\r\n                                });\r\n                                return [2 /*return*/];\r\n                            });\r\n                        }); } }, Object.values(localization_1.Language).map(function (v, id) {\r\n                        return react_1.default.createElement(\"option\", { key: id, value: v }, v);\r\n                    }))),\r\n                react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.gridItemLeft },\r\n                    react_1.default.createElement(\"label\", { htmlFor: \"theme\", className: Settings_module_scss_1.default.label },\r\n                        languageDico[localization_1.LocalizationName.themeParameterLabel],\r\n                        \" : \")),\r\n                react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.gridItemRight },\r\n                    react_1.default.createElement(\"select\", { id: \"theme\", name: \"theme\", className: Settings_module_scss_1.default.select, onChange: function (e) { return __awaiter(void 0, void 0, void 0, function () {\r\n                            return __generator(this, function (_a) {\r\n                                setAppParam({\r\n                                    language: appParam.language,\r\n                                    theme: e.target.value,\r\n                                    path: appParam.path\r\n                                });\r\n                                return [2 /*return*/];\r\n                            });\r\n                        }); }, value: appParam.theme }, Object.keys(_theme_scss_1.default).map(function (key, id) {\r\n                        return react_1.default.createElement(\"option\", { key: id, value: key }, key.split('-')[1]);\r\n                    }))),\r\n                react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.gridItemLeft },\r\n                    react_1.default.createElement(\"label\", { htmlFor: \"location\", className: Settings_module_scss_1.default.label },\r\n                        languageDico[localization_1.LocalizationName.storagePlaceLabel],\r\n                        \" : \")),\r\n                react_1.default.createElement(\"div\", { className: Settings_module_scss_1.default.gridItemRight },\r\n                    react_1.default.createElement(\"input\", { id: \"savePath\", onChange: function (e) { return __awaiter(void 0, void 0, void 0, function () {\r\n                            return __generator(this, function (_a) {\r\n                                setPath(e.target.value);\r\n                                setAppParam({\r\n                                    language: appParam.language,\r\n                                    theme: appParam.theme,\r\n                                    path: e.target.value\r\n                                });\r\n                                return [2 /*return*/];\r\n                            });\r\n                        }); }, value: appParam.path, name: \"location\", type: \"text\", className: Settings_module_scss_1.default.storagePlaceInput }),\r\n                    react_1.default.createElement(\"button\", { className: Settings_module_scss_1.default.btnChooseDir + \" material-icons material-symbols-outlined\" + Settings_module_scss_1.default.gridItemRight, onClick: openDirectory }, \"folder\")))),\r\n        react_1.default.createElement(\"button\", { className: Settings_module_scss_1.default.saveButton, onClick: saveSettings, hidden: ifParamNotChange() }, languageDico[localization_1.LocalizationName.save]));\r\n};\r\nexports.Settings = Settings;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvU2V0dGluZ3MvU2V0dGluZ3MudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RkFBNEQ7QUFFNUQsa0pBQW9FO0FBQ3BFLDZIQUFzRDtBQUN0RCxtSEFBOEM7QUFDOUMsNklBQTBDO0FBQzFDLGtHQUE4RDtBQUN2RCxJQUFNLFFBQVEsR0FBRzs7SUFDZCxTQUE4RCxzQkFBVSxFQUFDLDZCQUFtQixDQUFDLEVBQTdFLGtCQUFrQixxQkFBRSxZQUFZLG9CQUFFLFFBQVEsY0FBbUMsQ0FBQztJQUM5RixTQUFzQyxzQkFBVSxFQUFDLHNCQUFZLENBQUMsRUFBOUMsV0FBVyxxQkFBRSxLQUFLLFdBQTRCLENBQUM7SUFDL0QsU0FBa0Isb0JBQVEsRUFBQyxJQUFJLENBQUMsRUFBL0IsSUFBSSxVQUFFLE9BQU8sUUFBa0I7SUFFdEMscUJBQVMsRUFBQztRQUNOLENBQUM7OztvQkFBWSxZQUFPO2dDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7OztvQkFBTyxxQkFBTSxhQUFhLEVBQUU7O29CQUF4QixtQkFBRyxTQUFxQixnQkFBWTs7d0JBQTdELDRDQUE4RDs7aUJBQUEsQ0FBQyxFQUFFLENBQUM7UUFDL0UsQ0FBQzs7Ozs7Ozt3QkFBWSxnQkFBVzs7NEJBQ3BCLFFBQVEsRUFBRyxrQkFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsbUNBQUksUUFBUTs0QkFDdkQsS0FBSyxFQUFHLGtCQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQ0FBSSxLQUFLOztvQ0FDdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Ozs7O3dCQUFPLHFCQUFNLGFBQWEsRUFBRTs7d0JBQXhCLG1CQUFHLFNBQXFCLGdCQUFZOzs0QkFIbEUseUNBR1QsT0FBSSxLQUF1RTtxQ0FDN0U7OzthQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1YsQ0FBQyxFQUFFLEVBQUUs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LEVBQUUsWUFBWSxFQUNsRCxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsSUFBRyxZQUFZLENBQUMsK0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQVUsQ0FDaEY7QUFDVixDQUFDO0FBeEhZLGdCQUFRLFlBd0hwQiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2pldC1rYXRoYXJhLy4vc3JjL3BhZ2VzL1NldHRpbmdzL1NldHRpbmdzLnRzeD8yM2VmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7UGFnZXN9IGZyb20gXCIuLi8uLi9hcHBcIjtcclxuaW1wb3J0IExvY2FsaXphdGlvbkNvbnRleHQgZnJvbSBcIi4uLy4uL2NvbnRleHQvTG9jYWxpemF0aW9uQ29udGV4dFwiO1xyXG5pbXBvcnQgVGhlbWVDb250ZXh0IGZyb20gXCIuLi8uLi9jb250ZXh0L1RoZW1lQ29udGV4dFwiO1xyXG5pbXBvcnQgdGhlbWVzICBmcm9tIFwiLi4vLi4vdGhlbWUvX3RoZW1lLnNjc3NcIjtcclxuaW1wb3J0IHN0eWxlIGZyb20gXCIuL1NldHRpbmdzLm1vZHVsZS5zY3NzXCJcclxuaW1wb3J0IHtMYW5ndWFnZSwgTG9jYWxpemF0aW9uTmFtZX0gZnJvbSBcIi4uLy4uL2xvY2FsaXphdGlvblwiO1xyXG5leHBvcnQgY29uc3QgU2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7dXBkYXRlQ29udGV4dDogdXBkYXRlTG9jYWxpemF0aW9uLCBsYW5ndWFnZURpY28sIGxhbmd1YWdlfSA9IHVzZUNvbnRleHQoTG9jYWxpemF0aW9uQ29udGV4dCk7XHJcbiAgICBjb25zdCB7dXBkYXRlQ29udGV4dDogdXBkYXRlVGhlbWUsIHRoZW1lfSA9IHVzZUNvbnRleHQoVGhlbWVDb250ZXh0KTtcclxuICAgIGNvbnN0IFtwYXRoLCBzZXRQYXRoXSA9IHVzZVN0YXRlKG51bGwpXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAoYXN5bmMgKCkgPT4gc2V0UGF0aChhcHBQYXJhbS5wYXRoID8/IGAke2F3YWl0IGhvbWVEaXJlY3RvcnkoKX1cXFxcS2F0aGFsYWJgKSkoKTtcclxuICAgICAgICAoYXN5bmMgKCkgPT4gc2V0QXBwUGFyYW0oe1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5ndWFnZScpID8/IGxhbmd1YWdlLFxyXG4gICAgICAgICAgICB0aGVtZSA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpID8/IHRoZW1lLFxyXG4gICAgICAgICAgICBwYXRoIDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhdGgnKSA/PyBgJHthd2FpdCBob21lRGlyZWN0b3J5KCl9XFxcXEthdGhhbGFiYFxyXG4gICAgICAgIH0pKSgpO1xyXG4gICAgfSwgW10pXHJcblxyXG4gICAgY29uc3QgW2FwcFBhcmFtLCBzZXRBcHBQYXJhbV0gPSB1c2VTdGF0ZSh7XHJcbiAgICAgICAgJ2xhbmd1YWdlJzogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJykgPz8gbGFuZ3VhZ2UsXHJcbiAgICAgICAgJ3RoZW1lJzogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZW1lJykgPz8gdGhlbWUsXHJcbiAgICAgICAgJ3BhdGgnOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGF0aCcpID8/IHBhdGhcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3Qgb3BlbkRpcmVjdG9yeSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBsZXQgcGF0aCA9IFwiXCI7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBwYXRoID0gYXdhaXQgd2luZG93LmVsZWN0cm9uQVBJLmNob29zZURpcmVjdG9yeSgpO1xyXG4gICAgICAgIGFwcFBhcmFtLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIHNldFBhdGgocGF0aCk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBob21lRGlyZWN0b3J5ID0gYXN5bmMgKCkgPT4ge3JldHVybiBhd2FpdCB3aW5kb3cuZWxlY3Ryb25BUEkuZ2V0SG9tZURpcmVjdG9yeSgpO31cclxuICAgIGNvbnN0IHNhdmVTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFuZ3VhZ2UnLCBhcHBQYXJhbS5sYW5ndWFnZSlcclxuICAgICAgICBhd2FpdCBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWUnLCBhcHBQYXJhbS50aGVtZSlcclxuICAgICAgICBhd2FpdCBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGF0aCcsIGFwcFBhcmFtLnBhdGgpXHJcbiAgICAgICAgdXBkYXRlTG9jYWxpemF0aW9uKGFwcFBhcmFtLmxhbmd1YWdlIGFzIExhbmd1YWdlKTtcclxuICAgICAgICB1cGRhdGVUaGVtZShhcHBQYXJhbS50aGVtZSk7XHJcbiAgICAgICAgc2V0UGF0aChhcHBQYXJhbS5wYXRoKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpZlBhcmFtTm90Q2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKSA9PSBhcHBQYXJhbS5sYW5ndWFnZSAmJlxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKSA9PSBhcHBQYXJhbS50aGVtZSAmJlxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGF0aCcpID09IGFwcFBhcmFtLnBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtzdHlsZS5wYWdlfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGUuc2V0dGluZ3NDb250YWluZXJ9PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGUuc2V0dGluZ3NNZW51fT5cclxuICAgICAgICAgICAgICAgIDxoMT48YSBjbGFzc05hbWU9e3N0eWxlLnNldHRpbmdzTWVudVRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e1wiI3NldHRpbmdzR2xvYmFsXCJ9PntsYW5ndWFnZURpY29bTG9jYWxpemF0aW9uTmFtZS5nbG9iYWxTZXR0aW5nc119PC9hPjwvaDE+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlLnNldHRpbmdzR3JpZH0+XHJcbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPXtzdHlsZS5ncmlkSXRlbVRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtcInNldHRpbmdzR2xvYmFsXCJ9PntsYW5ndWFnZURpY29bTG9jYWxpemF0aW9uTmFtZS5nbG9iYWxTZXR0aW5nc119PC9oMT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZS5ncmlkSXRlbUxlZnR9PjxsYWJlbCBodG1sRm9yPVwibGFuZ3VhZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGUubGFiZWx9PntsYW5ndWFnZURpY29bTG9jYWxpemF0aW9uTmFtZS5sYW5ndWFnZVBhcmFtZXRlckxhYmVsXX0gOiA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGUuZ3JpZEl0ZW1SaWdodH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cImxhbmd1YWdlXCIgbmFtZT1cImxhbmd1YWdlXCIgdmFsdWU9e2FwcFBhcmFtLmxhbmd1YWdlfSBjbGFzc05hbWU9e3N0eWxlLnNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFwcFBhcmFtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UgOiBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWUgOiBhcHBQYXJhbS50aGVtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCA6IGFwcFBhcmFtLnBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoTGFuZ3VhZ2UpLm1hcCgodiwgaWQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2lkfSB2YWx1ZT17dn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlLmdyaWRJdGVtTGVmdH0+PGxhYmVsIGh0bWxGb3I9XCJ0aGVtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZS5sYWJlbH0+e2xhbmd1YWdlRGljb1tMb2NhbGl6YXRpb25OYW1lLnRoZW1lUGFyYW1ldGVyTGFiZWxdfSA6IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZS5ncmlkSXRlbVJpZ2h0fT5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwidGhlbWVcIiBuYW1lPVwidGhlbWVcIiBjbGFzc05hbWU9e3N0eWxlLnNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFwcFBhcmFtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UgOiBhcHBQYXJhbS5sYW5ndWFnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWUgOiBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCA6IGFwcFBhcmFtLnBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXthcHBQYXJhbS50aGVtZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtPYmplY3Qua2V5cyh0aGVtZXMpLm1hcCgoa2V5LCBpZCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpZH0gdmFsdWU9e2tleX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2tleS5zcGxpdCgnLScpWzFdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZS5ncmlkSXRlbUxlZnR9PjxsYWJlbCBodG1sRm9yPVwibG9jYXRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGUubGFiZWx9PntsYW5ndWFnZURpY29bTG9jYWxpemF0aW9uTmFtZS5zdG9yYWdlUGxhY2VMYWJlbF19IDogPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlLmdyaWRJdGVtUmlnaHR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD17XCJzYXZlUGF0aFwifSBvbkNoYW5nZT17YXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGF0aChlLnRhcmdldC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXBwUGFyYW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UgOiBhcHBQYXJhbS5sYW5ndWFnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lIDogYXBwUGFyYW0udGhlbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoIDogZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcFBhcmFtLnBhdGh9XHJcbiAgICAgICAgICAgICAgICAgICBuYW1lPVwibG9jYXRpb25cIiB0eXBlPXtcInRleHRcIn0gY2xhc3NOYW1lPXtzdHlsZS5zdG9yYWdlUGxhY2VJbnB1dH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZS5idG5DaG9vc2VEaXIgKyBcIiBtYXRlcmlhbC1pY29ucyBtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCIgKyBzdHlsZS5ncmlkSXRlbVJpZ2h0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvcGVuRGlyZWN0b3J5fT5mb2xkZXJcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGUuc2F2ZUJ1dHRvbn0gb25DbGljaz17c2F2ZVNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuPXtpZlBhcmFtTm90Q2hhbmdlKCl9PntsYW5ndWFnZURpY29bTG9jYWxpemF0aW9uTmFtZS5zYXZlXX08L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/Settings/Settings.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1216e9792679cb494f06")
/******/ })();
/******/ 
/******/ }
);