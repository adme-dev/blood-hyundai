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
    case 'SUV': return 'SUV';  // Uncommented this case
    case 'Ute': return 'TRUCK';
    case 'Van': return 'VAN';
    case 'Wagon': return 'WAGON';
    default: return 'OTHER';
  }
}

function mapDrivetrain(drivetrain) {
  switch (drivetrain) {
    case '4x2': return '4X2';
    case '4X4 Dual Range': return '4X4';
    case '4X4 On Demand': return '4X4';
    case 'Four Wheel Drive': return '4X4';
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
  return condition;
}

function processDescription(description) {
  description = String(description);
  description = description.replace(/<\/?[^>]+(>|$)/g, "");
  
  if (description.length > 5000) {
    description = description.substring(0, 5000);
  }
  
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

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://bloodhyundai.com.au/carsales-feed');
    // Extract the vehiclesData array from the response
    const vehicles = response.data.vehiclesData || [];

    const listings = xmlbuilder.create('listings');
    listings.ele('title', 'Blood Hyundai');
    listings.ele('link', { rel: 'self', href: 'https://bloodhyundai.com.au/cars-sales/?r=vddn' });

    vehicles.forEach(item => {
      const listing = listings.ele('listing');
      
      listing.ele('vehicle_id', item.id);
      listing.ele('title', `${item.title} ${item.stockid}`);
      
      const cleanedDescription = processDescription(item.Comments || 'More info coming soon!');
      listing.ele('description', cleanedDescription);
      
      listing.ele('url', `https://bloodhyundai.com.au/vehicle-for-sale/${item.stockid}/${slugify(item.title)}`);
      listing.ele('make', item.make.displayValue ? item.make.displayValue[0] : '');
      listing.ele('model', item.model.displayValue ? item.model.displayValue[0] : '');
      listing.ele('year', item.year.displayValue ? item.year.displayValue[0] : '');
    
      const mileageElement = listing.ele('mileage');
      mileageElement.ele('value', item.kms || '0');
      mileageElement.ele('unit', 'KM');
    
      listing.ele('drivetrain', mapDrivetrain(item.drivetrain.displayValue ? item.drivetrain.displayValue[0] : ''));
      listing.ele('vin', item.vin);
      listing.ele('body_style', mapBodyStyle(item.body.displayValue ? item.body.displayValue[0] : ''));
      listing.ele('fuel_type', mapFuelType(item.fuel.displayValue ? item.fuel.displayValue[0] : ''));
      listing.ele('transmission', mapTransmission(item.transmission.displayValue ? item.transmission.displayValue[0] : ''));
      listing.ele('price', item.price + ' AUD');
        listing.ele('latitude', -38.2074533);
        listing.ele('longitude', 146.4958877);
      listing.ele('exterior_color', item.colour.displayValue ? item.colour.displayValue[0] : '');
      listing.ele('state_of_vehicle', mapVehicleState(item.condition.displayValue ? item.condition.displayValue[0] : ''));
      listing.ele('condition', mapVehicleState(item.condition.displayValue ? item.condition.displayValue[0] : ''));
      listing.ele('custom_label_0', mapVehicleState(item.condition.displayValue ? item.condition.displayValue[0] : ''));
      listing.ele('dealer_id', 102269038811366);
      listing.ele('vehicle_registration_plate', item.rego ? item.rego : '');
      listing.ele('fb_page_id', 102269038811366);
      listing.ele('dealer_communication_channel', 'LEAD_FORM');
      listing.ele('dealer_privacy_policy_url', 'https://bloodhyundai.com.au/privacy-policy');
    
        const addressElement = listing.ele('address', { format: 'simple' });
        addressElement.ele('component', { name: 'addr1' }, 'Lot 1 Princes Hwy');
        addressElement.ele('component', { name: 'city' }, 'Geelong');
        addressElement.ele('component', { name: 'region' }, 'VIC');
        addressElement.ele('component', { name: 'country' }, 'Australia');
        addressElement.ele('component', { name: 'postal_code' }, '3844');
      
      if (item.photos && item.photos.length) {
        for(let i = 0; i < Math.min(item.photos.length, 20); i++) {
          listing.ele('image').ele('url', item.photos[i]);
        }
      }
    });
    
    const xmlString = listings.end({ pretty: true });

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
    console.error('Error response:', error.response && error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })  // Added better error response
    };
  }
};