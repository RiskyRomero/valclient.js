import { CrossHair } from "./interfaces/crosshair";
import { IHttp } from "./interfaces/http";
import { ClientSettingsResponse, IValorant, ValorantProcessResponse, ClientSettings } from "./interfaces/valorant";
declare class Valorant implements IValorant {
    private readonly _http;
    constructor(http: IHttp);
    /**
     * RiotClientSession_FetchSessions
     *
     * Gets info about the running Valorant process including start arguments
     * @returns
     */
    process(): Promise<ValorantProcessResponse | Record<string, never>>;
    /**
     *  RiotKV_RNet_GetSettings
     *
     *  Get client settings
     */
    clientSettings(): Promise<ClientSettingsResponse>;
    /**
     *  RiotKV_RNet_PutSettings
     *
     *  Update client settings
     */
    changeSettings(settings: ClientSettings): Promise<ClientSettingsResponse>;
    /**
     * Get crosshair settings
     * @returns Profile name with crosshair settings
     */
    crossHair(): Promise<Record<string, CrossHair>>;
}
export { Valorant };
//# sourceMappingURL=valorant.d.ts.map