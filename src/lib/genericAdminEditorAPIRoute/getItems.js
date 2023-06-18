import prisma from "@/lib/db.js";
import getUser from "@/lib/apiHelpers/getUser.js";

export default async function getItems(req, res, prismaClass) {
  if (req.method != "GET") {
    res.status(400).json({ message: "Expected get request.", success: false });
    return;
  }

  let user = await getUser(req, res);

  if (!user?.admin) {
    res.status(400).json({ message: "Unauthorized", success: false });
    return;
  }

  let items = await prisma[prismaClass].findMany({
    select: {
      title: true,
      id: true,
    },
  });

  res.status(200).json({
    items: items,
    success: true,
  });
}
