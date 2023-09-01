"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValClient = exports.addLocalHeaders = exports.addAuthHeaders = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const https_1 = __importDefault(require("https"));
const http_1 = require("./http");
const auth_1 = __importDefault(require("./auth"));
/** Utils */
const _utils_1 = require("./utils");
/** Resources */
const _resources_1 = require("./resources");
/** Errors */
const valorantNotRunning_1 = require("./errors/valorantNotRunning");
const systemNotSupported_1 = require("./errors/systemNotSupported");
const player_1 = require("./player");
const valorant_1 = require("./valorant");
const group_1 = require("./group");
const liveGame_1 = require("./liveGame");
const preGame_1 = require("./preGame");
const session_1 = require("./session");
const pvp_1 = require("./pvp");
const store_1 = require("./store");
const contracts_1 = require("./contracts");
const loadout_1 = require("./loadout");
const chat_1 = require("./chat");
const addAuthHeaders = (headers) => (config) => {
    config.headers = headers;
    return config;
};
exports.addAuthHeaders = addAuthHeaders;
const addLocalHeaders = (username, password) => (config) => {
    if (config.url.includes("127.0.0.1")) {
        config.httpsAgent = new https_1.default.Agent({
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
exports.addLocalHeaders = addLocalHeaders;
class ValClient {
    constructor() {
        this._axios = axios_1.default;
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
        this._http_service = new http_1.HttpService(this._axios);
        this._valorant_api = axios_1.default.create({ baseURL: "https://valorant-api.com/v1" });
    }
    /**
     * Start client
     */
    init({ region, auth }) {
        return __awaiter(this, void 0, void 0, function* () {
            this._region = region;
            this._shard = this._region;
            if (_resources_1.regionShardOverride[this._region.toLowerCase()]) {
                this._shard = _resources_1.regionShardOverride[this._region.toLowerCase()];
            }
            if (_resources_1.shardRegionOverride[this._shard]) {
                this._region = _resources_1.shardRegionOverride[this._shard];
            }
            if (auth) {
                this._auth = new auth_1.default(auth);
            }
            else if (process.platform !== "win32") {
                throw new systemNotSupported_1.SystemNotSupported();
            }
            yield this._getClientVersion();
            this._buildEndpoints();
            if (!this._auth) {
                this._getLockfile();
                this._buildLocalEndpoint();
                yield this._getLocalHeaders();
                this.player = new player_1.Player(this._http_service, this._puuid);
                this.valorant = new valorant_1.Valorant(this._http_service);
                this.chat = new chat_1.Chat(this._http_service);
            }
            else {
                yield this._getAuthHeaders();
            }
            this._configureAxios();
            this.group = new group_1.Group(this._http_service, this._puuid);
            this.live_game = new liveGame_1.LiveGame(this._http_service, this._puuid);
            this.pre_game = new preGame_1.PreGame(this._http_service, this._puuid);
            this.session = new session_1.Session(this._http_service, this._puuid);
            this.pvp = new pvp_1.Pvp(this._http_service, this._puuid, this._region);
            this.store = new store_1.Store(this._http_service, this._puuid);
            this.contracts = new contracts_1.Contracts(this._http_service, this._puuid);
            this.loadout = new loadout_1.Loadout(this._http_service, this._puuid, this.valorant_api, this.store);
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
        return _resources_1.regions;
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
        const authInterceptor = (0, exports.addAuthHeaders)(this._headers);
        const localInterceptor = (0, exports.addLocalHeaders)(this._local_username_auth, (_a = this._lockfile) === null || _a === void 0 ? void 0 : _a.password);
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
                httpsAgent: new https_1.default.Agent({
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
            const lockfilePath = (0, _utils_1.getConfigurationPath)("lockfile");
            const lockfile = (0, fs_1.readFileSync)(lockfilePath, { encoding: "utf-8" });
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
            throw new valorantNotRunning_1.ValorantNotRunning();
        }
    }
}
exports.ValClient = ValClient;
//# sourceMappingURL=client.js.map