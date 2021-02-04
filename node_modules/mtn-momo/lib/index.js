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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./errors"));
var common_1 = require("./common");
exports.PayerType = common_1.PartyIdType;
exports.Status = common_1.TransactionStatus;
exports.Environment = common_1.Environment;
exports.FailureReason = common_1.FailureReason;
var collections_1 = __importDefault(require("./collections"));
var disbursements_1 = __importDefault(require("./disbursements"));
var users_1 = __importDefault(require("./users"));
var auth_1 = require("./auth");
var client_1 = require("./client");
var validate_1 = require("./validate");
var common_2 = require("./common");
var defaultGlobalConfig = {
    baseUrl: "https://sandbox.momodeveloper.mtn.com",
    environment: common_2.Environment.SANDBOX
};
/**
 * Initialise the library
 *
 * @param globalConfig Global configuration required to use any product
 */
function create(globalConfig) {
    validate_1.validateGlobalConfig(globalConfig);
    return {
        Collections: function (productConfig) {
            validate_1.validateProductConfig(productConfig);
            var config = __assign({}, defaultGlobalConfig, globalConfig, productConfig);
            var client = client_1.createAuthClient(auth_1.createTokenRefresher(auth_1.authorizeCollections, config), client_1.createClient(config));
            return new collections_1.default(client);
        },
        Disbursements: function (productConfig) {
            var config = __assign({}, defaultGlobalConfig, globalConfig, productConfig);
            var client = client_1.createAuthClient(auth_1.createTokenRefresher(auth_1.authorizeDisbursements, config), client_1.createClient(config));
            return new disbursements_1.default(client);
        },
        Users: function (subscriptionConfig) {
            validate_1.validateSubscriptionConfig(subscriptionConfig);
            var config = __assign({}, defaultGlobalConfig, globalConfig, subscriptionConfig);
            var client = client_1.createClient(config);
            return new users_1.default(client);
        }
    };
}
exports.create = create;
