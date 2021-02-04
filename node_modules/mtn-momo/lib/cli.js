#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var momo = __importStar(require("./"));
var version = require("../package.json").version;
commander_1.default
    .version(version)
    .description("Create sandbox credentials")
    .option("-x, --host <n>", "Your webhook host")
    .option("-p, --primary-key <n>", "Primary Key")
    .parse(process.argv);
var stringify = function (obj) { return JSON.stringify(obj, null, 2); };
var Users = momo.create({ callbackHost: commander_1.default.host }).Users;
var users = Users({ primaryKey: commander_1.default.primaryKey });
users
    .create(commander_1.default.host)
    .then(function (userId) {
    return users.login(userId).then(function (credentials) {
        console.log("Momo Sandbox Credentials", stringify({
            userSecret: credentials.apiKey,
            userId: userId
        }));
    });
})
    .catch(function (error) {
    console.log(error);
});
