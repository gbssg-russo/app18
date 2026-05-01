const express = require('express');
const { listProducts, getProduct, createProduct } = require('../controllers/productController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', requireAuth, createProduct);

module.exports = router;
