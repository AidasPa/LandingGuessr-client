const fsuipc = require("fsuipc");
const logger = require("../services/logger.js");
const obj = new fsuipc.FSUIPC();

module.exports = function (callback) {
  obj
    .open()
    .then((obj) => {
      obj.add("onGround", 0x0366, fsuipc.Type.Int16);
      obj.add("vSpeed", 0x030c, fsuipc.Type.Int32);
      return obj.process();
    })
    .then((result) => {
      callback(result);
      return obj.close();
    })
    .catch((err) => {
      //   logger.error(err);
      return obj.close();
    });
};
