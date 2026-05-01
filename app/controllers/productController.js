function listProducts(req, res) {
  res.json({ status: 'success', data: { products: [] } });
}

function getProduct(req, res) {
  res.json({ status: 'success', data: { productId: req.params.id } });
}

function createProduct(req, res) {
  res.status(201).json({ status: 'success', message: 'Product created' });
}

module.exports = { listProducts, getProduct, createProduct };
