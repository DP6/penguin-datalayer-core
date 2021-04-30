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

let parse;
const schemaGlobal = JSON.parse(fs.readFileSync('test/unit/schema-global.json').toString());
describe('schema-parser', () => {
  beforeEach(() => {
    parse = require('./../../schema-parser');
  });

  describe('#parseEvent()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(parse.parseEvent);
    });
    it('Deve transformar uma regra de validação em um evento da camada de dados', () => {
      let result = parse.parseEvent(schemaGlobal.array.items[0]);

      expect(result).to.be.an('Object').that.not.null;
      expect(result).to.haveOwnProperty('event');
      expect(result.event).to.be.equal('update');
      expect(result.aplicacao.ambiente).to.be.equal('producao');
    });
  });

  describe('#parseToDataLayer()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(parse.parseToDataLayer);
    });
    it('Deve transformar o schema de validação código de modelo da camada de dados', () => {
      let result = [];
      result = result.concat(parse.parseToDataLayer(schemaGlobal.array.items));

      expect(result).to.be.an('array').that.not.empty;
      expect(result).to.be.an('array').that.have.lengthOf(4);
      expect(result[0].event).to.be.equal('update');
      expect(result[3].usuario.idUsuario).to.be.equal('N/A');
      expect(result[0].aplicacao).instanceOf(Object);
    });
  });
});
