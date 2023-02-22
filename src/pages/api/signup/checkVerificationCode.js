import { PrismaClient } from "@prisma/client";

/*
CHECK IF VERIFICATION KEY IS VALID SO ACCOUNT CREATION LOOKS MODERN
*/

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method != "POST") return res.status(400).json({ error: "Expected post request.", success: false });

  let email = req.body.email;
  let verificationKey = req.body.verificationKey;

  if (!email) return res.status(400).json({ error: "Missing email.", success: false });
  if (!verificationKey) return res.status(400).json({ error: "Missing verification key.", success: false });

  email = email.toLowerCase();

  let pendingVerification = await prisma.verify.findUnique({
    where: {
      email: email
    }
  });

  if (pendingVerification == null) {
    // no verification things for that email
    return res.status(400).json({ error: "Invalid email.", success: false });
  }

  if (new Date() > pendingVerification.verificationExpirationTime) {
    return res.status(400).json({ error: "Verification key expired.", success: false });
  }

  if (pendingVerification.verificationKey === verificationKey) {
    await prisma.verify.update({
      where: {
        email: email
      },
      data: {
        verificationExpirationTime: new Date(new Date().getTime() + 5 * 60000)
      },
    });

    return res.status(200).json({ message: "Email verified.", success: true });
  }

  return res.status(400).json({ error: "Invalid verification key.", success: false });
}
