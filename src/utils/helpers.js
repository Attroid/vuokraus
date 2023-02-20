export function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === [] ||
    value === NaN ||
    (isObject(value) && Object.keys(value) === 0)
  );
}

export function assertObject(obj) {
  if (isObject(obj) === false) {
    throw new TypeError('The given argument was not an object');
  }
}

export function removeEmpty(obj) {
  assertObject(obj);

  return Object.keys(obj).reduce((newObject, key) => {
    if (isEmpty(obj[key]) === false) {
      return Object.assign(newObject, { [key]: obj[key] });
    }

    return newObject;
  }, {});
}

export function formatIsoDateString(IsoDateString) {
  const [date, time] = IsoDateString.split('T');
  const parsedDate = date.split('-').reverse().map(Number).join('.');
  const [hours, minutes] = time.split(':').slice(0, 2);

  return `${parsedDate} ${Number(hours)}:${minutes}`;
}

export function cloneDeep(param) {
  return JSON.parse(JSON.stringify(param));
}

export default {
  isObject,
  isEmpty,
  assertObject,
  removeEmpty,
  formatIsoDateString,
  cloneDeep,
};
