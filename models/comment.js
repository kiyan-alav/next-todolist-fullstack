const mongoose = require("mongoose");
const todoModel = require("./todo");

const schema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    todo: {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
