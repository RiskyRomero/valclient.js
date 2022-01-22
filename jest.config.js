/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    coverageReporters: ["json-summary"],
    setupFiles: ["dotenv/config"],
    setupFilesAfterEnv: ["./__tests__/__setup__/jest-extended.ts"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src" }),
};
