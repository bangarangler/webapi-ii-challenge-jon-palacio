const express = require("express");
const db = require("./data/db.js");
const router = express.Router();

router.post("/", (req, res) => {
  const postsInfo = req.body;
  console.log("posts Info: ", postsInfo);
  db.insert(postsInfo)
    .then(post => {
      if (!postsInfo.title || !postsInfo.contents) {
        return res.status(400).json({
          errorMessage: "Please Provide Title and Content for the Post"
        });
      } else {
        db.insert(postsInfo).then(post => {
          res.status(201).json(post);
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(post => {
      if (post) {
        res.status(204).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.update(id, req.body)
    .then(post => {
      if (post) {
        db.findById(id)
          .then(post => {
            res.status(200).json(post);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Yet again something went horribly wrong. It's not you... it's us; apologies."
      });
    });
});

module.exports = router;
