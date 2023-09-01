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
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";
import { URL } from "url";
import { parseQueryString } from "./utils";
import { AuthenticationFailed } from "./errors/authenticationFailed";
class Auth {
    constructor(auth) {
        this._axios = axios.create();
        this._authUrlRiotEndpoint = "https://auth.riotgames.com/api/v1/authorization";
        this._entitlementsAuthRiotEndpoint = "https://entitlements.auth.riotgames.com/api/token/v1";
        this._authUserUrlRiotEndpoint = "https://auth.riotgames.com/userinfo";
        this._cookieJar = new tough.CookieJar();
        this._username = auth.username;
        this._password = auth.password;
        axiosCookieJarSupport(this._axios);
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
                throw new AuthenticationFailed();
            }
            const urlResponse = new URL(login.data.response.parameters.uri);
            const { access_token } = parseQueryString(urlResponse.hash);
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
export default Auth;
//# sourceMappingURL=auth.js.map