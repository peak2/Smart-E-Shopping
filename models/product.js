const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  // save() {
  //   const db = getDb();
  //   return db
  //     .collection("products")
  //     .insertOne(this)
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  save() {
    const db = getDb();
    let dbOp; // dbOp.. database operation, save new product or update product
    if (this._id) {
      // by checking if _id is present
      //update the product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
      // .updateOne({_id: new mongodb.ObjectId(this._id) }, {$set: {title: this.title, imageUrl: this.imageUrl,...}} );
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

module.exports = Product;
