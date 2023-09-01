import { RegionShardOverride, ShardRegionOverride } from "../interfaces/resources";
import { SprayRounds } from "../types/loadout";
import { CustomGameMapsName, CustomGameModes, GameModes, Maps, Queues, Regions } from "../types/resources";
export declare const queues: Array<Queues>;
export declare const customMappedMaps: Record<Maps, CustomGameMapsName>;
export declare const customGameModeMapped: Record<GameModes, CustomGameModes>;
export declare type WalletCurrencies = "valorant_points" | "radianite_points" | "unknown";
export declare type ItemsType = "skin_level" | "skin_chroma" | "agent" | "contract_definition" | "buddy" | "spray" | "player_card" | "player_title";
export declare const itemsMappedByName: Record<ItemsType, string>;
export declare const sprayRoundsIdMappedByName: Record<SprayRounds, string>;
export declare const walletMappedByID: Record<string, WalletCurrencies>;
export declare const regions: Array<Regions>;
export declare const regionShardOverride: RegionShardOverride;
export declare const shardRegionOverride: ShardRegionOverride;
//# sourceMappingURL=index.d.ts.map