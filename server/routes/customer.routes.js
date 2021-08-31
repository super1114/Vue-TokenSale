module.exports = app => {
  const tokensale = require("../controllers/tokensale.controller.js");

  app.get("/api/socialShare", tokensale.socialShare);
};
