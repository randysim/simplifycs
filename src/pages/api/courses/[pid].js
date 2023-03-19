import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// first get general course info with units
const courses = {
  1: {
    name: "Intro to Python",
    description: "beginner python course",
    units: [
      {
        name: "Install python",
        id: 12345,
      },
    ],
  },
};

// when user clicks on unit, get lessons
const units = {
  12345: {
    name: "Install Python",
    description: "This set of lessons will teach you how to install python",
    lessons: [
      { name: "How to install Python", type: "ARTICLE", id: 1 },
      { name: "Can you install python?", type: "QUIZ", id: 2 },
    ],
  },
};

// when user clicks on lesson, get specific one
const articles = {
  1: {
    title: "How to instal python?",
    content: "asdjfaslkjfalskfj",
  },
};

const quizzes = {
  2: {
    title: "Can you install python?",
    questions: [],
  },
};

export default async function handler(req, res) {
  if (req.method != "GET")
    return res
      .status(400)
      .json({ success: false, error: "Expected get request." });

  const { pid } = req.query;

  // temporary till we figure out how we're going to add courses
  return res
    .status(200)
    .json({
      success: true,
      courses: [
        "Intro to Python",
        "Intro to Java",
        "Intro to Racket",
        "Intro to Javascript",
        "Intro to Netlogo",
      ],
    });
}
