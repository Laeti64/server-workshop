const checkAllowedQueryParams = (queryParams, whitelist) => {
  const queryKeys = Object.keys(queryParams);

  const verifiedKeys = queryKeys.map((query) => {
    if (whitelist.includes(query)) {
      return true;
    }
    return false;
  });

  return !verifiedKeys.includes(false);
};

module.exports = checkAllowedQueryParams;
