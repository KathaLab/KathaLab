(()=>{var e={906:(e,t,n)=>{var r=n(17),o=n(81).spawn,i=n(601)("electron-squirrel-startup"),s=n(298).app,a=function(e,t){var n=r.resolve(r.dirname(process.execPath),"..","Update.exe");i("Spawning `%s` with args `%s`",n,e),o(n,e,{detached:!0}).on("close",t)};e.exports=function(){if("win32"===process.platform){var e=process.argv[1];i("processing squirrel command `%s`",e);var t=r.basename(process.execPath);if("--squirrel-install"===e||"--squirrel-updated"===e)return a(["--createShortcut="+t],s.quit),!0;if("--squirrel-uninstall"===e)return a(["--removeShortcut="+t],s.quit),!0;if("--squirrel-obsolete"===e)return s.quit(),!0}return!1}()},84:(e,t,n)=>{function r(){var e;try{e=t.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=n(750)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),n){var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,i=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))})),e.splice(i,0,r)}},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=r,t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(r())},750:(e,t,n)=>{var r;function o(e){function n(){if(n.enabled){var e=n,o=+new Date,i=o-(r||o);e.diff=i,e.prev=r,e.curr=o,r=o;for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=t.coerce(s[0]),"string"!=typeof s[0]&&s.unshift("%O");var c=0;s[0]=s[0].replace(/%([a-zA-Z%])/g,(function(n,r){if("%%"===n)return n;c++;var o=t.formatters[r];if("function"==typeof o){var i=s[c];n=o.call(e,i),s.splice(c,1),c--}return n})),t.formatArgs.call(e,s);var u=n.log||t.log||console.log.bind(console);u.apply(e,s)}}return n.namespace=e,n.enabled=t.enabled(e),n.useColors=t.useColors(),n.color=function(e){var n,r=0;for(n in e)r=(r<<5)-r+e.charCodeAt(n),r|=0;return t.colors[Math.abs(r)%t.colors.length]}(e),"function"==typeof t.init&&t.init(n),n}(t=e.exports=o.debug=o.default=o).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){t.save(e),t.names=[],t.skips=[];for(var n=("string"==typeof e?e:"").split(/[\s,]+/),r=n.length,o=0;o<r;o++)n[o]&&("-"===(e=n[o].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){var n,r;for(n=0,r=t.skips.length;n<r;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;n<r;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n(121),t.names=[],t.skips=[],t.formatters={}},601:(e,t,n)=>{"undefined"!=typeof process&&"renderer"===process.type?e.exports=n(84):e.exports=n(536)},536:(e,t,n)=>{var r=n(224),o=n(837);(t=e.exports=n(750)).init=function(e){e.inspectOpts={};for(var n=Object.keys(t.inspectOpts),r=0;r<n.length;r++)e.inspectOpts[n[r]]=t.inspectOpts[n[r]]},t.log=function(){return s.write(o.format.apply(o,arguments)+"\n")},t.formatArgs=function(e){var n=this.namespace;if(this.useColors){var r=this.color,o="  [3"+r+";1m"+n+" [0m";e[0]=o+e[0].split("\n").join("\n"+o),e.push("[3"+r+"m+"+t.humanize(this.diff)+"[0m")}else e[0]=(new Date).toUTCString()+" "+n+" "+e[0]},t.save=function(e){null==e?delete process.env.DEBUG:process.env.DEBUG=e},t.load=a,t.useColors=function(){return"colors"in t.inspectOpts?Boolean(t.inspectOpts.colors):r.isatty(i)},t.colors=[6,2,3,4,5,1],t.inspectOpts=Object.keys(process.env).filter((function(e){return/^debug_/i.test(e)})).reduce((function(e,t){var n=t.substring(6).toLowerCase().replace(/_([a-z])/g,(function(e,t){return t.toUpperCase()})),r=process.env[t];return r=!!/^(yes|on|true|enabled)$/i.test(r)||!/^(no|off|false|disabled)$/i.test(r)&&("null"===r?null:Number(r)),e[n]=r,e}),{});var i=parseInt(process.env.DEBUG_FD,10)||2;1!==i&&2!==i&&o.deprecate((function(){}),"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();var s=1===i?process.stdout:2===i?process.stderr:function(e){var t;switch(process.binding("tty_wrap").guessHandleType(e)){case"TTY":(t=new r.WriteStream(e))._type="tty",t._handle&&t._handle.unref&&t._handle.unref();break;case"FILE":(t=new(n(147).SyncWriteStream)(e,{autoClose:!1}))._type="fs";break;case"PIPE":case"TCP":(t=new(n(808).Socket)({fd:e,readable:!1,writable:!0})).readable=!1,t.read=null,t._type="pipe",t._handle&&t._handle.unref&&t._handle.unref();break;default:throw new Error("Implement me. Unknown stream file type!")}return t.fd=e,t._isStdio=!0,t}(i);function a(){return process.env.DEBUG}t.formatters.o=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts).split("\n").map((function(e){return e.trim()})).join(" ")},t.formatters.O=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts)},t.enable(a())},121:e=>{var t=1e3,n=60*t,r=60*n,o=24*r;function i(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}e.exports=function(e,s){s=s||{};var a,c=typeof e;if("string"===c&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var i=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(i){var s=parseFloat(i[1]);switch((i[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*s;case"days":case"day":case"d":return s*o;case"hours":case"hour":case"hrs":case"hr":case"h":return s*r;case"minutes":case"minute":case"mins":case"min":case"m":return s*n;case"seconds":case"second":case"secs":case"sec":case"s":return s*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return s;default:return}}}}(e);if("number"===c&&!1===isNaN(e))return s.long?i(a=e,o,"day")||i(a,r,"hour")||i(a,n,"minute")||i(a,t,"second")||a+" ms":function(e){return e>=o?Math.round(e/o)+"d":e>=r?Math.round(e/r)+"h":e>=n?Math.round(e/n)+"m":e>=t?Math.round(e/t)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},0:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.electronAPI=void 0;var s=n(298),a=i(n(147));t.electronAPI=function(){var e=this;this.initialize=function(){return r(e,void 0,void 0,(function(){var e=this;return o(this,(function(t){return s.ipcMain.handle("dialog:open-file",(function(){return r(e,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return[4,s.dialog.showOpenDialog({properties:["openFile"]}).then((function(e){return e.filePaths[0]})).catch((function(e){console.warn(e.message)}))];case 1:return[2,e.sent()]}}))}))})),s.ipcMain.handle("dialog:open-directory",(function(){return r(e,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return[4,s.dialog.showOpenDialog({properties:["createDirectory","openDirectory"]}).then((function(e){return e.filePaths[0]})).catch((function(e){console.warn(e.message)}))];case 1:return[2,e.sent()]}}))}))})),s.ipcMain.handle("save:save",(function(t,n){return r(e,void 0,void 0,(function(){return o(this,(function(e){try{a.default.writeFileSync(s.app.getAppPath()+"/data/".concat(n.id,".json"),JSON.stringify(n),"utf-8")}catch(e){console.warn(e)}return[2]}))}))})),s.ipcMain.handle("save:load",(function(t,n){return r(e,void 0,void 0,(function(){var e,r;return o(this,(function(o){try{if(n)return[2,JSON.parse(a.default.readFileSync(s.app.getAppPath()+"/data/".concat(n),"utf-8"))];e=a.default.readdirSync(s.app.getAppPath()+"/data"),r=[],e.map((function(e){return{name:e,time:a.default.statSync("".concat(s.app.getAppPath(),"/data/").concat(e)).mtime.getTime()}})).sort((function(e,t){return t.time-e.time})).forEach((function(e){r.push(JSON.parse(a.default.readFileSync(s.app.getAppPath()+"/data/".concat(e.name),"utf-8")))})),t.sender.send("save:load",r)}catch(e){console.warn(e)}return[2]}))}))})),s.ipcMain.handle("fs:save-file",(function(t,n,i,s){return r(e,void 0,void 0,(function(){var e;return o(this,(function(t){try{e=n+"\\"+i,a.default.writeFileSync(e,s,"utf-8")}catch(e){console.warn(e.message)}return[2]}))}))})),s.ipcMain.handle("save:delete",(function(t,n){return r(e,void 0,void 0,(function(){return o(this,(function(e){try{a.default.unlinkSync(s.app.getAppPath()+"/data/".concat(n,".json"))}catch(e){console.warn(e)}return[2]}))}))})),[2]}))}))}}},575:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},s=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0});var c=n(298),u=i(n(17)),l=n(0),f=u.join(c.app.getAppPath()+"/src/preload.js");n(906)&&c.app.quit();var p=function(){var e=new c.BrowserWindow({frame:!1,webPreferences:{contextIsolation:!0,preload:f}});e.maximize(),e.show(),e.loadURL(`file://${require("path").resolve(__dirname,"..","renderer","main_window","index.html")}`),c.ipcMain.handle("window:close",(function(){return s(void 0,void 0,void 0,(function(){return a(this,(function(t){return e.close(),[2]}))}))})),c.ipcMain.handle("window:maximize",(function(){return s(void 0,void 0,void 0,(function(){return a(this,(function(t){return e.isMaximized()?e.unmaximize():e.maximize(),[2]}))}))})),c.ipcMain.handle("window:minimize",(function(){return s(void 0,void 0,void 0,(function(){return a(this,(function(t){return e.minimize(),[2]}))}))}))};c.app.on("ready",p),c.app.on("window-all-closed",(function(){"darwin"!==process.platform&&c.app.quit()})),c.app.on("activate",(function(){0===c.BrowserWindow.getAllWindows().length&&p()})),(new l.electronAPI).initialize()},81:e=>{"use strict";e.exports=require("child_process")},298:e=>{"use strict";e.exports=require("electron")},147:e=>{"use strict";e.exports=require("fs")},808:e=>{"use strict";e.exports=require("net")},17:e=>{"use strict";e.exports=require("path")},224:e=>{"use strict";e.exports=require("tty")},837:e=>{"use strict";e.exports=require("util")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}void 0!==n&&(n.ab=__dirname+"/native_modules/");var r=n(575);module.exports=r})();
//# sourceMappingURL=index.js.map