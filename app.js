const express = require('express');
const path = require('path')

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')
const errorController = require('./controllers/error')

const sequelize = require('./utils/database');
const Product = require('./models/product')
const User = require('./models/user') 

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



app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})



app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
// .sync({ force:true })
.sync()
.then(result => {
    return User.findByPk(1)
    // console.log(result);
})
.then(user => {
    if(!user){
        return User.create({ name: 'Adewale Karounwi', email: 'peak24success@gmail.com' })
    }
    return user;
})
.then(user => {
    // console.log(user);
    app.listen(3905, ()=>{
        console.log("App Running on 3905");
    }) 
})
.catch(err => console.log(err))