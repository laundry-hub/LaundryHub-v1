import { AxiosInstance } from "axios";
import { TokenRefresher } from "./auth";
import { GlobalConfig, SubscriptionConfig } from "./common";
export declare function createClient(config: SubscriptionConfig & GlobalConfig, client?: AxiosInstance): AxiosInstance;
export declare function createAuthClient(refresh: TokenRefresher, client: AxiosInstance): AxiosInstance;
export declare function withErrorHandling(client: AxiosInstance): AxiosInstance;
