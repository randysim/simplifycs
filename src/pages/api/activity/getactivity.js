import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ success: false, message: "Expected get request." });
  }

  const id = parseInt(req.query.id);
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Activity ID" });
  }

  let activity = await prisma.activity.findUnique({ where: { id: id } });
  if (!activity) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Activity ID" });
  }

  activity = await prisma[activity.model].findUnique({
    where: { id: activity.id },
  });

  if (!activity) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Activity ID" });
  }

  return res.status(200).json({ success: true, data: activity });
}
