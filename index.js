const shutstrap = require("./straps/shutstrap.js");

// Bootstrap the application
(async () => {
  const bootstrap = require("./straps/bootstrap.js");
  // do a callback function once done bootstrap completes
  bootstrap(function () {
    const logger = require("./services/logger.js");
    logger.success("Application bootstrapped!");
    const connection = require("./actions/connectToSim.js");
    const LandingReporterService = require("./services/LandingReporterService.js");
    const ClientService = require("./services/ClientService.js");

    let landingRate;
    let checkTimes = 0;

    const simInterval = setInterval(() => {
      connection(async (result) => {
        if (checkTimes < 1 && result.onGround > 0) {
          logger.error("Start the client only when in air! Quitting.");
          shutstrap();
          clearInterval(simInterval);
        } else {
          if (checkTimes < 2) {
            ClientService.connect();
          }
          if (result.onGround > 0) {
            landingRate = result.vSpeed;

            logger.warn("Landed with " + landingRate + " f/min");
            logger.debug("Sending landing rate to the server");

            await LandingReporterService.report(landingRate);
            clearInterval(simInterval);
            shutstrap();
          }
        }
        checkTimes++;
      });
    }, 200);
  });
})();

process.on("exit", function () {
  shutstrap();
});

// catch ctrl+c event and exit normally
process.on("SIGINT", function () {
  shutstrap();
  process.exit(2);
});

//catch uncaught exceptions, trace, then exit normally
process.on("uncaughtException", function (e) {
  shutstrap();
  console.log(e.stack);
  process.exit(99);
});
