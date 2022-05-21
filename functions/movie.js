const axios = require("axios");
const { OMDB_API_KEY, OMDB_API_END_POINT } = process.env;

exports.handler = async function (e) {
  const params = JSON.parse(e.body);

  try {
    const { data } = await axios.get(
      `${OMDB_API_END_POINT}?apikey=${OMDB_API_KEY}`,
      { params }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message,
    };
  }
};
