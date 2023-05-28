import { useRouter } from "next/router";

import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "@/lib/useUser";

import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";

import CourseHeader from "@/components/course/CourseHeader";
import CourseUnit from "@/components/course/CourseUnit";
import CourseProgress from "@/components/course/CourseProgress";

import CourseHeader from "@/components/course/CourseHeader";
import CourseUnit from "@/components/course/CourseUnit";
import CourseProgress from "@/components/course/CourseProgress";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body;
  }
};

export default function Course() {
  const router = useRouter();
  const { courseid } = router.query;

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

  const renderCourseData = () => {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        minWidth="600px"
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid container sx={{ width: "100%", padding: 2 }} bgcolor="#333">
            <CourseHeader
              title={courseData.title}
              description={courseData.description}
            />

            <Grid container spacing={0} width="60%">
              {Object.entries(courseData.units).map(([id, u]) => (
                <CourseUnit router={router} id={id} data={u} key={id} />
              ))}
            </Grid>

            <Grid item minWidth="450px" minHeight="450px" width="40%">
              <CourseProgress router={router} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box paddingTop="50px">
      {courseData ? renderCourseData() : <p>{courseid}</p>}
    </Box>
  );
}
