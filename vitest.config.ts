import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    exclude: ['tests/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
      exclude: ['src/main.tsx'],
      include: ['src/**/*.{ts,tsx}'],
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
        perFile: true,
        autoUpdate: true,
      },
    },
  },
});
