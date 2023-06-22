import prisma from "@/lib/db.js";
import getUser from "@/lib/apiHelpers/getUser.js";

export default async function updateItem(req, res, prismaClass) {
  if (req.method != "POST") {
    res.status(400).json({ message: "Expected post request.", success: false });
    return;
  }

  let user = await getUser(req, res);

  if (!user?.admin) {
    res.status(400).json({ message: "Unauthorized", success: false });
    return;
  }

  await prisma[prismaClass].update({
    where: {
      id: req.query.id,
    },
    data: {
      title: req.body.title,
      content: req.body.content
    }, 
  });
}
