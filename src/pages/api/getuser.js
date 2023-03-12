import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookie from "cookie";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method != "GET")
    return res
      .status(400)
      .json({ success: false, error: "Expected get request." });

  if (req.cookies.authentication) {
    let user = await prisma.user.findUnique({
      where: {
        authToken: req.cookies.authentication,
      },
    });

    if (user) {
      let userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
      };

      let message = { message: "Logged In.", userInfo: userInfo, success: true };
      return res.status(200).json(message);
    } else {
      return res.status(200).json({ message: "Login expired.", success: false });
    }
  } else {
    return res.status(200).json({ message: "Not logged in.", success: false });
  }
}
// ATTEMPT COOKIE SIGN IN
