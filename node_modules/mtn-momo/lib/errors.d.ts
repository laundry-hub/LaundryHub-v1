import { AxiosError } from "axios";
import { Payment } from "./collections";
import { FailureReason } from "./common";
import { Transfer } from "./disbursements";
export declare class MtnMoMoError extends Error {
    transaction?: Payment | Transfer;
    constructor(message?: string);
}
export declare class ApprovalRejectedError extends MtnMoMoError {
    name: string;
}
export declare class ExpiredError extends MtnMoMoError {
    name: string;
}
export declare class InternalProcessingError extends MtnMoMoError {
    name: string;
}
export declare class InvalidCallbackUrlHostError extends MtnMoMoError {
    name: string;
}
export declare class InvalidCurrencyError extends MtnMoMoError {
    name: string;
}
export declare class NotAllowedTargetEnvironmentError extends MtnMoMoError {
    name: string;
}
export declare class NotAllowedError extends MtnMoMoError {
    name: string;
}
export declare class NotEnoughFundsError extends MtnMoMoError {
    name: string;
}
export declare class PayeeNotFoundError extends MtnMoMoError {
    name: string;
}
export declare class PayeeNotAllowedToReceiveError extends MtnMoMoError {
    name: string;
}
export declare class PayerLimitReachedError extends MtnMoMoError {
    name: string;
}
export declare class PayerNotFoundError extends MtnMoMoError {
    name: string;
}
export declare class PaymentNotApprovedError extends MtnMoMoError {
    name: string;
}
export declare class ResourceAlreadyExistError extends MtnMoMoError {
    name: string;
}
export declare class ResourceNotFoundError extends MtnMoMoError {
    name: string;
}
export declare class ServiceUnavailableError extends MtnMoMoError {
    name: string;
}
export declare class TransactionCancelledError extends MtnMoMoError {
    name: string;
}
export declare class UnspecifiedError extends MtnMoMoError {
    name: string;
}
export declare function handleError(error: AxiosError): Error;
export declare function getError(code?: FailureReason, message?: string): ApprovalRejectedError | ExpiredError | InternalProcessingError | InvalidCallbackUrlHostError | InvalidCurrencyError | NotAllowedTargetEnvironmentError | NotAllowedError | NotEnoughFundsError | PayeeNotFoundError | PayeeNotAllowedToReceiveError | PayerLimitReachedError | PayerNotFoundError | PaymentNotApprovedError | ResourceAlreadyExistError | ResourceNotFoundError | ServiceUnavailableError | TransactionCancelledError | UnspecifiedError;
export declare function getTransactionError(transaction: Payment | Transfer): MtnMoMoError;
