/** @format */

const z = require("zod");

const registerRequest = z
  .object({
    name: z.string().trim().min(3, "name should have atleast 3 characters"),
    email: z.string().email("please enter a valid email address"),
    password: z.string().min(6, "password must be atleast 6 characters"),
    role: z.enum(["member", "librarian"]),
  })
  .strict();
const loginRequest = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

module.exports = { registerRequest, loginRequest };
