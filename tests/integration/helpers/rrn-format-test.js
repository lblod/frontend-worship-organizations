import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | rrn-format', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it formats', async function (assert) {
    this.set('inputValue', '12345678901');

    await render(hbs`{{rrn-format this.inputValue}}`);

    assert.strictEqual(this.element.textContent.trim(), '12.34.56-789.01');
  });
});
