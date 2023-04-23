import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
EDIT COURSE

EDIT UNIT SEPARATELY, THIS IS JUST FOR "LINKING" COURSES
*/
export default async function handler(req, res) {
    if (req.method != "POST")
        return res
            .status(400)
            .json({ success: false, error: "Expected post request." });
    // admin check
    let token = req.cookies.token;

    if (!token) return res.status(200).json({ message: "Not logged in.", success: false });
    let user = await prisma.user.findUnique({
        where: {
          authToken: token,
        },
    });
    if (!user) return res
    .status(200)
    .json({ message: "Login expired.", success: false });

    if (!user.admin) return res
    .status(400)
    .json({ message: "Unauthorized", success: false });

    const id = parseInt(req.body.id);
    const data = req.body.data; // updated data
    if (!id) return res
    .status(400)
    .json({ message: "Missing Course ID", success: false });

    if (!data) return res
    .status(400)
    .json({ message: "Missing Updated Course Data", success: false});

    const course = await prisma.course.findUnique({ where: { id: id }, include: { units: true }});
    if (!course) return res
    .status(400)
    .json({ message: "Invalid Course ID", success: false });

    if (data.title) course.title = data.title;
    if (data.description) course.description = data.title;

    // connect or create

    // unit does not exist already
    
    await prisma.course.update(
        {
            where: {
                id
            },
            data: {
                title: course.title,
                description: course.description,
                units: {
                    connectOrCreate: data.units
                        .filter(unit => !course.units.find(u => u.id == unit.id))
                        .map(unit => {
                            return {
                                where: {
                                    id: parseInt(unit.id)
                                },
                                create: {
                                    title: unit.title,
                                    description: unit.description,
                                    lessons: {}
                                }
                            }
                        })
                }
            }
        }
    );

    return res
    .status(200)
    .json({ message: `Course #${id} Updated!`, success: true });
}