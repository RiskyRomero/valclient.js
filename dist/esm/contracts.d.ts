import { ContractsAll, IContracts } from "./interfaces/contracts";
import { IHttp } from "./interfaces/http";
import { PvpItemProgressDefinitions } from "./interfaces/pvp";
declare class Contracts implements IContracts {
    private readonly _http;
    private readonly _puuid;
    constructor(http: IHttp, puuid: string);
    /**
     *  Contracts_Fetch
     *
     *  Get a list of contracts and completion status including match history
     *  @returns
     */
    all(): Promise<ContractsAll>;
    /**
     * Contracts_Activate
     *
     * Activate a particular contract
     * @param contract_id The ID of the contract to activate. Can be found from the definitions method
     * @returns
     */
    activate(contract_id: string): Promise<ContractsAll>;
    /**
     * ContractDefinitions_Fetch
     *
     * Get names and descriptions for contracts
     */
    /**
     * ContractDefinitions_FetchActiveStory
     *
     * Get the battlepass contracts
     */
    /**
     * Get item upgrades
     */
    itemUpgrades(): Promise<PvpItemProgressDefinitions[]>;
}
export { Contracts };
//# sourceMappingURL=contracts.d.ts.map