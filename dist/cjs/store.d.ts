import { IHttp } from "./interfaces/http";
import { CurrentOffersResponse, IStore, OffersResponse, YourItems } from "./interfaces/store";
import { ItemsType, WalletCurrencies } from "./resources";
declare class Store implements IStore {
    private readonly _http;
    private readonly _puuid;
    constructor(httpService: IHttp, puuid: string);
    /**
     *  Store_GetOffers
     *
     *  Get prices for all store items
     *  @returns
     */
    offers(): Promise<OffersResponse>;
    /**
     *  Store_GetStorefrontV2
     *
     *  Get the currently available items in the store
     *  @returns
     */
    currentOffers(): Promise<CurrentOffersResponse>;
    /**
     *  Store_GetWallet
     *
     * Get amount of Valorant points and Radianite the player has
     */
    wallet(): Promise<Record<WalletCurrencies, number>>;
    /**
     * Store_GetOrder
     *
     * The ID of the order. Can be obtained when creating an order.
     * @param order_id
     * @returns
     */
    /**
     *  Store_GetEntitlements
     *  List what the player owns (agents, skins, buddies, ect.)
     *  Correlate with the UUIDs in client.pvp.contents() to know what items are owned
     */
    yourItems<T>(item_type: ItemsType): Promise<YourItems<T>>;
}
export { Store };
//# sourceMappingURL=store.d.ts.map