import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import validator from "email-validator";

/*
SENT WHEN USER PUTS IN EMAIL BEFORE ANY OTHER INFO
*/

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method != "POST") return res.status(400).json({ error: "Expected post request.", success: false });

  let email = req.body.email;

  if (!email) return res.status(400).json({ error: "Missing email.", success: false });

  email = email.toLowerCase();

  if (!validator.validate(email)) return res.status(400).json({ error: "Invalid email.", success: false });

  // check if email already in use
  let emailExists = await prisma.user.findUnique({
    where: {
      email: email
    }
  }) !== null;

  if (emailExists) return res.status(400).json({ error: "Email already in use.", success: false });

  // see if pending verification already exists
  let pendingVerification = await prisma.verify.findUnique({
    where: {
      email: email
    }
  });

  if (pendingVerification !== null) {
    // if verification already sent and not expired yet, extend expiration time to another 5 minutes and reuse old code so dont send another email
    if (new Date() < pendingVerification.verificationExpirationTime) {
      await prisma.verify.update({
        where: {
          email: email,
        },
        data: {
          verificationExpirationTime: new Date(new Date().getTime() + 5 * 60000)
        },
      });

      return res.status(200).json({ message: "Verification key already sent, check email.", success: true });
    } else {
      // if already expired, delete old verification thing
      await prisma.verify.delete({
        where: {
          email: email
        }
      });
    }
  }

  // create verification object
  const verificationKey = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.verify.create({
    data: {
      email: email,
      verificationKey: verificationKey,
      verificationExpirationTime: new Date(new Date().getTime() + 5 * 60000) // + 5 min
    }
  });

  // send confirmation email
  /*let result = await transporter.sendMail({
    from: "Simplify CompStuy <simplifycompstuy@gmail.com>",
    to: email,
    subject: "SimplifyCS Account Verification",
    text: verificationKey
  })*/
  console.log(`SIMULATED Email sent to ${email}. Content: ${verificationKey}`);
  return res.status(200).json({ message: "Verification key sent.", success: true });
}
