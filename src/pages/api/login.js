import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method != "POST") return res.status(400).json({ success: false, error: "Expected post request." });

    let email = req.body.email;
    let password = req.body.password;

    if (!email) return res.status(400).json({ success: false, error: "Missing Email." });
    if (!password) return res.status(400).json({ success: false, error: "Missing Password." });

    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user == null) return res.status(200).json({ success: false, error: "Invalid Email." });

    bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500);

        if (match) {
            console.log(`${email} logged in! auth token: ${user.authToken}`);
            return res.status(200).json({ success: true, authToken: user.authToken });
        } else {
            return res.status(200).json({ success: false, error: "Passwords do not match."});
        }
    });
}