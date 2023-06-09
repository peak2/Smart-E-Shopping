const express = require('express');
const path = require('path')
// const rootDir = require('../utils/path')

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next)=> {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path:'/admin/add-product',      //This path is passed to navigation.ejs to check for active page, wch is defined in main.css active class
    })
})

router.post('/add-product', (req, res, next)=> {
    products.push({title: req.body.title, price: '$20.25', description: 'A very interesting book, read to us by Mrs Bello when i was in JSS1'})
    res.redirect('/')
})


// module.exports = router;
exports.routes = router;
exports.products = products;