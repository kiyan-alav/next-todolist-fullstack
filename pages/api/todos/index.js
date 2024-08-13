import connectToDb from "@/utils/db";
import todosModel from "@/models/todos";

const handler = async function (req, res) {
  connectToDb();

  if (req.method === "POST") {
    try {
      const { title, status } = req.body;
      if (!title.trim() || status !== false) {
        return res.status(422).json({ message: "Invalid Data!" });
      }
      await todosModel.create({
        title: title,
        status: status,
      });
      return res.status(201).json({ message: "Todo Added!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  } else if (req.method === "GET") {
    const allTodos = await todosModel.find({});
    return res.json(allTodos);
  }
};

export default handler;

/* 
TODO: Filter Todos Api => GET index.js
*/
