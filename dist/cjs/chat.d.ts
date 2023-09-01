import { IChat, ChatInfoResponse, ParticipantsResponse, MessageResponse } from "./interfaces/chat";
import { IHttp } from "./interfaces/http";
declare class Chat implements IChat {
    private readonly _http;
    constructor(http: IHttp);
    /**
     * GET Party Chat Info
     *
     * Get information about the party chat
     *
     * @returns {ChatInfoResponse}
     */
    getPartyChat(): Promise<ChatInfoResponse>;
    /**
     * GET Pregame Chat Info
     *
     * Get information about the pregame chat
     *
     * @returns {ChatInfoResponse}
     */
    getPreGameChat(): Promise<ChatInfoResponse>;
    /**
     * GET Game Chat Info
     *
     * Get information about the game chat
     *
     * @returns {ChatInfoResponse}
     */
    getLiveGameChat(): Promise<ChatInfoResponse>;
    /**
     * GET All Chat Info
     *
     * Get information about all active conversations (party, pregame and livegame)
     *
     * @returns {ChatInfoResponse}
     */
    getAllChat(): Promise<ChatInfoResponse>;
    /**
     * GET TEXT_CHAT_RNet_FetchParticipants
     *
     * Get information about the participants of a chat
     *
     * @param cid e.g: "cid-{1, blue, red, all}@server"
     * @returns {ParticipantsResponse}
     */
    getParticipants(cid: string): Promise<ParticipantsResponse>;
    /**
     * GET All Chat Participants
     *
     * Get information about all the participants of every active conversation
     *
     * @returns {ParticipantsResponse}
     */
    getAllParticipants(): Promise<ParticipantsResponse>;
    /**
     * GET All Chat History
     *
     * Get chat history for all conversations
     *
     * @returns {MessageResponse}
     */
    getAllHistory(): Promise<MessageResponse>;
    /**
     * GET Specific Chat History
     *
     * Get chat history for a specific conversation
     *
     * @param cid e.g: "cid-{1, blue, red, all}@server"
     */
    getHistory(cid: string): Promise<MessageResponse>;
    /**
     * POST Send Whisper
     *
     * Send a whisper to the specified player
     *
     * @param pid - You can get in player.allFriends
     * @param message
     * @returns {MessageResponse}
     */
    sendWhisper(pid: string, message: string): Promise<MessageResponse>;
    /**
     * POST Send Chat
     *
     * Send a message to the specified group
     *
     * @param cid  - You can get in chat.getAllChat()
     * @param message
     */
    sendMessage(cid: string, message: string): Promise<MessageResponse>;
}
export { Chat };
//# sourceMappingURL=chat.d.ts.map