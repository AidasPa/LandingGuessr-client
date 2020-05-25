const axios = require("axios");
const store = require("./store.js");
const config = require("../LGSconf.js");

class ClientService {
  async connect() {
    axios.post(
      config.endpoint + "/client/connect",
      {},
      {
        headers: {
          Authorization: "Bearer " + (await store.get()).auth.token,
        },
      }
    );
  }
  async disconnect() {
    axios.post(
      config.endpoint + "/client/disconnect",
      {},
      {
        headers: {
          Authorization: "Bearer " + (await store.get()).auth.token,
        },
      }
    );
  }
}

module.exports = new ClientService();
