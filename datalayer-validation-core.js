const schemaParser = require('./schema-parser');
const Ajv = require('ajv');
const debugging = process.env.PENGUIN_DEBUGGING;
let fullValidation = [];
let objTreated;
let itemTreated;
let partialError = { occurrences: 0, trace: '' };

const ajv = new Ajv({
  schemaId: 'auto',
  allErrors: true,
  verbose: true,
  ownProperties: true,
});

/**
 *
 * @param {*} status
 * @param {*} message
 * @param {*} dlObject
 * @param {*} objectName
 * @param {*} keyName
 */
function validationResult(status, message, dlObject, objectName, keyName) {
  trace(`${status}, ${message}, ${dlObject}, ${objectName}, ${keyName}`);
  fullValidation.push({
    status: status,
    message: message,
    dataLayerObject: dlObject,
    objectName: objectName,
    keyName: keyName,
    partialError: partialError,
  });
}

/**
 *
 * @param {*} schemaItem
 * @param {*} dataLayer
 */
function checkValidEvent(schemaItem, dataLayer) {
  for (let index = 0; index < schemaItem.length; index++) {
    trace('schema: ' + JSON.stringify(schemaItem[index], null, 2));
    trace('datalayer: ' + JSON.stringify(dataLayer, null, 2));
    let valid = ajv.validate(schemaItem[index], dataLayer);
    if (valid) {
      validationResult('OK', 'Validated Successfully', JSON.stringify(dataLayer, null, 2));
      schemaItem.splice(index, 1);
      return true;
    }
  }
}

/**
 *
 * @param {*} shadowSchema
 * @param {*} errorMessage
 * @param {*} dataLayer
 * @param {*} schemaIndex
 * @param {*} schemaArray
 * @param {*} dlObj
 */
function revalidateSchema(shadowSchema, errorMessage, dataLayer, schemaIndex, schemaArray, dlObj) {
  let tempObj = JSON.parse(JSON.stringify(dataLayer));
  let innerSchema = JSON.parse(JSON.stringify(shadowSchema));
  let verify_required = Object.keys(innerSchema).indexOf('required');

  if (verify_required == -1) {
    let found = innerSchema.contains.required.indexOf(errorMessage.params.missingProperty);

    if (found > -1) {
      dlObjProperty = errorMessage.params.missingProperty;

      innerSchema.contains.required = innerSchema.contains.required.filter((keyword) => keyword === dlObjProperty);

      for (prop in innerSchema.contains.properties) {
        if (prop !== dlObjProperty) {
          delete innerSchema.contains.properties[prop];
        }
      }

      let isInnerSchemaEmpty =
        Object.entries(innerSchema.contains.properties).length === 0 && dataLayer.constructor === Object;

      if (
        innerSchema.contains.required.length > 0 &&
        !isInnerSchemaEmpty &&
        Object.keys(innerSchema.contains.properties)[0] !== 'event'
      ) {
        validationResult(
          'ERROR',
          `Hit sent without the following property: ${errorMessage.params.missingProperty}`,
          JSON.stringify(dlObj, null, 2),
          '',
          errorMessage.params.missingProperty
        );
        try {
          let schemaItemKeys = Object.keys(schemaArray[schemaIndex].properties);
          if (errorMessage.dataPath.indexOf(schemaItemKeys[1]) > -1) {
            if (errorMessage.dataPath.indexOf('[0]') > -1) {
              schemaArray.splice(schemaIndex, 1);
              objTreated = true;
            }
          }
        } catch (e) {
          if (schemaArray[schemaIndex] == undefined) {
            partialError.occurrences++;
            partialError.trace = e;
            trace(e);
          } else {
            trace('Objeto ' + errorMessage.dataPath + ' já teve seu erro tratado!!');
          }
        }
      }
    } else {
      for (prop in innerSchema.properties) {
        if (
          tempObj[prop] &&
          typeof tempObj[prop] !== 'string' &&
          typeof tempObj[prop] !== 'number' &&
          typeof tempObj[prop] !== 'array'
        ) {
          let schemaProps = innerSchema.properties[prop];
          revalidateSchema(schemaProps, errorMessage, tempObj[prop], schemaIndex, schemaArray, dlObj);
        }
      }
    }
  } else {
    let found = innerSchema.required.indexOf(errorMessage.params.missingProperty);

    if (found > -1) {
      //e caso o valor seja encontrado
      if (Object.keys(tempObj).length > 1) {
        dlObjProperty = Object.keys(tempObj)[1];
      } else {
        dlObjProperty = Object.keys(tempObj)[0];
      }
      innerSchema.required = innerSchema.required.filter((keyword) => keyword === dlObjProperty);

      for (prop in innerSchema.properties) {
        if (prop !== dlObjProperty) {
          delete innerSchema.properties[prop];
        }
      }
      let isInnerSchemaEmpty = Object.entries(innerSchema.properties).length === 0 && dataLayer.constructor === Object;

      if (
        innerSchema.required.length > 0 &&
        !isInnerSchemaEmpty &&
        Object.keys(innerSchema.properties)[0] !== 'event'
      ) {
        validationResult(
          'ERROR',
          `Hit "${errorMessage.dataPath}" sent without the following property: ${errorMessage.params.missingProperty}`,
          JSON.stringify(dlObj, null, 2),
          errorMessage.dataPath,
          errorMessage.params.missingProperty
        );
        try {
          let schemaItemKeys = Object.keys(schemaArray[schemaIndex].properties);
          if (errorMessage.dataPath.indexOf(schemaItemKeys[1]) > -1) {
            schemaArray.splice(schemaIndex, 1);
            objTreated = true;
          }
        } catch (e) {
          if (schemaArray[schemaIndex] == undefined) {
            partialError.occurrences++;
            partialError.trace = e;
            trace(e);
          } else {
            trace('Objeto ' + errorMessage.dataPath + ' já teve seu erro tratado!!');
          }
        }
      }
    } else {
      for (prop in innerSchema.properties) {
        if (
          tempObj[prop] &&
          typeof tempObj[prop] !== 'string' &&
          typeof tempObj[prop] !== 'number' &&
          typeof tempObj[prop] !== 'array'
        ) {
          let schemaProps = innerSchema.properties[prop];
          revalidateSchema(schemaProps, errorMessage, tempObj[prop], schemaIndex, schemaArray, dlObj);
        }
      }
    }
  }
}

