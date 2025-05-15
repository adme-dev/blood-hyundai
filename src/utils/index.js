import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import forEach from "lodash/forEach";
import matchItems from "./matchItems";
import find from "lodash/find";
import Vue from "vue";
const buildQuery = ({ selected, page, sorting }) => {
  const query = {};

  for (const [key, value] of Object.entries(selected)) {
    if (Array.isArray(value)) {
      const vals = map(value, (v) => encodeURIComponent(v));
      query[key] = vals.join(",");
    } else {
      query[key] = value;
    }
  }

  if (page.current > 1) {
    query.page = page.current;
  }

  const { by, direction } = sorting;
  if (by !== "price") {
    query.sortby = by;
  }
  if (direction === "desc") {
    query.sortdir = direction;
  }

  return query;
};

const addQueryStringToSelection = (search, queryStringParams) => {
  forEach(queryStringParams, (value, key) => {
    const formatedKey = key.toLowerCase();
    const filter = find(search.filters, (f) => {
      return f.name === formatedKey;
    });
    if (filter) {
      Vue.set(search.selected, formatedKey, processFilterQueries(filter.type, value));
    } else {
      switch (formatedKey) {
        case "sortby":
          search.sorting.by = value;
          break;
        case "sortdir":
          search.sorting.direction = value;
          break;
        case "page":
          search.page.current = value;
          break;
      }
    }
  });

  return search;
};

const processFilterQueries = (type, value) => {
  let returnValue;
  const splitValue = value.split(",");

  switch (type) {
    case "text":
    case "radio":
    case "select":
      returnValue = value;
      break;
    case "slider":
      if (splitValue.length === 2) {
        const [min, max] = splitValue;
        if (!isNaN(min) && !isNaN(max)) {
          returnValue = [+min, +max];
        }
      }
      break;
    case "checkbox":
    case "multiselect":
      if (splitValue.length) {
        returnValue = splitValue;
      }
      break;
    default:
    // do nothing
  }
  return returnValue;
};

// Helper function to parse "DD-MM-YYYY" date strings
const parseDateString = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const year = parseInt(parts[2], 10);

    // Basic validation for date components
    if (!isNaN(day) && !isNaN(month) && !isNaN(year) &&
        year > 1000 && year < 3000 && // Ensure a reasonable year range
        month >= 0 && month <= 11 &&
        day >= 1 && day <= 31) { // Basic day check (not validating days per month)
      
      const d = new Date(year, month, day);
      // Verify that the date constructor interpreted the parts as intended
      // (e.g., handles Feb 30 by rolling over, which we want to detect as invalid for strict parsing)
      if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        return d;
      }
    }
  }
  return null; // Indicates parsing failure or invalid date
};

const isDateInRange = (startStr, endStr) => {
  const sDate = parseDateString(startStr);
  const currentDate = new Date();

  // If start date is invalid or not provided, the ticker cannot be active.
  if (!sDate) {
    return false;
  }

  // Compare date parts only to ensure entire days are considered.
  // currentDay is the beginning of today.
  const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  // startDay is the beginning of the start date.
  const startDay = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());

  // If start date is in the future, not active yet.
  if (startDay > currentDay) {
    return false;
  }

  // At this point, startDay <= currentDay. Ticker is potentially active.
  // Now check the end date.
  const eDate = parseDateString(endStr);

  if (eDate) { // If a valid end date is parsed
    const endDay = new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate());
    // Ticker is active if currentDay <= endDay
    if (currentDay > endDay) {
      return false; // Current date is past the end date
    }
  } else if (endStr && String(endStr).trim() !== "") {
    // An end date string was provided (and it's not just empty spaces), but it was unparseable.
    // Treat as an invalid range, so the ticker is not active.
    return false;
  }
  // If we reach here, the ticker is active:
  // - Start date is valid and in the past or present.
  // - AND (Either no end date string was provided (null, undefined, or empty string),
  //        OR a valid end date was provided and currentDay is not past endDay).
  return true;
};

const sortItems = (items, sortingConfig) => {
  const { by, direction } = sortingConfig;

  if (by === "position") {
    if (direction === "asc") {
      return items;
    }
    return map(items, (item) => item).reverse();
  }

  if (direction === "asc") {
    return sortBy(items, [by, "id"]);
  }

  return sortBy(items, [by, "id"]).reverse();
};

const formatNumber = (value, name, config) => {
  if (config[name]) {
    const { locale, options, prefix, suffix } = config[name];

    const num = new Intl.NumberFormat(locale, options).format(value);

    return "$" + Math.round(value).toLocaleString();
  }
  return value;
};

const getSelectionsWithValue = (selected) => {
  let selectionsWithValue = {};
  for (var key in selected) {
    if (!isEmpty(selected[key])) selectionsWithValue[key] = selected[key];
  }
  return selectionsWithValue;
};
const processTradingHours = (hours) => {
  const modifiedHours = {};
  forEach(hours, (value, key) => {
    var options = {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    };

    modifiedHours[key] = {
      open: value[0].open,
      close: value[0].close,
      status: value[0].current.value,
    };
  });
  return modifiedHours;
};
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};
export {
  addQueryStringToSelection,
  isDateInRange,
  matchItems,
  sortItems,
  formatNumber,
  getSelectionsWithValue,
  buildQuery,
  processTradingHours,
  slugify,
};
