import { IHttp } from "./interfaces/http";
import { Regions } from "./types/resources";
import { IPvp, PvpAccountXp, PvpCompetitiveUpdates, PvpContents, PvpInternalConfig, PvpItemProgressDefinitions, PvpLeaderboard, PvpLeaderboardParams, PvpMatchDetails, PvpMatchHistory, PvpMatchHistoryInput, PvpMMR, PvpPlayerRestrictions } from "./interfaces/pvp";
declare class Pvp implements IPvp {
    private readonly _http;
    private readonly _puuid;
    private readonly _region;
    constructor(http: IHttp, puuid: string, region: Regions);
    /**
     * Content_FetchContent
     *
     * Get all PVP content e.g: battleplass, events, acts, etc...
     */
    contents(): Promise<PvpContents>;
    /**
     * AccountXP_GetPlayer
     *
     * Get the account level, XP, and XP history for the active player
     */
    accountXp(): Promise<PvpAccountXp>;
    /**
     * MMR_FetchPlayer
     *
     * Get the match making rating for a player
     */
    mmr(puuid?: string): Promise<PvpMMR>;
    /**
     *  MatchHistory_FetchMatchHistory
     *
     *  Get recent matches for a player
     *  There are 3 optional query parameters: start_index, end_index, and queue_id.
     * @param params
     */
    matchHistory(params?: PvpMatchHistoryInput): Promise<PvpMatchHistory>;
    /**
     * Get the full info for a previous match
     *
     * Includes everything that the in-game match details screen shows including damage and kill positions, same as the official API w/ a production key
     * @param match_id
     */
    matchDetails(match_id: string): Promise<PvpMatchDetails>;
    /**
     *   Get recent games and how they changed ranking
     *
     *  There are 3 optional query parameters: start_index, end_index, and queue_id. queue can be one of null, competitive, custom, deathmatch, ggteam, newmap, onefa, snowball, spikerush, or unrated.
     * @param params
     */
    competitiveUpdates(params?: PvpMatchHistoryInput): Promise<PvpCompetitiveUpdates>;
    /**
     * MMR_FetchLeaderboard
     *
     * Get the competitive leaderboard for a given season
     * The query parameter query can be added to search for a username.
     * @param params
     */
    leadersboards(params?: PvpLeaderboardParams): Promise<PvpLeaderboard>;
    /**
     * Restrictions_FetchPlayerRestrictionsV2
     *
     * Checks for any gameplay penalties on the account
     */
    playerRestrictions(): Promise<PvpPlayerRestrictions>;
    /**
     * ItemProgressionDefinitionsV2_Fetch
     *
     * Get details for item upgrades
     */
    itemProgressDefinitions(): Promise<PvpItemProgressDefinitions[]>;
    /**
     * Get a current live season
     * @returns
     */
    private _getLiveSeason;
    /**
     * Config_FetchConfig
     *
     * Get various internal game configuration settings set by Riot
     */
    internalConfig(): Promise<PvpInternalConfig>;
}
export { Pvp };
//# sourceMappingURL=pvp.d.ts.map