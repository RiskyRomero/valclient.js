import { AxiosInstance } from "axios";
import { GunsType, SkinsType, Levels, SprayRounds } from "./types/loadout";
import { VariantSkin } from "./types/chroma";
import { BuddyType } from "./types/buddies";
import { SprayType } from "./types/sprays";
import { IHttp } from "./interfaces/http";
import { ILoadout, LoadoutResponse } from "./interfaces/loadout";
import { IStore } from "./interfaces/store";
declare class Loadout implements ILoadout {
    private readonly _http;
    private readonly _store;
    private readonly _puuid;
    private readonly _valorant_api;
    constructor(http: IHttp, puuid: string, api: AxiosInstance, store: IStore);
    /**
     * Player_Loadout_Current
     *
     * Get the player's current loadout
     */
    current(): Promise<LoadoutResponse>;
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
    changeGunSkin<T extends GunsType, K extends SkinsType<T>, V extends VariantSkin<K>>(weapon: T, skins: K, level?: Levels, variant?: V): Promise<LoadoutResponse>;
    /**
     * Player_Loadout_Update
     *
     * Skin buddy changes take effect when starting a new game
     * @param gun
     * @param buddy
     * @returns
     */
    addSkinBuddy(gun: Exclude<GunsType, "Knife">, buddy: BuddyType): Promise<LoadoutResponse>;
    /**
     * Player_Loadout_Update
     *
     * Spray changes take effect when starting a new game
     * @param gun
     * @param buddy
     * @returns
     */
    changeSpray(spray: SprayType, slot: SprayRounds): Promise<LoadoutResponse>;
    private _changeLoadout;
}
export { Loadout };
//# sourceMappingURL=loadout.d.ts.map