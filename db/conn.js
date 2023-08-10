
const mongoose = require("mongoose");

const dbConn = (db) =>{
    mongoose
      .connect(db)
      .then(() => console.log("💻 Mondodb Connected"))
      .catch(err => console.error(err));
} 

module.exports = dbConn;