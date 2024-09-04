const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  title: {
    type: "string",
    min: 4,
  },
  status: {
    type: "boolean",
  },
};

const check = v.compile(schema);

export default check;
 