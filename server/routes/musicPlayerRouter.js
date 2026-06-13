const express = require("express");

const router = express.Router();
const musicPlayerController = require("../controller/musicPlayerController");

router.post("/musicHandler", musicPlayerController.musicPlayerHandler);

module.exports = router;