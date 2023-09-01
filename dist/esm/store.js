var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { itemsMappedByName, walletMappedByID } from "./resources";
class Store {
    constructor(httpService, puuid) {
        this._http = httpService;
        this._puuid = puuid;
    }
    /**
     *  Store_GetOffers
     *
     *  Get prices for all store items
     *  @returns
     */
    offers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch("/store/v1/offers/", "pd");
            return data;
        });
    }
    /**
     *  Store_GetStorefrontV2
     *
     *  Get the currently available items in the store
     *  @returns
     */
    currentOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/store/v2/storefront/${this._puuid}`, "pd");
            return data;
        });
    }
    /**
     *  Store_GetWallet
     *
     * Get amount of Valorant points and Radianite the player has
     */
    wallet() {
        return __awaiter(this, void 0, void 0, function* () {
            const { Balances } = yield this._http.fetch(`/store/v1/wallet/${this._puuid}`, "pd");
            const balanceIds = Object.keys(Balances);
            const walletMapped = balanceIds.reduce((initialValue, balanceId) => (Object.assign(Object.assign({}, initialValue), { [walletMappedByID[balanceId]]: Balances[balanceId] })), {});
            return walletMapped;
        });
    }
    /**
     * Store_GetOrder
     *
     * The ID of the order. Can be obtained when creating an order.
     * @param order_id
     * @returns
     */
    // async order(order_id: string): Promise<unknown> {
    //     const data = await this._httpService.fetch<unknown>(`/store/v1/order/${order_id}`, "pd");
    //     //TODO: i don't find endpoint to create a order, i will desactivate this method
    //     return data;
    // }
    /**
     *  Store_GetEntitlements
     *  List what the player owns (agents, skins, buddies, ect.)
     *  Correlate with the UUIDs in client.pvp.contents() to know what items are owned
     */
    yourItems(item_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = itemsMappedByName[item_type];
            const data = yield this._http.fetch(`/store/v1/entitlements/${this._puuid}/${id}`, "pd");
            return data;
        });
    }
}
export { Store };
//# sourceMappingURL=store.js.map