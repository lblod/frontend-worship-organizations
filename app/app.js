import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'frontend-worship-organizations/config/environment';
import './config/custom-inflector-rules';
import { silenceEmptySyncRelationshipWarnings } from './utils/ember-data';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

silenceEmptySyncRelationshipWarnings();
loadInitializers(App, config.modulePrefix);
