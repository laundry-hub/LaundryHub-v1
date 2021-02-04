"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PartyIdType;
(function (PartyIdType) {
    PartyIdType["MSISDN"] = "MSISDN";
    PartyIdType["EMAIL"] = "EMAIL";
    PartyIdType["PARTY_CODE"] = "PARTY_CODE";
})(PartyIdType = exports.PartyIdType || (exports.PartyIdType = {}));
var Environment;
(function (Environment) {
    Environment["SANDBOX"] = "sandbox";
    Environment["PRODUCTION"] = "production";
})(Environment = exports.Environment || (exports.Environment = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["SUCCESSFUL"] = "SUCCESSFUL";
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["FAILED"] = "FAILED";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var FailureReason;
(function (FailureReason) {
    FailureReason["PAYEE_NOT_FOUND"] = "PAYEE_NOT_FOUND";
    FailureReason["PAYER_NOT_FOUND"] = "PAYER_NOT_FOUND";
    FailureReason["NOT_ALLOWED"] = "NOT_ALLOWED";
    FailureReason["NOT_ALLOWED_TARGET_ENVIRONMENT"] = "NOT_ALLOWED_TARGET_ENVIRONMENT";
    FailureReason["INVALID_CALLBACK_URL_HOST"] = "INVALID_CALLBACK_URL_HOST";
    FailureReason["INVALID_CURRENCY"] = "INVALID_CURRENCY";
    FailureReason["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
    FailureReason["INTERNAL_PROCESSING_ERROR"] = "INTERNAL_PROCESSING_ERROR";
    FailureReason["NOT_ENOUGH_FUNDS"] = "NOT_ENOUGH_FUNDS";
    FailureReason["PAYER_LIMIT_REACHED"] = "PAYER_LIMIT_REACHED";
    FailureReason["PAYEE_NOT_ALLOWED_TO_RECEIVE"] = "PAYEE_NOT_ALLOWED_TO_RECEIVE";
    FailureReason["PAYMENT_NOT_APPROVED"] = "PAYMENT_NOT_APPROVED";
    FailureReason["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
    FailureReason["APPROVAL_REJECTED"] = "APPROVAL_REJECTED";
    FailureReason["EXPIRED"] = "EXPIRED";
    FailureReason["TRANSACTION_CANCELED"] = "TRANSACTION_CANCELED";
    FailureReason["RESOURCE_ALREADY_EXIST"] = "RESOURCE_ALREADY_EXIST";
})(FailureReason = exports.FailureReason || (exports.FailureReason = {}));
