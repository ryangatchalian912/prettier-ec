import { defineConfig, devices } from '@playwright/test';
import dotEnvExtended from 'dotenv-extended';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  dotEnvExtended.load();
}

/**
 * Playwright storage state for reusing logins
 *
 * @see https://dev.to/playwright/a-better-global-setup-in-playwright-reusing-login-with-project-dependencies-14
 * @see https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
 * @see https://playwright.dev/docs/test-global-setup-teardown
 * @see https://www.youtube.com/watch?v=PI50YAPTAs4
 */
const dirUrl = fileURLToPath(new URL('.', import.meta.url));
export const STORAGE_STATE = path.join(dirUrl, 'playwright/.auth/user.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Limit the number of failures on CI to save resources */
  maxFailures: process.env.CI ? 10 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'blob' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: {
      mode: 'on-first-retry',
      size: { width: 640, height: 480 },
    },
  },

  globalTimeout: 60 * 60 * 1000,
  timeout: 5 * 60 * 1000,
  expect: {
    timeout: 5 * 60 * 1000,
    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },
    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
    },

    {
      name: 'firefox',
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], storageState: STORAGE_STATE },
    },

    {
      name: 'webkit',
      dependencies: ['setup'],
      use: { ...devices['Desktop Safari'], storageState: STORAGE_STATE },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   dependencies: ['setup'],
    //   use: { ...devices['Pixel 5'], storageState: STORAGE_STATE },
    // },
    // {
    //   name: 'Mobile Safari',
    //   dependencies: ['setup'],
    //   use: { ...devices['iPhone 12'], storageState: STORAGE_STATE },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Edge'], channel: 'msedge', storageState: STORAGE_STATE },
    // },
    // {
    //   name: 'Google Chrome',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome', storageState: STORAGE_STATE },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
