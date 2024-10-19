function withCatch(promise) {
  return promise
    .then((data) => {
      return {
        error: undefined,
        data: data,
      };
    })
    .catch((error) => {
      return {
        error: error,
        data: undefined,
      };
    });
}

module.exports = { withCatch };