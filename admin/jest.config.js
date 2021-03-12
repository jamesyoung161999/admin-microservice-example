/* eslint-disable import/no-commonjs */
/* eslint-disable no-undef */
module.exports = {
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coverageReporters: ["json", "lcov", "text", "html"],
    modulePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    collectCoverage: true,
    testURL: "http://localhost"
};