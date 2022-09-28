const { expect } = require('chai');

describe('GET method on /chocolates route', function () {
  it('Should return a list of all chocolates', async function () {
    response = await getChocolates();
    expect(response.status).to.equal(200);
  });
});