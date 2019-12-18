// Require necessary NPM Packages
const express = require('express');

// Require Mongoose Model for Program
const Program = require('../models/program');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/Programs
 * Description: Get All Programs
 */
router.get('/api/programs', (req, res) => {
  Program.find()
  // Return all Programs as an Array
  .then((programs) => {
    res.status(200).json({ programs: programs });
  })
  // Catch any errors that might occur
  .catch(console.error())
});

/**
* Action:       SHOW
* Method:       GET
* URI:          /api/programs/5d664b8b68b4f5092aba18e9
* Description:  Get An Program by Program ID
*/
router.get('/api/programs/:id', function(req, res) {
  Program.findById(req.params.id)
    .then(function(program) {
      if(program) {
        res.status(200).json({ program: program });
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    // Catch any errors that might occur
    .catch(next)
});

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/programs
 * Description: Create a new Program
*/
router.post('/api/programs', (req, res) => {
  Program.create(req.body.program)
  // On a successful `create` action, respond with 201
  // HTTP status and the content of the new program.
  .then((newProgram) => {
    res.status(201).json({ program: newProgram });
  })
  // Catch any errors that might occur
  .catch(console.error())
});

/**
 * Action:      UPDATE
 * Method:      PATCH
* URI:          /api/programs/5d664b8b68b4f5092aba18e9
* Description:  Update An Program by Program ID
 */
router.patch('/api/programs/:id', function(req, res) {
  Program.findById(req.params.id)
    .then(function(program) {
      if(program) {
        // Pass the result of Mongoose's `.update` method to the next `.then`
        return program.update(req.body.program);
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    .then(function() {
      // If the update succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
   // .catch(next)
});

/**
 * Action:      DESTROY
 * Method:      DELETE
* URI:          /api/programs/5d664b8b68b4f5092aba18e9
* Description: Delete An Program by Program ID
 */
router.delete('/api/programs/:id', (req, res) => {
  Program.findById(req.params.id)
    .then((program) => {
      if(program) {
        // Pass the result of Mongoose's `.delete` method to the next `.then`
        return program.remove();
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    .then(() => {
      // If the deletion succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
    // .catch(next)
});


// Export the Router so we can use it in the server.js file
module.exports = router;