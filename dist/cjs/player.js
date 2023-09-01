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
exports.Player = void 0;
const privateInformationJSON64_1 = require("./errors/privateInformationJSON64");
class Player {
    constructor(httpService, puuid) {
        this._http = httpService;
        this._puuid = puuid;
    }
    /**
     *  PlayerAlias_RNet_GetActiveAlias
     *
     *  Gets current player session authenticated
     * @returns
     */
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/player-account/aliases/v1/active", "local");
            return data;
        });
    }
    /**
     * CHATFRIENDS_RNet_GET_ALL
     *
     * Get a list of friends
     * @returns
     */
    allFriends() {
        return __awaiter(this, void 0, void 0, function* () {
            const { friends } = yield this._http.fetch("/chat/v4/friends", "local");
            return friends;
        });
    }
    /**
     * TEXT_CHAT_RNet_FetchSession
     *
     * Get the current session including player name and PUUID
     */
    session() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/chat/v1/session", "local");
            return data;
        });
    }
    /**
     * PRESENCE_RNet_GET
     *
     *  NOTE: Only works on self or active user's friends
     * @param puuid Use puuid passed in parameter or self puuid
     * @returns
     */
    onlineFriend(puuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { presences } = yield this._http.fetch("/chat/v4/presences", "local");
                puuid = puuid || this._puuid;
                const player = presences.find((presence) => presence.puuid === puuid);
                if (player) {
                    const playerPrivate = JSON.parse(Buffer.from(player.private, "base64").toString("utf-8"));
                    return playerPrivate;
                }
                return null;
            }
            catch (e) {
                throw new privateInformationJSON64_1.PrivateInformationJSON64();
            }
        });
    }
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
    allFriendsOnline() {
        return __awaiter(this, void 0, void 0, function* () {
            const { presences } = yield this._http.fetch("/chat/v4/presences", "local");
            return presences;
        });
    }
    /**
     *  FRIENDS_RNet_FetchFriendRequests
     *
     *  Get pending friend requests
     * @returns
     */
    pendingFriendsRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            const { requests } = yield this._http.fetch("/chat/v4/friendrequests", "local");
            return requests;
        });
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map