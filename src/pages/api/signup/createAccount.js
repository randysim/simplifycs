import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "email-validator";
import cookie from "cookie";

/*
ACTUALLY CREATE ACCOUNT
*/

const prisma = new PrismaClient();

function checkMethod(req, res) {
  if (req.method != "POST") {
    res.status(400).json({ error: "Expected post request.", success: false });
    return false;
  }

  return true;
}

function checkEmail(req, res) {
  let email = req.body.email;

  if (!email) {
    res.status(400).json({ error: "Missing email.", success: false });
    return false;
  }

  if (!validator.validate(email)) {
    res.status(400).json({ error: "Invalid email.", success: false });
    return false;
  }

  req.body.email = req.body.email.toLowerCase();

  return true;
}

function checkVerificationKey(req, res) {
  let verificationKey = req.body.verificationKey;

  if (!verificationKey) {
    res
      .status(400)
      .json({ error: "Missing verification key.", success: false });
    return false;
  }

  return true;
}

function checkNames(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  if (!firstName) {
    res.status(400).json({ error: "Missing first name.", success: false });
    return false;
  }

  if (!lastName) {
    res.status(400).json({ error: "Missing last name.", success: false });
    return false;
  }

  if (!firstName.match(/^['a-zA-Z]{2,}$/)) {
    res.status(400).json({
      error: "First name must match the following regex: /^['a-zA-Z]{2,}$/",
      success: false,
    });
    return false;
  }

  if (!lastName.match(/^['a-zA-Z]{2,}$/)) {
    res.status(400).json({
      error: "Last name must match the following regex: /^['a-zA-Z]{2,}$/",
      success: false,
    });
    return false;
  }

  return true;
}

function checkUsername(req, res) {
  let username = req.body.username;

  if (!username) {
    res.status(400).json({ error: "Missing username.", success: false });
    return false;
  }

  if (!username.match(/^[\-\_a-zA-Z0-9]{4,}$/)) {
    return res.status(400).json({
      error: "Username must match the following regex: /^[-_a-zA-Z0-9]{4,}$/",
      success: false,
    });
    return false;
  }

  return true;
}

function checkPassword(req, res) {
  let password = req.body.password;

  if (!password) {
    res.status(400).json({ error: "Missing password.", success: false });
    return false;
  }

  if (password.length < 8) {
    res.status(400).json({
      error: "Password must be at least 8 characters.",
      success: false,
    });
    return false;
  }

  return true;
}

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
  if (!checkMethod(req, res)) return;
  if (!checkEmail(req, res)) return;
  if (!checkVerificationKey(req, res)) return;
  if (!checkNames(req, res)) return;
  if (!checkUsername(req, res)) return;
  if (!checkPassword(req, res)) return;

  let email = req.body.email;
  let verificationKey = req.body.verificationKey;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let username = req.body.username;
  let password = req.body.password;

  // Check if verification is valid
  let pendingVerification = await prisma.verify.findUnique({
    where: {
      email: email,
    },
  });

  if (!pendingVerification) {
    return res
      .status(400)
      .json({ error: "Invalid verification.", success: false });
  }

  if (pendingVerification.verificationKey !== verificationKey) {
    return res
      .status(400)
      .json({ error: "Invalid verification key.", success: false });
  }

  if (new Date() > pendingVerification.verificationExpirationTime) {
    return res
      .status(400)
      .json({ error: "Verification expired.", success: false });
  }

  // Delete verification thing
  await prisma.verify.delete({
    where: {
      email: email,
    },
  });

  // Hash password
  let passwordSalt = await bcrypt.genSalt(12);
  let passwordHashed = await bcrypt.hash(password, passwordSalt);
  let authToken = genAuthToken();

  await prisma.user.create({
    data: {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      passwordHashed: passwordHashed,
      authToken: authToken,
    },
  });

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("authentication", authToken, { path: "/" })
    )
    .json({ message: "Account created.", success: true });
}
