const express = require('express');
const router = express.Router();
const conn = require('../Models');
const jwt = require('jsonwebtoken');

const {signup, signin} = require('../Controllers/authController');


router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;