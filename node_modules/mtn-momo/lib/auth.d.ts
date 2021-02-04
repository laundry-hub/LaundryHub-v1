import { AxiosInstance } from "axios";
import { AccessToken, Config, UserConfig } from "./common";
export declare type TokenRefresher = () => Promise<string>;
export declare type Authorizer = (config: Config, client?: AxiosInstance) => Promise<AccessToken>;
export declare function createTokenRefresher(authorize: Authorizer, config: Config): TokenRefresher;
export declare const authorizeCollections: Authorizer;
export declare const authorizeDisbursements: Authorizer;
export declare function createBasicAuthToken(config: UserConfig): string;
