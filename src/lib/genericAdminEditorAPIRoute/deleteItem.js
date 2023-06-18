import prisma from "@/lib/db.js";
import getUser from "@/lib/apiHelpers/getUser.js";

export default async function deleteItem(req, res, prismaClass) {
  if (req.method != "POST") {
    res.status(400).json({ message: "Expected post request.", success: false });
    return;
  }

  let user = await getUser(req, res);

  if (!user?.admin) {
    res.status(400).json({ message: "Unauthorized", success: false });
    return;
  }

  await prisma[prismaClass].delete({
    where: {
      id: parseInt(req.query.id),
    },
  });

  await prisma.activity.deleteMany({
    where: {
      itemId: parseInt(req.query.id),
    },
  });

  res.status(200).json({ success: true, message: "Item deleted" });
}
