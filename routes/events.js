const express = require('express')
const router = express.Router()
const Event = require('../models/event')


module.exports = router

// Get all events
router.get('/', async (req, res) => {
    try {
      const events = await Event.find()
      res.json(events)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Get One event
router.get('/:id', getEvents, (req, res) => {
    res.json(res.event)
  })

// Create one event
router.post('/', async (req, res) => {
    const event = new Event({
      name: req.body.name,
      description: req.body.description,
      imageSrc: req.body.imageSrc,
      distances: req.body.distances,
      challenges: req.body.challenges,
      date: req.body.date
    })
  
    try {
      const newevent = await event.save()
      res.status(201).json(newevent)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Update event
router.patch('/:id', getEvents, async (req, res) => {
    if (req.body.name) res.event.name = req.body.name
    if (req.body.description) res.event.description = req.body.description
    if (req.body.imageSrc) res.event.imageSrc = req.body.imageSrc
    if (req.body.distances) res.event.distances = req.body.distances
    if (req.body.challenges) res.event.challenges = req.body.challenges
    if (req.body.date) res.event.date = req.body.date
   
    try {
      const updatedevent = await res.event.save()
      res.json(updatedevent)
    } catch {
      res.status(400).json({ message: err.message })
    }
  
  })

// Delete one event
router.delete('/:id', getEvents, async (req, res) => {
  try {
    await res.event.remove()
    res.json({ message: 'Deleted This event' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})


async function getEvents(req, res, next) {
    try {
      event = await Event.findById(req.params.id)
      if (event == null) {
        return res.status(404).json({ message: 'Cant find event'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.event = event
    next()
  }

module.exports = router