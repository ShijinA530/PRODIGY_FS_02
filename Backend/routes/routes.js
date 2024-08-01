const express = require('express')
const dataController = require('../controllers/dataController')
const router = express.Router()

//GET all data
router.get('/', dataController.getInfos)

//POST a single data
router.post('/', dataController.createInfo)

//DELETE a data
router.delete('/:id', dataController.deleteInfo)

//UPDATE a data
router.patch('/:id', dataController.updateInfo)

module.exports = router