var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class LiveGame {
    constructor(http, puuid) {
        this._http = http;
        this._puuid = puuid;
    }
    /**
     * CoreGame_FetchPlayer
     *
     * Get the game ID for an ongoing game the player is in
     */
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/core-game/v1/players/${this._puuid}`, "glz");
            return data;
        });
    }
    /**
     * CoreGame_FetchMatch
     *
     * Get information about an ongoing game
     */
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            const data = yield this._http.fetch(`/core-game/v1/matches/${MatchID}`, "glz");
            return data;
        });
    }
    /**
     * CoreGame_FetchMatchLoadouts
     *
     * Get player skins and sprays for an ongoing game
     * @returns
     */
    loadout() {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            const data = yield this._http.fetch(`/core-game/v1/matches/${MatchID}/loadouts`, "glz");
            return data;
        });
    }
    /**
     * CoreGame_DisassociatePlayer
     *
     * Leave an in-progress game
     */
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            yield this._http.post(`/core-game/v1/players/${this._puuid}/disassociate/${MatchID}`, "glz");
            return true;
        });
    }
}
export { LiveGame };
//# sourceMappingURL=liveGame.js.map