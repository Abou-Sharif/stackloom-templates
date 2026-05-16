const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    globals: true,
    environment: "node",
    testTimeout: 120000,
    // Generous hook timeout: integration tests use mongodb-memory-server, which
    // downloads a mongod binary on the very first run (subsequent runs cache it).
    hookTimeout: 300000,
    // Test env so config/env.js validation passes without a developer .env.
    // MONGODB_URI is a placeholder — integration tests use mongodb-memory-server.
    env: {
      NODE_ENV: "test",
      PORT: "5000",
      MONGODB_URI: "mongodb://127.0.0.1:27017/fullstack_starter_test",
      CLIENT_URL: "http://localhost:5173",
      CORS_ORIGINS: "http://localhost:5173",
      JWT_ACCESS_SECRET: "test-access-secret-not-for-production-use-only",
      JWT_REFRESH_SECRET: "test-refresh-secret-not-for-production-use-only",
      COOKIE_NAME: "refreshToken",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
  },
});
