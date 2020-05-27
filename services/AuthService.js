const axios = require("axios");
const config = require("../LGSconf.js");
const queryString = require("query-string");

class AuthService {
  async refreshToken(token) {
    return await axios.post(config.endpoint + '/auth/refresh', {}, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  }
  async getToken(email, password) {
    let data;
    try {
      data = await axios.post(
        config.endpoint + "/auth/login",
        queryString.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (err) {
      console.log(err)
    }
    return data;
  }
}

module.exports = new AuthService();
