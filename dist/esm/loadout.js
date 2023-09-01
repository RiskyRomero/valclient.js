var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { gunsIdMappedByName } from "./resources/guns";
import { skinsIdMappedByGunName } from "./resources/skins";
import { sprayIdMappedByName } from "./resources/sprays";
import { buddyIdMappedByName, buddyLevelIdMappedByName } from "./resources/buddies";
import { sprayRoundsIdMappedByName } from "./resources";
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
            const gunId = gunsIdMappedByName[weapon].toLowerCase();
            const skinId = skinsIdMappedByGunName[weapon][skins].toLowerCase();
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
            const gunId = gunsIdMappedByName[gun].toLowerCase();
            const buddyId = buddyIdMappedByName[buddy].toLowerCase();
            const buddyLevelId = buddyLevelIdMappedByName[buddy]["1"];
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
            const sprayId = sprayIdMappedByName[spray];
            const slotId = sprayRoundsIdMappedByName[slot];
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
export { Loadout };
//# sourceMappingURL=loadout.js.map