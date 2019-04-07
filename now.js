require = require("esm")(module);
const { createExpressApp } = require("server/index.js");
const app = await createExpressApp();
module.exports = app;
