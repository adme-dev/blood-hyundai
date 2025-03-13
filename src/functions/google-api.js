const axios = require('axios');
const xmlbuilder = require('xmlbuilder');

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

function mapBodyStyle(bodyStyle) {
  switch (bodyStyle) {
    case 'Cab Chassis': return 'TRUCK';
    case 'Convertible': return 'CONVERTIBLE';
    case 'Coupe': return 'COUPE';
    case 'Hatch': return 'HATCHBACK';
    case 'Light Truck': return 'TRUCK';
    case 'People Mover': return 'MINIVAN';
    case 'Sedan': return 'SEDAN';
    case 'Ute': return 'TRUCK';
    case 'Van': return 'VAN';
    case 'Wagon': return 'WAGON';
    default: return bodyStyle;
  }
}

function mapDrivetrain(drivetrain) {
  switch (drivetrain) {
    case '4x2': return '4X2';
    case '4X4 Dual Range': return '4X4';
    case '4X4 On Demand': return '4X4';
    case 'Four Wheel Drive': return '4X4';
    case '4X4 Dual Range': return '4X4';
    case '4X4 Constant': return '4X4';
    case 'Front Wheel Drive': return 'FWD';
    case 'Rear Wheel Drive': return 'RWD';
    default: return 'OTHER';
  }
}

function mapFuelType(fuelType) {
  switch (fuelType) {
    case 'Diesel': return 'DIESEL';
    case 'Electric': return 'ELECTRIC';
    case 'Gas Only': return 'GASOLINE';
    case 'Petrol - Unleaded ULP': return 'GASOLINE';
    case 'Petrol - Premium ULP': return 'GASOLINE';
    case 'Hybrid': return 'HYBRID';
    case 'Plug in Hybrid': return 'HYBRID';
    case 'Petrol': return 'GASOLINE';
    case 'Dual Fuel': return 'FLEX';
    default: return 'OTHER';
  }
}

function mapTransmission(transmission) {
  switch (transmission) {
    case 'Sports Automatic':
    case 'Semi Automatic':
    case 'Sports Automatic Dual Clutch':
    case 'Constantly Variable Transmission':
      return 'Automatic';
    case 'Manual':
      return 'Manual';
    default:
      return 'Other';
  }
}

function mapVehicleState(condition) {
  if (condition === 'Demo') return 'CPO';
  return condition || 'used';
}

function processDescription(description) {
  description = String(description);
  description = description.replace(/<\/?[^>]+(>|$)/g, "");
  if (description.length > 5000) description = description.substring(0, 5000);
  const promotionalPhrases = ["BUY NOW", "SALE", "DISCOUNT", "http://", "https://"];
  promotionalPhrases.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    description = description.replace(regex, '');
  });
  if (description === description.toUpperCase()) {
    description = description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
  }
  description = description.replace(/\. /g, '.\n');
  return description.trim();
}

const fetchJson = async (url, errorMessage) => {
  try {
    const { data } = await axios.get(url);
    return data.vehiclesData || data;
  } catch (error) {
    console.error(errorMessage, error);
    return [];
  }
};

exports.handler = async (event, context) => {
  try {
    const fetchedJsonCarsalesData = await fetchJson(
      'https://bloodhyundai.com.au/carsales-feed',
      'Error reading fetched JSON:'
    );

    const feed = xmlbuilder.create('rss', { version: '1.0', encoding: 'UTF-8' });
    feed.att('xmlns:g', 'http://base.google.com/ns/1.0');
    const channel = feed.ele('channel');
    channel.ele('title', 'blood Hyundai');
    channel.ele('link', 'https://bloodhyundai.com.au');
    channel.ele('description', 'Product feed for blood Hyundai');

    fetchedJsonCarsalesData.forEach(item => {
      const product = channel.ele('item');
      product.ele('g:id', item.id);
      product.ele('g:title', item.title);
      product.ele('g:description', processDescription(item.Comments || 'More info coming soon!'));
      product.ele('g:link_template', `https://bloodhyundai.com.au/vehicle-for-sale/${item.stockid}/${slugify(item.title)}`);
      product.ele('g:image_link', item.photos?.thumb || '');
      product.ele('g:condition', mapVehicleState(item.condition?.displayValue?.[0]));
      product.ele('g:body_style', mapBodyStyle(item.body?.displayValue?.[0] || ''));
      product.ele('g:transmissions', mapTransmission(item.transmission?.displayValue?.[0] || ''));
      product.ele('g:availability', 'in stock');
      product.ele('g:price', item.price ? `${item.price} AUD` : '');
      product.ele('g:vehicle_price_type', 'drive_away_price');
      product.ele('g:google_product_category', 'Vehicles & Parts > Vehicles > Motor Vehicles > Cars, Trucks & Vans');
      product.ele('g:brand', item.make?.displayValue?.[0] || '');
      product.ele('g:model', item.model?.displayValue?.[0] || '');
      product.ele('g:mpn', item.vin || '');
      product.ele('g:product_type', 'Cars, Trucks & Vans');
      product.ele('g:color', item.colour?.displayValue?.[0] || '');
      product.ele('g:year', item.year?.displayValue?.[0] || '');
      product.ele('g:mileage', item.kms ? `${item.kms} KM` : '');
      product.ele('g:vin', item.vin || '');
      product.ele('g:store_address', 'Lot 1 Princes Hwy, Geelong VIC 3220, Australia');
      product.ele('g:store_code', 'bloodhyundai');
    });

    const xmlString = feed.end({ pretty: true });

    return {
      statusCode: 200,
      body: xmlString,
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      }
    };
  } catch (error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred', details: error.message }),
    };
  }
};