const express = require("express");

const Project = require("../data/helpers/projectModel.js");
const Action = require("../data/helpers/actionModel.js");

const router = express.Router();
// GET test✅
router.get("/test", (req, res) => {
  res.send(`
      
        <p>Welcome to the actionRouter API</p>
      `);
});
// Get retrieving a list of actions for a project ✅
router.get("/:id", validateactionId, (req, res) => {
  const id = req.action.id;
  Project.getProjectActions(id)
    .then(action => {
      if (action[0]) {
        res.status(200).json(action);
      } else if (!action[0]) {
        res.status(404).json({ message: "No project with this ID exists" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "the action info could not be retrieved"
      });
    });
});
// Delete action ✅
router.delete("/:id", (req, res) => {
  Action.remove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: `action with id ${req.params.id} was removed` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "the action could not be removed"
      });
    });
});
// Put updates actions ✅
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const action = req.body;

  Action.update(id, action)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      } else {
        res.status(200).json({
          message: "The action information was updated successfully"
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The action information could not be modified."
      });
    });
});

// custom middleware

//make sure the Id exists middleware ✅
function validateactionId(req, res, next) {
  Action.get(req.params.id)
    .then(pj => {
      req.action = pj;
      next();
    })
    .catch(error => {
      res.status(500).json({ message: "need to give an ID" });
    });
}
module.exports = router;
