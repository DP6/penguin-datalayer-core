/**?
describe(): It's used to group, which you can nest as deep;
it(): It's the test case;
before(): It's a hook to run before the first it() or describe();
beforeEach(): It’s a hook to run before each it() or describe();
after(): It’s a hook to run after it() or describe();
afterEach(): It’s a hook to run after each it() or describe(); 
 */

const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

let core;
const schemaEcommerce = JSON.parse(fs.readFileSync('test/unit/schema-ecommerce.json').toString());
const mockDatalayerEcommerce = JSON.parse(fs.readFileSync('test/unit/mock-datalayer-ecommerce.json').toString());
const schemaGlobal = JSON.parse(fs.readFileSync('test/unit/schema-global.json').toString());
const mockDatalayerGlobal = JSON.parse(fs.readFileSync('test/unit/mock-datalayer-global.json').toString());

describe('datalayer-validation-core', () => {
  beforeEach(() => {
    core = require('./../../datalayer-validation-core');
  });
  describe('#validate()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.validate);
    });

    it('Deve validar array de produtos', () => {
      let result = [];
      mockDatalayerEcommerce.forEach((eventoDataLayer) => {
        result = result.concat(core.validate(schemaEcommerce, eventoDataLayer, (i) => {}));
      });
      expect(result).to.be.an('array').that.not.empty;
      expect(result).to.be.an('array').that.have.lengthOf(13);
      expect(result[12].partialError.occurrences).to.be.equal(10);
      expect(result[0].message).to.be.equal('Hit sent without the following property: nomeLojista');
      expect(result[0].status).to.be.equal('ERROR');
    });
    it('Deve validar datalayer com dois eventos de sucesso e um erro', () => {
      let result = [];
      mockDatalayerGlobal.forEach((eventoDataLayer) => {
        result = result.concat(core.validate(schemaGlobal, eventoDataLayer, (i) => {}));
      });

      expect(result).to.be.an('array').that.not.empty;
      expect(result).to.be.an('array').that.have.lengthOf(3);
      expect(result[0].partialError.occurrences).to.be.equal(10);
      expect(result[0].message).to.be.equal('Validated Successfully');
      expect(result[0].status).to.be.equal('OK');
      expect(result[1].message).to.be.equal('Validated Successfully');
      expect(result[1].status).to.be.equal('OK');
      expect(result[2].message).to.be.equal('Hit ".pagina" sent without the following property: navegacao');
      expect(result[2].status).to.be.equal('ERROR');
    });
  });

  describe('#validationResult()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.validationResult);
    });
  });

  describe('#checkErrorsPerSchema()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.checkErrorsPerSchema);
    });
  });

  describe('#checkMissingEvents()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.checkMissingEvents);
    });
  });

  describe('#checkMissingProperty()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.checkMissingProperty);
    });
  });

  describe('#checkValidEvent()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.checkValidEvent);
    });
  });

  describe('#revalidateSchema()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.revalidateSchema);
    });
  });

  describe('#trace()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.trace);
    });
  });
});
