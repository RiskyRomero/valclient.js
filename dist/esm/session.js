var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Session {
    constructor(http, puuid) {
        this._http = http;
        this._puuid = puuid;
    }
    /**
     *  Session_Get
     *
     *  Get information about the current game session
     * @returns
     */
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/session/v1/sessions/${this._puuid}`, "glz");
            return data;
        });
    }
    /**
     * Session_ReConnect
     *
     * Try reconnect current game session
     * @returns
     */
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/session/v1/sessions/${this._puuid}/reconnect`, "glz");
            return data;
        });
    }
}
export { Session };
//# sourceMappingURL=session.js.map