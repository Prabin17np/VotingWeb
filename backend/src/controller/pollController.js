const Poll = require("../model/pollSchema");

const create = async (req, res) => {
  try {
    const {title, startdate, enddate, totalvote, status } = req.body;

   
    

      // Check if user already exists
      const existingPoll = await Poll.findOne({ where: { title } });
      if (existingPoll) {
        return res.status(400).send({ message: "Poll already exists with this title." });
      }

  // Create the new user
  const poll = await Poll.create({
    title,
    pollId,
    startdate,
    enddate,
    totalvote, 
    status: status || 'draft', 
  });

     res.status(201).send({ data: poll, message: "Successfully created poll" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create poll" });
  }
};

//Delete a user by ID

const deletePoll = async (req, res) => {
  try {
    const pollId = req.params.pollId;

//Find the user by ID and delete
    const result = await poll.destroy({
      where: { id: pollId },//Use 'id' if it's the primary key in your model
    });

    if (result === 0) {
      return res.status(404).send({ message: "Poll not found" });
    }

    res.status(200).send({ message: "Poll deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to delete poll" });
  }
};

//Get all users

const getAllPoll = async (req, res) => {
  try {
    const poll = await Poll.findAll(
     
    );

    if (poll.length === 0) {
      return res.status(404).send({ message: "No poll found" });
    }

    res.status(200).send({ data: poll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch poll" });
  }
};

module.exports = { create, deletePoll, getAllPoll };
