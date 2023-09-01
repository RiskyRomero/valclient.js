var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { agentsMappedById } from "./resources/agents";
class PreGame {
    constructor(http, puuid) {
        this._http = http;
        this._puuid = puuid;
    }
    /**
     * Pregame_GetPlayer
     *
     * Get the ID of a game in the pre-game stage
     */
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/pregame/v1/players/${this._puuid}`, "glz");
            return data;
        });
    }
    /**
     * Pregame_GetMatch
     *
     * Get info for a game in the pre-game stage
     * @param match_id
     * @returns
     */
    details(match_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            match_id = match_id || MatchID;
            const data = yield this._http.fetch(`/pregame/v1/matches/${match_id}`, "glz");
            return data;
        });
    }
    /**
     * Pregame_GetMatchLoadouts
     *
     * Get player skins and sprays for a game in the pre-game stage
     * @param match_id
     */
    loadout(match_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            match_id = match_id || MatchID;
            const data = yield this._http.fetch(`/pregame/v1/matches/${match_id}/loadouts`, "glz");
            return data;
        });
    }
    /**
     * Pregame_FetchChatToken
     *
     * Get a chat token
     * @param match_id
     */
    // async teamChatMUCToken(match_id?: string): Promise<GLZEndpointTokenResponse> {
    //     const { MatchID } = await this.current();
    //     match_id = match_id || MatchID;
    //     const data = await this._http.fetch<GLZEndpointTokenResponse>(`/pregame/v1/matches/${match_id}/chattoken`, "glz");
    //     //TODO: not sure about this return type, i will change later when in unrated match to test return type
    //     return data;
    // }
    /**
     * Pregame_FetchChatToken
     *
     * Get a chat token
     * @param match_id
     */
    // async voiceChatToken(match_id?: string): Promise<GLZEndpointTokenResponse> {
    //     const { MatchID } = await this.current();
    //     match_id = match_id || MatchID;
    //     const data = await this._http.fetch<GLZEndpointTokenResponse>(`/pregame/v1/matches/${match_id}/voicetoken`, "glz");
    //     //TODO: not sure about this return type, i will change later when in unrated match to test return type
    //     return data;
    // }
    /**
     * Pregame_SelectCharacter
     *
     * Select an agent
     * don't use this for instalocking :)
     * @param agent_id
     * @param match_id
     */
    selectCharacter(agent_id, match_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            match_id = match_id || MatchID;
            const agentId = agentsMappedById[agent_id];
            const data = yield this._http.post(`/pregame/v1/matches/${match_id}/select/${agentId}`, "glz");
            return data;
        });
    }
    /**
     * Pregame_SelectCharacter
     *
     * Lock an agent
     * don't use this for instalocking :)
     * @param agent_id
     * @param match_id
     */
    lockCharacter(agent_id, match_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            match_id = match_id || MatchID;
            const agentId = agentsMappedById[agent_id];
            const data = yield this._http.post(`/pregame/v1/matches/${match_id}/lock/${agentId}`, "glz");
            return data;
        });
    }
    /**
     * Pregame_QuitMatch
     *
     * Quit a match in the pre-game stage
     * @param match_id
     */
    quitMatch(match_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { MatchID } = yield this.current();
            match_id = match_id || MatchID;
            yield this._http.post(`/pregame/v1/matches/${match_id}/quit`, "glz");
            return true;
        });
    }
}
export { PreGame };
//# sourceMappingURL=preGame.js.map