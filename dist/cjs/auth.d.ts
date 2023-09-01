import { AuthenticateResponse, AuthInput, IAuth } from "./interfaces/auth";
declare class Auth implements IAuth {
    private _username;
    private _password;
    private _axios;
    private _authUrlRiotEndpoint;
    private _entitlementsAuthRiotEndpoint;
    private _authUserUrlRiotEndpoint;
    private _cookieJar;
    constructor(auth: AuthInput);
    /**
     * Get current autheticate person
     */
    get auth(): AuthInput;
    private _createSession;
    private _isAuthenticationFailed;
    authenticate(): Promise<AuthenticateResponse>;
}
export default Auth;
//# sourceMappingURL=auth.d.ts.map