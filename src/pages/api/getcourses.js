import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method != "GET")
    return res
      .status(400)
      .json({ success: false, error: "Expected get request." });

  let courses = await prisma.course.findMany({});

  // temporary till we figure out how we're going to add courses
  return res.status(200).json({
    success: true,
    courses: courses,
  });
}
