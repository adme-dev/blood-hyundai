import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import forEach from "lodash/forEach";
import matchItems from "./matchItems";
import find from "lodash/find";
import Vue from "vue";
const buildQuery = ({ selected, page, sorting }) => {
  const query = {};

  forEach(selected, (value, key) => {
    if (Array.isArray(value)) {
      const vals = map(value, (v) => encodeURIComponent(v));
      query[key] = vals.join(",");
    } else {
      query[key] = value;
    }
  });

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
const isDateInRange = (start, end) => {
  if (!end) return true;

  let startDate, endDate;
  startDate = start ? start.split("-") : ""
  endDate = end ? end.split("-") : "";

  let currentDate = new Date();

  let sDate = new Date(startDate[2], parseInt(startDate[1]) - 1, startDate[0]);
  let eDate = new Date(endDate[2], parseInt(endDate[1]) - 1, endDate[0]);

  return currentDate >= sDate && currentDate <= eDate;
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
    return sortBy(items, item=>{
      return parseInt(item[by]);
    });
  }

  return sortBy(items, item=>{
    return parseInt(item[by]);
  }).reverse();
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

  const GetTime= (time) => {
      var d = new Date(time);
      return (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes().toString().replace(/^(\d)$/, '0$1') + ' ' + (d.getHours() >= 12 ? "pm" : "am");
    }

const processTradingHours = (hours) => {
  const modifiedHours = {};
  forEach(hours, (value, key) => {
    var options = {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    };
    let currentStatus = (value[0].current.value === "by_appointment") ? value[0].current.label : value[0].current.value;
    modifiedHours[key] = {
      open: GetTime(value[0].open),
      close: GetTime(value[0].close),
      status: currentStatus,
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
