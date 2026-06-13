const express = require("express");

const router = express.Router();
const chromeController = require("../controller/chromeController");

router.post("/open", chromeController.open);

module.exports = router;