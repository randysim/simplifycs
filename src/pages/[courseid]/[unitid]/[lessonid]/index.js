import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useUser from "@/lib/useUser";

import { Box, Grid, Typography } from "@mui/material";

import axios from "axios";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body;
  }
};

export default function Lesson() {
  const router = useRouter();
  const { courseid, unitid, lessonid } = router.query;

  const { signedIn, userInfo } = useUser();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourseData(courseid)
      .then((crs) => {
        setCourseData(crs);
      })
      .catch((e) => {
        router.push("/dashboard");
      });
  }, [router]);

  const renderLesson = () => {
    // have lessons on left, scrollable + main content on right
  };

  return <Box>{courseData ? renderLesson() : <p>{courseid}</p>}</Box>;
}
