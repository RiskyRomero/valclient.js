import { Queues, CustomGameMapsName, Maps, GameModes, CustomGameModes, RiotServers } from "../types/resources";
import { BooleanString, State } from "../types/utils";
export interface IGroup {
    current(): Promise<CurrentGroupIdResponse>;
    removePlayer(puuid?: string): Promise<boolean>;
    currentDetails(): Promise<GroupDetails>;
    setMemberReady(ready?: boolean): Promise<GroupDetails>;
    refreshCompetitiveTier(): Promise<boolean>;
    refreshPlayerIdentity(): Promise<GroupDetails>;
    refreshPlayerPings(): Promise<GroupDetails>;
    changeQueue(queueID: Queues): Promise<GroupDetails>;
    startCustomGame(): Promise<GroupDetails>;
    enterMatchmakingQueue(): Promise<GroupDetails>;
    leaveMatchmakingQueue(): Promise<GroupDetails>;
    changeState(open?: State): Promise<GroupDetails>;
    setCustomGameSettings({ Map, Mode, GamePod, GameRules }: CustomGameSettingsInput): Promise<GroupDetails>;
    inviteByDisplayName(name: string, tag: string): Promise<GroupDetails>;
    requestJoinToGroup(party_id: string, puuid: string): Promise<GroupDetails>;
    declineRequestGroup(request_id: string): Promise<GroupDetails>;
    joinGroup(party_id: string): Promise<GroupDetails>;
    leaveGroup(party_id: string): Promise<GroupDetails>;
    currentAvailableGameModes(): Promise<CurrentAvailableGameModeResponse>;
}
export interface CurrentGroupRequest {
    ID: string;
    PartyID: string;
    RequestedBySubject: string;
    Subjects: string[];
    CreatedAt: string;
    ExpiresIn: number;
}
export interface CurrentGroupIdResponse {
    Subject: string;
    Version: number;
    CurrentPartyID: string;
    Invites: null;
    Requests: CurrentGroupRequest[];
    PlatformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
}
export interface GroupMemberPing {
    Ping: number;
    GamePodID: string;
}
export interface GroupMember {
    Subject: string;
    CompetitiveTier: number;
    PlayerIdentity: {
        Subject: string;
        PlayerCardID: string;
        PlayerTitleID: string;
        AccountLevel: number;
        PreferredLevelBorderID: string;
        Incognito: boolean;
        HideAccountLevel: boolean;
    };
    SeasonalBadgeInfo: {
        SeasonID: string;
        NumberOfWins: number;
        WinsByTier: Record<string, number>[];
        Rank: number;
        LeaderboardRank: number;
    };
    IsOwner: boolean;
    QueueEligibleRemainingGames: number;
    QueueEligibleRemainingWins: number;
    Pings: GroupMemberPing[];
    IsReady: boolean;
    IsModerator: boolean;
    UseBroadcastHUD: boolean;
    PlatformType: string;
}
export interface GroupMembership {
    Subject: string;
}
export interface GroupInvite {
    ID: string;
    PartyID: string;
    Subject: string;
    InvitedBySubject: string;
    CreatedAt: string;
    ExpiresIn: number;
}
export interface GroupCustomGameRules {
    AllowGameModifiers: BooleanString;
    PlayOutAllRounds: BooleanString;
    SkipMatchHistory: BooleanString;
    TournamentMode: BooleanString;
}
export interface CustomGameSettings {
    Map: `/Game/Maps/${CustomGameMapsName}`;
    Mode: `/Game/GameModes/${CustomGameModes}`;
    UseBots: boolean;
    GamePod: RiotServers;
    GameRules: GroupCustomGameRules | null;
}
export interface CustomGameSettingsInput {
    Map: Maps;
    Mode: GameModes;
    GamePod?: RiotServers;
    GameRules?: GroupCustomGameRules | null;
}
export interface GroupDetails {
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: GroupMember[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: string;
    CustomGameData: {
        Settings: CustomGameSettings;
        Membership: {
            teamOne: GroupMembership[] | null;
            teamTwo: GroupMembership[] | null;
            teamSpectate: GroupMembership[] | null;
            teamOneCoaches: GroupMembership[] | null;
            teamTwoCoaches: GroupMembership[] | null;
        };
        MaxPartySize: number;
        AutobalanceEnabled: boolean;
        AutobalanceMinPlayers: number;
    };
    MatchmakingData: {
        QueueID: Queues;
        PreferredGamePods: [];
    };
    Invites: GroupInvite[] | null;
    Requests: Record<string, unknown>[];
    QueueEntryTime: string;
    ErrorNotification: {
        ErrorType: string;
        ErroredPlayers: GroupMembership[] | null;
    };
    RestrictedSeconds: number;
    EligibleQueues: Queues[];
    PlatformType: string;
    QueueIneligibilities: Queues[];
    CheatData: {
        GamePodOverride: string;
        ForcePostGameProcessing: boolean;
    };
    XPBonuses: Record<string, unknown>[];
}
export interface CurrentAvailableGameModeQueue {
    QueueID: Queues;
    Enabled: boolean;
    TeamSize: number;
    NumTeams: number;
    MaxPartySize: number;
    MinPartySize: number;
    MaxPartySizeHighSkill: number;
    HighSkillTier: number;
    Mode: string;
    IsRanked: boolean;
    IsTournament: boolean;
    Priority: number;
    PartyMaxCompetitiveTierRange: number;
    PartyMaxCompetitiveTierRangePlacementBuffer: number;
    FullPartyMaxCompetitiveTierRange: number;
    PartySkillDisparityCompetitiveTiersCeilings: Record<string, number>[];
    MinimumGamesRequired: number;
    QueuesForMinimumGamesEligibility: string[];
    MinimumWinsRequired: number;
    QueuesForMinimumWinsEligibility: unknown[];
    GameRules: {
        AllowDropOut?: BooleanString;
        AssignRandomAgents?: BooleanString;
        SkipPregame?: BooleanString;
        IsOvertimeWinByTwo?: BooleanString;
        AllowLenientSurrender?: BooleanString;
    };
    SupportedPlatformTypes: unknown[];
    DisabledContent: unknown[];
    queueFieldA: unknown[];
    NextScheduleChangeSeconds: number;
    TimeUntilNextScheduleChangeSeconds: number;
}
export interface CurrentAvailableGameModePing {
    [key: string]: {
        SecurityHash: number;
        ObfuscatedIP: number;
        PingProxyAddress: string;
    };
}
export interface CurrentAvailableGameModeResponse {
    Enabled: boolean;
    EnabledMaps: Maps[];
    EnabledModes: string[];
    Queues: CurrentAvailableGameModeQueue[];
    GamePodPingServiceInfo: CurrentAvailableGameModePing;
}
export interface GLZEndpointTokenResponse {
    Token: string;
    Room: string;
}
//# sourceMappingURL=group.d.ts.map