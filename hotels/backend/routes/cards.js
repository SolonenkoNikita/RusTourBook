const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const Card = require('../models/card');

// Named function (function declaration)
function getCards(req, res, next) {
  Card.find({})
    .then((cards) => {
      console.log('Cards retrieved successfully:', cards);
      res.send(cards);
    })
    .catch((error) => {
      console.error('Error retrieving cards:', error);
      next(error);
    });
}

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

router.get('/', getCards);

module.exports = router;
