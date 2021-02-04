"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
function createTokenRefresher(authorize, config) {
    var credentials;
    return function () {
        if (isExpired(credentials)) {
            return authorize(config)
                .then(function (accessToken) {
                var access_token = accessToken.access_token, expires_in = accessToken.expires_in;
                var expires = Date.now() + expires_in * 1000 - 60000;
                return {
                    accessToken: access_token,
                    expires: expires
                };
            })
                .then(function (freshCredentials) {
                credentials = freshCredentials;
                return credentials.accessToken;
            });
        }
        return Promise.resolve(credentials.accessToken);
    };
}
exports.createTokenRefresher = createTokenRefresher;
exports.authorizeCollections = function (config, client) {
    if (client === void 0) { client = client_1.createClient(config); }
    var basicAuthToken = createBasicAuthToken(config);
    return client
        .post("/collection/token/", null, {
        headers: {
            Authorization: "Basic " + basicAuthToken
        }
    })
        .then(function (response) { return response.data; });
};
exports.authorizeDisbursements = function (config, client) {
    if (client === void 0) { client = client_1.createClient(config); }
    var basicAuthToken = createBasicAuthToken(config);
    return client
        .post("/disbursement/token/", null, {
        headers: {
            Authorization: "Basic " + basicAuthToken
        }
    })
        .then(function (response) { return response.data; });
};
function createBasicAuthToken(config) {
    return Buffer.from(config.userId + ":" + config.userSecret).toString("base64");
}
exports.createBasicAuthToken = createBasicAuthToken;
function isExpired(credentials) {
    if (!credentials || !credentials.expires) {
        return true;
    }
    return Date.now() > credentials.expires;
}
