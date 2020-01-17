const express = require("express");

const Project = require("../data/helpers/projectModel.js");
const Action = require("../data/helpers/actionModel.js");

const router = express.Router();
// GET test
router.get("/test", (req, res) => {
  res.send(`
      
        <p>Welcome to the projectRouter API</p>
      `);
});
router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
