const express = require("express");

const router = express.Router();
const discordController = require("../controller/discordController");

router.post("/mute", discordController.mute);

module.exports = router;