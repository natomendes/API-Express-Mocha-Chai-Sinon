const fs = require('fs').promises;
const { join } = require('path');

const readCacaoTrybeFile = async () => {
  const path = '/files/cacaoTrybeFile.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (err) {
    console.log(err);
  }
};

const getAllChocolates = async () => {
  const cacaoTrybe = await readCacaoTrybeFile();
  return cacaoTrybe.chocolates;
};

const getChocolateById = async (id) => {
  const cacaoTrybe = await readCacaoTrybeFile();
  return cacaoTrybe.chocolates
    .filter(({ id: chocolateId }) => id === chocolateId);
};

const getChocolatesByBrandId = async (id) => {
  const cacaoTrybe = await readCacaoTrybeFile();
  return cacaoTrybe.chocolates
    .filter(({ brandId }) => id === brandId);
};

const sumChocolates = async () => {
  const cacaoTrybe = await readCacaoTrybeFile();
  return {
    totalChocolates: cacaoTrybe.chocolates.length,
  };
};

const searchByQuery = async (query) => {
  const cacaoTrybe = await readCacaoTrybeFile();
  return cacaoTrybe.chocolates
    .filter(({ name }) => name.includes(query));
};

module.exports = {
  getAllChocolates,
  getChocolateById,
  getChocolatesByBrandId,
  sumChocolates,
  searchByQuery,
};