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
      exclude: ['src/main.tsx', 'src/main.test.tsx', 'src/vite-env.d.ts'],
      include: ['src/**/*.{ts,tsx}'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
        perFile: true,
        autoUpdate: true,
      },
    },
  },
});
