import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "GET")
    return res
      .status(400)
      .json({ success: false, message: "Expected get request." });

  let courses = await prisma.course.findMany({});

  return res.status(200).json({
    success: true,
    courses: courses,
  });
}
