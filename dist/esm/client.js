var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { readFileSync } from "fs";
import https from "https";
import { HttpService } from "./http";
import Auth from "./auth";
/** Utils */
import { getConfigurationPath } from "./utils";
/** Resources */
import { regions, regionShardOverride, shardRegionOverride } from "./resources";
/** Errors */
import { ValorantNotRunning } from "./errors/valorantNotRunning";
import { SystemNotSupported } from "./errors/systemNotSupported";
import { Player } from "./player";
import { Valorant } from "./valorant";
import { Group } from "./group";
import { LiveGame } from "./liveGame";
import { PreGame } from "./preGame";
import { Session } from "./session";
import { Pvp } from "./pvp";
import { Store } from "./store";
import { Contracts } from "./contracts";
import { Loadout } from "./loadout";
import { Chat } from "./chat";
export const addAuthHeaders = (headers) => (config) => {
    config.headers = headers;
    return config;
};
export const addLocalHeaders = (username, password) => (config) => {
    if (config.url.includes("127.0.0.1")) {
        config.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        config.auth = {
            username,
            password,
        };
        config.withCredentials = true;
    }
    return config;
};
class ValClient {
    constructor() {
        this._axios = axios;
        this._region = null;
        this._auth = null;
        this._client_platform = "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";
        this._local_username_auth = "riot";
        this.player = null;
        this.chat = null;
        this.valorant = null;
        this.group = null;
        this.live_game = null;
        this.pre_game = null;
        this.session = null;
        this.pvp = null;
        this.store = null;
        this.loadout = null;
        this.contracts = null;
        this._http_service = new HttpService(this._axios);
        this._valorant_api = axios.create({ baseURL: "https://valorant-api.com/v1" });
    }
    /**
     * Start client
     */
    init({ region, auth }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._region = region;
            this._shard = this._region;
            if (regionShardOverride[this._region.toLowerCase()]) {
                this._shard = regionShardOverride[this._region.toLowerCase()];
            }
            if (shardRegionOverride[this._shard]) {
                this._region = shardRegionOverride[this._shard];
            }
            if (auth) {
                this._auth = new Auth(auth);
            }
            else if (process.platform !== "win32") {
                throw new SystemNotSupported();
            }
            yield this._getClientVersion();
            this._buildEndpoints();
            if (!this._auth) {
                this._getLockfile();
                this._buildLocalEndpoint();
                yield this._getLocalHeaders();
                this.player = new Player(this._http_service, this._puuid);
                this.valorant = new Valorant(this._http_service);
                this.chat = new Chat(this._http_service);
            }
            else {
                yield this._getAuthHeaders();
            }
            this._configureAxios();
            this.group = new Group(this._http_service, this._puuid);
            this.live_game = new LiveGame(this._http_service, this._puuid);
            this.pre_game = new PreGame(this._http_service, this._puuid);
            this.session = new Session(this._http_service, this._puuid);
            this.pvp = new Pvp(this._http_service, this._puuid, this._region);
            this.store = new Store(this._http_service, this._puuid);
            this.contracts = new Contracts(this._http_service, this._puuid);
            this.loadout = new Loadout(this._http_service, this._puuid, this.valorant_api, this.store);
        });
    }
    /**
     * Return Axios Instance for Valorant API (https://valorant-api.com)
     * baseUrl for endpoints is https://valorant-api.com/v1
     */
    get valorant_api() {
        return this._valorant_api;
    }
    /**
     * All regions we can use in Client
     * @returns All regions
     */
    get allRegions() {
        return regions;
    }
    /**
     * Current authenticate person
     */
    get auth() {
        if (this._auth) {
            return this._auth.auth;
        }
        return null;
    }
    /**
     * Actual Region
     */
    get region() {
        return this._region;
    }
    /**
     * Actual shard
     */
    get shard() {
        return this._shard;
    }
    /**
     * Actual endpoints
     */
    get endpoints() {
        return this._http_service.endpoints;
    }
    /**
     * Configure Axios to add Headers in each request
     */
    _configureAxios() {
        var _a;
        const authInterceptor = addAuthHeaders(this._headers);
        const localInterceptor = addLocalHeaders(this._local_username_auth, (_a = this._lockfile) === null || _a === void 0 ? void 0 : _a.password);
        this._axios.interceptors.request.use(authInterceptor);
        this._axios.interceptors.request.use(localInterceptor);
    }
    /**
     * Create Bases Endpoints without Localendpoint for use in Axios
     */
    _buildEndpoints() {
        this._http_service.baseEndpoint = {
            pd: `https://pd.${this._shard}.a.pvp.net`,
            glz: `https://glz-${this._region}-1.${this._shard}.a.pvp.net`,
            shared: `https://shared.${this._shard}.a.pvp.net`,
        };
    }
    /**
     * Create Base endpoint local for use in Axios
     */
    _buildLocalEndpoint() {
        this._http_service.baseEndpoint = { local: `https://127.0.0.1:${this._lockfile.port}` };
    }
    /**
     * Get Headers to make Requests
     */
    _getAuthHeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            const { puuid, headers } = yield this._auth.authenticate();
            headers["X-Riot-ClientPlatform"] = this._client_platform;
            headers["X-Riot-ClientVersion"] = this._client_version;
            this._puuid = puuid;
            this._headers = headers;
        });
    }
    /**
     * Get Auth Headers when not have Auth
     */
    _getLocalHeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken, subject: puuid, token, } = yield this._http_service.fetch("/entitlements/v1/token", "local", {
                auth: { username: this._local_username_auth, password: this._lockfile.password },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false,
                }),
            });
            this._headers = {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": token,
                "X-Riot-ClientPlatform": this._client_platform,
                "X-Riot-ClientVersion": this._client_version,
            };
            this._puuid = puuid;
        });
    }
    /**
     * Get a client version in Valorant API (https://valorant-api.com)
     */
    _getClientVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { data: { branch, buildVersion, version }, }, } = yield this.valorant_api.get("/version");
            this._client_version = `${branch}-shipping-${buildVersion}-${version.split(".")[3]}`;
        });
    }
    /**
     * Get a lockfile when valorant is running, if dont find lockfile valorant is not running
     */
    _getLockfile() {
        try {
            const lockfilePath = getConfigurationPath("lockfile");
            const lockfile = readFileSync(lockfilePath, { encoding: "utf-8" });
            const [name, PID, port, password, protocol] = lockfile.split(":");
            this._lockfile = {
                name,
                PID,
                port,
                password,
                protocol,
            };
        }
        catch (e) {
            throw new ValorantNotRunning();
        }
    }
}
export { ValClient };
//# sourceMappingURL=client.js.map