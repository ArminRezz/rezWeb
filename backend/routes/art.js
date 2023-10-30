const express = require('express')
const {
    getArts, 
    getArt, 
    createArt, 
    deleteArt, 
    updateArt
} = require('../controllers/artController')

const router = express.Router()

// GET all arts
router.get('/', getArts)

// GET a single art
router.get('/:id', getArt)

// POST a new art
router.post('/', createArt)

// DELETE an art
router.delete('/:id', deleteArt)

// UPDATE an art
router.patch('/:id', updateArt)

module.exports = router
