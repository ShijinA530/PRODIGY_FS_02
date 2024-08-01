const Person = require('../models/person')
const mongoose = require('mongoose')

// get all data
module.exports.getPersons = async (req, res) => {
    const persons = await Person.find().sort({createdAt: -1 })

    res.status(200).json(persons)
}

// create new data
module.exports.createPerson = async (req, res) => {
    const { name, phone, email, hobbies } = req.body

    try {
        const person = await Person.create({ name, phone, email, hobbies })
        res.status(200).json(person)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a data
module.exports.deletePerson = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    try{
        const person = await Person.findOneAndDelete({_id: id})
        res.status(200).json(person)
    } catch(err){
        res.status(400).json({ error: 'No such person'})
    }
}

// update a data
module.exports.updatePerson = async (req, res) => {
    const { id } =req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const person = await Person.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!person) {
        return res.status(400).json({error: 'No such person'})
    }

    res.status(200).json(person)
}