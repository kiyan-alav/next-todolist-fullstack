import connectToDb from "@/utils/db";
import todosModel from "@/models/todos";

const handler = async function (req, res) {
    connectToDb();

    if (req.method === "POST") {
        try {
            const {title, status} = req.body;
            if (!title.trim() || status !== false) {
                return res.status(422).json({message: "Invalid Data!"});
            }
            await todosModel.create({
                title: title,
                status: status,
            });
            return res.status(201).json({message: "Todo Added!"});
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error!"});
        }
    } else if (req.method === "GET") {
        try {
            const {filter} = req.query
            if (filter === "ALL") {
                const allTodos = await todosModel.find({})
                return res.json(allTodos)
            } else if (filter === "COMPLETED") {
                const allTodos = await todosModel.find({
                    status: true
                })
                return res.json(allTodos)
            } else if (filter === "UNCOMPLETED") {
                const allTodos = await todosModel.find({
                    status: false
                })
                return res.json(allTodos)
            } else {
                return res.status(422).json({
                    message: "Invalid filter parameter value"
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    } else {
        return res.status(405).json({message: "Method Not Allowed!"});
    }
};

export default handler;
