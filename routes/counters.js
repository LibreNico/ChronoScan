const express = require('express')
const router = express.Router()
const Counters = require('../models/counter')
const counterId = "bankSeq"

module.exports = router

// Get bankSeq counter
router.get('/', async (req, res) => {
  try {
    const counters = await Counters.find()
    res.json(counters)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/', async (req, res) => {

  if (req.body.counterId && req.body.counterValue) {

    await Counters.count({ "_id": req.body.counterId },
      async function (err, result) {
        if (err) throw err;
        if (result === 0) {
          try {
            const counters = new Counters({ "_id": req.body.counterId, "seq": req.body.counterValue })
            const newCounters = await counters.save()
            res.status(201).json(newCounters)
          } catch (err) {
            res.status(400).json({ message: err.message })
          }
        }
      });

  }


})

