const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


module.exports = router

// Get all subscribers

router.get('/', async (req, res) => {
    try {
      const subscribers = await Subscriber.find()
      res.json(subscribers)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Get One Subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
  })

// Create one subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
     lastName: req.body.lastName,
     firstName: req.body.firstName,
     gender: req.body.gender,
     mailingList: req.body.mailingList,
     email: req.body.email,
     postalCode: req.body.postalCode,
     club: req.body.club,
     challenge: req.body.challenge,
     event_id: req.body.event_id,
     birthDate: req.body.birthDate
    })
  
    try {
      const newSubscriber = await subscriber.save()
      res.status(201).json(newSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Update Subscriber

router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.lastName)  res.subscriber.lastName = req.body.lastName
    if (req.body.firstName)  res.subscriber.firstName = req.body.firstName
    if (req.body.gender)  res.subscriber.gender = req.body.gender
    if (req.body.mailingList)  res.subscriber.mailingList = req.body.mailingList
    if (req.body.email)  res.subscriber.email = req.body.email
    if (req.body.postalCode)  res.subscriber.postalCode = req.body.postalCode
    if (req.body.club)  res.subscriber.club = req.body.club
    if (req.body.challenge)  res.subscriber.challenge = req.body.challenge
    if (req.body.birthDate)  res.subscriber.birthDate = req.body.birthDate
    try {
      const updatedSubscriber = await res.subscriber.save()
      res.json(updatedSubscriber)
    } catch {
      res.status(400).json({ message: err.message })
    }
  
  })

// Delete one subscriber

router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted This Subscriber' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})


async function getSubscriber(req, res, next) {
    try {
      subscriber = await Subscriber.findById(req.params.id)
      if (subscriber == null) {
        return res.status(404).json({ message: 'Cant find subscriber'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.subscriber = subscriber
    next()
  }

module.exports = router