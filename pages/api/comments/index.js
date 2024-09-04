import connectToDb from "@/utils/db";
import commentsModel from "@/models/comment";
import todoModel from "@/models/todo";

const handler = async function (req, res) {
  connectToDb();

  if (req.method === "GET") {
    const comments = await commentsModel
      .find({}, "-__v")
      .populate("todo", "-__v");
    return res.json(comments);
  } else if (req.method === "POST") {
    try {
      const { body, todo } = req.body;
      if (!body.trim()) {
        return res.status(422).json({ message: "Body is not valid!" });
      }

      await commentsModel.create({
        body: body,
        todo: todo,
      });
      return res.status(201).json({ message: "Comment created successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

export default handler;
