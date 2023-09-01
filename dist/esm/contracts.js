var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Contracts {
    constructor(http, puuid) {
        this._http = http;
        this._puuid = puuid;
    }
    /**
     *  Contracts_Fetch
     *
     *  Get a list of contracts and completion status including match history
     *  @returns
     */
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.fetch(`/contracts/v1/contracts/${this._puuid}`, "pd");
            return data;
        });
    }
    /**
     * Contracts_Activate
     *
     * Activate a particular contract
     * @param contract_id The ID of the contract to activate. Can be found from the definitions method
     * @returns
     */
    activate(contract_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._http.post(`/contracts/v1/contracts/${this._puuid}/special/${contract_id}`, "pd");
            return data;
        });
    }
    /**
     * ContractDefinitions_Fetch
     *
     * Get names and descriptions for contracts
     */
    // async definitions(): Promise<void> {
    //     const data = await this._http.fetch<Record<string, unknown>>("/contracts-definitions/v2/definitions", "pd");
    //
    // }
    /**
     * ContractDefinitions_FetchActiveStory
     *
     * Get the battlepass contracts
     */
    // async battlePass(): Promise<void> {
    //     const data = await this._http.fetch<Record<string, unknown>>("/contract-definitions/v2/definitions/story", "pd");
    // }
    /**
     * Get item upgrades
     */
    itemUpgrades() {
        return __awaiter(this, void 0, void 0, function* () {
            const { Definitions } = yield this._http.fetch("/contract-definitions/v3/item-upgrades", "pd");
            return Definitions;
        });
    }
}
export { Contracts };
//# sourceMappingURL=contracts.js.map