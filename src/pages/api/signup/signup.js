import { PrismaClient } from "@prisma/client";

/*
NORMAL EMAIL NON-GOOGLE SIGNUP
*/

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method != "POST") return res.status(400);

    let email = req.body.email;
    let username = req.body.username;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if (!email) return res.status(400).json({ error: "Missing Email", success: false });
    if (!username) return res.status(400).json({ error: "Missing Username", success: false });
    if (!firstName) return res.status(400).json({ error: "Missing First Name", success: false });
    if (!lastName) return res.status(400).json({ error: "Missing Last Name", success: false });

    email = email.toLowerCase();

    // check if email exists already
    let emailVerifyExists = await prisma.verify.findUnique({
        where: {
            email: email
        }
    }) !== null;

    if (emailVerifyExists) return res.status(400).json({ error: "Email verification pending", success: false });

    let emailExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    }) !== null;

    if (emailExists) return res.status(400).json({ error: "Email already in use", success: false });

    // check if username is valid
    // check if username exists already
    let usernameExists = await prisma.verify.findUnique({
      where: {
        email: email
      }
    }) !== null;

    if (usernameExists) return res.status(200).json({ error: "Username already in use", success: false });

    // add to temporary signup database
    await prisma.verify.create({
        data: {
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password
        }
    }).catch(e => {
        return res.status(500).json({ success: false });
    });

    // send confirmation email

    return res.status(200).json({success: true});
}
