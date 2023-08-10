import mongoose from "mongoose";

const dbConn = (db) => {
  mongoose
    .connect(db)
    .then(() => console.log("💻 Mondodb Connected"))
    .catch((err) => console.error(err));
};

export default dbConn;
