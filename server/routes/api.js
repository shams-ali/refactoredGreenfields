const express = require('express');
const Event = require('../controllers/events');


const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.post('/makeevent', (req, res) => {
  req.body.username = req.user;
  Event.createEvent(req.body);
  res.status(200).json({
    body: req.body,
    message: 'Your event was posted!'
  });
});


module.exports = router;
