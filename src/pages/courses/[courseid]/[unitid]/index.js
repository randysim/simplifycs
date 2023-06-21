import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";
import useUser from "@/lib/useUser";

import { Box, Typography, Grid } from "@mui/material";
import CourseHeader from "@/components/course/CourseHeader";
import CourseProgress from "@/components/course/CourseProgress";
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
    getCourseData(courseid)
      .then((crs) => {
        setCourseData(crs?.course);
      })
      .catch((e) => {
        router.push("/dashboard");
      });
  }, [router]);

  const renderUnitData = () => {
    let unit = courseData.units.find((u) => u.id == unitid);

    return (
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        <CourseHeader
          title={courseData.title}
          description={courseData.description}
        />
        <Box
          sx={{
            paddingTop: "20px",
            paddingBottom: "20px",
            width: "40%",
            minWidth: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            flexWrap: "wrap",
            height: "auto",
            rowGap: "20px",
          }}
        >
          <CourseProgress router={router} />
        </Box>
        <Grid container spacing={0} width="60%">
          {unit.lessons.map((l, i) => {
            return <UnitLesson router={router} data={l} key={i} />;
          })}
        </Grid>
      </Box>
    );
  };

  return <Box>{courseData ? renderUnitData() : <p>{courseid}</p>}</Box>;
}
