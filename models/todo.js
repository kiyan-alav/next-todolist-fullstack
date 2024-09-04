const mongoose = require("mongoose");
const teachersModel = require("./user");
const commentModel = require("./comment");
const { schema: teacherSchema } = require("./user");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      // type: teacherSchema,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "todo",
});

const model = mongoose.models.Todo || mongoose.model("Todo", schema);

export default model;
