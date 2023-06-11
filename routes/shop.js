const express = require('express');
const path = require('path')
const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex)
router.get('/products', shopController.getProducts)
router.get('/cart', shopController.getCart)
// router.get('/checkout', shopController)


module.exports = router;
