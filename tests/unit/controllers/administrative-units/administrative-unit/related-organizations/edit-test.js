import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Controller | administrative-units/administrative-unit/related-organizations/edit',
  function (hooks) {
    setupTest(hooks);

    // TODO: Replace this with your real tests.
    test('it exists', function (assert) {
      let controller = this.owner.lookup(
        'controller:administrative-units/administrative-unit/related-organizations/edit'
      );
      assert.ok(controller);
    });
  }
);
