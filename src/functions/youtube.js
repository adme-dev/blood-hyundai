const axios = require("axios");
exports.handler = async (event, context) => {
    const axios = require("axios");
    let response, error;
    await axios
        .get('https://portal.driveagent.io/files/shared/oem/volkswagen/youtube.json')
        .then((res) => {
            response = res.data;
        })
        .catch((error) => {
            response = error
        });

    return {
        statusCode: 200,
        body: JSON.stringify({
            response
        }),
    };
};
