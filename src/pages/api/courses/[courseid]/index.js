import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "GET")
    return res
      .status(400)
      .json({ success: false, message: "Expected get request." });

  const { courseid } = req.query;

  const course = await prisma.course.findUnique({
    where: { id: parseInt(courseid) },
    include: {
      units: {
        include: {
          lessons: {
            include: {
              activities: true,
            },
          },
        },
      },
    },
  });

  if (!course)
    return res
      .status(400)
      .json({ success: false, message: "Invalid Course ID" });

  return res.status(200).json({ success: true, course: course });
}
