const express = require("express");
const pollController = require("../controller/pollController");
const router = express.Router();

router.post("/", pollController.create);
router.get("/", pollController.getAllPoll);
router.get("/:id", pollController.getPollById);
router.delete("/:id", pollController.deletePoll);
router.patch("/:id", pollController.updatePollStatus);

module.exports = router;
