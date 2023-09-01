"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantNotRunning = void 0;
class ValorantNotRunning extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "Unable to locate lockfile! Valorant is running?";
        Error.stackTraceLimit = 2;
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, ValorantNotRunning.prototype);
    }
}
exports.ValorantNotRunning = ValorantNotRunning;
//# sourceMappingURL=valorantNotRunning.js.map