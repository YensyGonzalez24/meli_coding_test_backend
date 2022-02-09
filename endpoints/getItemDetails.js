const axios = require("axios");
const { getItemCondition } = require("../utils/utils");

const getItemDetails = async (itemId, returnItemFullDetail) => {
  const queryURL = process.env.MERCADOLIBRE_API_URL + "/items/" + itemId;
  const descriptionURL =
    process.env.MERCADOLIBRE_API_URL + "/items/" + itemId + "/description";

  try {
    const { data } = await axios.get(queryURL);

    let descriptionData = null;

    if (returnItemFullDetail) {
      const result = await axios.get(descriptionURL);

      descriptionData = result.data;
    }

    return {
      id: itemId,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: data.price,
        decimals: 0,
      },
      picture: data.pictures[0].url,
      condition: getItemCondition(data.condition),
      free_shipping: data.shipping.free_shipping,
      ...(returnItemFullDetail &&
        descriptionData && {
          sold_quantity: data.sold_quantity,
          description: descriptionData.plain_text,
        }),
    };
  } catch (e) {
    console.log(e);
  }
};

module.exports = getItemDetails;
