import { IPreGame, PreGameDetailsResponse, PreGameLoadout } from "./interfaces/preGame";
import { CoreGameResponse } from "./interfaces/liveGame";
import { IHttp } from "./interfaces/http";
import { Agents } from "./types/agents";
declare class PreGame implements IPreGame {
    private readonly _http;
    private readonly _puuid;
    constructor(http: IHttp, puuid: string);
    /**
     * Pregame_GetPlayer
     *
     * Get the ID of a game in the pre-game stage
     */
    current(): Promise<CoreGameResponse>;
    /**
     * Pregame_GetMatch
     *
     * Get info for a game in the pre-game stage
     * @param match_id
     * @returns
     */
    details(match_id?: string): Promise<PreGameDetailsResponse>;
    /**
     * Pregame_GetMatchLoadouts
     *
     * Get player skins and sprays for a game in the pre-game stage
     * @param match_id
     */
    loadout(match_id?: string): Promise<PreGameLoadout>;
    /**
     * Pregame_FetchChatToken
     *
     * Get a chat token
     * @param match_id
     */
    /**
     * Pregame_FetchChatToken
     *
     * Get a chat token
     * @param match_id
     */
    /**
     * Pregame_SelectCharacter
     *
     * Select an agent
     * don't use this for instalocking :)
     * @param agent_id
     * @param match_id
     */
    selectCharacter(agent_id: Agents, match_id?: string): Promise<PreGameDetailsResponse>;
    /**
     * Pregame_SelectCharacter
     *
     * Lock an agent
     * don't use this for instalocking :)
     * @param agent_id
     * @param match_id
     */
    lockCharacter(agent_id: Agents, match_id?: string): Promise<PreGameDetailsResponse>;
    /**
     * Pregame_QuitMatch
     *
     * Quit a match in the pre-game stage
     * @param match_id
     */
    quitMatch(match_id?: string): Promise<boolean>;
}
export { PreGame };
//# sourceMappingURL=preGame.d.ts.map