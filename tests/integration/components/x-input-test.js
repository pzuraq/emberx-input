import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click, fillIn, typeIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | x-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with change event', async function (assert) {
    await render(
      hbs`<XInput value={{this.value}} @onChange={{set this "value"}} />`
    );

    assert.dom('input').exists();

    await fillIn('input', 'testing');

    assert.equal(this.value, 'testing', 'onChange fired with correct value');

    assert.dom('input').hasProperty('value', 'testing');
  });

  test('it works with input event', async function (assert) {
    await render(
      hbs`<XInput value={{this.value}} @onInput={{set this "value"}} />`
    );

    assert.dom('input').exists();

    await typeIn('input', 'testing');

    assert.equal(this.value, 'testing', 'onChange fired with correct value');

    assert.dom('input').hasProperty('value', 'testing');
  });

  test('works with keyup events', async function (assert) {
    await render(
      hbs`<XInput value={{this.value}} @onKeyUp={{set this "value"}} />`
    );

    assert.dom('input').exists();

    await typeIn('input', 'testing');

    assert.equal(this.value, 'testing', 'onKeyUp fired with correct value');

    assert.dom('input').hasProperty('value', 'testing');
  });

  test('works with keypress events', async function (assert) {
    this.value = 'testing';

    this.onKeyPress = (value) => {
      assert.equal(value, 'testing', 'keypress triggered with correct value');
    };

    await render(
      hbs`<XInput value={{this.value}} @onKeyPress={{this.onKeyPress}} />`
    );

    await typeIn('input', 't');
  });

  test('works with keydown events', async function (assert) {
    this.value = 'testing';

    this.onKeyDown = (value) => {
      assert.equal(value, 'testing', 'keydown triggered with correct value');
    };

    await render(
      hbs`<XInput value={{this.value}} @onKeyDown={{this.onKeyDown}} />`
    );

    await typeIn('input', 't');
  });

  test('it works as a checkbox', async function (assert) {
    await render(
      hbs`<XInput type="checkbox" checked={{this.checked}} @onChange={{set this "checked"}} />`
    );

    assert.dom('input').exists();

    await click('input');

    assert.equal(this.checked, true, 'onChange fired with correct value');

    assert.dom('input').hasProperty('checked', true);
  });

  test('it updates when value is updated externally', async function (assert) {
    await render(hbs`<XInput value={{this.value}} />`);

    assert.dom('input').exists();

    await fillIn('input', 'testing');

    assert.equal(this.value, undefined, 'value not changed');
    assert.dom('input').hasProperty('value', 'testing');

    this.set('value', 'something');
    await settled();

    assert.dom('input').hasProperty('value', 'something');
  });
});
