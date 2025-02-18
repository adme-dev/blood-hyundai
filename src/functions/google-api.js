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
        //case 'SUV': return 'SUV';
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
        case 'Plug in Hybrid': return 'HYBRID'; // Assuming Plug in Hybrid maps to HYBRID
        case 'Petrol': return 'GASOLINE'; // Assuming Petrol maps to GASOLINE
        case 'Dual Fuel': return 'FLEX'; // Adjust as needed
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
      // Add other cases as needed
      return condition; // Return the original value if no mapping is needed
    }

    function processDescription(description) {
      // Convert input to string if it isn't already
      description = String(description);
    
      // Remove any HTML tags
      description = description.replace(/<\/?[^>]+(>|$)/g, "");
    
      // Truncate to 5000 characters
      if (description.length > 5000) {
        description = description.substring(0, 5000);
      }
    
      // Remove promotional text or links (adjust based on your needs)
      const promotionalPhrases = ["BUY NOW", "SALE", "DISCOUNT", "http://", "https://"];
      promotionalPhrases.forEach(phrase => {
        const regex = new RegExp(phrase, 'gi');
        description = description.replace(regex, '');
      });
    
      // Ensure text is not in all capital letters
      if (description === description.toUpperCase()) {
        description = description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
      }
    
      // Ensure proper line breaks (this is a basic example, adjust as needed)
      description = description.replace(/\. /g, '.\n');
    
      return description.trim();
    }

    exports.handler = async (event, context) => {
      try {
        const response = await axios.get('https://driveagent.b-cdn.net/files/traralgon-hyundai/carsales/dataSampleKey.json');
        const jsonData = response.data;
    
        const feed = xmlbuilder.create('rss', { version: '1.0', encoding: 'UTF-8' });
        feed.att('xmlns:g', 'http://base.google.com/ns/1.0');
        const channel = feed.ele('channel');
        channel.ele('title', 'Traralgon Hyundai');
        channel.ele('link', 'https://traralgonhyundai.com.au');
        channel.ele('description', 'Product feed for Traralgon Hyundai');
    
        jsonData.forEach(item => {
          const product = channel.ele('item');
          product.ele('g:id', item.id);
          product.ele('g:title', item.title);
          product.ele('g:description', processDescription(item.Comments || 'More info coming soon!'));
          product.ele('g:link_template', `https://traralgonhyundai.com.au/vehicle-for-sale/${item.stockid}/${slugify(item.title)}?store={store_code}`);
          product.ele('g:image_link', item.photos && item.photos[0] ? item.photos[0].Url : '');
          product.ele('g:condition', item.condition.displayValue ? item.condition.displayValue[0] : '');
          product.ele('g:body_style', mapBodyStyle(item.body.displayValue ? item.body.displayValue[0] : ''));
          product.ele('g:transmissions', mapTransmission(item.transmission.displayValue ? item.transmission.displayValue[0] : ''));
          product.ele('g:availability', 'in stock'); // Adjust as necessary
          product.ele('g:price', item.price + ' AUD');
          product.ele('g:vehicle_price_type', 'drive_away_price');
          product.ele('g:google_product_category', 'Vehicles & Parts > Vehicles > Motor Vehicles > Cars, Trucks & Vans');
          product.ele('g:brand', item.make.displayValue ? item.make.displayValue[0] : '');
          product.ele('g:model', item.model.displayValue ? item.model.displayValue[0] : '');
          product.ele('g:mpn', item.vin); // MPN can be the VIN for vehicles
          product.ele('g:product_type', mapBodyStyle(item.body.displayValue ? item.body.displayValue[0] : ''));
          product.ele('g:color', item.colour.displayValue ? item.colour.displayValue[0] : '');
          product.ele('g:year', item.year.displayValue[0]);
          product.ele('g:mileage', `'${item.kms} KM'`);
          product.ele('g:vin', item.vin);
          product.ele('g:store_address', 'Lot 1 Princes Hwy, Traralgon VIC 3844, Australia');
          product.ele('g:store_code', 'GHYUNDAI3844');
              // Add other necessary Google Merchant attributes here...
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
        console.error('Error response:', error.response && error.response.data);
        return {
          statusCode: 500,
          body: 'An error occurred'
        };
      }
    };
