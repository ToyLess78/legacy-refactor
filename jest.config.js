module.exports = {
    transform: {
        '^.+\\.tsx?$': 'babel-jest'
    },
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/**/*.test.js']
};
