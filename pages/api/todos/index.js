import connectToDb from "@/utils/db";
import todosModel from "@/models/todo";
import todoValidator from "@/validators/todo";

const handler = async function (req, res) {
  connectToDb();

  if (req.method === "POST") {
    const todoValidationResult = todoValidator(req.body);

    if (todoValidationResult !== true) {
      return res.status(422).json(todoValidationResult);
    }

    try {
      const { title, status, user } = req.body;
      if (!title.trim() || status !== false) {
        return res.status(422).json({ message: "Invalid Data!" });
      }

      // const userData = await userModel.findOne({ _id: user });

      await todosModel.create({
        title: title,
        status: status,
        user: user,
      });
      // await todosModel.create({
      //   title: title,
      //   status: status,
      //   user: userData,
      // });
      return res.status(201).json({ message: "Todo Added!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  } else if (req.method === "GET") {
    try {
      const { filter } = req.query;
      if (filter === "ALL") {
        const allTodos = await todosModel
          .find({}, "-__v")
          .populate("user", "-__v");
        return res.json(allTodos);
      } else if (filter === "COMPLETED") {
        const allTodos = await todosModel
          .find(
            {
              status: true,
            },
            "-__v"
          )
          .populate("user", "-__v");
        return res.json(allTodos);
      } else if (filter === "UNCOMPLETED") {
        const allTodos = await todosModel
          .find(
            {
              status: false,
            },
            "-__v"
          )
          .populate("user", "-__v");
        return res.json(allTodos);
      } else {
        return res.status(422).json({
          message: "Invalid filter parameter value",
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed!" });
  }
};

export default handler;
