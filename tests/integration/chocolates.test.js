const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const fs = require('fs');

const mockFile = require('../mocks/mockCacaoTrybeFIle');

chai.use(chaiHttp);

describe('Testing cacaoTrybe API', function () {
  beforeEach(function () {
    sinon.stub(fs.promises, 'readFile')
    .resolves(mockFile);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('GET method on /chocolates route', function () {
    it('Should return a list of all chocolates', async function () {
      const output = [
        { id: 1, name: 'Mint Intense', brandId: 1 },
        { id: 2, name: 'White Coconut', brandId: 1 },
        { id: 3, name: 'Mon Chéri', brandId: 2 },
        { id: 4, name: 'Mounds', brandId: 3 },
      ];
  
      response = await chai
        .request(app)
        .get('/chocolates');
      
      expect(response.status).to.equal(200);
      expect(response.body.chocolates).to.deep.equal(output);
    });
  });

  describe('GET method on /chocolates/:id', function () {
    it('Should return one chocolate matching de chocolate id passed through params', async function () {
      const output = [{
        id: 4,
        name: 'Mounds',
        brandId: 3
      }];

      response = await chai
        .request(app)
        .get('/chocolates/4');

      expect(response.status).to.equal(200);
      expect(response.body.chocolate).to.deep.equal(output);
    });
  });

  describe('GET method on /chocolates/brand/:brandId', function () {
    it('Should return one chocolate matching de brand id passed through params', async function () {
      const output = [
        {
            "id": 1,
            "name": "Mint Intense",
            "brandId": 1
        },
        {
            "id": 2,
            "name": "White Coconut",
            "brandId": 1
        }
      ]

      response = await chai
        .request(app)
        .get('/chocolates/brand/1');

      expect(response.status).to.equal(200);
      expect(response.body.chocolate).to.deep.equal(output);
    });
  });

})
