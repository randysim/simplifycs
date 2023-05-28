import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";
import useUser from "@/lib/useUser";

import { Box, Typography } from "@mui/material";
import CourseHeader from "@/components/course/CourseHeader";
import UnitLesson from "@/components/course/UnitLesson";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body;
  }
};

export default function Unit() {
  const router = useRouter();
  const { courseid, unitid } = router.query;

  const { signedIn, userInfo } = useUser();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    console.log("COURSEID: " + courseid);
    getCourseData(courseid)
      .then((crs) => {
        setCourseData(crs?.course);
      })
      .catch((e) => {
        router.push("/dashboard");
      });
  }, [router]);

  const renderUnitData = () => {
    let unit = courseData.units.find(u => u.id == unitid);

    return (
      <Box>
        <CourseHeader title={unit.title} bgcolor="primary.main" />
        <Box sx={{ width: "100%", height: "auto" }}>
          <Box>
            <Typography sx={{ fontSize: "20px", paddingLeft: "50px" }}>
              Lessons:
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {unit.lessons.map((l, i) => {
              return <UnitLesson router={router} data={l} key={i} />;
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  return <Box>{courseData ? renderUnitData() : <p>{courseid}</p>}</Box>;
}
