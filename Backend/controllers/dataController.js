const Person = require('../models/person')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config();

// get all data
module.exports.getInfos = async (req, res) => {
    const infos = await Person.find()

    res.status(200).json(infos)
}

// create new data
module.exports.createInfo = async (req, res) => {
    const { name, phone, email, hobbies } = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!phone) {
        emptyFields.push('phone')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!hobbies) {
        emptyFields.push('hobbies')
    }
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        emptyFields.push('phone (must be 10 digits)');
        return res.status(400).json({ error: 'phone (must be 10 digits)', emptyFields });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        emptyFields.push('email (invalid format)');
        return res.status(400).json({ error: 'email (invalid format)', emptyFields });
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields correctly', emptyFields });
    }

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
        return res.status(404).json({error: 'No such data'})
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
        return res.status(404).json({error: 'No such data'})
    }

    const info = await Person.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!info) {
        return res.status(400).json({error: 'No such person'})
    }

    res.status(200).json(info)
}

// send data via email
module.exports.sendEmail = async (req, res) => {
    const markedData = req.body
  
    const emailContent = markedData.map(info => `
      Name: ${info.name}
      Phone: ${info.phone}
      Email: ${info.email}
      Hobbies: ${info.hobbies}
    `).join('\n\n');
  
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@redpositive.in',
      subject: 'New Sent Data',
      text: emailContent
    }
  
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err)
          res.status(500).send('Error sending email: ' + err.message);
        } else {
          console.log(info)
          res.status(200).send('Email sent successfully');
        }
    })
}