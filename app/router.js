import EmberRouter from '@ember/routing/router';
import config from 'frontend-worship-organizations/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('mock-login');
  this.route('switch-login');

  this.route('auth', { path: '/authorization' }, function () {
    this.route('callback');
    this.route('login');
    this.route('logout');
    this.route('switch');
  });

  this.route('index', { path: '' });
  this.route('people', { path: '/personen' }, function () {
    this.route('person', { path: '/:id/' }, function () {
      this.route(
        'personal-information',
        { path: '/contactgegevens' },
        function () {
          this.route('request-sensitive-data');
        }
      );
      this.route('positions', { path: '/posities' }, function () {
        this.route(
          'mandatory',
          { path: '/mandataris/:mandatoryId/' },
          function () {}
        );
        this.route(
          'minister',
          { path: '/bedienaar/:ministerId/' },
          function () {}
        );
        this.route(
          'agent',
          { path: '/functionaris/:agentId/' },
          function () {}
        );
      });
    });
  });
  this.route(
    'administrative-units',
    { path: '/bestuurseenheden' },
    function () {
      this.route('administrative-unit', { path: '/:id/' }, function () {
        this.route(
          'governing-bodies',
          { path: '/bestuursorganen' },
          function () {
            this.route(
              'governing-body',
              { path: '/:governingBodyId/' },
              function () {
                this.route('board-member', { path: '/bestuurslid' });
                this.route('mandatory', { path: '/mandataris' });
              }
            );
          }
        );
        this.route('ministers', { path: '/bedienaren' });
      });
    }
  );
  this.route('legal', { path: '/legaal' }, function () {
    this.route('disclaimer');
    this.route('cookiestatement', { path: '/cookieverklaring' });
    this.route('accessibilitystatement', {
      path: '/toegankelijkheidsverklaring',
    });
  });
  this.route('route-not-found', {
    path: '/*wildcard',
  });
  this.route('redirect');
});
