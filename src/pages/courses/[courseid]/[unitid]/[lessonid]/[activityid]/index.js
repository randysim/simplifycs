import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useUser from "@/lib/useUser";

import { Box, Grid, Typography } from "@mui/material";

import axios from "axios";

import styles from "@/styles/ArticleEditor.module.css";
import RenderMDX from "@/components/articles/RenderMDX.js";

import LessonSidebar from "@/components/course/LessonSidebar";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body;
  }
};

const getActivityData = async (id) => {
  if (id) {
    let data = await axios.get(
      `http://localhost:3000/api/activity/getactivity?id=${id}`
    );
    let body = data.data;

    if (body.success) return body;
  }
};

export default function Lesson() {
  const router = useRouter();
  const { courseid, unitid, lessonid, activityid } = router.query;

  const { signedIn, userInfo } = useUser();

  const [courseData, setCourseData] = useState(null);
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    getCourseData(courseid)
      .then((crs) => {
        setCourseData(crs);
      })
      .catch((e) => {
        router.push("/dashboard");
      });
  }, [router]);

  useEffect(() => {
    getActivityData(activityid)
      .then((ac) => {
        setActivityData(ac?.data);
      })
      .catch((e) => {
        router.push("/dashboard");
      });
  }, [router]);

  const renderLesson = () => {
    // have lessons on left, scrollable + activity content on the right
    let lesson = courseData.course.units
      .find((u) => u.id == unitid)
      .lessons.find((l) => l.id == lessonid);
    let activityIndex = lesson.activities.findIndex((a) => a.id == activityid);

    return (
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <LessonSidebar
          courseid={courseid}
          unitid={unitid}
          lessonid={lessonid}
          activities={lesson.activities}
          currentActivityIndex={activityIndex}
          router={router}
        />
        <Box>
          <Box>
            <Typography>{activityData.title}</Typography>
            <Typography>By {activityData.author}</Typography>
            <Typography>Last Updated: {activityData.updatedAt}</Typography>
          </Box>
          <RenderMDX className={styles.article}>
            {activityData.compiledMDX}
          </RenderMDX>
        </Box>
      </Box>
    );
  };

  return (
    <Box>{courseData && activityData ? renderLesson() : <p>{courseid}</p>}</Box>
  );
}
