var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Chat {
    constructor(http) {
        this._http = http;
    }
    /**
     * GET Party Chat Info
     *
     * Get information about the party chat
     *
     * @returns {ChatInfoResponse}
     */
    getPartyChat() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/chat/v6/conversations/ares-parties", "local");
            return data;
        });
    }
    /**
     * GET Pregame Chat Info
     *
     * Get information about the pregame chat
     *
     * @returns {ChatInfoResponse}
     */
    getPreGameChat() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/chat/v6/conversations/ares-pregame", "local");
            return data;
        });
    }
    /**
     * GET Game Chat Info
     *
     * Get information about the game chat
     *
     * @returns {ChatInfoResponse}
     */
    getLiveGameChat() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/chat/v6/conversations/ares-coregame", "local");
            return data;
        });
    }
    /**
     * GET All Chat Info
     *
     * Get information about all active conversations (party, pregame and livegame)
     *
     * @returns {ChatInfoResponse}
     */
    getAllChat() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/chat/v6/conversations/", "local");
            return data;
        });
    }
    /**
     * GET TEXT_CHAT_RNet_FetchParticipants
     *
     * Get information about the participants of a chat
     *
     * @param cid e.g: "cid-{1, blue, red, all}@server"
     * @returns {ParticipantsResponse}
     */
    getParticipants(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/chat/v5/participants/?cid=${cid}`, "local");
            return data;
        });
    }
    /**
     * GET All Chat Participants
     *
     * Get information about all the participants of every active conversation
     *
     * @returns {ParticipantsResponse}
     */
    getAllParticipants() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/chat/v5/participants/", "local");
            return data;
        });
    }
    /**
     * GET All Chat History
     *
     * Get chat history for all conversations
     *
     * @returns {MessageResponse}
     */
    getAllHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/chat/v6/messages", "local");
            return data;
        });
    }
    /**
     * GET Specific Chat History
     *
     * Get chat history for a specific conversation
     *
     * @param cid e.g: "cid-{1, blue, red, all}@server"
     */
    getHistory(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/chat/v6/messages?cid=${cid}`, "local");
            return data;
        });
    }
    /**
     * POST Send Whisper
     *
     * Send a whisper to the specified player
     *
     * @param pid - You can get in player.allFriends
     * @param message
     * @returns {MessageResponse}
     */
    sendWhisper(pid, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageBody = {
                cid: pid,
                message,
                type: "chat",
            };
            const data = yield this._http.post("/chat/v6/messages/", "local", messageBody);
            return data;
        });
    }
    /**
     * POST Send Chat
     *
     * Send a message to the specified group
     *
     * @param cid  - You can get in chat.getAllChat()
     * @param message
     */
    sendMessage(cid, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageBody = {
                cid,
                message,
                type: "groupchat",
            };
            const data = yield this._http.post("/chat/v6/messages/", "local", messageBody);
            return data;
        });
    }
}
export { Chat };
//# sourceMappingURL=chat.js.map