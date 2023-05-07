import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* CREATE AN EMPTY COURSE with empty values */
export default async function handler(req, res) {
  if (req.method != "POST")
    return res
      .status(400)
      .json({ success: false, message: "Expected post request." });
  // admin check
  let token = req.cookies.token;

  if (!token)
    return res.status(200).json({ message: "Not logged in.", success: false });
  let user = await prisma.user.findUnique({
    where: {
      authToken: token,
    },
  });
  if (!user)
    return res.status(200).json({ message: "Login expired.", success: false });

  if (!user.admin)
    return res.status(400).json({ message: "Unauthorized", success: false });

  let course = await prisma.course.create({
    data: {
      title: `TempCourse-${Math.floor(Math.random() * 1000)}`,
      description: "Temporary Description",
      units: {},
    },
  });

  return res.status(200).json({
    message: "Course Created!",
    success: true,
    data: {
      id: course.id,
      title: course.title,
      description: course.description,
      units: course.units,
    },
  });
}
