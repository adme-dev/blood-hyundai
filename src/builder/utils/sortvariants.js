import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

export default (variants, sortingConfig) => {
  const { by, direction } = sortingConfig;

  if (by === 'position') {
    if (direction === 'asc') {
      return variants;
    }
    return map(variants, variant => variant).reverse();
  }

  if (direction === 'asc') {
    return sortBy(variants, [by, 'id']);
  }

  return sortBy(variants, [by, 'id']).reverse();
};
