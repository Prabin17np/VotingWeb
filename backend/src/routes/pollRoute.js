const express = require("express");
const pollController = require("../controller/pollController");
const router = express.Router();

router.post("/", pollController.create);
router.delete("/:id", pollController.deletePoll);
router.get("/", pollController.getAllPoll);

module.exports = router;
