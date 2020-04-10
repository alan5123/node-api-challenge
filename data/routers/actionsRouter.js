const express = require('express');


const Actions = require('../helpers/actionModel')

const router = express.Router()

// Get list of actions
router.get('/', (req,res) => {
    Actions.get()
    .then(Actions => {
        res.status(200).json(Actions)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The list of Actions could not be retrieved" });
      });
})

//Get actions by id
router
.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
  .then(action => {
    res.status(200).json(action)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: 'Project could not be retrieved'})
  })
      });


//custom middleware
function validateActionId(req, res, next) {
    if (req.params.id) {
      req.project = req.params.id;
        next();
      } else {
        res.status(400).json({ message: "Invalid ID"});
  }
}











module.exports = router;