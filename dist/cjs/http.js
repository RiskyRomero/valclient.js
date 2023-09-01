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
exports.HttpService = void 0;
class HttpService {
    constructor(axios) {
        this._baseEndpoints = {
            pd: null,
            glz: null,
            shared: null,
            local: null,
        };
        this._axios = axios;
    }
    get endpoints() {
        return this._baseEndpoints;
    }
    set baseEndpoint(baseEndpoint) {
        this._baseEndpoints = Object.assign(Object.assign({}, this._baseEndpoints), baseEndpoint);
    }
    fetch(endpoint, endpointType, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._axios.get(this._getCorrectEndpoint(endpoint, endpointType), config);
            return data;
        });
    }
    post(endpoint, endpointType, body, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._axios.post(this._getCorrectEndpoint(endpoint, endpointType), body, config);
            return data;
        });
    }
    put(endpoint, endpointType, body, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._axios.put(this._getCorrectEndpoint(endpoint, endpointType), body, config);
            return data;
        });
    }
    del(endpoint, endpointType, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._axios.delete(this._getCorrectEndpoint(endpoint, endpointType), config);
            return data;
        });
    }
    _getCorrectEndpoint(endpoint, endpointType) {
        return this._baseEndpoints[endpointType] + endpoint;
    }
}
exports.HttpService = HttpService;
//# sourceMappingURL=http.js.map