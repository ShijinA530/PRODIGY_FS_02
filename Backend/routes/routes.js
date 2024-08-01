const express = require('express')
const personController = require('../controllers/personController')
const router = express.Router()

//GET all data
router.get('/', personController.getPersons)

//POST a single data
router.post('/', personController.createPerson)

//DELETE a data
router.delete('/:id', personController.deletePerson)

//UPDATE a data
router.patch('/:id', personController.updatePerson)

module.exports = router