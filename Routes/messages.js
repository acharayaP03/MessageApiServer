const express = require('express');
const router = express.Router({ mergeParams: true});

const { createMessage } = require('../Controllers/messageController');

// prefix - /api/users/:id/messages
router.route('/').post(createMessage);

module.exports = router;