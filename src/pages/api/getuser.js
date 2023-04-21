import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method != "GET")
    return res
      .status(400)
      .json({ success: false, error: "Expected get request." });

  let token = req.cookies.token;

  if (token) {
    let user = await prisma.user.findUnique({
      where: {
        authToken: token,
      },
    });

    if (user) {
      let userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        admin: user.admin,
      };

      let message = {
        message: "Logged In.",
        userInfo: userInfo,
        success: true,
      };

      return res.status(200).json(message);
    } else {
      return res
        .status(200)
        .json({ message: "Login expired.", success: false });
    }
  } else {
    return res.status(200).json({ message: "Not logged in.", success: false });
  }
}
