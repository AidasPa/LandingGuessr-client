const fsuipc = require("fsuipc");
const logger = require("../services/logger.js");
const obj = new fsuipc.FSUIPC();

module.exports = function () {
  obj
    .open()
    .then((obj) => {
      console.log(obj.add("clockHour", 0x238, fsuipc.Type.Byte));
      console.log(obj.add("aircraftType", 0x3d00, fsuipc.Type.String, 256));
      console.log(obj.add("lights", 0x0d0c, fsuipc.Type.BitArray, 2));

      return obj.process();
    })
    .then((result) => {
      console.log(JSON.stringify(result));

      return obj.close();
    })
    .catch((err) => {
      logger.error(err);
      return obj.close();
    });
};
