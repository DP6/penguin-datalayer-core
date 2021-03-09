/**
 *
 * @param {*} event
 */
function parseEvent(event) {
  let properties = event.properties;
  let keys = Object.keys(properties);
  let obj = {};

  keys.forEach((key) => {
    let thisKey = properties[key];
    let value;

    if (thisKey.type == 'object') {
      value = parseEvent(thisKey);
    } else {
      if (thisKey.pattern != undefined) {
        value = 'N/A';
      } else {
        value = thisKey.enum ? thisKey.enum[0] : '';
      }
    }
    obj[key] = value;
  });

  return obj;
}

/**
 *
 * @param {*} items
 */
function parseToDataLayer(items) {
  return items.map((event) => parseEvent(event));
}

module.exports = {
  parseToDataLayer,
  parseEvent,
};
