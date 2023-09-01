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
exports.Valorant = void 0;
class Valorant {
    constructor(http) {
        this._http = http;
    }
    /**
     * RiotClientSession_FetchSessions
     *
     * Gets info about the running Valorant process including start arguments
     * @returns
     */
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/product-session/v1/external-sessions", "local");
            return data;
        });
    }
    /**
     *  RiotKV_RNet_GetSettings
     *
     *  Get client settings
     */
    clientSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/player-preferences/v1/data-json/Ares.PlayerSettings", "local");
            return data;
        });
    }
    /**
     *  RiotKV_RNet_PutSettings
     *
     *  Update client settings
     */
    changeSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.put("/player-preferences/v1/data-json/Ares.PlayerSettings", "local", settings);
            return data;
        });
    }
    /**
     * Get crosshair settings
     * @returns Profile name with crosshair settings
     */
    crossHair() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { stringSettings }, } = yield this.clientSettings();
            const crossHairProfileData = stringSettings.find((setting) => setting.settingEnum === "EAresStringSettingName::SavedCrosshairProfileData");
            const crossHairSettings = JSON.parse(crossHairProfileData.value);
            const crossHairProfiles = crossHairSettings.profiles.reduce((obj, crossHairProfile) => {
                const primary = crossHairProfile.primary;
                const innerLines = primary.innerLines;
                const outerLines = primary.outerLines;
                return Object.assign(Object.assign({}, obj), { [crossHairProfile.profileName]: Object.assign({ innerLines,
                        outerLines }, primary) });
            }, {});
            return crossHairProfiles;
        });
    }
}
exports.Valorant = Valorant;
//# sourceMappingURL=valorant.js.map