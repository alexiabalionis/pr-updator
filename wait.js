let wait = function (token) {
  return new Promise((resolve) => {
    if (typeof token !== "string") {
      throw new Error("token not a string");
    }
    setTimeout(() => resolve("done!"), token);
  });
};

module.exports = wait;
