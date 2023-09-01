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
exports.Loadout = void 0;
const guns_1 = require("./resources/guns");
const skins_1 = require("./resources/skins");
const sprays_1 = require("./resources/sprays");
const buddies_1 = require("./resources/buddies");
const _resources_1 = require("./resources");
class Loadout {
    constructor(http, puuid, api, store) {
        this._http = http;
        this._puuid = puuid;
        this._valorant_api = api;
        this._store = store;
    }
    /**
     * Player_Loadout_Current
     *
     * Get the player's current loadout
     */
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/personalization/v2/players/${this._puuid}/playerloadout`, "pd");
            return data;
        });
    }
    /**
     * Player_Loadout_Update
     *
     * Loadout changes take effect when starting a new game
     * @param weapon
     * @param skins
     * @param level
     * @param variant
     * @returns
     */
    changeGunSkin(weapon, skins, level, variant) {
        return __awaiter(this, void 0, void 0, function* () {
            level = level || "Level 1";
            const gunId = guns_1.gunsIdMappedByName[weapon].toLowerCase();
            const skinId = skins_1.skinsIdMappedByGunName[weapon][skins].toLowerCase();
            const { data: { data: { chromas, levels }, }, } = yield this._valorant_api.get(`weapons/skins/${skinId}`);
            const { Guns, Sprays, Identity, Incognito } = yield this.current();
            const variantId = chromas.find((chroma) => variant && variant !== "Default" ? chroma.displayName.includes(variant) : chroma.displayName === skins).uuid;
            const levelId = levels.find((levelApi) => level && level !== "Level 1" ? levelApi.displayName.includes(level) : levelApi.displayName === skins).uuid;
            const body = {
                Guns: Guns.map((gun) => gun.ID === gunId ? Object.assign(Object.assign({}, gun), { SkinID: skinId, ChromaID: variantId, SkinLevelID: levelId }) : gun),
                Sprays,
                Identity,
                Incognito,
            };
            const data = yield this._changeLoadout(body);
            return data;
        });
    }
    /**
     * Player_Loadout_Update
     *
     * Skin buddy changes take effect when starting a new game
     * @param gun
     * @param buddy
     * @returns
     */
    addSkinBuddy(gun, buddy) {
        return __awaiter(this, void 0, void 0, function* () {
            const gunId = guns_1.gunsIdMappedByName[gun].toLowerCase();
            const buddyId = buddies_1.buddyIdMappedByName[buddy].toLowerCase();
            const buddyLevelId = buddies_1.buddyLevelIdMappedByName[buddy]["1"];
            const { Entitlements } = yield this._store.yourItems("buddy");
            const haveSkin = Entitlements.filter(({ ItemID }) => ItemID === buddyLevelId);
            if (haveSkin.length === 0) {
                return null;
            }
            const { Guns, Sprays, Identity, Incognito } = yield this.current();
            const { InstanceID } = haveSkin[0];
            const body = {
                Guns: Guns.map((gun) => gun.CharmInstanceID === InstanceID
                    ? {
                        Attachments: gun.Attachments,
                        ChromaID: gun.ChromaID,
                        ID: gun.ID,
                        SkinID: gun.SkinID,
                        SkinLevelID: gun.SkinLevelID,
                    }
                    : gun.ID === gunId
                        ? Object.assign(Object.assign({}, gun), { CharmInstanceID: InstanceID, CharmID: buddyId, CharmLevelID: buddyLevelId }) : gun),
                Sprays,
                Identity,
                Incognito,
            };
            const data = yield this._changeLoadout(body);
            return data;
        });
    }
    /**
     * Player_Loadout_Update
     *
     * Spray changes take effect when starting a new game
     * @param gun
     * @param buddy
     * @returns
     */
    changeSpray(spray, slot) {
        return __awaiter(this, void 0, void 0, function* () {
            const sprayId = sprays_1.sprayIdMappedByName[spray];
            const slotId = _resources_1.sprayRoundsIdMappedByName[slot];
            const { Entitlements } = yield this._store.yourItems("spray");
            const haveSpray = Entitlements.find((entitlement) => entitlement.ItemID === sprayId);
            if (!haveSpray) {
                return null;
            }
            const { Guns, Sprays, Identity, Incognito } = yield this.current();
            const body = {
                Guns,
                Sprays: Sprays.map((spray) => (spray.EquipSlotID === slotId ? Object.assign(Object.assign({}, spray), { SprayID: sprayId }) : spray)),
                Identity,
                Incognito,
            };
            const data = yield this._changeLoadout(body);
            return data;
        });
    }
    _changeLoadout(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._http.put(`/personalization/v2/players/${this._puuid}/playerloadout`, "pd", body);
        });
    }
}
exports.Loadout = Loadout;
//# sourceMappingURL=loadout.js.map