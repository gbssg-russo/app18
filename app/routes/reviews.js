const express = require('express');
const { listReviews, addReview } = require('../controllers/reviewController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', listReviews);
router.post('/', requireAuth, addReview);

module.exports = router;
