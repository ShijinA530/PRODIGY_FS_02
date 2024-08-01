const Person = require('../models/person')
const mongoose = require('mongoose')

// get all data
module.exports.getInfos = async (req, res) => {
    const infos = await Person.find().sort({createdAt: -1 })

    res.status(200).json(infos)
}

// create new data
module.exports.createInfo = async (req, res) => {
    const { name, phone, email, hobbies } = req.body

    try {
        const info = await Person.create({ name, phone, email, hobbies })
        res.status(200).json(info)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a data
module.exports.deleteInfo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    try{
        const info = await Person.findOneAndDelete({_id: id})
        res.status(200).json(info)
    } catch(err){
        res.status(400).json({ error: 'No such person'})
    }
}

// update a data
module.exports.updateInfo = async (req, res) => {
    const { id } =req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const info = await Person.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!info) {
        return res.status(400).json({error: 'No such person'})
    }

    res.status(200).json(info)
}