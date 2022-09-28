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

const writeToCacaoTrybeFile = async (newFile) => {
  try {
    const path = '/files/cacaoTrybeFile.json';
    await fs.writeFile(join(__dirname, path), JSON.stringify(newFile));
  } catch (err) {
    console.log(err);
  }
};

const updateChocolate = async (id, { name, brandId }) => {
  const cacaoTrybe = await readCacaoTrybeFile();  
  let updatedChocolate;
  for (let i = 0; i < cacaoTrybe.chocolates.length; i += 1) {
    const { id: chocolateId } = cacaoTrybe.chocolates[i]; 
    if (Number(chocolateId) === id) {
      cacaoTrybe.chocolates[i].name = name;
      cacaoTrybe.chocolates[i].brandId = brandId;

      updatedChocolate = cacaoTrybe.chocolates[i];
    }
  }
  await writeToCacaoTrybeFile(cacaoTrybe);
  return updatedChocolate;
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
  updateChocolate,
};