const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { getItemDetails, getSearchItems } = require("./endpoints");

const app = express();

const port = 4000;

app.route("/api/items").get(async (req, res) => {
  const query = req.query.q;

  const data = await getSearchItems(query);

  res.send({
    author: { name: "Yensy", lastName: "Gonzalez" },
    ...data,
  });
});

app.route("/api/items/:id").get(async (req, res) => {
  const itemId = req.params.id;

  const data = await getItemDetails(itemId, true);

  res.send({
    author: { name: "Yensy", lastName: "Gonzalez" },
    item: data,
  });
});

app.listen(port, () =>
  console.log(`Coding Test API listening on port:${port}`)
);
