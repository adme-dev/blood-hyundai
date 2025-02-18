// Environment variables configuration
const THEME_FOLDER = process.env.THEME_FOLDER || '';

const axios = require('axios');

// Define cache variables in the global scope
let cachedReviews = null;
let cacheTimestamp = null;

// Define cache duration (e.g., 5 minutes)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

exports.handler = async (event, context) => {
  const currentTime = Date.now();

  // Check if cached data exists and is still valid
  if (cachedReviews && (currentTime - cacheTimestamp) < CACHE_DURATION) {
    console.log('Returning cached reviews');
    return {
      statusCode: 200,
      body: JSON.stringify(cachedReviews),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // Define the URLs to fetch from
  const urls = [
    process.env.VUE_APP_DA_DATA_CDN_URL + `/reviews/hours.json`
  ];

  try {
    const unInterceptedAxios = axios.create();
    // Use Promise.all to fetch data from all URLs concurrently
    const responses = await Promise.all(
      urls.map(url => unInterceptedAxios.get(url))
    );
    
    // Combine all reviews into a single array with dealership names
    const allReviews = responses.reduce((acc, response) => {
      if (response.data && response.data.result) {
        const dealershipName = response.data.result.name || '';
        const reviews = response.data.result.reviews || [];
        const dealershipReviews = reviews.map(review => ({
          dealership: dealershipName,
          author_name: review.author_name,
          rating: review.rating,
          text: review.text,
          time: review.time,
          relative_time_description: review.relative_time_description,
          profile_photo_url: review.profile_photo_url
        }));
        return [...acc, ...dealershipReviews];
      }
      return acc;
    }, []);

    // Shuffle the combined reviews
    const shuffledReviews = shuffleArray(allReviews);

    // Update cache
    cachedReviews = shuffledReviews;
    cacheTimestamp = currentTime;

    return {
      statusCode: 200,
      body: JSON.stringify(shuffledReviews),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
