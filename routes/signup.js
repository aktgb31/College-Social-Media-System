const route = require("express").Router();

route.post("/", function (req, res) {

    res.statusCode(200);
});

module.exports = route;
