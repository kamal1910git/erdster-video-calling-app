String.prototype.format = function () {
    let i = 0;
    const args = arguments;
    return this.replace(/{}/g, function () {
      return args[i] !== "undefined" ? args[i++] : "";
    });
  };
