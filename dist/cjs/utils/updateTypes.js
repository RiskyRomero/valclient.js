"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const loadout_1 = require("../types/loadout");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const root = path_1.default.resolve(".");
function createUnionTypeForSkins(gun, loadout) {
    const unionType = loadout.reduce((string, valorantskin, index, array) => string + '"' + valorantskin.displayName + '"' + `${index === array.length - 1 ? ";" : "| "}`, "");
    return `export type ${gun}Skin = ${unionType}`;
}
function createSkinsIdMappedByName(loadout) {
    const object = loadout.reduce((obj, skin) => {
        return Object.assign(Object.assign({}, obj), { [skin.displayName]: skin.uuid });
    }, {});
    return object;
}
function createSkinsLevelsIdMappedByName(loadout) {
    const object = loadout.reduce((obj, skin) => {
        const levels = skin.levels.reduce((objLevel, level) => {
            const levelKey = level.displayName ? level.displayName.match(/Level \d/g) : "Level 2";
            return Object.assign(Object.assign({}, objLevel), { [levelKey ? levelKey.toString() : "Level 1"]: level.uuid });
        }, {});
        return Object.assign(Object.assign({}, obj), { [skin.displayName]: levels });
    }, {});
    return object;
}
function createSkinsChromasIdMappedByName(loadout) {
    const object = loadout.reduce((obj, skin) => {
        const chromas = skin.chromas.reduce((objChroma, chroma) => {
            let [, chromaName] = chroma.displayName.includes("\n") ? chroma.displayName.split("\n") : [, "Default"];
            chromaName = chromaName.replace(/Variant|\s+|\d|\(|\)/g, "");
            return Object.assign(Object.assign({}, objChroma), { [chromaName]: chroma.uuid });
        }, {});
        return Object.assign(Object.assign({}, obj), { [skin.displayName]: chromas });
    }, {});
    return object;
}
function createConditionalTypeForVariant(loadout) {
    const chroma = loadout.reduce((string, skin) => {
        const unionTypeChromas = skin.chromas.reduce((stringChroma, chroma, indexChroma, chromaOriginalArray) => {
            let [, chromaName] = chroma.displayName.includes("\n") ? chroma.displayName.split("\n") : [, "Default"];
            chromaName = chromaName.replace(/Variant|\s+|\d|\(|\)/g, "");
            return (stringChroma +
                '"' +
                chromaName +
                '"' +
                `${indexChroma === chromaOriginalArray.length - 1 ? " " : " | "}`);
        }, "");
        return string + `T extends "${skin.displayName}" ? ${unionTypeChromas} : `;
    }, "");
    return chroma;
}
function createUnionType(loadout, typeName) {
    const unionType = loadout.reduce((string, valorantskin, index, array) => string + '"' + valorantskin.displayName + '"' + `${index === array.length - 1 ? ";" : "| "}`, "");
    return `export type ${typeName} = ${unionType}`;
}
function createLevelIdMappedByName(loadout) {
    const level = loadout.reduce((obj, mapped) => {
        const levels = mapped.levels.reduce((objMappedLevel, mappedLevel) => (Object.assign(Object.assign({}, objMappedLevel), { [mappedLevel[`${"charmLevel" in mappedLevel ? "charmLevel" : "sprayLevel"}`]]: mappedLevel.uuid })), {});
        return Object.assign(Object.assign({}, obj), { [mapped.displayName]: levels });
    }, {});
    return level;
}
function createIdMappedByName(loadout) {
    const buddyObject = loadout.reduce((obj, buddy) => {
        return Object.assign(Object.assign({}, obj), { [buddy.displayName]: buddy.uuid });
    }, {});
    return buddyObject;
}
function createSkinsFiles(skinsData, startingFileData) {
    return __awaiter(this, void 0, void 0, function* () {
        const skinsIdMappedByGunName = {};
        let unionType = startingFileData;
        let chroma = `${startingFileData}export type VariantSkin<T> = `;
        for (const gun of loadout_1.guns) {
            const skins = skinsData.filter((skin) => gun === "Knife" ? skin.assetPath.includes("Melee") : skin.displayName.includes(gun));
            unionType += `${createUnionTypeForSkins(gun, skins)}\n\n`;
            chroma += `${createConditionalTypeForVariant(skins)}`;
            skinsIdMappedByGunName[gun] = createSkinsIdMappedByName(skins);
        }
        const skinsChromasMapped = createSkinsChromasIdMappedByName(skinsData);
        const skinsLevelsMapped = createSkinsLevelsIdMappedByName(skinsData);
        yield fs_1.promises.writeFile(`${root}/src/types/skins.ts`, unionType);
        yield fs_1.promises.writeFile(`${root}/src/types/chroma.ts`, chroma + "null;");
        yield fs_1.promises.writeFile(`${root}/src/resources/skins.ts`, [
            startingFileData,
            'import { SkinsIdMappedByGunName, SkinsLevelsMapped, SkinsVariantsMapped } from "@type/loadout";',
            `export const skinsIdMappedByGunName: SkinsIdMappedByGunName = ${JSON.stringify(skinsIdMappedByGunName, null, 2)};`,
            `export const skinsLevelMappedByName: SkinsLevelsMapped = ${JSON.stringify(skinsLevelsMapped, null, 2)};`,
            `export const skinsChromasMappedByName: SkinsVariantsMapped = ${JSON.stringify(skinsChromasMapped, null, 2)};`,
        ].join("\n\n"));
    });
}
function createBuddiesFiles(buddiesData, startingFileData) {
    return __awaiter(this, void 0, void 0, function* () {
        const buddyUnionType = `${startingFileData}${createUnionType(buddiesData, "BuddyType")}`;
        const buddyLevelIdMappedByName = createLevelIdMappedByName(buddiesData);
        const buddyIdMappedByName = createIdMappedByName(buddiesData);
        yield fs_1.promises.writeFile(`${root}/src/types/buddies.ts`, buddyUnionType);
        yield fs_1.promises.writeFile(`${root}/src/resources/buddies.ts`, `${startingFileData}import { BuddyIdMappedByName, BuddyLevelIdMappedByName } from "@type/loadout";\n\nexport const buddyIdMappedByName: BuddyIdMappedByName = ${JSON.stringify(buddyIdMappedByName, null, 2)}\n\nexport const buddyLevelIdMappedByName: BuddyLevelIdMappedByName = ${JSON.stringify(buddyLevelIdMappedByName, null, 2)}`);
    });
}
function createSprayFiles(spraysData, startingFileData) {
    return __awaiter(this, void 0, void 0, function* () {
        const spraysUnionType = `${startingFileData}${createUnionType(spraysData, "SprayType")}`;
        const sprayLevelIdMappedByName = createLevelIdMappedByName(spraysData);
        const sprayIdMappedByName = createIdMappedByName(spraysData);
        yield fs_1.promises.writeFile(`${root}/src/types/sprays.ts`, spraysUnionType);
        yield fs_1.promises.writeFile(`${root}/src/resources/sprays.ts`, `${startingFileData}import { SprayIdMappedByName, SprayLevelIdMappedByName } from "@type/loadout";\n\nexport const sprayIdMappedByName: SprayIdMappedByName = ${JSON.stringify(sprayIdMappedByName, null, 2)}\n\nexport const sprayLevelIdMappedByName: SprayLevelIdMappedByName = ${JSON.stringify(sprayLevelIdMappedByName, null, 2)}`);
    });
}
function createAgentsFiles(agentsData, startingFileData) {
    return __awaiter(this, void 0, void 0, function* () {
        const agentsUnionType = createUnionType(agentsData, "Agents");
        const agentsIdMappedByName = createIdMappedByName(agentsData);
        yield fs_1.promises.writeFile(`${root}/src/types/agents.ts`, [startingFileData, agentsUnionType]);
        yield fs_1.promises.writeFile(`${root}/src/resources/agents.ts`, [
            startingFileData,
            'import { Agents } from "@type/agents";\n\n',
            "export const agentsMappedById: Record<Agents, string> = ",
            JSON.stringify(agentsIdMappedByName, null, 2),
        ]);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting update types...");
    const { data: { data: skins }, } = yield axios_1.default.get("https://valorant-api.com/v1/weapons/skins");
    const { data: { data: buddies }, } = yield axios_1.default.get("https://valorant-api.com/v1/buddies");
    const { data: { data: sprays }, } = yield axios_1.default.get("https://valorant-api.com/v1/sprays");
    const { data: { data: agents }, } = yield axios_1.default.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
    const fileGeneratedAutomatically = "/* FILE GENERATED AUTOMATICALLY */\n\n";
    yield createSkinsFiles(skins, fileGeneratedAutomatically);
    yield createBuddiesFiles(buddies, fileGeneratedAutomatically);
    yield createSprayFiles(sprays.filter((spray) => !spray.displayName.includes("(ツ)")), fileGeneratedAutomatically);
    yield createAgentsFiles(agents, fileGeneratedAutomatically);
    console.log("Update finished!");
}))();
//# sourceMappingURL=updateTypes.js.map