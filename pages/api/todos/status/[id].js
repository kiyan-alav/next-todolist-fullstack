import connectToDb from "@/utils/db";
import todosModel from "@/models/todos";
import { isValidObjectId } from "mongoose";

const handler = async function (req, res) {
  connectToDb();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (isValidObjectId(id)) {
        const selectedTodo = await todosModel.findOne({ _id: id });
        await todosModel.findOneAndUpdate(
          { _id: id },
          { status: !selectedTodo.status }
        );
        return res.json({ message: "Status changed successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed!" });
  }
};

export default handler;
