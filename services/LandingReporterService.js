const axios = require("axios");
const config = require("../LGSconf.js");
const store = require("./store.js");

class LandingReporterService {
  async report(rate) {
    axios.post(
      config.endpoint + "/boards/me/landing",
      {
        landing_rate: rate,
      },
      {
        headers: {
          Authorization: "Bearer " + (await store.get()).auth.token,
        },
      }
    );
  }
}

module.exports = new LandingReporterService();
