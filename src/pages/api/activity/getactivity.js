import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "POST")
    return res
      .status(400)
      .json({ success: false, message: "Expected post request." });

  const id = req.body.id;
  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "Missing Activity ID" });

  let activity = await prisma.activity.findUnique({ where: { id } });
  if (!activity)
    return res
      .status(200)
      .json({ success: false, message: "Invalid Activity ID" });
  let result = await prisma[activity.model].findUnique({ where: { id }});

  return res.status(200).json({ success: true, data: result });
}
