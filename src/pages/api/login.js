import prisma from "@/lib/db.js";
import bcrypt from "bcrypt";
import cookie from "cookie";

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
      .json({ success: false, message: "Expected post request." });

  let email = req.body.email;
  let password = req.body.password;

  if (!email)
    return res.status(400).json({ success: false, message: "Missing Email." });
  if (!password)
    return res
      .status(400)
      .json({ success: false, message: "Missing Password." });

  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log(user);

  if (user == null)
    return res.status(200).json({ success: false, message: "Invalid Email." });

  const match = await bcrypt.compare(password, user.passwordHashed);

  if (!match) {
    return res
      .status(200)
      .json({ success: false, message: "Passwords do not match." });
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
      cookie.serialize("token", authToken, { path: "/" })
    )
    .json({ message: "Logged in.", success: true });
}
