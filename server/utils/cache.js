const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 7200 });

module.exports.setCache = (data, key) => {
  const cachedData = cache.set(data, key);
  if (cachedData) { console.log(`Cached data: ${key}`); };

  console.log(`Cached data failed: ${key}`);
};

module.exports.getCache = (key) => {
  const cachedData = cache.get(key);
  return cachedData;
};
