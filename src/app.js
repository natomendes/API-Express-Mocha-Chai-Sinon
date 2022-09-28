const express = require('express');
const cacaoTrybe = require('./cacaoTrybe');

const app = express();

app.use(express.json());

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
      chocolate
    })
})

module.exports = app;