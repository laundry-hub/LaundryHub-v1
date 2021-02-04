import { AxiosInstance } from "axios";
import { Credentials } from "./common";
export default class Users {
    private client;
    constructor(client: AxiosInstance);
    /**
     * Used to create an API user in the sandbox target environment
     * @param host The provider callback host
     */
    create(host: string): Promise<string>;
    /**
     * Used to create an API key for an API user in the sandbox target environment.
     * @param userId
     */
    login(userId: string): Promise<Credentials>;
}
