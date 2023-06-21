import { useRouter } from "next/router";

import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "@/lib/useUser";

import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";

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
          <CourseProgress router={router} />
        </Box>
        <Grid container spacing={0} width="60%">
          {Object.entries(courseData.units).map(([id, u], i) => (
            <CourseUnit router={router} id={id} data={u} key={id} index={i} />
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box paddingTop="50px">
      {courseData ? renderCourseData() : <p>{courseid}</p>}
    </Box>
  );
}
