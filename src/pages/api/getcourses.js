import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method != "GET")
    return res
      .status(400)
      .json({ success: false, error: "Expected get request." });

  // temporary till we figure out how we're going to add courses
  return res.status(200).json({
    success: true,
    courses: [
      { name: "Intro to Python", description: "beginner python course", id: 1 },
      { name: "Intro to Java", description: "beginner python course", id: 2 },
      { name: "Intro to Racket", description: "beginner python course", id: 3 },
      {
        name: "Intro to netlogo",
        description: "beginner python course",
        id: 4,
      },
      {
        name: "Intro to javascript",
        description: "beginner python course",
        id: 5,
      },
    ],
  });
}
