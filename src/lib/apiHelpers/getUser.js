import prisma from "@/lib/db.js";

export default async function getUser(req, res) {
  let token = req.cookies.token;

  if (!token) {
    //res.status(200).json({ message: "Not logged in.", success: false });
    return;
  }

  let user = await prisma.user.findUnique({
    where: {
      authToken: token,
    },
  });

  if (!user) {
    //res.status(200).json({ message: "Login expired.", success: false });
    return;
  }

  return user;
}
