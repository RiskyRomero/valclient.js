"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const _resources_1 = require("./resources");
class Group {
    constructor(http, puuid) {
        this._http = http;
        this._puuid = puuid;
    }
    /**
     *  Party_FetchPlayer
     *
     *  Get the Group ID that a given player belongs to
     */
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/parties/v1/players/${this._puuid}`, "glz");
            return data;
        });
    }
    /**
     *  Party_RemovePlayer
     *
     *  Removes a player from the current group
     * @param puuid
     * @returns
     */
    removePlayer(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            puuid = puuid || this._puuid;
            yield this._http.del(`/parties/v1/players/${puuid}`, "glz");
            return true;
        });
    }
    /**
     *  Party_FetchParty
     *
     *  Get details about a group party id
     */
    currentDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.fetch(`/parties/v1/parties/${CurrentPartyID}`, "glz");
            return data;
        });
    }
    /**
     *  Party_SetMemberReady
     *
     *  Sets whether a party member is ready for queueing or not
     * @param ready
     * @returns
     */
    setMemberReady(ready) {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/setReady`, "glz", {
                ready,
            });
            return data;
        });
    }
    /**
     *  Party_RefreshCompetitiveTier
     *
     *  Refreshes the competitive tier for a player
     */
    refreshCompetitiveTier() {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/refreshCompetitiveTier`, "glz");
            return true;
        });
    }
    /**
     *  Party_RefreshPlayerIdentity
     *
     *  Refreshes the identity for a player
     */
    refreshPlayerIdentity() {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/refreshPlayerIdentity`, "glz");
            return data;
        });
    }
    /**
     *  Party_RefreshPings
     *
     *  Refreshes the pings for a player
     */
    refreshPlayerPings() {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/refreshPings`, "glz");
            return data;
        });
    }
    /**
     *  Party_ChangeQueue
     *
     *  Sets the matchmaking queue for the party
     * @param queueID
     * @returns
     */
    changeQueue(queueID) {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/queue`, "glz", {
                queueID,
            });
            return data;
        });
    }
    /**
     *  Party_StartCustomGame
     *
     *  Starts a custom game
     */
    startCustomGame() {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/startcustomgame`, "glz");
            return data;
        });
    }
    /**
     *  Party_EnterMatchmakingQueue
     *
     *  Enters the matchmaking queue
     */
    enterMatchmakingQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/matchmaking/join`, "glz");
            return data;
        });
    }
    /**
     *  Party_LeaveMatchmakingQueue
     *
     *  Leaves the matchmaking queue
     */
    leaveMatchmakingQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/matchmaking/leave`, "glz");
            return data;
        });
    }
    /**
     *  Party_SetAccessibility
     *
     *  Changes the group state to be open or closed
     */
    changeState(open) {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/accessibility`, "glz", {
                accessibility: open,
            });
            return data;
        });
    }
    /**
     *  Party_SetCustomGameSettings
     *
     *  Changes the settings for a custom game
     * @param settings
     */
    setCustomGameSettings({ Map, Mode, GamePod, GameRules }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const body = {
                Map: `/Game/Maps/${_resources_1.customMappedMaps[Map]}`,
                Mode: `/Game/GameModes/${_resources_1.customGameModeMapped[Mode]}`,
                GamePod: GamePod || "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
                GameRules: GameRules || null,
            };
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/customgamesettings`, "glz", body);
            return data;
        });
    }
    /**
     *
     *  Party_InviteToPartyByDisplayName
     *
     *  Invites a player to the party with their display name
     *  omit the "#" in tag
     * @param name
     * @param tag
     */
    inviteByDisplayName(name, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/invites/name/${name}/tag/${tag}`, "glz", {
                name,
                tag,
            });
            return data;
        });
    }
    /**
     *  Party_RequestToJoinParty
     *
     *  Requests to join a party
     * @param party_id
     * @param puuid
     */
    requestJoinToGroup(party_id, puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                Subjects: [puuid],
            };
            const data = yield this._http.post(`/parties/v1/parties/${party_id}/request`, "glz", body);
            return data;
        });
    }
    /**
     * Party_DeclineRequest
     *
     * Declines a party request
     * @param request_id The ID of the party request. Can be found from the Requests array on the getCurrentDetailsGroup.
     */
    declineRequestGroup(request_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { CurrentPartyID } = yield this.current();
            const data = yield this._http.post(`/parties/v1/parties/${CurrentPartyID}/request/${request_id}/decline`, "glz"); //TODO: not sure about this return for data, need to test when have requests group to accept
            return data;
        });
    }
    /**
     * Party_PlayerJoin
     *
     * Join a group
     * @param party_id
     */
    joinGroup(party_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.post(`/parties/v1/players/${this._puuid}/joinparty/${party_id}`, "glz"); //TODO: not sure about this return for data, need to test when have requests group to accept
            return data;
        });
    }
    /**
     * Party_PlayerLeave
     *
     * Leave a party
     * @param party_id
     */
    leaveGroup(party_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.post(`/parties/v1/players/${this._puuid}/leaveparty/${party_id}`, "glz"); //TODO: not sure about this return for data, need to test when have requests group to accept
            return data;
        });
    }
    /**
     * Party_FetchCustomGameConfigs
     *
     * Get information about the available gamemodes
     */
    currentAvailableGameModes() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/parties/v1/parties/customgameconfigs", "glz");
            return data;
        });
    }
}
exports.Group = Group;
//# sourceMappingURL=group.js.map