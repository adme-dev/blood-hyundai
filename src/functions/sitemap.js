const axios = require('axios');
const csvParser = require('csv-parser');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const urls = [
  // Unused CSV URLs commented out
];

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

const parseFirstPhoto = (photosJson) => {
  try {
    const photos = typeof photosJson === 'string' ? JSON.parse(photosJson) : photosJson;
    if (photos.length > 0 && photos[0].Url) {
      return photos[0].Url;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error parsing photos:', error);
    return null;
  }
};


const fetchJson = async (url, errorMessage) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(errorMessage, error);
    return null;
  }
};

exports.handler = async () => {
  try {
    const navigationJson = await fetchJson(
      'https://driveagent.b-cdn.net/files/traralgon-hyundai/config/config.json',
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
      'https://driveagent.b-cdn.net/files/traralgon-hyundai/carsales/dataSampleKey.json',
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

    const carsalesLinks = fetchedJsonCarsalesData.map((item) => {
      const firstPhoto = parseFirstPhoto(item['photos']);
      const img = firstPhoto
        ? [
            {
              url: firstPhoto,
            },
          ]
    : [];

  return {
    url: `/vehicle-for-sale/${item['stockid']}/${slugify(item['title'])}`,
    changefreq: 'daily',
    priority: 0.8,
    img,
  };
});

const links = [...pageLinks, ...carsalesLinks, ...modelLinks, ...variantLinks];

const stream = new SitemapStream({
  hostname: 'https://traralgonhyundai.com.au',
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
