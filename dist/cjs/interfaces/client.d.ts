import { AxiosInstance } from "axios";
import { Regions } from "../types/resources";
import { AuthInput } from "./auth";
import { IContracts } from "./contracts";
import { IPvp } from "./pvp";
import { IValorant } from "./valorant";
import { IGroup } from "./group";
import { IPlayer } from "./player";
import { ILiveGame } from "./liveGame";
import { IPreGame } from "./preGame";
import { ISession } from "./session";
import { IStore } from "./store";
import { HttpService } from "../http";
export interface IValClient {
    _http_service: HttpService;
    valorant_api: AxiosInstance;
    allRegions: Regions[];
    auth: {
        username: string;
        password: string;
    } | null;
    region: string;
    shard: string;
    endpoints: BaseEndpoints;
    init(config: ClientConfig): Promise<void>;
    player: IPlayer | null;
    valorant: IValorant | null;
    group: IGroup | null;
    live_game: ILiveGame | null;
    pre_game: IPreGame | null;
    session: ISession | null;
    pvp: IPvp | null;
    store: IStore | null;
    contracts: IContracts | null;
}
export interface LockFileType {
    name: string;
    PID: string;
    port: string;
    password: string;
    protocol: string;
}
export interface ClientConfig {
    region: Regions;
    auth?: AuthInput;
}
export interface BaseEndpoints {
    pd: string | null;
    glz: string | null;
    shared: string | null;
    local: string | null;
}
export interface LocalHeaders {
    Authorization: string;
}
export interface Headers {
    Authorization: string;
    "X-Riot-Entitlements-JWT": string;
    "X-Riot-ClientPlatform": string;
    "X-Riot-ClientVersion": string;
}
//# sourceMappingURL=client.d.ts.map