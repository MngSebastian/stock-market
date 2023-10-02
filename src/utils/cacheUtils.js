export const setCache = (key, data, expirationInSeconds) => {
  const cache = {
    data,
    expires: Date.now() + expirationInSeconds * 1000,
  };
  localStorage.setItem(key, JSON.stringify(cache));
};

export const getCache = (key) => {
  const cache = localStorage.getItem(key);
  if (!cache) return null;
  const parsedCache = JSON.parse(cache);
  if (parsedCache.expires < Date.now()) {
    localStorage.removeItem(key);
    return null;
  }
  return parsedCache.data;
};
