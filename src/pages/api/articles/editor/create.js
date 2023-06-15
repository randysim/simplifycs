import prisma from "@/lib/db.js";

export default async function handler(req, res) {
  if (req.method != "POST") {
    res.status(400).json({ message: "Expected post request.", success: false });
  }

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

  let title = "New Article " + new Date().getTime();
  let activity = await prisma.activity.create({
    data: {
      title,
      model: "Article",
    },
  });
  await prisma.article.create({
    data: {
      id: activity.id,
      title: title,
      author: `${user.firstName} ${user.lastName}`,
      content: "[]",
    },
  });

  res.status(200).json({ success: true, message: "Article created" });
}
