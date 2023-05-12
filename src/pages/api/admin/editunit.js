import prisma from "@/lib/db.js";

/*
EDIT UNIT
*/
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

  let id = parseInt(req.body.id);
  if (!id)
    return res.status(400).json({ message: "Missing Unit ID", success: false });

  let unit = await prisma.unit.findUnique({
    where: { id },
    include: { lessons: { include: { activities: true } } },
  });
  if (!unit)
    return res.status(400).json({ message: "Invalid Unit ID", sucess: false });

  let data = req.body.data;
  if (!data)
    return res
      .status(400)
      .json({ message: "Missing Unit Data", success: false });

  if (data.title) unit.title = data.title;
  if (data.description) unit.description = data.description;

  // works for updating lessons?? (i think) <- please clean this up
  unit = await prisma.unit.update({
    where: {
      id, // unit with this id
    },
    data: {
      title: unit.title,
      description: unit.description,
      lessons: {
        disconnect: unit.lessons // remove lessons that were removed by client
          .filter((lesson) => !data.lessons.find((l) => l.id == lesson.id))
          .map((lesson) => {
            return { id: lesson.id };
          }),
        connectOrCreate: data.lessons // create or connect lessons that were added by client
          .filter((lesson) => !unit.lessons.find((l) => l.id == lesson.id))
          .map((lesson) => {
            return {
              where: {
                id: parseInt(lesson.id || -1),
              },
              create: {
                title: lesson.title,
                activities: {}, // new lesson, will have 0 activities because you can't add activities to a lesson that doesn't exist yet
              },
            };
          }),
      },
    },
    include: {
      lessons: {
        include: {
          activities: true,
        },
      },
    },
  });

  // UPDATE ACTIVITIES WITHIN LESSONS
  for (let newLesson of data.lessons) {
    if (!newLesson.id) continue; // would have been created, no need to update

    await prisma.lesson.update({
      where: {
        id: newLesson.id,
      },
      data: {
        title: newLesson.title,
        activities: {
          disconnect: unit.lessons // remove activities no longer in the lesson
            .find((l) => l.id == newLesson.id)
            .activities.filter(
              (activity) =>
                !newLesson.activities.find((a) => a.id == activity.id)
            )
            .map((activity) => {
              return { id: activity.id };
            }),
          connect: newLesson.activities // add activities that are not already in the lesson
            .filter(
              (activity) =>
                !unit.lessons
                  .find((l) => l.id == newLesson.id)
                  .activities.find((a) => a.id == activity.id)
            )
            .map((activity) => {
              return { id: activity.id };
            }),
        },
      },
    });

    /* CORRECT ORDERING */
    await prisma.lesson.update({ 
      where: {
        id: newLesson.id,
      },
      data: {
        activities: {
          set: newLesson.activities.map(activity => ({ id: activity.id }))
        }
      }
    })
  }

  return res
    .status(200)
    .json({ message: `Updated Unit #${id}!`, success: true });
}
