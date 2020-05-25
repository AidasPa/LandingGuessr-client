// Bootstrap the application
(async () => {
  const bootstrap = require("./straps/bootstrap.js");
  // do a callback function once done bootstrap completes
  bootstrap(function () {
      const logger = require("./services/logger.js");
      logger.success("Application bootstrapped!");
      const connection = require("./actions/connectToSim.js");
      setInterval(() => {
          logger.debug("Attempting connection to sim!");
          connection();
      }, 2000);
  });
})();
