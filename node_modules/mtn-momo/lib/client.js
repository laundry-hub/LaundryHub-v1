"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var errors_1 = require("./errors");
function createClient(config, client) {
    if (client === void 0) { client = axios_1.default.create(); }
    client.defaults.baseURL = config.baseUrl;
    client.defaults.headers = {
        "Ocp-Apim-Subscription-Key": config.primaryKey,
        "X-Target-Environment": config.environment || "sandbox"
    };
    return withErrorHandling(client);
}
exports.createClient = createClient;
function createAuthClient(refresh, client) {
    client.interceptors.request.use(function (request) {
        return refresh().then(function (accessToken) {
            return __assign({}, request, { headers: __assign({}, request.headers, { Authorization: "Bearer " + accessToken }) });
        });
    });
    return client;
}
exports.createAuthClient = createAuthClient;
function withErrorHandling(client) {
    client.interceptors.response.use(function (response) { return response; }, function (error) { return Promise.reject(errors_1.handleError(error)); });
    return client;
}
exports.withErrorHandling = withErrorHandling;
