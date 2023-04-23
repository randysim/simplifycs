import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* DELETE COURSE */
export default async function handler(req, res) {
    if (req.method != "POST")
        return res
            .status(400)
            .json({ success: false, message: "Expected post request." });
    // admin check
    let token = req.cookies.token;

    if (!token) return res.status(200).json({ message: "Not logged in.", success: false });
    let user = await prisma.user.findUnique({
        where: {
          authToken: token,
        },
    });
    if (!user) return res
    .status(200)
    .json({ message: "Login expired.", success: false });

    if (!user.admin) return res
    .status(400)
    .json({ message: "Unauthorized", success: false });

    if (!req.body.id) return res 
    .status(400)
    .json({ message: "Missing Course ID.", success: false});

    await prisma.course.delete({ where: { id: req.body.id }});
        
    return res
    .status(200)
    .json({ message: `Course ${req.body.id} Deleted!`, success: true});
}