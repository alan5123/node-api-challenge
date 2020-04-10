const express = require('express');


const Projects = require('./helpers/projectModel')

const router = express.Router()


router.get('/', (req,res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The list of projects could not be retrieved" });
      });
})

router
.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
  .then(projects => {
    res.status(200).json(projects)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: 'Project could not be retrieved'})
  })
      });



//custom middleware

function validateProjectId(req, res, next) {
    if (req.params.id) {
      req.project = req.params.id;
        next();
      } else {
        res.status(400).json({ message: "Invalid ID"});
  }
}



module.exports = router;