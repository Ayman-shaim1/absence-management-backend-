import bcrypt from "bcryptjs";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Steve Doe",
    email: "Steve@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
