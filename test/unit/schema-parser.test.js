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

const parse = require('./../../schema-parser');

describe('schema-parser', () => {
  describe('#parseEvent()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(parse.parseEvent);
    });
  });

  describe('#parseToDataLayer()', () => {
    it('Deve ser uma function', () => {
      assert.isFunction(parse.parseToDataLayer);
    });
  });
});
