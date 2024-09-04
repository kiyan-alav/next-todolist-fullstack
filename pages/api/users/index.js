import connectToDb from "@/utils/db";
import usersModel from "@/models/user";

const handler = async function (req, res) {
  connectToDb();

  if (req.method === "POST") {
    try {
      const { firstName, lastName } = req.body;
      if (!firstName.trim() || !lastName.trim()) {
        return res.status(422).json({ message: "Invalid Data!" });
      }
      await usersModel.create({
        firstName: firstName,
        lastName: lastName,
      });
      return res.status(201).json({ message: "User Added!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  } else if (req.method === "GET") {
    const allUsers = await usersModel.find({}, "-__v");
    return res.json(allUsers);
  } else {
    return res.status(405).json({ message: "Method Not Allowed!" });
  }
};

export default handler;
