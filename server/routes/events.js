const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const Subscriber = require('../models/subscriber')
const auth = require('../services/auth.services');

module.exports = router

router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/editable', auth.authJwt, async (req, res) => {
    try {
        const events = await Event.find({ "user": req.user._id })
        res.json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getEvents, async (req, res) => {
    subcribers = await Subscriber.find({"event_id": req.params.id });
    res.json({event:res.event, subcribers: subcribers})
})



router.post('/', auth.authJwt, async (req, res) => {
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        imgSrc: req.body.imgSrc,
        distance: req.body.distance,
        challenge: req.body.challenge,
        organization: req.body.organization,
        orgaUrl: req.body.orgaUrl,
        accountNumber: req.body.accountNumber,
        price: req.body.price,
        date: req.body.date,
        user: req.user._id
    })

    try {
        const newevent = await event.save()
        res.status(201).json(newevent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', auth.authJwt, getEvents, async (req, res) => {
    if (req.body.name) res.event.name = req.body.name
    if (req.body.description) res.event.description = req.body.description
    if (req.body.imgSrc) res.event.imgSrc = req.body.imgSrc
    if (req.body.distances) res.event.distances = req.body.distances
    if (req.body.challenges) res.event.challenges = req.body.challenges
    if (req.body.date) res.event.date = req.body.date
    if (req.body.orgaUrl) res.event.orgaUrl = req.body.orgaUrl

    try {
        const updatedevent = await res.event.save()
        res.json(updatedevent)
    } catch {
        res.status(400).json({ message: err.message })
    }

})

router.delete('/:id', auth.authJwt, getEvents, async (req, res) => {
    try {
        await Event.deleteOne({_id: res.event._id})
        res.json({ message: 'Deleted This event' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getEvents(req, res, next) {
    try {
        if (req.user) {
            event = await Event.findOne({ "_id": req.params.id, "user": req.user._id });
        } else {
            event = await Event.findById(req.params.id)
        }
        if (event == null) {
            return res.status(404).json({ message: 'Cant find event for the current user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.event = event
    next()
}

module.exports = router