module.exports = function (output, handler) {
  try {
    if (handler instanceof RegExp) {
      return handler.test(output);
    } else if (typeof handler == "string") {
      return (output == handler);
    } else if (typeof handler == "function") {
      return handler(output);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};