const NodeCache = require('node-cache');
const axios = require('axios');

// Initialize cache with a default TTL of 30 minutes
const cache = new NodeCache({ stdTTL: 300 });

// Memoize the weekly payment calculation
const weeklyPaymentCache = new Map();
function calculateWeeklyPayment(price, annualInterestRate = 9.8, loanTermYears = 5) {
  const cacheKey = `${price}-${annualInterestRate}-${loanTermYears}`;
  if (weeklyPaymentCache.has(cacheKey)) {
    return weeklyPaymentCache.get(cacheKey);
  }

  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const loanTermMonths = loanTermYears * 12;
  const i = Math.pow(1 + monthlyInterestRate, loanTermMonths);
  const payment = i !== 1 ? (price * monthlyInterestRate * i) / (i - 1) : 0;
  const weeklyPayment = (payment * 12) / 52;
  
  weeklyPaymentCache.set(cacheKey, weeklyPayment);
  return weeklyPayment;
}

// Pre-compile frequently used functions
const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
const roundToTen = (num) => Math.round(num / 10) * 10;

function createFiltersFromVehicles(vehicles) {
  // Initialize filter data structure with Maps for better performance
  const filterData = {
    conditions: new Map(),
    models: new Map(),
    badges: new Set(),
    colours: new Map(),
    bodyTypes: new Map(),
    transmissions: new Map(),
    drivetrains: new Map(),
    fuels: new Map(),
    suburbs: new Map(),
    seats: new Map(),
    doors: new Map(),
    priceRange: { min: Number.MAX_SAFE_INTEGER, max: 0 },
    kmsRange: { min: Number.MAX_SAFE_INTEGER, max: 0 }
  };

  // Single pass through vehicles to collect all data
  for (const vehicle of vehicles) {
    // Process price ranges
    filterData.priceRange.max = Math.max(filterData.priceRange.max, vehicle.price);
    filterData.priceRange.min = Math.min(filterData.priceRange.min, vehicle.price);
    
    // Process kilometers
    filterData.kmsRange.max = Math.max(filterData.kmsRange.max, vehicle.kms);
    filterData.kmsRange.min = Math.min(filterData.kmsRange.min, vehicle.kms);

    // Process arrays efficiently using optional chaining
    vehicle.condition?.value?.forEach(val => filterData.conditions.set(val, true));
    vehicle.body?.value?.forEach(val => filterData.bodyTypes.set(val, true));
    vehicle.transmission?.value?.forEach(val => filterData.transmissions.set(val, true));
    vehicle.drivetrain?.value?.forEach(val => filterData.drivetrains.set(val, true));
    vehicle.fuel?.value?.forEach(val => filterData.fuels.set(val, true));
    vehicle.seats?.value?.forEach(val => filterData.seats.set(val, true));
    vehicle.doors?.value?.forEach(val => filterData.doors.set(val, true));

    // Process colours with formatting
    vehicle.colour?.value?.forEach(colour => {
      const formattedColour = capitalize(colour);
      filterData.colours.set(formattedColour, true);
    });

    // Process models
    vehicle.model?.value?.forEach((value, index) => {
      const modelKey = JSON.stringify({
        value,
        displayValue: vehicle.model.displayValue[index],
        displayMake: vehicle.model.displayMake[index]?.displayValue[0],
        displayBody: vehicle.model.displayBody[index]
      });
      filterData.models.set(modelKey, true);
    });

    // Process badges
    vehicle.badge?.value?.forEach(val => filterData.badges.add(val));

    // Process suburb
    if (vehicle.suburb?.value[0]) {
      filterData.suburbs.set(vehicle.suburb.displayValue[0], true);
    }
  }

  // Calculate weekly payment range
  const minWeeklyPayment = calculateWeeklyPayment(filterData.priceRange.min);
  const maxWeeklyPayment = calculateWeeklyPayment(filterData.priceRange.max);

  // Convert collected data to final filter format
  return [
    {
      name: "condition",
      displayName: "Condition",
      type: "checkbox",
      data: Array.from(filterData.conditions.keys()).map(value => ({
        value,
        displayValue: capitalize(value)
      }))
    },
    {
      name: "model",
      displayName: "Models",
      type: "multiselect",
      data: Array.from(filterData.models.keys()).map(json => JSON.parse(json))
    },
    {
      name: "badge",
      displayName: "Badges",
      type: "checkbox",
      data: Array.from(filterData.badges).sort().map(value => ({
        value: value || "",
        displayValue: value ? capitalize(value) : "Select a badge"
      }))
    },
    {
      name: "stock_special",
      displayName: "Stock Special",
      type: "checkbox",
      data: [{ value: "stock-special", displayValue: "Stock Specials" }]
    },
    {
      name: "search_keywords",
      displayName: "Keywords:",
      type: "text"
    },
    {
      name: "colour",
      displayName: "Colour",
      type: "checkbox",
      data: Array.from(filterData.colours.keys()).map(colour => ({
        value: colour.toLowerCase(),
        displayValue: colour
      }))
    },
    {
      name: "price",
      displayName: "Budget",
      type: "slider",
      data: {
        max: filterData.priceRange.max,
        min: filterData.priceRange.min,
        step: 500
      }
    },
    {
      name: "perweek",
      displayName: "Per week budget",
      description: "<sup>*</sup>Loan repayments are based on 8% interest rate and loan term of 5 years. The result provided is an estimate only. To obtain a detailed quote that takes into account your particular situation please complete our <a href=/finance>finance enquiry form</a>.",
      type: "slider",
      data: {
        min: roundToTen(minWeeklyPayment),
        max: roundToTen(maxWeeklyPayment),
        step: 10
      }
    },
    {
      name: "kms",
      displayName: "Kilometres",
      type: "slider",
      data: {
        max: filterData.kmsRange.max,
        min: filterData.kmsRange.min,
        step: 1000
      }
    },
    {
      name: "body",
      displayName: "Body",
      type: "checkbox",
      data: Array.from(filterData.bodyTypes.keys()).map(value => ({
        value,
        displayValue: capitalize(value)
      }))
    },
    {
      name: "transmission",
      displayName: "Transmission",
      type: "checkbox",
      data: Array.from(filterData.transmissions.keys()).map(value => ({
        value: value || "",
        displayValue: value ? capitalize(value) : "Undefined"
      }))
    },
    {
      name: "drivetrain",
      displayName: "Drive Train",
      type: "checkbox",
      data: Array.from(filterData.drivetrains.keys()).map(value => ({
        value: value || "",
        displayValue: value || "Undefined"
      }))
    },
    {
      name: "fuel",
      displayName: "Fuel Type",
      type: "checkbox",
      data: Array.from(filterData.fuels.keys()).map(value => ({
        value: value || "",
        displayValue: value || "Undefined"
      }))
    },
    {
      name: "seats",
      displayName: "Seating Capacity",
      type: "checkbox",
      data: Array.from(filterData.seats.keys()).map(value => ({
        value: value || "",
        displayValue: value || "Undefined"
      }))
    },
    {
      name: "doors",
      displayName: "Doors",
      type: "checkbox",
      data: Array.from(filterData.doors.keys()).map(value => ({
        value: value || "",
        displayValue: value || "Undefined"
      }))
    }
  ];
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const cacheKey = 'vehicleData';
  let cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log('Cache hit');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(cachedData)
    };
  }

  console.log('Cache miss');

  const urls = [
    'https://tsheefvkecaervnrxvdf.supabase.co/storage/v1/object/public/bucket/blood-hyundai/data.json',
    'https://tsheefvkecaervnrxvdf.supabase.co/storage/v1/object/public/bucket/blood-motor-group/data.json'
  ];

  try {
    const responses = await Promise.all(urls.map(url => 
      axios.get(url, { 
        timeout: 5000,
        headers: { 'Accept-Encoding': 'gzip' }
      })
    ));

    const uniqueIds = new Set();
    const vehicles = [];
    
    // Process each response
    responses.forEach((response, index) => {
      //console.log(`Processing URL ${index}: Found ${response.data.length} vehicles`);
      
      for (const vehicle of response.data) {
        // Log the condition values for debugging
        //console.log(`Vehicle ID: ${vehicle.id}, Condition:`, vehicle.condition?.value);
        
        // Skip if we've seen this ID before
        if (uniqueIds.has(vehicle.id)) {
          //console.log(`Skipping duplicate vehicle ID: ${vehicle.id}`);
          continue;
        }
        
        let shouldIncludeVehicle = false;
        
        if (index === 0 || index === 1) {
          // Include all vehicles from Brighton Suzuki
          shouldIncludeVehicle = true;
          //console.log(`Suzuki vehicle ${vehicle.id}: Including all`);
        } else {
          // For other sources, check if it's used
          const isUsed = vehicle.condition?.value?.some(value => 
            value.toLowerCase().includes('used')
          );
          shouldIncludeVehicle = isUsed;
          //console.log(`Other vehicle ${vehicle.id}: Used=${isUsed}`);
        }

        if (shouldIncludeVehicle) {
          uniqueIds.add(vehicle.id);
          
          // Add suburb information if available
          const suburb = vehicle.address?.suburb || "Undefined";
          vehicle.suburb = {
            value: [suburb.toLowerCase()],
            displayValue: [suburb]
          };
          
          // Calculate weekly payment
          vehicle.perweek = Math.round(calculateWeeklyPayment(vehicle.price));
          
          vehicles.push(vehicle);
          //console.log(`Added vehicle ${vehicle.id} to results`);
        }
      }
    });

    //console.log(`Total vehicles processed: ${vehicles.length}`);

    if (vehicles.length === 0) {
      console.log('WARNING: No vehicles found in the data');
    }

    const filters = createFiltersFromVehicles(vehicles);
    const result = { vehiclesData: vehicles, filters };

    // Cache the result
    cache.set(cacheKey, result);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        msg: 'Error fetching and processing vehicle data',
        error: error.message,
        details: error.response?.data 
      })
    };
  }
};