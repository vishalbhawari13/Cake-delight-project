const axios = require("axios");

const getCakeById = async (cakeId) => {
  const response = await axios.get(
    `${process.env.CATALOG_SERVICE_URL}/api/catalog/cakes/${cakeId}`
  );

  return response.data.data;
};

module.exports = {
  getCakeById,
};