import find from 'lodash/find';
import every from 'lodash/every';
import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import includes from 'lodash/includes';
import intersection from 'lodash/intersection';

const testText = (variantValue, value) => {
  const needle = toLower(value);
  const haystack = toLower(variantValue);
  return includes(haystack, needle);
};

const testSlider = (variantValue, value) => {
  const [min, max] = value;
  return variantValue >= min && variantValue <= max;
};

const testDate = (variantValue, value) => {
  const [start, end] = value;
  const startDateTime = `${start} 00:00:00`;
  const endDateTime = `${end} 23:59:59`;
  return variantValue >= startDateTime && variantValue <= endDateTime;
};

const testSingle = (variantValue, value) => includes(variantValue.value, value);

const testMultiple = (variantValue, value) => {
  const common = intersection(variantValue.value, value);
  return !!common.length;
};

export default (variants, selected, filters) => filter(variants, (variant) => {
  const test = every(selected, (value, name) => {
    if (variant[name] === undefined) {
      return false;
    }

    const { type } = find(filters, f => f.name === name);
    const variantValue = variant[name];
    if (type === 'text') {
      return testText(variantValue, value);
    }

    if (type === 'slider') {
      return testSlider(variantValue, value);
    }

    if (type === 'date') {
      return testDate(variantValue, value);
    }

    if (type === 'radio' || type === 'select') {
      return testSingle(variantValue, value);
    }

    if (type === 'checkbox' || type === 'multiselect') {
      return testMultiple(variantValue, value);
    }

    return false;
  });

  return test;
});
