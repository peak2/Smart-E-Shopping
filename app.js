const express = require('express');
const path = require('path')

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')
const errorController = require('./controllers/error')

const db = require('./utils/database'); 

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')   //the first views is the name of the folder you store ur html files into, the second views is default, which must not b changed 
                            //suppose u use anoda name like template, u will use it like dz: app.set('template', 'views')

// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0], result[1]);
//     }).catch(err => {
//         console.log(err);
//     });


app.use(express.json());                                        // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));                // Middleware for parsing URL-encoded data
app.use(express.static(path.join(__dirname, '/public')))


app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404)


app.listen(3905, ()=>{
    console.log("App Running on 3905");
}) 