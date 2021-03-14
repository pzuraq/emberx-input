import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, fillIn, typeIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | x-textarea', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with change event', async function (assert) {
    await render(
      hbs`<XTextarea value={{this.value}} @onChange={{set this "value"}} />`
    );

    assert.dom('textarea').exists();

    await fillIn('textarea', 'testing');

    assert.equal(this.value, 'testing', 'onChange fired with correct value');

    assert.dom('textarea').hasProperty('value', 'testing');
  });

  test('it works with input event', async function (assert) {
    await render(
      hbs`<XTextarea value={{this.value}} @onInput={{set this "value"}} />`
    );

    assert.dom('textarea').exists();

    await typeIn('textarea', 'testing');

    assert.equal(this.value, 'testing', 'onChange fired with correct value');

    assert.dom('textarea').hasProperty('value', 'testing');
  });

  test('works with keyup events', async function (assert) {
    await render(
      hbs`<XTextarea value={{this.value}} @onKeyUp={{set this "value"}} />`
    );

    assert.dom('textarea').exists();

    await typeIn('textarea', 'testing');

    assert.equal(this.value, 'testing', 'onKeyUp fired with correct value');

    assert.dom('textarea').hasProperty('value', 'testing');
  });

  test('works with keypress events', async function (assert) {
    this.value = 'testing';

    this.onKeyPress = (value) => {
      assert.equal(value, 'testing', 'keypress triggered with correct value');
    };

    await render(
      hbs`<XTextarea value={{this.value}} @onKeyPress={{this.onKeyPress}} />`
    );

    await typeIn('textarea', 't');
  });

  test('works with keydown events', async function (assert) {
    this.value = 'testing';

    this.onKeyDown = (value) => {
      assert.equal(value, 'testing', 'keydown triggered with correct value');
    };

    await render(
      hbs`<XTextarea value={{this.value}} @onKeyDown={{this.onKeyDown}} />`
    );

    await typeIn('textarea', 't');
  });

  test('it updates when value is updated externally', async function (assert) {
    await render(hbs`<XTextarea value={{this.value}} />`);

    assert.dom('textarea').exists();

    await fillIn('textarea', 'testing');

    assert.equal(this.value, undefined, 'value not changed');
    assert.dom('textarea').hasProperty('value', 'testing');

    this.set('value', 'something');
    await settled();

    assert.dom('textarea').hasProperty('value', 'something');
  });
});
