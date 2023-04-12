const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 7200 });

exports.setCache = (key, data) => {
  const cachedData = cache.set(key, data);
  if (cachedData) { console.log(`Cached data: ${key}`); } else console.log(`Cached data failed: ${key}`);
};

exports.getCache = (key) => {
  const cachedData = cache.get(key);
  return cachedData;
};
