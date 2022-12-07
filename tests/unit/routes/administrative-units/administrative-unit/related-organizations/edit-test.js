import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | administrative-units/administrative-unit/related-organizations/edit',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:administrative-units/administrative-unit/related-organizations/edit'
      );
      assert.ok(route);
    });
  }
);
