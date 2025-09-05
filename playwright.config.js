// Copyright 2025, University of Colorado Boulder

/**
 * Playwright configuration for number-pairs tests.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// eslint-disable-next-line no-undef
module.exports = {
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ]
};