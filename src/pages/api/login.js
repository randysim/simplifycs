import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookie from "cookie";

const prisma = new PrismaClient();

function genAuthToken() {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let length = 64;

  let token = "";

  for (let i = 0; i < length; ++i) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }

  return token;
}

export default async function handler(req, res) {
  if (req.method != "POST")
    return res
      .status(400)
      .json({ success: false, error: "Expected post request." });

  let email = req.body.email;
  let password = req.body.password;

  if (!email)
    return res.status(400).json({ success: false, error: "Missing Email." });
  if (!password)
    return res.status(400).json({ success: false, error: "Missing Password." });

  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user == null)
    return res.status(400).json({ success: false, error: "Invalid Email." });

  const match = await bcrypt.compare(password, user.passwordHashed);

  if (!match) {
    return res
      .status(400)
      .json({ success: false, error: "Passwords do not match." });
  }

  let authToken = genAuthToken();

  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      authToken: authToken,
    },
  });

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("authentication", authToken, { path: "/" })
    )
    .json({ message: "Logged in.", success: true });
}
