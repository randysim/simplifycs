import prisma from "@/lib/db.js";
import getUser from "@/lib/apiHelpers/getUser.js";

export default async function createItem(req, res, prismaClass) {
  if (req.method != "POST") {
    res.status(400).json({ message: "Expected post request.", success: false });
    return;
  }

  let user = await getUser(req, res);

  if (!user?.admin) {
    res.status(400).json({ message: "Unauthorized", success: false });
    return;
  }

  let title = "New Item " + new Date().getTime();
  let item = await prisma[prismaClass].create({
    data: {
      title: title,
      author: `${user.firstName} ${user.lastName}`,
    },
  });

  let activity = await prisma.activity.create({
    data: {
      itemId: parseInt(item.id),
      model: prismaClass,
    },
  });

  res.status(200).json({ success: true, message: "Item created" });
}
