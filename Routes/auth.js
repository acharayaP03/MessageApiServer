const express = require('express');
const router = express.Router();
const conn = require('../Models');
const jwt = require('jsonwebtoken');

const {signup} = require('../Controllers/authController');


router.post('/signup', signup);

module.exports = router;