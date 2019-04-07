require = require("esm")(module);
const { createExpressApp } = require("./server/index.js");
const app = createExpressApp();
module.exports = app;
