const ClientService = require("../services/ClientService.js");

module.exports = () => {
  ClientService.disconnect();
};
