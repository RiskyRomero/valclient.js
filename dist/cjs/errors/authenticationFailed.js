"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationFailed = void 0;
class AuthenticationFailed extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "Authentication failed! did you pass the correct username and password?";
        Error.stackTraceLimit = 2;
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, AuthenticationFailed.prototype);
    }
}
exports.AuthenticationFailed = AuthenticationFailed;
//# sourceMappingURL=authenticationFailed.js.map