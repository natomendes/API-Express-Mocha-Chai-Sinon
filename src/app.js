const express = require('express');
const cacaoTrybe = require('./cacaoTrybe');

const app = express();

app.use(express.json());

app.get('/chocolates/total', async (req, res) => {
  const totalChocolates = await cacaoTrybe.sumChocolates();
  
  res
    .status(200)
    .json({
      totalChocolates,
    });
});

app.get('/chocolates', async (req, res) => {
  const chocolates = await cacaoTrybe.getAllChocolates();

  res
    .status(200)
    .json({
      chocolates,
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

app.get('/chocolates/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const chocolates = await cacaoTrybe.getChocolatesByBrandId(Number(brandId));

  res
    .status(200)
    .json({
      chocolates,
    });
});

module.exports = app;