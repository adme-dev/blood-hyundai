const axios = require("axios");
exports.handler = async (event, context) => {

    const payload = JSON.parse(event.body);
    const id = payload.id;

    const axios = require("axios");
    let response, error;
    await axios
        .get(`https://www.volkswagen.com.au/app/locals/get-onehub-offer-details?dealer=30024&version=155&model_code=${id}`)
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
