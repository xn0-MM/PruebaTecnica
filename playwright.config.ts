import { defineConfig, devices } from '@playwright/test';
import { routes } from './src/data/routes';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ?
    [['html']] :
    [['list'],
    ['html'],
    ['monocart-reporter',
      {
        name: "My Test Report",
        outputFile: './monocart-report/index.html'
      }
    ]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: routes.baseUrl,
    trace: 'on',
    screenshot: 'on',
    headless: true,
    viewport: { width: 1080, height: 1920 },
    launchOptions: {
      slowMo: 0,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: "./",
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
  ],
});