/**
 *
 * @param {*} schemaItem
 * @param {*} dataLayer
 */
function checkMissingProperty(schemaItem, dataLayer) {
  schemaItem.forEach((item, index, array) => {
    let valid = ajv.validate(item, dataLayer);
    let errors = ajv.errors;

    trace(`retorno ajv ${JSON.stringify(array)}`);
    if (!valid && !objTreated) {
      errors
        .filter((error) => error.schema.constructor === Object && error.keyword === 'required')
        .map((eachError) => {
          let errorMessage = JSON.parse(JSON.stringify(eachError));
          let shadowSchema = JSON.parse(JSON.stringify(item));
          let isErrorDataEmpty =
            Object.entries(errorMessage.data).length === 0 && errorMessage.data.constructor === Object;

          if (isErrorDataEmpty) {
            validationResult(
              'ERROR',
              `Hit sent without the following property: ${errorMessage.params.missingProperty}`,
              JSON.stringify(dataLayer, null, 2),
              errorMessage.dataPath,
              errorMessage.params.missingProperty
            );
          } else {
            revalidateSchema(shadowSchema, errorMessage, dataLayer, index, array, dataLayer);
          }
        });
    }
  });
}

/**
 *
 * @param {*} schemaItem
 * @param {*} dataLayer
 */
function checkErrorsPerSchema(schemaItem, dataLayer) {
  itemTreated = false;
  schemaItem.forEach((item, index) => {
    let valid = ajv.validate(item, dataLayer);
    let errors = ajv.errors;

    if (itemTreated) return;

    if (!valid && item.required[1] == Object.keys(dataLayer)[1]) {
      errors
        .filter((error) => {
          if (error.keyword == 'enum' || error.keyword == 'pattern' || error.keyword == 'type') return error;
        })
        .map((eachError) => {
          switch (eachError.keyword) {
            case 'pattern':
              validationResult(
                'WARNING',
                `"${eachError.dataPath.replace(/^\./g, '')}" ${eachError.message}, but Hit send: "${eachError.data}"`,
                JSON.stringify(dataLayer, null, 2),
                eachError.dataPath,
                eachError.data
              );
              break;

            case 'enum':
              validationResult(
                'WARNING',
                `"${eachError.dataPath.replace(/^\./g, '')}" ${eachError.message}: "${
                  eachError.schema.length > 1 ? eachError.schema.join(', ') : eachError.schema[0]
                }", but Hit send: "${eachError.data}"`,
                JSON.stringify(dataLayer, null, 2),
                eachError.dataPath,
                eachError.data
              );
              break;

            case 'type':
              validationResult(
                'WARNING',
                `"${eachError.dataPath.replace(/^\./g, '')}" ${eachError.message}"`,
                JSON.stringify(dataLayer, null, 2),
                eachError.dataPath,
                eachError.message
              );
              break;

            default:
              break;
          }
        });
      schemaItem.splice(index, 1);
      itemTreated = true;
    }
  });
}

/**
 *
 * @param {*} schemaItem
 * @param {*} dataLayer
 */
function checkMissingEvents(schemaItem, dataLayer) {
  let missingEvents = schemaParser.parseToDataLayer(schemaItem);
  missingEvents.map((event) => {
    validationResult('ERROR', `Hit not validated or missed during test`, JSON.stringify(event, null, 2));
  });
}

/**
 * Valida as chaves da camada de dados com base no schema informado
 * @param {object} schema Json com as regras de validação da camada
 * @param {object} dataLayer Json com as chaves da camada de dados
 * @param {*} callback Função que será executada após o sucesso da validação, como parâmetro um array com o status das validações
 */
let validate = (schema, dataLayer, callback) => {
  fullValidation = [];
  let schemaItem = schema.array.items;
  let isSchemaEmpty = schemaItem.length === 0;
  let isObjEmpty = Object.entries(dataLayer).length === 0 && dataLayer.constructor === Object;
  objTreated = false;
  itemTreated = false;

  if (isSchemaEmpty) {
    validationResult('ERROR', `No more items to validate`, JSON.stringify(dataLayer));
  } else if (!checkValidEvent(schemaItem, dataLayer) && !isObjEmpty) {
    checkMissingProperty(schemaItem, dataLayer);
    if (!objTreated) {
      checkErrorsPerSchema(schemaItem, dataLayer);
    }
  } else if (isObjEmpty) {
    checkMissingEvents(schemaItem, dataLayer);
  }

  callback(fullValidation);
  return fullValidation;
};

/**
 * Enviado o log para o stdout, se somente se, a variável debugging = true
 * @param {Object} log Que será apresentado no stdout
 */
function trace(log) {
  if (debugging === 'true') {
    console.log(log);
  }
}

module.exports = {
  validate,
  validationResult,
  checkMissingEvents,
  checkErrorsPerSchema,
  checkValidEvent,
  checkMissingProperty,
  revalidateSchema,
  trace,
};
