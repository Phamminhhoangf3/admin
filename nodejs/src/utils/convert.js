const { isArray } = require('lodash');
const { ObjectId } = require('mongodb');

export const convertObjectId = (data, fields) => {
  if (!data || !fields?.length) return null;
  const result = { ...data };

  fields.forEach(field => {
    if (isArray(result?.[field]) && result?.[field]?.length) {
      result[field] = result[field].map(item => new ObjectId(item));
    } else if (result?.[field]) {
      result[field] = new ObjectId(result[field]);
    }
  });

  return result;
};
