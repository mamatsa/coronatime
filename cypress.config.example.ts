import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1040,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },

  env: {
    baseApiUrl: 'https://coronatime-api.devtest.ge/api/*',
    apiRecoveryLink:
      'https://coronatime-api.devtest.ge/api/password/send-recovery-link',
    apiRecovery: 'https://coronatime-api.devtest.ge/api/password/recover',
    apiToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im90byIsImVtYWlsIjoib3Rhci5tYW1hdHNhc2h2aWxpQGdtYWlsLmNvbSIsImlhdCI6MTY1NDY5MTY0N30.wfFNp_nKWrutnhzg5AZPSxKAygZN5y7C3L8-PEPIlkQ',
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
  video: false,
});
