const colors = require("colors");
module.exports = {
    info(msg) {
        console.log("[info] " + msg);
    },
    debug(msg) {
        console.log(colors.cyan("[debug] " + msg));
    },
    error(msg) {
        console.log(colors.red("[error] " + msg))
    }, 
    warn(msg) {
        console.log(colors.yellow("[warn] " + msg));
    },
    event(msg) {
        console.log(colors.brightMagenta("[event] " + msg))
    }
}