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
const axios_1 = __importDefault(require("axios"));
const axios_cookiejar_support_1 = __importDefault(require("axios-cookiejar-support"));
const tough_cookie_1 = __importDefault(require("tough-cookie"));
const url_1 = require("url");
const _utils_1 = require("./utils");
const authenticationFailed_1 = require("./errors/authenticationFailed");
class Auth {
    constructor(auth) {
        this._axios = axios_1.default.create();
        this._authUrlRiotEndpoint = "https://auth.riotgames.com/api/v1/authorization";
        this._entitlementsAuthRiotEndpoint = "https://entitlements.auth.riotgames.com/api/token/v1";
        this._authUserUrlRiotEndpoint = "https://auth.riotgames.com/userinfo";
        this._cookieJar = new tough_cookie_1.default.CookieJar();
        this._username = auth.username;
        this._password = auth.password;
        (0, axios_cookiejar_support_1.default)(this._axios);
        this._axios.defaults.jar = this._cookieJar;
    }
    /**
     * Get current autheticate person
     */
    get auth() {
        return {
            username: this._username,
            password: this._password,
        };
    }
    _createSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                client_id: "play-valorant-web-prod",
                nonce: "1",
                redirect_uri: "https://playvalorant.com/opt_in",
                response_type: "token id_token",
            };
            yield this._axios.post(this._authUrlRiotEndpoint, data, {
                withCredentials: true,
                jar: this._cookieJar,
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _isAuthenticationFailed(obj) {
        return obj.error !== undefined;
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._createSession();
            const authorization = {
                type: "auth",
                username: this._username,
                password: this._password,
            };
            const login = yield this._axios.put(this._authUrlRiotEndpoint, authorization, {
                withCredentials: true,
                jar: this._cookieJar,
            });
            if (this._isAuthenticationFailed(login.data)) {
                throw new authenticationFailed_1.AuthenticationFailed();
            }
            const urlResponse = new url_1.URL(login.data.response.parameters.uri);
            const { access_token } = (0, _utils_1.parseQueryString)(urlResponse.hash);
            const headers = {
                Authorization: `Bearer ${access_token}`,
            };
            this._axios.defaults.headers = Object.assign(Object.assign({}, this._axios.defaults.headers), headers);
            this._axios.defaults.withCredentials = true;
            const { data: { entitlements_token }, } = yield this._axios.post(this._entitlementsAuthRiotEndpoint, {}, { jar: this._cookieJar });
            const { data: { sub: puuid }, } = yield this._axios.post(this._authUserUrlRiotEndpoint, {}, { jar: this._cookieJar });
            headers["X-Riot-Entitlements-JWT"] = entitlements_token;
            return { puuid, headers };
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map