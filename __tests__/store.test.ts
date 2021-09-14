import { Store } from "@app/store";

import { OffersResponse, CurrentOffersResponse, WalletResponse, YourItems } from "@interfaces/store";
import { Fetch } from "@interfaces/http";
import { WalletCurrencies } from "@resources";

jest.mock("axios");

const fetch = jest.fn();

const currentUserId = "current_user";

const mockedOffersResponse: OffersResponse = {
    Offers: [
        {
            Cost: {
                s: 10,
            },
            IsDirectPurchase: true,
            OfferID: "test",
            Rewards: [
                {
                    ItemID: "test",
                    ItemTypeID: "test",
                    Quantity: 1,
                },
            ],
            StartDate: "test",
        },
    ],
    UpgradeCurrencyOffers: [
        {
            OfferID: "test",
            StorefrontItemID: "test",
        },
    ],
};

const mockedCurrentOffers: CurrentOffersResponse = {
    FeaturedBundle: {
        Bundle: {
            CurrencyID: "test",
            DataAssetID: "test",
            ID: "test",
            Items: [
                {
                    BasePrice: 5,
                    CurrencyID: "test",
                    DiscountPercent: 1,
                    DiscountedPrice: 5,
                    IsPromoItem: false,
                    Item: {
                        Amount: 50,
                        ItemID: "test",
                        ItemTypeID: "test",
                    },
                },
            ],
        },
        BundleRemainingDurationInSeconds: 1000,
    },
    SkinsPanelLayout: {
        SingleItemOffers: ["test"],
        SingleItemOffersRemainingDurationInSeconds: 5000,
    },
};

const mockedWalletResponse: WalletResponse = {
    Balances: {
        "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741": 100,
        "e59aa87c-4cbf-517a-5983-6e81511be9b7": 50,
        "f08d4ae3-939c-4576-ab26-09ce1f23bb37": 0,
    },
};

const mockedWalletMapped: Record<WalletCurrencies, number> = {
    valorant_points: 100,
    radianite_points: 50,
    unknown: 0,
};

const mockedYourItems: YourItems = {
    Entitlements: [
        {
            ItemID: "test",
            TypeID: "test",
        },
    ],
    ItemTypeID: "test",
};

const store = new Store(fetch as Fetch, currentUserId);

describe("[PD] - Store", () => {
    afterEach(() => {
        fetch.mockClear();
    });

    test("should return all offers from a store", async () => {
        fetch.mockResolvedValueOnce(mockedOffersResponse);

        const data = await store.offers();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith("/store/v1/offers/", "pd");

        expect(data).toEqual(mockedOffersResponse);
    });

    test("should return current offers from authenticated user", async () => {
        fetch.mockResolvedValueOnce(mockedCurrentOffers);

        const data = await store.currentOffers();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith("/store/v2/storefront/current_user", "pd");

        expect(data).toEqual(mockedCurrentOffers);
    });

    test("should return current wallet, amount vp, radianite points and unknown currency", async () => {
        fetch.mockResolvedValueOnce(mockedWalletResponse);

        const data = await store.wallet();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(`/store/v1/wallet/${currentUserId}`, "pd");

        expect(data).toEqual(mockedWalletMapped);
    });

    test("should return owned items", async () => {
        fetch.mockResolvedValueOnce(mockedYourItems);

        const data = await store.yourItems("agent");

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(
            `/store/v1/entitlements/${currentUserId}/01bb38e1-da47-4e6a-9b3d-945fe4655707`,
            "pd",
        );

        expect(data).toEqual(mockedYourItems);
    });
});
