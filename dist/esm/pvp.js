var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Pvp {
    constructor(http, puuid, region) {
        this._http = http;
        this._puuid = puuid;
        this._region = region;
    }
    /**
     * Content_FetchContent
     *
     * Get all PVP content e.g: battleplass, events, acts, etc...
     */
    contents() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/content-service/v3/content", "shared");
            return data;
        });
    }
    /**
     * AccountXP_GetPlayer
     *
     * Get the account level, XP, and XP history for the active player
     */
    accountXp() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/account-xp/v1/players/${this._puuid}`, "pd");
            return data;
        });
    }
    /**
     * MMR_FetchPlayer
     *
     * Get the match making rating for a player
     */
    mmr(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            puuid = puuid || this._puuid;
            const data = yield this._http.fetch(`/mmr/v1/players/${puuid}`, "pd");
            return data;
        });
    }
    /**
     *  MatchHistory_FetchMatchHistory
     *
     *  Get recent matches for a player
     *  There are 3 optional query parameters: start_index, end_index, and queue_id.
     * @param params
     */
    matchHistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const puuid = (params === null || params === void 0 ? void 0 : params.puuid) || this._puuid;
            const start = (params === null || params === void 0 ? void 0 : params.start) || 0;
            const end = (params === null || params === void 0 ? void 0 : params.end) || 15;
            const queue_id = (params === null || params === void 0 ? void 0 : params.queue_id) || "null";
            const data = yield this._http.fetch(`/match-history/v1/history/${puuid}?startIndex=${start}&endIndex=${end}${queue_id !== "null" ? "&" + "queue=" + queue_id : ""}`, "pd");
            return data;
        });
    }
    /**
     * Get the full info for a previous match
     *
     * Includes everything that the in-game match details screen shows including damage and kill positions, same as the official API w/ a production key
     * @param match_id
     */
    matchDetails(match_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/match-details/v1/matches/${match_id}`, "pd");
            return data;
        });
    }
    /**
     *   Get recent games and how they changed ranking
     *
     *  There are 3 optional query parameters: start_index, end_index, and queue_id. queue can be one of null, competitive, custom, deathmatch, ggteam, newmap, onefa, snowball, spikerush, or unrated.
     * @param params
     */
    competitiveUpdates(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const puuid = (params === null || params === void 0 ? void 0 : params.puuid) || this._puuid;
            const start = (params === null || params === void 0 ? void 0 : params.start) || 0;
            const end = (params === null || params === void 0 ? void 0 : params.end) || 15;
            const queue_id = (params === null || params === void 0 ? void 0 : params.queue_id) || "null";
            const data = yield this._http.fetch(`/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${start}&endIndex=${end}${queue_id !== "null" ? "&" + "queue=" + queue_id : ""}`, "pd");
            return data;
        });
    }
    /**
     * MMR_FetchLeaderboard
     *
     * Get the competitive leaderboard for a given season
     * The query parameter query can be added to search for a username.
     * @param params
     */
    leadersboards(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const region = (params === null || params === void 0 ? void 0 : params.region) || this._region;
            const season = (params === null || params === void 0 ? void 0 : params.season_id) || (yield this._getLiveSeason());
            const start = (params === null || params === void 0 ? void 0 : params.start) || 0;
            const size = (params === null || params === void 0 ? void 0 : params.size) || 25;
            const data = yield this._http.fetch(`/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${season}?startIndex=${start}&size=${size}`, "pd");
            return data;
        });
    }
    /**
     * Restrictions_FetchPlayerRestrictionsV2
     *
     * Checks for any gameplay penalties on the account
     */
    playerRestrictions() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/restrictions/v2/penalties", "pd");
            return data;
        });
    }
    /**
     * ItemProgressionDefinitionsV2_Fetch
     *
     * Get details for item upgrades
     */
    itemProgressDefinitions() {
        return __awaiter(this, void 0, void 0, function* () {
            const { Definitions } = yield this._http.fetch("/contract-definitions/v3/item-upgrades", "pd");
            return Definitions;
        });
    }
    /**
     * Get a current live season
     * @returns
     */
    _getLiveSeason() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.mmr();
            return data.LatestCompetitiveUpdate.SeasonID;
        });
    }
    /**
     * Config_FetchConfig
     *
     * Get various internal game configuration settings set by Riot
     */
    internalConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/v1/config/${this._region}`, "shared");
            return data;
        });
    }
}
export { Pvp };
//# sourceMappingURL=pvp.js.map