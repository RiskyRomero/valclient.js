import { LoadoutResponse } from "../interfaces/loadout";
import { KnifeSkin, AresSkin, BuckySkin, BulldogSkin, ClassicSkin, FrenzySkin, GhostSkin, GuardianSkin, JudgeSkin, MarshalSkin, OdinSkin, OperatorSkin, PhantomSkin, SheriffSkin, ShortySkin, SpectreSkin, StingerSkin, VandalSkin } from "./skins";
import { BuddyType } from "./buddies";
import { SprayType } from "./sprays";
export declare const guns: readonly ["Odin", "Ares", "Vandal", "Bulldog", "Phantom", "Judge", "Bucky", "Frenzy", "Classic", "Ghost", "Sheriff", "Shorty", "Operator", "Guardian", "Marshal", "Spectre", "Stinger", "Knife"];
export declare type GunsType = typeof guns[number];
export declare type SkinsType<T> = T extends "Knife" ? KnifeSkin : T extends "Stinger" ? StingerSkin : T extends "Spectre" ? SpectreSkin : T extends "Marshal" ? MarshalSkin : T extends "Guardian" ? GuardianSkin : T extends "Operator" ? OperatorSkin : T extends "Shorty" ? ShortySkin : T extends "Sheriff" ? SheriffSkin : T extends "Ghost" ? GhostSkin : T extends "Classic" ? ClassicSkin : T extends "Frenzy" ? FrenzySkin : T extends "Bucky" ? BuckySkin : T extends "Judge" ? JudgeSkin : T extends "Phantom" ? PhantomSkin : T extends "Bulldog" ? BulldogSkin : T extends "Vandal" ? VandalSkin : T extends "Ares" ? AresSkin : T extends "Odin" ? OdinSkin : null;
export declare type Levels = "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
export declare type CharmLevels = "1" | "2" | "3" | "4";
export declare type SkinsIdMappedByGunName = {
    [gun in GunsType]: Record<SkinsType<gun>, string>;
};
export declare type SkinsLevelsMapped = {
    [skin in KnifeSkin | StingerSkin | SpectreSkin | MarshalSkin | GuardianSkin | OperatorSkin | ShortySkin | SheriffSkin | GhostSkin | ClassicSkin | FrenzySkin | BuckySkin | JudgeSkin | PhantomSkin | BulldogSkin | VandalSkin | AresSkin | OdinSkin]: {
        [level in Levels]?: string;
    };
};
export declare type SkinsVariantsMapped = {
    [skin in KnifeSkin | StingerSkin | SpectreSkin | MarshalSkin | GuardianSkin | OperatorSkin | ShortySkin | SheriffSkin | GhostSkin | ClassicSkin | FrenzySkin | BuckySkin | JudgeSkin | PhantomSkin | BulldogSkin | VandalSkin | AresSkin | OdinSkin]: {
        [key: string]: string;
        Default: string;
    };
};
export declare type BuddyIdMappedByName = Record<BuddyType, string>;
export declare type BuddyLevelIdMappedByName = Record<BuddyType, {
    [key in CharmLevels]?: string;
}>;
export declare type SprayIdMappedByName = Record<SprayType, string>;
export declare type SprayLevelIdMappedByName = Record<SprayType, {
    [key in CharmLevels]?: string;
}>;
export declare type LoadoutBody = Pick<LoadoutResponse, "Guns" | "Sprays" | "Identity" | "Incognito">;
export declare type SprayRounds = "PreRound" | "MiddleRound" | "EndRound";
//# sourceMappingURL=loadout.d.ts.map