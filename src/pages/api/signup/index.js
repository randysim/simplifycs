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
    let password = req.body.password;
    let confirmPass = req.body.confirmPassword; // to see if they match

    if (!email) return res.status(200).json({ error: "Missing Email", success: false });
    if (!username) return res.status(200).json({ error: "Missing Username", success: false });
    if (!firstName) return res.status(200).json({ error: "Missing First Name", success: false });
    if (!lastName) return res.status(200).json({ error: "Missing Last Name", success: false });
    if (!password) return res.status(200).json({ error: "Missing Password", success: false });
    if (password !== confirmPass) return res.status(200).json({ error: "Passwords do not match", success: false });

    email = email.toLowerCase();
    
    // check if its a valid email
    // check if email exists already
    let emailVerifyExists = await prisma.verify.findUnique({ where: { email }});
    if (emailVerifyExists) return res.status(200).json({ error: "Email verification pending", success: false });
    let emailExists = await prisma.user.findUnique({ where: {email }});
    if (emailExists) return res.status(200).json({ error: "Email already exists", success: false });
    

    // check if password meets password requirements (check on frontend as well)

    // check if username is valid
    // check if username exists already
    let usernameExists = (await prisma.verify.findUnique({ where: { email }})) || (await prisma.user.findUnique({ where: { email }}));
    if (usernameExists) return res.status(200).json({ error: "Username already exists", success: false });

    // add to temporary signup database
    await prisma.verify.create({
        data: {
            email,
            username,
            firstName,
            lastName,
            password
        }
    })
    .catch(e => {
        return res.status(500).json({ success: false });
    });

    // send confirmation email

    return res.status(200).json({success: true });
}