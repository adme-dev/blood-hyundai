//const API_URL = process.env.WORDPRESS_API_URL
const API_URL = 'https://hyundai-2020.adus.com.au/graphql';

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if ('EetBkyiBhepX:MhInrmRQ!?qnj>$sysHr&7:9{Sn0~bgGNh?hgGR)uFfRC') {
    headers[
      'Authorization'
    ] = 'Bearer EetBkyiBhepX:MhInrmRQ!?qnj>$sysHr&7:9{Sn0~bgGNh?hgGR)uFfRC'
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}


async function getPrimaryVehicles() {
  const data = fetchAPI(`
    query NewQuery {
      allVehicles {
        edges {
          node {
            id
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            modelCat {
              edges {
                node {
                  slug
                  name
                }
              }
            }
            popularCat {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            vehicleCat {
              nodes {
                slug
                name
              }
            }
          }
        }
      }
    }
  `);
  return data;
}

const PrimaryVehiclesService = {
  getPrimaryVehicles,
};
export default PrimaryVehiclesService;



const user = {
  email: 'example@driveagent.io',
  password: '123456',
  name: 'Paul'
}

export const checkIfUserExistsInDB = email => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === user.email) {
          resolve(true)
        } else {
          reject('user not found')
        }
      }, 1000)
  })
}

export const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log(email === user.email && password === user.password)
    setTimeout(() => {
      if (email === user.email && password === user.password) {
        resolve({
          email: user.email,
          name: user.name
        })
      } else {
        reject('supplied credentials do not match any user')
      }
    }, 1000)
  })
}

export const postFormToDB = (form) => {
  return new Promise((resolve,) => {
    setTimeout(() => resolve(form), 1000)
  })
}
