const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

let core;
const schemaEcommerce = JSON.parse(fs.readFileSync('test/unit/schema-ecommerce.json').toString());
const mockDatalayerEcommerce = JSON.parse(fs.readFileSync('test/unit/mock-datalayer-ecommerce.json').toString());
const schemaGlobal = JSON.parse(fs.readFileSync('test/unit/schema-global.json').toString());
const mockDatalayerGlobal = JSON.parse(fs.readFileSync('test/unit/mock-datalayer-global.json').toString());

