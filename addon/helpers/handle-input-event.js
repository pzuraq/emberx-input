import { helper } from '@ember/component/helper';

export default helper(function handleInputEvent([fn]) {
  return (event) => {
    let { target } = event;

    let value = target.type === 'checkbox' ? target.checked : target.value;

    fn(value, event);
  };
});
