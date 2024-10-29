import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // reporter: 'html',
  // reporter: [["line"], ["allure-playwright"]],
  reporter: [["allure-playwright"]],
  use: {
    channel: 'chrome',
    baseURL: 'https://translate.google.com/',
    trace: 'on',
  },
});
