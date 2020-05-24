const util = require("util");
const fs = require("fs");
const merge = require("deepmerge");

module.exports = (() => {
  return {
    async get() {
      const readFile = util.promisify(fs.readFile);
      let data;
      try {
        data = await readFile("store/store.json");
      } catch (err) {
        throw err;
      }
      return JSON.parse(data);
    },
    async set(data) {
      const merged = merge(await this.get(), data);
      fs.writeFile("store/store.json", JSON.stringify(merged), () => {
        return;
      });
    },

    clear() {
      fs.writeFile("store/store.json", "{}", () => {
        return;
      });
    },
  };
})();
