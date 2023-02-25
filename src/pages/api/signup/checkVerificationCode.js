import { PrismaClient } from "@prisma/client";
import validator from "email-validator";

/*
CHECK IF VERIFICATION KEY IS VALID SO ACCOUNT CREATION LOOKS MODERN
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

export default async function handler(req, res) {
  if (!checkMethod(req, res)) return;
  if (!checkEmail(req, res)) return;
  if (!checkVerificationKey(req, res)) return;

  let email = req.body.email;
  let verificationKey = req.body.verificationKey;

  let pendingVerification = await prisma.verify.findUnique({
    where: {
      email: email,
    },
  });

  if (pendingVerification == null) {
    // no verification things for that email
    return res.status(400).json({ error: "Invalid email.", success: false });
  }

  if (new Date() > pendingVerification.verificationExpirationTime) {
    return res
      .status(400)
      .json({ error: "Verification key expired.", success: false });
  }

  if (pendingVerification.verificationKey === verificationKey) {
    await prisma.verify.update({
      where: {
        email: email,
      },
      data: {
        verificationExpirationTime: new Date(new Date().getTime() + 5 * 60000),
      },
    });

    return res.status(200).json({ message: "Email verified.", success: true });
  }

  return res
    .status(400)
    .json({ error: "Invalid verification key.", success: false });
}
