const store = require("../services/store.js");
const AuthService = require("../services/AuthService.js");

module.exports = () => {
  // check for credentials
  (async () => {
    const storeObj = await store.get();
    if (storeObj.password === undefined) {
      // only require it if we need it
      const inquirer = require("inquirer");
      // ask for credentials
      inquirer
        .prompt([
          {
            type: "input",
            name: "email",
            message: "Email:",
          },
          {
            type: "password",
            name: "pass",
            message: "Password:",
          },
        ])
        .then(async (answers) => {
          // write the credentials to the file
          // TODO: ask if the user wants to be remembered
          // for now it defaults to true

          try {
            const data = await AuthService.getToken(
              answers.email,
              answers.pass
            );

            store.set({
              auth: {
                email: answers.email,
                password: answers.pass,
                token: data.data.access_token,
              },
            });
          } catch (error) {
            console.log("Unable to login!");
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else when wrong
          }
        });
    }
  })();
};
