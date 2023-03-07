'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'frontend-worship-organizations',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: false,
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      analytics: {
        appDomain: '{{ANALYTICS_APP_DOMAIN}}',
        plausibleScript: '{{ANALYTICS_PLAUSIBLE_SCRIPT}}',
      },
    },

    announce: {
      maintenance: {
        enabled: '{{ANNOUNCE_MAINTENANCE_ENABLED}}',
        message: '{{ANNOUNCE_MAINTENANCE_MESSAGE}}',
      },
      newDeployment: {
        enabled: '{{ANNOUNCE_NEW_DEPLOYMENT_ENABLED}}',
        message: '{{ANNOUNCE_NEW_DEPLOYMENT_MESSAGE}}',
      },
      testing: {
        enabled: '{{ANNOUNCE_TESTING_ENABLED}}',
        message: '{{ANNOUNCE_TESTING_MESSAGE}}',
      },
    },
    appName: 'EredienstenOrganisaties',
    contactEmail: 'organisaties.abb@vlaanderen.be',
    environmentName: '{{ENVIRONMENT_NAME}}',
    environmentTitle: '{{ENVIRONMENT_TITLE}}',

    torii: {
      disableRedirectInitializer: true,
      providers: {
        'acmidm-oauth2': {
          apiKey: '{{OAUTH_API_KEY}}',
          baseUrl: '{{OAUTH_API_BASE_URL}}',
          scope: '{{OAUTH_API_SCOPE}}',
          redirectUri: '{{OAUTH_API_REDIRECT_URL}}',
          logoutUrl: '{{OAUTH_API_LOGOUT_URL}}',
          returnUrl: '{{OAUTH_SWITCH_URL}}',
        },
      },
    },
    showAppVersionHash: process.env.SHOW_APP_VERSION_HASH === 'true',
    uriInfoServiceUrl: '/uri-info',

    userManual: {
      general: 'https://abb-vlaanderen.gitbook.io/handleiding-loket',
    },
  };

  if (environment === 'development') {
    ENV.showAppVersionHash = true;
    ENV.environmentName = 'development';
    ENV.environmentTitle = 'ontwikkelomgeving';
    ENV.torii.providers['acmidm-oauth2'].logoutUrl = '/mock-login';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.environmentName = 'test';
    ENV.environmentTitle = 'testomgeving';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
