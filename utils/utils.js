const getItemCondition = (condition) => {
  if (condition === "new") {
    return "New";
  }

  if (condition === "used") {
    return "PreOwned";
  }

  return "NotSpecified";
};

module.exports = {
  getItemCondition,
};
