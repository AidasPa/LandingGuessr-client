// Bootstrap the application
(async () => {
  const bootstrap = require("./straps/bootstrap.js");
  // do a callback function once done bootstrap completes
  bootstrap(function () {
      const logger = require("./services/logger.js");
      logger.debug("Application bootstraped!");
      const connection = require("./actions/connectToSim.js");
      setInterval(() => {
          connection();
      }, 2000);
  });
})();
