// Helper function to safely get text content from vehicle properties
const getSearchableText = (item) => {
  const textFields = [
    item.title,
    item.make?.displayValue?.[0],
    item.model?.displayValue?.[0],
    item.body?.displayValue?.[0],
    item.fuel?.displayValue?.[0],
    item.stockid?.displayValue?.[0],
    item.badge?.displayValue?.[0],
    item.year?.displayValue?.[0],
    item.condition?.displayValue?.[0],
    Array.isArray(item.search_keywords?.displayValue) 
      ? item.search_keywords.displayValue.join(' ')
      : ''
  ];

  return textFields
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
};

// Updated filter functions
const filterFunctions = {
  text: (item, value) => {
    if (!value) return true;
    
    const searchTerms = value.toLowerCase().split(/[\s-]+/).filter(term => term.length >= 2);
    if (!searchTerms.length) return true;

    const searchableText = getSearchableText(item);
    return searchTerms.every(term => searchableText.includes(term));
  },

  slider: (itemValue, value) => {
    if (!Array.isArray(value) || value.length !== 2) return true;
    const [min, max] = value;
    return itemValue >= min && itemValue <= max;
  },

  date: (itemValue, value) => {
    if (!Array.isArray(value) || value.length !== 2) return true;
    const [start, end] = value;
    const startDateTime = `${start} 00:00:00`;
    const endDateTime = `${end} 23:59:59`;
    return itemValue >= startDateTime && itemValue <= endDateTime;
  },

  radio: (itemValue, value) => {
    if (!itemValue?.value) return false;
    return itemValue.value.includes(value);
  },

  select: (itemValue, value) => {
    if (!itemValue?.value) return false;
    return itemValue.value.includes(value);
  },

  checkbox: (itemValue, value) => {
    if (!itemValue?.value || !Array.isArray(itemValue.value) || !Array.isArray(value)) return false;
    return value.some(val => itemValue.value.includes(val));
  },

  multiselect: (itemValue, value) => {
    if (!itemValue?.value || !Array.isArray(itemValue.value) || !Array.isArray(value)) return false;
    return value.some(val => itemValue.value.includes(val));
  },

  multiple: (itemValue, value) => {
    if (!itemValue?.value || !Array.isArray(itemValue.value) || !Array.isArray(value)) return false;
    return value.some(val => itemValue.value.includes(val));
  }
};

// Main matchItems function
const matchItems = (items, selected, filters) => {
  if (!items?.length || !selected || !filters?.length) return items;

  try {
    // Create filter type mapping
    const filterTypes = filters.reduce((acc, filter) => {
      acc[filter.name] = filter.type;
      return acc;
    }, {});

    // Filter items
    return items.filter(item => {
      return Object.entries(selected).every(([name, value]) => {
        // Skip empty values
        if (!value || (Array.isArray(value) && !value.length)) {
          return true;
        }

        const filterType = filterTypes[name];
        const filterFn = filterFunctions[filterType];

        // Special handling for text search
        if (filterType === 'text') {
          return filterFn(item, value);
        }

        // Handle other filter types
        if (!filterFn || item[name] === undefined) {
          return false;
        }

        return filterFn(item[name], value);
      });
    });
  } catch (error) {
    console.error('Error in matchItems:', error);
    return items;
  }
};

export default matchItems;