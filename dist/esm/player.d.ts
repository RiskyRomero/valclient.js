import { CurrentPlayerResponse, Friend, IPlayer, PendingFriendRequest, Presence, PresencePrivate, RNETFetchChatSession } from "./interfaces/player";
import { IHttp } from "./interfaces/http";
declare class Player implements IPlayer {
    private readonly _puuid;
    private readonly _http;
    constructor(httpService: IHttp, puuid: string);
    /**
     *  PlayerAlias_RNet_GetActiveAlias
     *
     *  Gets current player session authenticated
     * @returns
     */
    current(): Promise<CurrentPlayerResponse>;
    /**
     * CHATFRIENDS_RNet_GET_ALL
     *
     * Get a list of friends
     * @returns
     */
    allFriends(): Promise<Friend[]>;
    /**
     * TEXT_CHAT_RNet_FetchSession
     *
     * Get the current session including player name and PUUID
     */
    session(): Promise<RNETFetchChatSession>;
    /**
     * PRESENCE_RNet_GET
     *
     *  NOTE: Only works on self or active user's friends
     * @param puuid Use puuid passed in parameter or self puuid
     * @returns
     */
    onlineFriend(puuid?: string): Promise<PresencePrivate | null>;
    /**
     * PRESENCE_RNet_GET_ALL
     *
     * Get a list of online friends and their activity
     * private is a base64-encoded JSON string that contains useful information such as party and in-progress game score.
     * If decode base64-encoded JSON, we have type FriendPrivate for JSON Object
     *
     * @type {FriendPrivate}
     * @returns
     */
    allFriendsOnline(): Promise<Presence[]>;
    /**
     *  FRIENDS_RNet_FetchFriendRequests
     *
     *  Get pending friend requests
     * @returns
     */
    pendingFriendsRequests(): Promise<PendingFriendRequest[]>;
}
export { Player };
//# sourceMappingURL=player.d.ts.map