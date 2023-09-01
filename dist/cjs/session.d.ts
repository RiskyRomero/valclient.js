import { CurrentGameSessionResponse, ISession, ReconnectGameSessionResponse } from "./interfaces/session";
import { IHttp } from "./interfaces/http";
declare class Session implements ISession {
    private readonly _http;
    private readonly _puuid;
    constructor(http: IHttp, puuid: string);
    /**
     *  Session_Get
     *
     *  Get information about the current game session
     * @returns
     */
    current(): Promise<CurrentGameSessionResponse>;
    /**
     * Session_ReConnect
     *
     * Try reconnect current game session
     * @returns
     */
    reconnect(): Promise<ReconnectGameSessionResponse>;
}
export { Session };
//# sourceMappingURL=session.d.ts.map