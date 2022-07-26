/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': '<rootDir>/test/fileMock.js',
    },
    resetMocks: false,
    setupFiles: ['jest-localstorage-mock'],
};
