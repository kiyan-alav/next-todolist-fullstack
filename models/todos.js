const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const model = mongoose.models.Todo || mongoose.model("Todo", schema);

export default model;
