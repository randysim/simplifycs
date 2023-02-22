import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "email-validator";

/*
ACTUALLY CREATE ACCOUNT
*/

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method != "POST") return res.status(400).json({ error: "Expected post request.", success: false });

  let email = req.body.email;
  let verificationKey = req.body.verificationKey;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let username = req.body.username;
  let password = req.body.password;

  if (!email) return res.status(400).json({ error: "Missing email.", success: false });
  if (!verificationKey) return res.status(400).json({ error: "Missing verification key.", success: false });
  if (!firstName) return res.status(400).json({ error: "Missing first name.", success: false });
  if (!lastName) return res.status(400).json({ error: "Missing last name.", success: false });
  if (!username) return res.status(400).json({ error: "Missing username.", success: false });
  if (!password) return res.status(400).json({ error: "Missing password.", success: false });

  email = email.toLowerCase();

  if (!validator.validate(email)) return res.status(400).json({ error: "Invalid email.", success: false });

  // Check if username is valid
  if (!username.match(/^[\-\_a-zA-Z0-9]{4,}$/)) {
    return res.status(400).json({ error: "Invalid username.", success: false });
  }

  if (!firstName.match(/^['a-zA-Z]{2,}$/)) {
    return res.status(400).json({ error: "Invalid first name.", success: false });
  }

  if (!lastName.match(/^['a-zA-Z]{2,}$/)) {
    return res.status(400).json({ error: "Invalid last name.", success: false });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters.", success: false });
  }

  // Check if verification is valid
  let pendingVerification = await prisma.verify.findUnique({
    where: {
      email: email
    }
  });

  if (!pendingVerification) {
    return res.status(400).json({ error: "Invalid verification.", success: false });
  }

  if (pendingVerification.verificationKey !== verificationKey) {
    return res.status(400).json({ error: "Invalid verification key.", success: false });
  }

  if (new Date() > pendingVerification.verificationExpirationTime) {
    return res.status(400).json({ error: "Verification expired.", success: false });
  }

  // Delete verification thing
  await prisma.verify.delete({
    where: {
      email: email
    }
  });

  // Hash password
  let passwordSalt = await bcrypt.genSalt(12);
  let passwordHashed = await bcrypt.hash(password, passwordSalt);

  await prisma.user.create({
    data: {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: passwordHashed,
      passwordSalt: passwordSalt
    }
  });

  return res.status(200).json({ message: "Account created.", success: true });
}
