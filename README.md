emberx-input
==============================================================================

Super basic data-down-actions-up input component!

```hbs
<XInput value={{this.value}} @onChange={{set this "value}} />
```

In general, all input attributes can be passed as attrs. `@value` and `@checked`
are also supported as alternatives to `value` and `checked`, but either can be
used.

It provides the following events as arguments:

- `@onChange`
- `@onInput`
- `@onKeyPress`
- `@onKeyDown`
- `@onKeyUp`

Each of these maps to the native event directly, but also captures the _value_
of the input and passes it as the first argument to the event handler.

```js
handleInput = (value, event) => {
  this.value = value;
}
```

This way, there's no need to pick the value off the event or target manually.

For checkbox inputs, the `checked` value is passed instead of the value:

```js
handleCheckboxChange = (checked, event) => {
  this.checked = checked;
}
```

In both cases, the original event is passed as the second argument in case it is
needed.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install emberx-input
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
