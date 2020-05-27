const shutstrap = require("./straps/shutstrap.js");

// Bootstrap the application
(async () => {
  const bootstrap = require("./straps/bootstrap.js");
  // do a callback function once bootstrap completes
  bootstrap(function () {
    const logger = require("./services/logger.js");
    logger.success("Application bootstrapped!");

    const connection = require("./actions/connectToSim.js");
    const LandingReporterService = require("./services/LandingReporterService.js");
    const ClientService = require("./services/ClientService.js");
    const AuthService = require("./services/AuthService.js");

    async function refreshUserToken() {
      const store = require("./services/store.js");

      const currentToken = await store.get();
      try {
        const data = await AuthService.refreshToken(currentToken.auth.token);
        store.set({
          auth: {
            token: data.data.access_token,
          },
        });
        logger.debug("Token refreshed successfully!");
      } catch (error) {
        logger.error(
          "Something went horribly wrong while trying to authenticate the user!"
        );
        console.log(error);
      }
    }

    refreshUserToken();
    const authInterval = setInterval(() => {
      refreshUserToken();
      // every 59 minutes (60 - 1 to be sure)
    }, 59 * 60000);

    let landingRate;
    let checkTimes = 0;

    logger.info("Attempting connection to simulator (every 200ms)");
    const simInterval = setInterval(() => {
      connection(async (result) => {
        if (checkTimes < 1 && result.onGround > 0) {
          logger.error("Start the client only when in air! Quitting.");
          shutstrap();
          clearInterval(simInterval);
          clearInterval(authInterval);
        } else {
          if (checkTimes < 2) {
            ClientService.connect();
            logger.success("Connected to simulator!");
          }
          if (result.onGround > 0) {
            landingRate = result.vSpeed;

            logger.warn("Landed with " + landingRate + " f/min");
            logger.debug("Sending landing rate to the server");

            await LandingReporterService.report(landingRate);
            clearInterval(simInterval);
            clearInterval(authInterval);

            shutstrap();
            logger.info("App quitting in 15 seconds...");
            setTimeout(() => {
              logger.info("bye bye!");
            }, 15000);
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
