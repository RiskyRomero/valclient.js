import { IHttp } from "./interfaces/http";
import { CurrentAvailableGameModeResponse, CurrentGroupIdResponse, CustomGameSettingsInput, GroupDetails, IGroup } from "./interfaces/group";
import { State } from "./types/utils";
import { Queues } from "./types/resources";
declare class Group implements IGroup {
    private readonly _http;
    private readonly _puuid;
    constructor(http: IHttp, puuid: string);
    /**
     *  Party_FetchPlayer
     *
     *  Get the Group ID that a given player belongs to
     */
    current(): Promise<CurrentGroupIdResponse>;
    /**
     *  Party_RemovePlayer
     *
     *  Removes a player from the current group
     * @param puuid
     * @returns
     */
    removePlayer(puuid?: string): Promise<boolean>;
    /**
     *  Party_FetchParty
     *
     *  Get details about a group party id
     */
    currentDetails(): Promise<GroupDetails>;
    /**
     *  Party_SetMemberReady
     *
     *  Sets whether a party member is ready for queueing or not
     * @param ready
     * @returns
     */
    setMemberReady(ready?: boolean): Promise<GroupDetails>;
    /**
     *  Party_RefreshCompetitiveTier
     *
     *  Refreshes the competitive tier for a player
     */
    refreshCompetitiveTier(): Promise<boolean>;
    /**
     *  Party_RefreshPlayerIdentity
     *
     *  Refreshes the identity for a player
     */
    refreshPlayerIdentity(): Promise<GroupDetails>;
    /**
     *  Party_RefreshPings
     *
     *  Refreshes the pings for a player
     */
    refreshPlayerPings(): Promise<GroupDetails>;
    /**
     *  Party_ChangeQueue
     *
     *  Sets the matchmaking queue for the party
     * @param queueID
     * @returns
     */
    changeQueue(queueID: Queues): Promise<GroupDetails>;
    /**
     *  Party_StartCustomGame
     *
     *  Starts a custom game
     */
    startCustomGame(): Promise<GroupDetails>;
    /**
     *  Party_EnterMatchmakingQueue
     *
     *  Enters the matchmaking queue
     */
    enterMatchmakingQueue(): Promise<GroupDetails>;
    /**
     *  Party_LeaveMatchmakingQueue
     *
     *  Leaves the matchmaking queue
     */
    leaveMatchmakingQueue(): Promise<GroupDetails>;
    /**
     *  Party_SetAccessibility
     *
     *  Changes the group state to be open or closed
     */
    changeState(open?: State): Promise<GroupDetails>;
    /**
     *  Party_SetCustomGameSettings
     *
     *  Changes the settings for a custom game
     * @param settings
     */
    setCustomGameSettings({ Map, Mode, GamePod, GameRules }: CustomGameSettingsInput): Promise<GroupDetails>;
    /**
     *
     *  Party_InviteToPartyByDisplayName
     *
     *  Invites a player to the party with their display name
     *  omit the "#" in tag
     * @param name
     * @param tag
     */
    inviteByDisplayName(name: string, tag: string): Promise<GroupDetails>;
    /**
     *  Party_RequestToJoinParty
     *
     *  Requests to join a party
     * @param party_id
     * @param puuid
     */
    requestJoinToGroup(party_id: string, puuid: string): Promise<GroupDetails>;
    /**
     * Party_DeclineRequest
     *
     * Declines a party request
     * @param request_id The ID of the party request. Can be found from the Requests array on the getCurrentDetailsGroup.
     */
    declineRequestGroup(request_id: string): Promise<GroupDetails>;
    /**
     * Party_PlayerJoin
     *
     * Join a group
     * @param party_id
     */
    joinGroup(party_id: string): Promise<GroupDetails>;
    /**
     * Party_PlayerLeave
     *
     * Leave a party
     * @param party_id
     */
    leaveGroup(party_id: string): Promise<GroupDetails>;
    /**
     * Party_FetchCustomGameConfigs
     *
     * Get information about the available gamemodes
     */
    currentAvailableGameModes(): Promise<CurrentAvailableGameModeResponse>;
}
export { Group };
//# sourceMappingURL=group.d.ts.map