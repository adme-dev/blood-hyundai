const axios = require("axios");
exports.handler = async (event, context) => {
    const axios = require("axios");
    let response, error;
    await axios
        .get('https://www.volkswagen.com.au/app/locals/get-onehub-offers?size=50&offset=0&sort=Price+(Low+-+High)&dealer=30024&version=155&seperator=:')
        .then((res) => {
            response = res.data['data'];
        })
        .catch((error) => {
            response = error
        });

    return {
        statusCode: 200,
        body: JSON.stringify({
            lmbResponse:response,
        }),
    };
};
