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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tcd = void 0;
var find_up_1 = require("find-up");
var fs = require('fs').promises;
var path = require('path');
var program = require('commander').program;
var CONFIG_FILE_NAME = "gtconfig.json";
var tryCatchDecorator = function (fn, onRejected) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return fn.apply(void 0, args);
        }
        catch (err) {
            return onRejected(err);
        }
    };
};
var defaultTryCatchDecorator = function (fn, onError) {
    return tryCatchDecorator(fn, onError !== null && onError !== void 0 ? onError : (function (err) {
        console.error(err);
    }));
};
exports.tcd = defaultTryCatchDecorator;
var readConfig = function () {
    var config = null;
    var resolve = (0, exports.tcd)(function () {
        var pkg = (0, find_up_1.findUpSync)(CONFIG_FILE_NAME, { cwd: process.cwd() });
        config = JSON.parse(fs.readFileSync(pkg, "utf8"));
        return config;
    });
    return function () { return config !== null && config !== void 0 ? config : resolve(); };
};
var getConfig = readConfig();
var main = function (componentName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, exports.tcd)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = getConfig();
                        return [4 /*yield*/, fs.mkdir(config.distPath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, createCopyDirectory(config.templatePath, config.distPath, componentName)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var createCopyDirectory = function (currentPath, putPath, componentName, templateName) {
    if (templateName === void 0) { templateName = 'TemplateName'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var dirs, _a, files, directories, createPutPath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs.readdir(currentPath)];
                case 1:
                    dirs = _b.sent();
                    _a = defineFileAndDir(dirs), files = _a.files, directories = _a.directories;
                    createPutPath = function (name) { return path.join(putPath, replaceData(name, componentName, templateName)); };
                    files.forEach(function (file) {
                        return createCopyFile(path.join(currentPath, file), createPutPath(file), componentName, templateName);
                    });
                    return [4 /*yield*/, Promise.all(directories.map(function (dir) { return fs.mkdir(createPutPath(dir)); }))];
                case 2:
                    _b.sent();
                    if (!directories.length) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.all(directories.map(function (dir) { return createCopyDirectory(path.join(currentPath, dir), createPutPath(dir), componentName); }))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [2 /*return*/, null];
            }
        });
    });
};
var createCopyFile = function (currentPath, putPath, componentName, templateName) { return __awaiter(void 0, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readFile(currentPath, { encoding: 'utf-8' })];
            case 1:
                file = _a.sent();
                return [2 /*return*/, fs.writeFile(putPath, replaceData(file, componentName, templateName))];
        }
    });
}); };
var isFirstLetterLowerCase = function (str) { return !!str && str[0].toLowerCase() === str[0]; };
var setFirstLetterToLowerCase = function (str) { return str.slice(0, 1).toLowerCase().concat(str.slice(1)); };
var replaceData = function (text, componentName, templateName) {
    var regexp = new RegExp(templateName, 'gi');
    return text.replace(regexp, function ($1) {
        return isFirstLetterLowerCase($1) ? setFirstLetterToLowerCase(componentName) : componentName;
    });
};
var defineFileAndDir = function (pathes) {
    return pathes.reduce(function (acc, cur) {
        if (path.extname(cur)) {
            acc.files.push(cur);
        }
        else {
            acc.directories.push(cur);
        }
        return acc;
    }, { files: [], directories: [] });
};
program
    .command('generate')
    .description('Generate React Component')
    .argument('<string>', 'Component name')
    .action(function (componentName, options) {
    main(componentName);
});
program.parse();
