export { Payment, PaymentRequest } from "./collections";
export { Transfer, TransferRequest } from "./disbursements";
export * from "./errors";
export { PartyIdType as PayerType, Party as Payer, TransactionStatus as Status, Balance, Environment, FailureReason, GlobalConfig, ProductConfig } from "./common";
import Collections from "./collections";
import Disbursements from "./disbursements";
import Users from "./users";
import { GlobalConfig, ProductConfig, SubscriptionConfig } from "./common";
export interface MomoClient {
    Collections(productConfig: ProductConfig): Collections;
    Disbursements(productConfig: ProductConfig): Disbursements;
    Users(subscription: SubscriptionConfig): Users;
}
/**
 * Initialise the library
 *
 * @param globalConfig Global configuration required to use any product
 */
export declare function create(globalConfig: GlobalConfig): MomoClient;
