import connectToDb from "@/utils/db";
import todosModel from "@/models/todos";
import { isValidObjectId } from "mongoose";

const handler = async function (req, res) {
  connectToDb();

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (isValidObjectId(id)) {
      try {
        await todosModel.findOneAndDelete({ _id: id });
        return res.json({ message: "Todo deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      return res.status(422).json({ message: "Todo ID is not valid" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { title } = req.body;

    if (isValidObjectId(id)) {
      try {
        await todosModel.findOneAndUpdate({ _id: id }, { title: title });
        return res.json({ message: "Todo updated successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      return res.status(422).json({ message: "Todo ID is not valid" });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;
    if (isValidObjectId(id)) {
      const chosenTodo = await todosModel.findOne({ _id: id });
      return res.json(chosenTodo);
    }
  }
};

export default handler;
