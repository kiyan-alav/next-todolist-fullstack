const mongoose = require("mongoose");

const connectToDb = async function () {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    } else {
      await mongoose.connect("mongodb://localhost:27017/kiyan-todo-list");
      console.log("Connect To DB Successfully");
    }
  } catch (e) {
    console.log("DB Connection Error: ", e);
  }
};

export default connectToDb;
