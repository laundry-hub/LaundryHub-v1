import { PaymentRequest } from "./collections";
import { GlobalConfig, ProductConfig, SubscriptionConfig, UserConfig } from "./common";
import { TransferRequest } from "./disbursements";
export declare function validateRequestToPay(paymentRequest: PaymentRequest): Promise<void>;
export declare function validateTransfer(payoutRequest: TransferRequest): Promise<void>;
export declare function validateGlobalConfig(config: GlobalConfig): void;
export declare function validateProductConfig(config: ProductConfig): void;
export declare function validateSubscriptionConfig(config: SubscriptionConfig): void;
export declare function validateUserConfig({ userId, userSecret }: UserConfig): void;
