const axios = require('axios');
const csvParser = require('csv-parser');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const urls = [
  // Unused CSV URLs commented out
];


const groupedCars = (carsalesData) => {
  const grouped = {};

  carsalesData.forEach((car) => {
    // Access the first element of the displayValue array for make and model
    const make = car.make.displayValue[0];
    const model = car.model.displayValue[0];

    if (make && model) {
      const makeSlug = slugify(make);
      const modelSlug = slugify(model);
      const uniqueKey = `${makeSlug}-${modelSlug}`;

      if (!grouped[uniqueKey]) {
        grouped[uniqueKey] = {
          route: `/car-sales/${modelSlug}`,
          count: 1,
        };
      } else {
        grouped[uniqueKey].count++;
      }
    }
  });

  return Object.values(grouped);
};

const taxonomyCars = (carsalesData, taxonomy) => {
  const grouped = {};

  carsalesData.forEach((car) => {
    const taxonomyValue = car[taxonomy].displayValue[0].toLowerCase();
    const condition = car.condition.displayValue[0].toLowerCase();
    const makeSlug = slugify(car.make.displayValue[0]);
    const modelSlug = slugify(car.model.displayValue[0]);

    // Creating a unique key for each taxonomy value and condition
    const uniqueKey = `${taxonomyValue}-${condition}-${makeSlug}-${modelSlug}`;

    if (!grouped[uniqueKey]) {
      grouped[uniqueKey] = {
        route: `/car-sales/${condition}/${modelSlug}`,
        count: 1,
      };
    } else {
      grouped[uniqueKey].count++;
    }
  });

  return Object.values(grouped);
};

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const parseCsv = async (url) => {
  const { data: csvData } = await axios.get(url, { responseType: 'text' });

  return new Promise((resolve, reject) => {
    const data = [];
    Readable.from(csvData)
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', reject);
  });
};


const fetchJson = async (url, errorMessage) => {
  try {
    const { data } = await axios.get(url);
    // Return the vehiclesData array if it exists, otherwise return the data itself
    return data.vehiclesData || data;
  } catch (error) {
    console.error(errorMessage, error);
    return [];  // Return empty array as a safe fallback
  }
};

exports.handler = async () => {
  try {
    const navigationJson = await fetchJson(
      'https://driveagent.b-cdn.net/files/blood-hyundai/config/config.json',
      'Error reading navigation JSON:'
    );
    const modelsJson = await fetchJson(
      'https://hyundaioem.b-cdn.net/data/models.json',
      'Error reading models JSON:'
    );
    const variants = await fetchJson(
      'https://hyundaioem.b-cdn.net/data/variants.json',
      'Error reading variants:'
    );
    const fetchedJsonCarsalesData = await fetchJson(
      'https://bloodhyundai.com.au/carsales-feed',
      'Error reading fetched JSON:'
    );

    const pageLinks = Object.keys(navigationJson.pages).map((page) => ({
      url: `/${page}`,
      changefreq: 'daily',
      priority: 0.9,
    }));

    const modelLinks = modelsJson.map((model) => {
      const modelImageUrl = model.model_image
        ? model.model_image.replace(/\\/g, '')
        : null;
      const img = modelImageUrl ? [{ url: modelImageUrl }] : [];

      return {
        url: `/vehicle/${model.slug}`,
        changefreq: 'daily',
        priority: 0.8,
        img,
      };
    });
    const variantLinks = variants.map((variant) => {
      const imageUrl = variant.image ? variant.image.replace(/\\/g, '') : null;
      const img = imageUrl ? [{ url: imageUrl }] : [];

      return {
        url: `/variant/${variant.slug}`,
        changefreq: 'daily',
        priority: 0.8,
        img,
      };
    });

// Updated carsales links generation using thumb property
const carsalesLinks = fetchedJsonCarsalesData.map((item) => ({
  url: `/vehicle-for-sale/${item.stockid || ''}/${slugify(item.title || '')}`,
  changefreq: 'daily',
  priority: 0.8,
  img: item.thumb ? [{ url: item.thumb }] : []
}));


const taxonomyCarLinks = taxonomyCars(fetchedJsonCarsalesData, 'body').map(groupedCar => {
  return {
    url: groupedCar.route,
    changefreq: 'daily',
    priority: 0.8,
  };
});


// Use the groupedCars function to group cars by make and model
const groupedCarLinks = groupedCars(fetchedJsonCarsalesData).map(groupedCar => {
  return {
    url: groupedCar.route,
    changefreq: 'daily', // Adjust as needed
    priority: 0.8, // Adjust as needed
  };
});

const generateBuildUrls = (modelsJson) => {
  return modelsJson.map((model) => {
    if (model.slug) {
      return {
        url: `/build/${model.slug}?sortby=price`,
        changefreq: 'weekly', // Adjust as needed
        priority: 0.7, // Adjust as needed
      };
    }
    return null;
  }).filter(urlObj => urlObj !== null); // Filter out any null entries
};

const buildUrls = generateBuildUrls(modelsJson);

const links = [...pageLinks, ...carsalesLinks, ...modelLinks, ...groupedCarLinks, ...taxonomyCarLinks];

const stream = new SitemapStream({
  hostname: 'https://bloodhyundai.com.au',
});
const xmlString = await streamToPromise(
  Readable.from(links).pipe(stream)
).then((data) => data.toString());

return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/xml',
  },
  body: xmlString,
};
} catch (error) {
console.error('Error generating sitemap:', error);
return {
statusCode: 500,
body: 'Error generating sitemap',
};
}
};
