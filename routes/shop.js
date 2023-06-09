const express = require('express');
const path = require('path')

const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next)=> {
    const products = adminData.products;
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        price: '$20.25', 
        description: 'A very interesting book, read to us by Mrs Bello when i was in JSS1', 
        path:'/',  //This path is passed to navigation.ejs to check for active page, wch is defined in main.css active class
    })
})


module.exports = router;
