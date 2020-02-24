const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const mail = require('../services/mail.service')
const Event = require('../models/event')
const HTTPStatus = require('http-status');
const auth = require('../services/auth.services');


module.exports = router

// Get all subscribers

router.get('/', auth.authJwt, async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get One Subscriber
router.get('/:id', auth.authJwt, getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

// Create one subscriber
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    gender: req.body.gender,
    email: req.body.email,
    postalCode: req.body.postalCode,
    club: req.body.club,
    challenge: req.body.challenge,
    event_id: req.body.event_id,
    birthDate: req.body.birthDate,
  })



  try {
    const event = await Event.findById(subscriber.event_id)
    const newSubscriber = await subscriber.save();

    mail.sendMailPayMe(newSubscriber, event, (err, info) => {
      if (err) {
        console.error(err);
      }
      console.log(info);
    });
    return res.status(201).json(newSubscriber);

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err })
  }



})

//TODO refactor too much lines
router.post('/confirmation/:id', auth.authJwt, async (req, res) => {

  if (req.params.id) {

    try {
      const event = await Event.findById(req.params.id);
      var numberOfConfirm = 0;
      var numberOfNotFound = 0;


      for (const bankCheck of req.body) {

        if (bankCheck.price == event.price) {
          try {
            const filter = { bankTransferId: bankCheck.structuredCom, active: false };
            let subscriber = await Subscriber.findOneAndUpdate(filter, { active: true });

            if(subscriber){
              mail.sendMailPaidOk(subscriber, event, (err, info) => {
                if (err) {
                  console.error(err);
                }
                //console.log(info);
              });
              numberOfConfirm++;
            }else{
              numberOfNotFound++;
            }
   
          } catch (err) {
            console.error(err);
            numberOfNotFound++;
          }
        }

      } //end of for

      return res.status(HTTPStatus.OK).json({
        message: `People with payment validated: ${numberOfConfirm}; People not found: ${numberOfNotFound}` 
       });

    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err })
    }
  }

})


router.post('/active/:id', auth.authJwt, async (req, res) => {

  if (req.params.id) {

    try {
      const event = await Event.findById(req.params.id);
      if (req.body.structuredCom) {

        try {
          const filter = { bankTransferId: req.body.structuredCom, active: false };
          let subscriber = await Subscriber.findOneAndUpdate(filter, { active: true });

          mail.sendMailPaidOk(subscriber, event, (err, info) => {
            if (err) {
              return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
            }
            console.log(info);
            return res.status(201).json(newSubscriber);
          })
        } catch (err) {
          //continue 
          //add in error message
        }
      }

    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

})

// Update Subscriber

router.patch('/:id', auth.authJwt, getSubscriber, async (req, res) => {
  if (req.body.lastName) res.subscriber.lastName = req.body.lastName
  if (req.body.firstName) res.subscriber.firstName = req.body.firstName
  if (req.body.gender) res.subscriber.gender = req.body.gender
  if (req.body.email) res.subscriber.email = req.body.email
  if (req.body.postalCode) res.subscriber.postalCode = req.body.postalCode
  if (req.body.club) res.subscriber.club = req.body.club
  if (req.body.challenge) res.subscriber.challenge = req.body.challenge
  if (req.body.birthDate) res.subscriber.birthDate = req.body.birthDate
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch {
    res.status(400).json({ message: err.message })
  }

})

// Delete one subscriber

router.delete('/:id', auth.authJwt, getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted This Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cant find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router