"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("https"));
var command_exists_1 = require("command-exists");
var promise = new Promise(function (resolve) {
    if (!(0, command_exists_1.sync)('tnpm'))
        return resolve('npm');
    https_1.default
        .get('https://registry.npm.alibaba-inc.com/pedding', { timeout: 2000 }, function () { return resolve('tnpm'); })
        .on('error', function () { return resolve('npm'); });
});
exports.default = promise;
