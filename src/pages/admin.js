import { useRouter } from "next/router";
import useUser from "@/lib/useUser";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";

import axios from "axios";

import CourseCard from "@/components/dashboard/CourseCard";

const fetchCourses = async () => {
  let d = await axios.get("api/getcourses");

  if (d.data.success) return d.data.courses;
};

export default function Admin() {
  const router = useRouter();
  const { signedIn, userInfo } = useUser();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then((crs) => {
      setCourses(crs);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(userInfo).length && !userInfo.admin) {
      router.push("/");
    }
  }, [userInfo]);

  /* 
    COURSE EDIT PAGE (create units)
    - UNIT EDIT PAGE (create lessons, activities within lessons, delete activities (only from lesson, never delete from db), create tests (bigger quizzes))
        - ACTIVITY CREATION PAGE
            - type of activity (ARTICLE, VIDEO, QUIZ)
            - allow reusing of activities between courses/units
            ARTICLE: markdown editor
            VIDEO: paste url
            QUIZ: quiz editor
    */
  return (
    <Box>
      <Box sx={{ height: "100px" }}>
        <Typography>MANAGE COURSES</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", height: "auto", padding: "50px" }}
        bgcolor="#AF98B9"
      >
        {courses.map((c) => (
          <CourseCard
            id={c.id}
            title={c.name}
            description={c.description}
            key={c.id}
          />
        ))}
      </Grid>
    </Box>
  );
}
