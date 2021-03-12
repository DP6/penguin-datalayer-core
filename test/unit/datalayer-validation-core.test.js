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
const sinon = require('sinon');

const core = require('./../../datalayer-validation-core');

describe('datalayer-validation-core', () => {
  describe('#validate()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(core.validate);
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
