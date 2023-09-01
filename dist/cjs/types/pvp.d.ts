import { PvpItemProgressDefinitionsItem, PvpSeasonsItem } from "../interfaces/pvp";
export declare type PvpCompetitiveSeason = Pick<PvpSeasonsItem, "ID" | "StartTime" | "EndTime" | "DevelopmentOnly"> & {
    SeasonID: string;
};
export declare type PvpEventItem = Pick<PvpSeasonsItem, "ID" | "Name" | "StartTime" | "EndTime" | "IsActive" | "DevelopmentOnly">;
export declare type PvpItemProgressDefinitionsRewards = PvpItemProgressDefinitionsItem & {
    Amount: number;
};
//# sourceMappingURL=pvp.d.ts.map