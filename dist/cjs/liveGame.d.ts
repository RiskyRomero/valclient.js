import { IHttp } from "./interfaces/http";
import { CoreGameDetailsResponse, CoreGameLoadoutResponse, CoreGameResponse, ILiveGame } from "./interfaces/liveGame";
declare class LiveGame implements ILiveGame {
    private readonly _http;
    private readonly _puuid;
    constructor(http: IHttp, puuid: string);
    /**
     * CoreGame_FetchPlayer
     *
     * Get the game ID for an ongoing game the player is in
     */
    current(): Promise<CoreGameResponse>;
    /**
     * CoreGame_FetchMatch
     *
     * Get information about an ongoing game
     */
    details(): Promise<CoreGameDetailsResponse>;
    /**
     * CoreGame_FetchMatchLoadouts
     *
     * Get player skins and sprays for an ongoing game
     * @returns
     */
    loadout(): Promise<CoreGameLoadoutResponse>;
    /**
     * CoreGame_DisassociatePlayer
     *
     * Leave an in-progress game
     */
    disconnect(): Promise<boolean>;
}
export { LiveGame };
//# sourceMappingURL=liveGame.d.ts.map