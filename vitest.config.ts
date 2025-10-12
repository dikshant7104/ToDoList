import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['tests/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
    },
  },
});
