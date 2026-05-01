// Platzhalter für Produktbewertungen
const reviews = [];

function getReviewsForProduct(productId) {
  return reviews.filter((review) => review.productId === productId);
}

module.exports = { reviews, getReviewsForProduct };
