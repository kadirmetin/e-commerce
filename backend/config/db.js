const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected!!!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
