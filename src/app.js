const express = require('express');
const cacaoTrybe = require('./cacaoTrybe');

const app = express();

app.use(express.json());

app.get('/chocolates/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const chocolates = await cacaoTrybe.getChocolatesByBrandId(Number(brandId));

  res
    .status(200)
    .json({
      chocolates,
    });
});

app.get('/chocolates/search', async (req, res) => {
  const { name } = req.query;
  const searchedChocolates = await cacaoTrybe.searchByQuery(name);

  if (searchedChocolates.length === 0) {
    return res
      .status(404)
      .json({
        searchedChocolates,
      });
  }

  res
    .status(200)
    .json({
      searchedChocolates,
    });
});

app.get('/chocolates/total', async (_req, res) => {
  const totalChocolates = await cacaoTrybe.sumChocolates();
  
  res
    .status(200)
    .json({
      totalChocolates,
    });
});

app.get('/chocolates/:id', async (req, res) => {
  const { id } = req.params;  
  const chocolate = await cacaoTrybe.getChocolateById(Number(id));

  res
    .status(200)
    .json({
      chocolate,
    });
});

app.get('/chocolates', async (_req, res) => {
  const chocolates = await cacaoTrybe.getAllChocolates();

  res
    .status(200)
    .json({
      chocolates,
    });
});

module.exports = app;