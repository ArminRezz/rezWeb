const Art = require('../models/artModel')
const mongoose = require('mongoose')

// get all arts
const getArts = async (req, res) => {
    const arts = await Art.find({}).sort({createdAt: -1})

    res.status(200).json(arts)
}

// get a single art
const getArt = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such art'})
    }

    const art = await Art.findById(id)

    if (!art) {
        return res.status(404).json({error: 'No such art'})
    }

    res.status(200).json(art)
}

// create a new art
const createArt = async (req, res) => {
    const {title, image, video, originDate, originLocation, description} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!image) {
        emptyFields.push('image')
    }
    if (!video) {
        emptyFields.push('video')
    }
    if (!originDate) {
        emptyFields.push('originDate')
    }
    if (!originLocation) {
        emptyFields.push('originLocation')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add to the database
    try {
        const art = await Art.create({ title, image, video, originDate, originLocation, description })
        res.status(200).json(art)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete an art
const deleteArt = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such art'})
    }

    const art = await Art.findOneAndDelete({_id: id})

    if(!art) {
        return res.status(400).json({error: 'No such art'})
    }

    res.status(200).json(art)
}

// update an art
const updateArt = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such art'})
    }

    const art = await Art.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!art) {
        return res.status(400).json({error: 'No such art'})
    }

    res.status(200).json(art)
}

module.exports = {
    getArts,
    getArt,
    createArt,
    deleteArt,
    updateArt
}