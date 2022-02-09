const axios = require("axios");
const getItemDetails = require("./getItemDetails");

const getSearchItems = async (query) => {
  const queryURL =
    process.env.MERCADOLIBRE_API_URL + "/sites/MLA/search?q=" + query;

  try {
    const { data } = await axios.get(queryURL);

    const selectedResult = data.results.slice(0, 4);

    const items = await Promise.all(
      selectedResult.map((item) => {
        return getItemDetails(item.id, false);
      })
    );

    const queryResult = {
      categories: data.categories || [
        "category one",
        "category two",
        "category three",
      ],
      items,
    };

    return queryResult;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getSearchItems;
