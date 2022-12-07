import EmberRouter from '@ember/routing/router';
import config from 'frontend-worship-organizations/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('mock-login');
  this.route('index', { path: '' });
  this.route('people', { path: '/personen' }, function () {
    this.route('person', { path: '/:id/' }, function () {
      this.route('personal-information', { path: '/contactgegevens' });
      this.route('positions', { path: '/posities' }, function () {
        this.route(
          'mandatory',
          { path: '/mandataris/:mandatoryId/' },
          function () {}
        );
        this.route('minister', { path: '/bedienaar/:ministerId/' });
        this.route('agent', { path: '/functionaris/:agentId/' });
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
  this.route('contact');
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
