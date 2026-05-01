function listReviews(req, res) {
  res.json({ status: 'success', data: { reviews: [] } });
}

function addReview(req, res) {
  res.status(201).json({ status: 'success', message: 'Review added' });
}

module.exports = { listReviews, addReview };
