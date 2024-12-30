const express = require('express');
const { generateShortUrl, getShortUrl } = require('../controllers/url');
const router = express.Router();

router.post("/", generateShortUrl);
router.get('/:shortId', getShortUrl);

module.exports = router;
