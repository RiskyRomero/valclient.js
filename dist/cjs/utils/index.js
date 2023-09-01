"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryString = exports.getConfigurationPath = void 0;
const path_1 = __importDefault(require("path"));
function getConfigurationPath(file) {
    return path_1.default.resolve(process.env.LOCALAPPDATA, "./Riot Games/Riot Client/Config/", file);
}
exports.getConfigurationPath = getConfigurationPath;
function parseQueryString(querystring) {
    querystring = querystring.replace("#", "");
    return querystring.split("&").reduce((obj, string) => {
        const [key, value] = string.split("=");
        return Object.assign(Object.assign({}, obj), { [key]: value });
    }, {});
}
exports.parseQueryString = parseQueryString;
//# sourceMappingURL=index.js.map