const express = require("express");

const Project = require("../data/helpers/projectModel.js");
const Action = require("../data/helpers/actionModel.js");

const router = express.Router();
// GET test ✅
router.get("/test", (req, res) => {
  res.send(`
      
        <p>Welcome to the projectRouter API</p>
      `);
});
//  JUST A GET REQUEST RETURNS NULL
//Get User by id ✅
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});
//POST new project✅
router.post("/", (req, res) => {
  Project.insert(req.body).then(pj => {
    res.status(201).json(pj);
  });
});
// POST new action with id ✅
router.post("/:id/action", validateProjectId, (req, res) => {
  Action.insert(req.body)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: "The action with the specified ID does not exist." //make sure 404 is working
        });
      } else {
        res.status(201).json(action);
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the action to the database"
      });
    });
});
// Delete project ✅
router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.project.id)
    .then(() => {
      res
        .status(200)
        .json({ message: `project with id ${req.project.id} was removed` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "the project could not be removed"
      });
    });
});

// Put updates projects ✅
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  const id = req.project.id;
  const projects = req.body;

  Project.update(id, projects)
    .then(pj => {
      if (!pj) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      } else {
        res.status(200).json({
          message: "The project information was updated successfully"
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The project information could not be modified."
      });
    });
});

// custom middleware

//make sure the Id exists middleware ✅
function validateProjectId(req, res, next) {
  Project.get(req.params.id)
    .then(pj => {
      if (pj) {
        req.project = pj;
        next();
      } else {
        res.status(500).json({ message: "No project with this ID exists" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "need to give an ID" });
    });
}

// Validates the put request to make the data is there ✅
function validateProject(req, res, next) {
  if (!req.body.name && !req.body.description) {
    res
      .status(400)
      .json({ message: "Missing project name or description data" });
  } else {
    next();
  }
}
module.exports = router;
