/**
 * Add the file in your test suite to run tests on LambdaTest.
 * Import `test` object from this file in the tests.
 */
import { test as base } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright';
import path from 'node:path';

export enum LTBrowserName {
  Chrome = 'Chrome',
  MicrosoftEdge = 'MicrosoftEdge',
  PWChromium = 'pw-chromium',
  PWFirefox = 'pw-firefox',
  PWWebkit = 'pw-webkit',
}

export enum LTPlatform {
  Windows7 = 'Windows 7',
  Windows8 = 'Windows 8',
  Windows81 = 'Windows 8.1',
  Windows10 = 'Windows 10',
  Windows11 = 'Windows 11',
  macOSMojave = 'macOS Mojave',
  macOSCatalina = 'macOS Catalina',
  macOSBigSur = 'macOS Big sur',
  macOSMonterey = 'macOS Monterey',
  macOSVentura = 'macOS Ventura',
  macOSSonoma = 'macOS Sonoma',
  Linux = 'Linux',
}

/**
 * LambdaTest capabilities
 *
 * @see https://www.lambdatest.com/capabilities-generator/
 */
const capabilities = {
  'browserName': LTBrowserName.Chrome,
  'browserVersion': 'latest',
  'LT:Options': {
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    build: 'Playwright Build',
    name: 'Playwright Test',
    smartUIProjectName: 'Playwright SmartUI Test',
    platform: LTPlatform.Windows10,
    network: true,
    video: true,
    console: true,
    tunnel: false,
    tunnelName: 'Playwright Local Tunnel',
    geoLocation: 'PH',
  },
};

/**
 * Patch the capabilities dynamically according to the project name
 * TODO: Convert into a pure function
 *
 * @see playwright.config.ts
 */
const modifyCapabilities = (configName, testName) => {
  let config = configName.split('@lambdatest')[0];
  let [browserName, browserVersion, platform] = config.split(':');

  capabilities.browserName = browserName
    ? browserName
    : capabilities.browserName;
  capabilities.browserVersion = browserVersion
    ? browserVersion
    : capabilities.browserVersion;
  capabilities['LT:Options']['platform'] = platform
    ? platform
    : capabilities['LT:Options']['platform'];
  capabilities['LT:Options']['name'] = testName;
};

const getTestResults = (testInfo) => {
  return {
    action: 'setTestStatus',
    arguments: {
      status: testInfo.status,
      remark: testInfo.error?.stack || testInfo.error?.message,
    },
  };
};

export const test = base.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    // [SETUP] Configure LambdaTest platform for cross-browser testing
    let fileName = testInfo.file.split(path.sep).pop();
    if (testInfo.project.name.match(/lambdatest/)) {
      // TODO: Convert into a pure function
      modifyCapabilities(
        testInfo.project.name,
        `${testInfo.title} - ${fileName}`,
      );

      // TODO: Choose the browser based on the test project
      const browser = await chromium.connect(
        `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities),
        )}`,
      );

      // Override the built-in 'page' fixture
      const ltPage = await browser.newPage(testInfo.project.use);
      await use(ltPage);

      // Enable LambdaTest reporting
      await ltPage.evaluate(
        () => {},
        `lambdatest_action: ${JSON.stringify(getTestResults(testInfo))}`,
      );

      // [TEARDOWN] Dispose test resources
      await ltPage.close();
      await browser.close();
    } else {
      // Run tests in local in case of local config provided
      await use(page);
    }
  },
});

export { expect } from '@playwright/test';
