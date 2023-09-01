import { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpService } from "./http";
/** Interfaces */
import { IPlayer } from "./interfaces/player";
import { BaseEndpoints, ClientConfig, Headers, IValClient } from "./interfaces/client";
import { Regions } from "./types/resources";
import { IValorant } from "./interfaces/valorant";
import { IGroup } from "./interfaces/group";
import { ILiveGame } from "./interfaces/liveGame";
import { IPreGame } from "./interfaces/preGame";
import { ISession } from "./interfaces/session";
import { IPvp } from "./interfaces/pvp";
import { IStore } from "./interfaces/store";
import { IContracts } from "./interfaces/contracts";
import { ILoadout } from "./interfaces/loadout";
import { IChat } from "./interfaces/chat";
export declare const addAuthHeaders: (headers: Partial<Headers>) => (config: AxiosRequestConfig) => AxiosRequestConfig;
export declare const addLocalHeaders: (username: string, password: string) => (config: AxiosRequestConfig) => AxiosRequestConfig;
declare class ValClient implements IValClient {
    private _axios;
    private _puuid;
    private _lockfile;
    private _headers;
    private _region;
    private _shard;
    private _auth;
    private _client_platform;
    private _client_version;
    private _local_username_auth;
    private _valorant_api;
    _http_service: HttpService;
    player: IPlayer | null;
    chat: IChat | null;
    valorant: IValorant | null;
    group: IGroup | null;
    live_game: ILiveGame | null;
    pre_game: IPreGame | null;
    session: ISession | null;
    pvp: IPvp | null;
    store: IStore | null;
    loadout: ILoadout | null;
    contracts: IContracts | null;
    constructor();
    /**
     * Start client
     */
    init({ region, auth }: ClientConfig): Promise<void>;
    /**
     * Return Axios Instance for Valorant API (https://valorant-api.com)
     * baseUrl for endpoints is https://valorant-api.com/v1
     */
    get valorant_api(): AxiosInstance;
    /**
     * All regions we can use in Client
     * @returns All regions
     */
    get allRegions(): Regions[];
    /**
     * Current authenticate person
     */
    get auth(): {
        username: string;
        password: string;
    } | null;
    /**
     * Actual Region
     */
    get region(): string;
    /**
     * Actual shard
     */
    get shard(): string;
    /**
     * Actual endpoints
     */
    get endpoints(): BaseEndpoints;
    /**
     * Configure Axios to add Headers in each request
     */
    private _configureAxios;
    /**
     * Create Bases Endpoints without Localendpoint for use in Axios
     */
    private _buildEndpoints;
    /**
     * Create Base endpoint local for use in Axios
     */
    private _buildLocalEndpoint;
    /**
     * Get Headers to make Requests
     */
    private _getAuthHeaders;
    /**
     * Get Auth Headers when not have Auth
     */
    private _getLocalHeaders;
    /**
     * Get a client version in Valorant API (https://valorant-api.com)
     */
    private _getClientVersion;
    /**
     * Get a lockfile when valorant is running, if dont find lockfile valorant is not running
     */
    private _getLockfile;
}
export { ValClient };
//# sourceMappingURL=client.d.ts.map