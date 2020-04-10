const express = require('express');


const Projects = require('./helpers/projectModel')

const router = express.Router()



// Get list of projects
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


//Get projects by id
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


      //Get projects actions
      router
      .get('/:id/actions', validateProjectId, (req, res) =>{
          Projects.getProjectActions(req.params.id)
          .then(projects =>{
              res.status(200).json(projects)
              
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({error: 'Projects actions could not be retrieved'})
        })
      })

      router
      .post('/',(req,res) => {
          Projects.insert(req.body)
          .then(project => {
            res.status(200).json(project)
          })
          .catch(err => {
            res.status(500).json({ message: "Error, could not add project" });
          });
      })

      router
      .delete('/:id', (req, res) => {
          Projects.remove(req.params.id)
          .then(project => {
            res.status(200).json(project)
          })
          .catch(err => {
            res.status(500).json({ message: "Error, could not delete project" });
          });
      })



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